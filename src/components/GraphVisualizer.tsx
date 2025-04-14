import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Note } from '@/types/note';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/ThemeProvider';

interface GraphVisualizerProps {
  notes: Note[];
  onSelectNote: (noteId: string) => void;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ notes, onSelectNote }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { toast } = useToast();
  const { theme } = useTheme();

  // Process notes into nodes and edges
  useEffect(() => {
    if (!notes || notes.length === 0) return;
    
    // Create nodes from notes
    const graphNodes = notes.map((note, index) => ({
      id: note.id,
      data: { 
        label: note.title || 'Untitled',
        noteId: note.id,
      },
      position: { 
        x: 100 + (index % 3) * 200, 
        y: 100 + Math.floor(index / 3) * 100 
      },
      type: 'default',
      style: {
        background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        border: `1px solid ${theme === 'dark' ? '#333333' : '#e5e5e5'}`,
        borderRadius: '8px',
        padding: '10px',
      },
    }));

    // Create edges based on links in content
    const graphEdges: Edge[] = [];
    notes.forEach(note => {
      const linkRegex = /\[\[(.*?)\|(.*?)\]\]/g;
      let match;
      
      while ((match = linkRegex.exec(note.content)) !== null) {
        const linkedNoteId = match[2];
        
        if (notes.some(n => n.id === linkedNoteId)) {
          graphEdges.push({
            id: `${note.id}-${linkedNoteId}`,
            source: note.id,
            target: linkedNoteId,
            animated: false,
            style: { 
              stroke: theme === 'dark' ? '#9E86ED' : '#7E3FEE',
              strokeWidth: 2,
            }
          });
        }
      }
    });

    setNodes(graphNodes);
    setEdges(graphEdges);
  }, [notes, setNodes, setEdges, theme]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick = (_: React.MouseEvent, node: any) => {
    onSelectNote(node.data.noteId);
    toast({
      title: "Note selected",
      description: `Opened ${node.data.label}`,
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 border border-border rounded-lg bg-card shadow-lg">
        {notes.length > 1 ? (
          <div className="h-[500px] md:h-[600px] lg:h-[700px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
              attributionPosition="bottom-right"
            >
              <Controls className="bg-card border border-border" />
              <MiniMap 
                className="bg-card border border-border" 
                nodeColor={theme === 'dark' ? '#666' : '#ddd'}
                maskColor={theme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)'}
              />
              <Background 
                color={theme === 'dark' ? '#333' : '#ccc'} 
                gap={16} 
              />
            </ReactFlow>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground p-8">
            Need at least 2 notes to visualize connections.
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;
