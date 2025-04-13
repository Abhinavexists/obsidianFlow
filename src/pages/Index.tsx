
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/types/note';
import noteService from '@/services/noteService';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

const Index: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const location = useLocation();
  
  // Handle note selection from graph page
  useEffect(() => {
    if (location.state?.selectedNoteId) {
      setSelectedNoteId(location.state.selectedNoteId);
    }
  }, [location.state]);
  
  // Load all notes
  useEffect(() => {
    const loadNotes = async () => {
      try {
        setIsLoading(true);
        const fetchedNotes = await noteService.getAllNotes();
        setNotes(fetchedNotes);
        
        // Select first note by default if available and no note is selected
        if (fetchedNotes.length > 0 && !selectedNoteId) {
          setSelectedNoteId(fetchedNotes[0].id);
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
        toast({
          title: "Error",
          description: "Failed to load notes",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNotes();
  }, []);
  
  // Load selected note
  useEffect(() => {
    const loadSelectedNote = async () => {
      if (selectedNoteId) {
        try {
          setIsLoading(true);
          const note = await noteService.getNoteById(selectedNoteId);
          setSelectedNote(note);
        } catch (error) {
          console.error('Failed to load selected note:', error);
          toast({
            title: "Error",
            description: "Failed to load the selected note",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setSelectedNote(null);
      }
    };
    
    loadSelectedNote();
  }, [selectedNoteId]);
  
  // Create a new note
  const handleCreateNote = async () => {
    try {
      setIsLoading(true);
      const newNote = await noteService.createNote();
      setNotes(prevNotes => [newNote, ...prevNotes]);
      setSelectedNoteId(newNote.id);
      
      // Close sidebar on mobile after creating note
      if (isMobile) {
        setSidebarOpen(false);
      }

      toast({
        title: "Note created",
        description: "New note has been created",
      });
    } catch (error) {
      console.error('Failed to create note:', error);
      toast({
        title: "Error",
        description: "Failed to create new note",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Save note changes
  const handleSaveNote = async (updatedNote: Note) => {
    try {
      setIsLoading(true);
      await noteService.updateNote(updatedNote);
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    } catch (error) {
      console.error('Failed to save note:', error);
      toast({
        title: "Error",
        description: "Failed to save note changes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a note
  const handleDeleteNote = async (noteId: string) => {
    try {
      setIsLoading(true);
      const success = await noteService.deleteNote(noteId);
      
      if (success) {
        // Update notes list
        const updatedNotes = notes.filter(note => note.id !== noteId);
        setNotes(updatedNotes);
        
        // Select another note if available
        if (selectedNoteId === noteId) {
          if (updatedNotes.length > 0) {
            setSelectedNoteId(updatedNotes[0].id);
          } else {
            setSelectedNoteId(null);
          }
        }
        
        toast({
          title: "Note deleted",
          description: "The note has been deleted successfully",
        });
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  // Select a note
  const handleNoteSelect = (noteId: string) => {
    setSelectedNoteId(noteId);
    
    // Close sidebar on mobile after selecting note
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onNoteSelect={handleNoteSelect}
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Overlay when mobile sidebar is open */}
        {isMobile && sidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-30"
            onClick={toggleSidebar}
          />
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-8 w-8 border-4 border-obsidian-300 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <NoteEditor
            note={selectedNote}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
