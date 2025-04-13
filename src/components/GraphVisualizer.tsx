
import React, { useEffect, useState } from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { Graph, GraphOut } from 'recharts';
import { Note } from '@/types/note';
import { useToast } from '@/hooks/use-toast';

interface GraphNode {
  name: string;
  id: string;
}

interface GraphLink {
  source: string;
  target: string;
  value: number;
}

interface GraphVisualizerProps {
  notes: Note[];
  onSelectNote: (noteId: string) => void;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ notes, onSelectNote }) => {
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({
    nodes: [],
    links: []
  });
  const { toast } = useToast();

  // Parse content for links between notes - look for [[note title]]
  const findLinks = (notes: Note[]) => {
    const nodes: GraphNode[] = notes.map(note => ({
      name: note.title,
      id: note.id
    }));

    const links: GraphLink[] = [];
    
    // Find connections based on mentions in content
    notes.forEach(sourceNote => {
      const content = sourceNote.content.toLowerCase();
      
      // Look for mentions of other note titles in the content
      notes.forEach(targetNote => {
        if (sourceNote.id !== targetNote.id) {
          const titlePattern = new RegExp(`\\[\\[${targetNote.title.toLowerCase()}\\]\\]`);
          if (titlePattern.test(content)) {
            links.push({
              source: sourceNote.id,
              target: targetNote.id,
              value: 1
            });
          }
        }
      });
      
      // Also add connections based on shared tags
      if (sourceNote.tags.length > 0) {
        notes.forEach(targetNote => {
          if (sourceNote.id !== targetNote.id) {
            const sharedTags = sourceNote.tags.filter(tag => 
              targetNote.tags.includes(tag)
            );
            
            if (sharedTags.length > 0) {
              links.push({
                source: sourceNote.id,
                target: targetNote.id,
                value: sharedTags.length
              });
            }
          }
        });
      }
    });

    return { nodes, links };
  };

  useEffect(() => {
    if (notes.length > 0) {
      const data = findLinks(notes);
      setGraphData(data);
    }
  }, [notes]);

  const handleNodeClick = (nodeData: any) => {
    if (nodeData && nodeData.id) {
      onSelectNote(nodeData.id);
      toast({
        title: "Note selected",
        description: `Navigated to "${nodeData.name}"`,
      });
    }
  };

  const config = {
    node: {
      label: "Note",
      theme: {
        light: "#4B5563",
        dark: "#9CA3AF",
      },
    },
    link: {
      label: "Connection",
      theme: {
        light: "#6366F1",
        dark: "#818CF8",
      },
    },
  };

  return (
    <div className="h-full w-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Knowledge Graph</h2>
      <div className="flex-1 border border-border rounded-md bg-card p-4">
        {notes.length > 1 ? (
          <ChartContainer className="h-full" config={config}>
            <Graph
              data={graphData}
              width={800}
              height={600}
              nodeFill="var(--color-node)"
              nodeSize={50}
              linkStroke="var(--color-link)"
              linkWidth={2}
              nodeClick={handleNodeClick}
            >
              <GraphOut />
            </Graph>
          </ChartContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Need at least 2 notes to visualize connections.
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;
