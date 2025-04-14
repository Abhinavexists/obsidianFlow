
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

interface GraphVisualizerProps {
  notes: Note[];
  onSelectNote: (noteId: string) => void;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ 
  notes, 
  onSelectNote 
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { toast } = useToast();

  // Process notes into nodes and edges
  useEffect(() => {
    if (!notes || notes.length === 0) return;
    
    // Create nodes from notes
    const graphNodes = notes.map((note, index) => {
      return {
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
      };
    });

    // Create edges based on links in content
    const graphEdges: Edge[] = [];
    notes.forEach(note => {
      // Look for [[Note Title|noteId]] pattern in content
      const linkRegex = /\[\[(.*?)\|(.*?)\]\]/g;
      let match;
      
      while ((match = linkRegex.exec(note.content)) !== null) {
        const linkedNoteId = match[2];
        
        // Check if the linked note exists in our notes array
        if (notes.some(n => n.id === linkedNoteId)) {
          graphEdges.push({
            id: `${note.id}-${linkedNoteId}`,
            source: note.id,
            target: linkedNoteId,
            animated: false,
            style: { stroke: '#9E86ED' }
          });
        }
      }
    });

    setNodes(graphNodes);
    setEdges(graphEdges);
  }, [notes, setNodes, setEdges]);

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
      <div className="flex-1 border border-border rounded-md bg-card p-4">
        {notes.length > 1 ? (
          <div style={{ height: 500 }}>
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
              <Controls />
              <MiniMap />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
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
