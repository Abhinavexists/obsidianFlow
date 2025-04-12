
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/types/note';
import noteService from '@/services/noteService';
import { useIsMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  // Load all notes
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await noteService.getAllNotes();
        setNotes(fetchedNotes);
        
        // Select first note by default if available and no note is selected
        if (fetchedNotes.length > 0 && !selectedNoteId) {
          setSelectedNoteId(fetchedNotes[0].id);
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };
    
    loadNotes();
  }, []);
  
  // Load selected note
  useEffect(() => {
    const loadSelectedNote = async () => {
      if (selectedNoteId) {
        try {
          const note = await noteService.getNoteById(selectedNoteId);
          setSelectedNote(note);
        } catch (error) {
          console.error('Failed to load selected note:', error);
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
      const newNote = await noteService.createNote();
      setNotes(prevNotes => [newNote, ...prevNotes]);
      setSelectedNoteId(newNote.id);
      
      // Close sidebar on mobile after creating note
      if (isMobile) {
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };
  
  // Save note changes
  const handleSaveNote = async (updatedNote: Note) => {
    try {
      await noteService.updateNote(updatedNote);
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    } catch (error) {
      console.error('Failed to save note:', error);
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
        
        <NoteEditor
          note={selectedNote}
          onSave={handleSaveNote}
        />
      </main>
    </div>
  );
};

export default Index;
