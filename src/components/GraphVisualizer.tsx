import React, { useEffect, useState } from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { 
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

interface GraphVisualizerProps {
  notes: Note[];
  onSelectNote: (noteId: string) => void;
}

interface GraphData {
  nodes: { id: string; name: string }[];
  links: { source: string; target: string }[];
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ 
  notes, 
  onSelectNote 
}) => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const { toast } = useToast();

  useEffect(() => {
    // Create nodes from notes
    const nodes = notes.map(note => ({ id: note.id, name: note.title }));

    // Create links based on mentions (simple example)
    const links: { source: string; target: string }[] = [];
    notes.forEach(note => {
      const mentionRegex = /@\[\[([\w\s]+)\|([\w-]+)\]\]/g;
      let match;
      while ((match = mentionRegex.exec(note.content)) !== null) {
        const targetNoteId = match[2];
        if (notes.find(n => n.id === targetNoteId)) {
          links.push({ source: note.id, target: targetNoteId });
        }
      }
    });

    setGraphData({ nodes, links });
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
        description: `Opened ${nodeData.name}`,
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
