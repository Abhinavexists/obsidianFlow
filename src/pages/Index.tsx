
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/types/note';
import noteService from '@/services/noteService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';

const Index: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const fetchedNotes = await noteService.getAllNotes();
        setNotes(fetchedNotes);
        
        // If there's a selectedNoteId in the location state, select that note
        if (location.state?.selectedNoteId) {
          const note = fetchedNotes.find(n => n.id === location.state.selectedNoteId);
          if (note) {
            setSelectedNote(note);
          }
        }
      } catch (error) {
        toast({
          title: "Error fetching notes",
          description: "Failed to retrieve notes from the server.",
          variant: "destructive",
        });
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [toast, location.state]);

  const handleSelectNote = (noteId: string) => {
    const note = notes.find((note) => note.id === noteId);
    setSelectedNote(note || null);
    
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleCreateNote = async () => {
    setIsLoading(true);
    try {
      const newNote = await noteService.createNote();
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setSelectedNote(newNote);
      
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error creating note",
        description: "Failed to create a new note.",
        variant: "destructive",
      });
      console.error("Error creating note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNote = async (updatedNote: Note) => {
    setIsLoading(true);
    try {
      await noteService.updateNote(updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
      setSelectedNote(updatedNote);
    } catch (error) {
      toast({
        title: "Error updating note",
        description: "Failed to update the note.",
        variant: "destructive",
      });
      console.error("Error updating note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    setIsLoading(true);
    try {
      await noteService.deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      setSelectedNote(null);
    } catch (error) {
      toast({
        title: "Error deleting note",
        description: "Failed to delete the note.",
        variant: "destructive",
      });
      console.error("Error deleting note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        notes={notes}
        selectedNoteId={selectedNote?.id || null}
        onNoteSelect={handleSelectNote}
        onCreateNote={handleCreateNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredNotes={filteredNotes}
        onDeleteNote={handleDeleteNote}
        isLoading={isLoading}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <div className="flex-1 overflow-auto relative">
        {selectedNote ? (
          <NoteEditor 
            note={selectedNote} 
            onSave={handleUpdateNote}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a note or create a new one to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
