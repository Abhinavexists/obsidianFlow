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
  X,
  Sparkles
} from 'lucide-react';
import { Note } from '@/types/note';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import noteService from '@/services/noteService';

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
  const [isSearching, setIsSearching] = useState(false);
  const [useAiSearch, setUseAiSearch] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'notes': true,
    'tags': false,
  });
  const { toast } = useToast();

  const toggleFolder = (folder: string) => {
    setExpandedFolders({
      ...expandedFolders,
      [folder]: !expandedFolders[folder]
    });
  };

  // Basic search function
  const basicSearch = () => {
    if (!searchTerm.trim()) return notes;
    
    return notes.filter(note => {
      const contentToSearch = `${note.title} ${note.content} ${note.tags.join(' ')}`.toLowerCase();
      return contentToSearch.includes(searchTerm.toLowerCase());
    });
  };
  
  // AI-enhanced search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    if (useAiSearch) {
      try {
        setIsSearching(true);
        await noteService.smartSearch(searchTerm);
        // Results are handled in filteredNotes
      } catch (error) {
        console.error("AI search error:", error);
        toast({
          title: "Search error",
          description: "AI search failed, falling back to basic search",
          variant: "destructive",
        });
        setUseAiSearch(false);
      } finally {
        setIsSearching(false);
      }
    }
  };

  // Use state to hold filtered notes
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

  // Update filtered notes when search changes or notes change
  React.useEffect(() => {
    const updateFilteredNotes = async () => {
      if (!searchTerm.trim()) {
        setFilteredNotes(notes);
        return;
      }
      
      if (useAiSearch) {
        try {
          setIsSearching(true);
          const aiResults = await noteService.smartSearch(searchTerm);
          setFilteredNotes(aiResults);
        } catch (error) {
          console.error("AI search error:", error);
          setFilteredNotes(basicSearch());
        } finally {
          setIsSearching(false);
        }
      } else {
        setFilteredNotes(basicSearch());
      }
    };
    
    updateFilteredNotes();
  }, [searchTerm, notes, useAiSearch]);

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
      <div className="p-2 space-y-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-muted-foreground">AI Search</span>
          <Toggle
            pressed={useAiSearch}
            onPressedChange={setUseAiSearch}
            size="sm"
            aria-label="Toggle AI search"
          >
            <Sparkles size={12} className={useAiSearch ? "text-obsidian-300" : "text-muted-foreground"} />
          </Toggle>
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
                {isSearching ? (
                  <div className="text-sm text-muted-foreground p-2">Searching...</div>
                ) : filteredNotes.length > 0 ? (
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
        <Link to="/app/settings" className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer">
          <Settings size={16} className="mr-2" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
