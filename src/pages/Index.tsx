
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/types/note';
import noteService from '@/services/noteService';
import { useNavigate } from 'react-router-dom';
import GraphVisualizer from '@/components/GraphVisualizer';

const Index: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const fetchedNotes = await noteService.getAllNotes(); // Fixed: getNotes -> getAllNotes
        setNotes(fetchedNotes);
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
  }, []);

  const handleSelectNote = (noteId: string) => {
    const note = notes.find((note) => note.id === noteId);
    setSelectedNote(note || null);
  };

  const handleCreateNote = async () => {
    setIsLoading(true);
    try {
      const newNote = await noteService.createNote();
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setSelectedNote(newNote);
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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        notes={notes}
        selectedNoteId={selectedNote?.id || null} // Fixed: selectedNote -> selectedNoteId
        onNoteSelect={handleSelectNote}
        onCreateNote={handleCreateNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredNotes={filteredNotes}
        onDeleteNote={handleDeleteNote}
        isLoading={isLoading}
        isMobile={false}
        isOpen={true}
        onToggle={() => {}} // Added required prop
      />
      <div className="flex-1 overflow-auto">
        {selectedNote ? (
          <NoteEditor 
            note={selectedNote} 
            onSave={handleUpdateNote}
            // Removed onDelete prop since it doesn't exist in NoteEditorProps
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
