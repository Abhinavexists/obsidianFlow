
import React, { useState } from 'react';
import { 
  Search, 
  FolderClosed, 
  Tag, 
  Settings, 
  ChevronRight, 
  ChevronDown, 
  File, 
  Plus,
  Menu,
  X
} from 'lucide-react';
import { Note } from '@/types/note';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onCreateNote: () => void;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  selectedNoteId,
  onNoteSelect,
  onCreateNote,
  isMobile,
  isOpen,
  onToggle
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'notes': true,
    'tags': false,
  });

  const toggleFolder = (folder: string) => {
    setExpandedFolders({
      ...expandedFolders,
      [folder]: !expandedFolders[folder]
    });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extract all unique tags from notes
  const allTags = Array.from(
    new Set(
      notes.flatMap(note => note.tags)
    )
  ).sort();

  if (isMobile && !isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={onToggle}
      >
        <Menu size={20} />
      </Button>
    );
  }

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isMobile ? 'fixed inset-y-0 left-0 z-40' : ''} w-64 h-full bg-card border-r border-border flex flex-col transition-transform duration-200 ease-in-out`}>
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h1 className="font-bold text-xl text-obsidian-300">ObsidianFlow</h1>
        {isMobile && (
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X size={18} />
          </Button>
        )}
      </div>
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Button
        onClick={onCreateNote}
        className="mx-4 mb-2 bg-obsidian-600 hover:bg-obsidian-700"
      >
        <Plus size={16} className="mr-1" /> New Note
      </Button>

      <div className="flex-1 overflow-auto">
        <div className="p-2">
          {/* Notes Section */}
          <div className="mb-2">
            <div 
              className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer"
              onClick={() => toggleFolder('notes')}
            >
              {expandedFolders.notes ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <FolderClosed size={16} className="mx-1" />
              <span>Notes</span>
            </div>
            {expandedFolders.notes && (
              <div className="ml-6 mt-1">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map(note => (
                    <div
                      key={note.id}
                      className={`flex items-center p-2 hover:bg-muted rounded-md cursor-pointer ${
                        selectedNoteId === note.id ? 'bg-muted text-obsidian-300' : ''
                      }`}
                      onClick={() => onNoteSelect(note.id)}
                    >
                      <File size={14} className="mr-2" />
                      <span className="truncate">{note.title || 'Untitled'}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground p-2">
                    {searchTerm ? 'No matching notes' : 'No notes yet'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tags Section */}
          <div>
            <div 
              className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer"
              onClick={() => toggleFolder('tags')}
            >
              {expandedFolders.tags ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Tag size={16} className="mx-1" />
              <span>Tags</span>
            </div>
            {expandedFolders.tags && (
              <div className="ml-6 mt-1">
                {allTags.length > 0 ? (
                  allTags.map(tag => (
                    <div
                      key={tag}
                      className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer"
                    >
                      <span className="text-obsidian-400">#{tag}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground p-2">No tags yet</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t border-border p-2">
        <div className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer">
          <Settings size={16} className="mr-2" />
          <span>Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
