
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
  Sparkles,
  Trash2,
  Network
} from 'lucide-react';
import { Note } from '@/types/note';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import noteService from '@/services/noteService';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredNotes: Note[];
  isLoading: boolean;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  selectedNoteId,
  onNoteSelect,
  onCreateNote,
  onDeleteNote,
  searchQuery,
  setSearchQuery,
  filteredNotes,
  isLoading,
  isMobile,
  isOpen,
  onToggle
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [useAiSearch, setUseAiSearch] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'notes': true,
    'tags': false,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleFolder = (folder: string) => {
    setExpandedFolders({
      ...expandedFolders,
      [folder]: !expandedFolders[folder]
    });
  };

  // Basic search function
  const basicSearch = () => {
    if (!searchQuery.trim()) return notes;
    
    return notes.filter(note => {
      const contentToSearch = `${note.title} ${note.content} ${note.tags.join(' ')}`.toLowerCase();
      return contentToSearch.includes(searchQuery.toLowerCase());
    });
  };
  
  // AI-enhanced search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    if (useAiSearch) {
      try {
        setIsSearching(true);
        await noteService.smartSearch(searchQuery);
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
  const [internalFilteredNotes, setInternalFilteredNotes] = useState<Note[]>(notes);

  // Update filtered notes when search changes or notes change
  React.useEffect(() => {
    const updateFilteredNotes = async () => {
      if (!searchQuery.trim()) {
        setInternalFilteredNotes(notes);
        return;
      }
      
      if (useAiSearch) {
        try {
          setIsSearching(true);
          const aiResults = await noteService.smartSearch(searchQuery);
          setInternalFilteredNotes(aiResults);
        } catch (error) {
          console.error("AI search error:", error);
          setInternalFilteredNotes(basicSearch());
        } finally {
          setIsSearching(false);
        }
      } else {
        setInternalFilteredNotes(basicSearch());
      }
    };
    
    updateFilteredNotes();
  }, [searchQuery, notes, useAiSearch]);

  // Extract all unique tags from notes
  const allTags = Array.from(
    new Set(
      notes.flatMap(note => note.tags)
    )
  ).sort();
  
  // Navigate to graph visualizer
  const goToGraphView = () => {
    navigate('/app/graph');
  };

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
    <aside className={`
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      ${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'sticky top-0 h-screen'} 
      w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ease-in-out
    `}>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      
      <div className="mx-4 mb-2 space-y-2">
        <Button
          onClick={onCreateNote}
          className="w-full bg-obsidian-600 hover:bg-obsidian-700"
        >
          <Plus size={16} className="mr-1" /> New Note
        </Button>
        
        <Button
          variant="outline" 
          className="w-full"
          onClick={goToGraphView}
        >
          <Network size={16} className="mr-1" /> Knowledge Graph
        </Button>
      </div>

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
                      className="flex items-center p-2 hover:bg-muted rounded-md group"
                    >
                      <div 
                        className={`flex-1 flex items-center cursor-pointer ${
                          selectedNoteId === note.id ? 'text-obsidian-300' : ''
                        }`}
                        onClick={() => onNoteSelect(note.id)}
                      >
                        <File size={14} className="mr-2" />
                        <span className="truncate">{note.title || 'Untitled'}</span>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 size={14} className="text-muted-foreground hover:text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Note</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{note.title || 'Untitled'}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => onDeleteNote(note.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground p-2">
                    {searchQuery ? 'No matching notes' : 'No notes yet'}
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
