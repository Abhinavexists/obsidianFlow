
import React, { useEffect, useState } from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { 
  ForceGraph, 
  LineChart, 
  Line, 
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from 'recharts';
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

  // Since we can't use ForceGraph directly (it's not available in recharts),
  // let's create a simple visualization using a standard chart
  const processedData = graphData.nodes.map(node => {
    // Count connections for this node
    const connections = graphData.links.filter(
      link => link.source === node.id || link.target === node.id
    ).length;
    
    return {
      id: node.id,
      name: node.name,
      connections: connections
    };
  }).sort((a, b) => b.connections - a.connections);

  const handleNodeClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const nodeData = data.activePayload[0].payload;
      onSelectNote(nodeData.id);
      toast({
        title: "Note selected",
        description: `Navigated to "${nodeData.name}"`,
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Knowledge Graph</h2>
      <div className="flex-1 border border-border rounded-md bg-card p-4">
        {notes.length > 1 ? (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart 
              data={processedData} 
              margin={{top: 20, right: 30, left: 20, bottom: 70}}
              onClick={handleNodeClick}
            >
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                label={{ value: 'Connections', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={(value, name, props) => [`${value} connections`, 'Connections']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="connections" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
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
