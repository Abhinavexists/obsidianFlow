
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GraphVisualizer from '@/components/GraphVisualizer';
import { Note } from '@/types/note';
import noteService from '@/services/noteService';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GraphPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setIsLoading(true);
        const fetchedNotes = await noteService.getAllNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Failed to load notes:', error);
        toast({
          title: "Error",
          description: "Failed to load notes for graph visualization",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNotes();
  }, [toast]);
  
  const handleSelectNote = (noteId: string) => {
    navigate('/app', { state: { selectedNoteId: noteId } });
  };
  
  const handleBack = () => {
    navigate('/app');
  };
  
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack} 
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Notes
        </Button>
        <h1 className="text-2xl font-bold">Knowledge Graph</h1>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin h-8 w-8 border-4 border-obsidian-300 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="flex-1">
          <GraphVisualizer 
            notes={notes} 
            onSelectNote={handleSelectNote} 
          />
        </div>
      )}
    </div>
  );
};

export default GraphPage;
