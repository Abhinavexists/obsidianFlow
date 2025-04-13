
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Eye, Edit, Hash, Plus, Wand, Lightbulb, FileText, Check, Search, ConnectIcon, Sparkles } from 'lucide-react';
import { Note } from '@/types/note';
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/hooks/use-toast";
import noteService, { aiService } from '@/services/noteService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface NoteEditorProps {
  note: Note | null;
  onSave: (note: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [relatedNotes, setRelatedNotes] = useState<Note[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags([...note.tags]);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
    }
  }, [note]);
  
  const handleSave = () => {
    if (!note) return;
    
    const updatedNote: Note = {
      ...note,
      title: title || 'Untitled',
      content,
      tags,
      updatedAt: new Date().toISOString()
    };
    
    onSave(updatedNote);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };
  
  const handleAddTag = () => {
    if (!newTag.trim() || tags.includes(newTag.trim())) {
      setNewTag('');
      return;
    }
    
    setTags([...tags, newTag.trim()]);
    setNewTag('');
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // AI Feature Handlers
  const handleSummarizeNote = async () => {
    if (!note || !content) return;

    try {
      setIsLoading(true);
      const summary = await noteService.summarizeNote(note.id);
      
      toast({
        title: "Note Summary",
        description: summary,
        duration: 10000,
      });
    } catch (error) {
      console.error("Error summarizing note:", error);
      toast({
        title: "Error",
        description: "Failed to summarize note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestTags = async () => {
    if (!note || !content) return;

    try {
      setIsLoading(true);
      const suggestedTags = await noteService.suggestTags(note.id);
      
      // Add suggested tags that don't already exist
      const newTags = suggestedTags.filter(tag => !tags.includes(tag));
      
      if (newTags.length > 0) {
        setTags([...tags, ...newTags]);
        toast({
          title: "Tags suggested",
          description: `Added ${newTags.length} tags: ${newTags.join(', ')}`,
        });
      } else {
        toast({
          title: "No new tags",
          description: "All suggested tags are already in use.",
        });
      }
    } catch (error) {
      console.error("Error suggesting tags:", error);
      toast({
        title: "Error",
        description: "Failed to suggest tags. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!aiPrompt) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt for content generation.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const generatedContent = await noteService.generateContent(aiPrompt);
      
      // Append to existing content with proper spacing
      const updatedContent = content 
        ? `${content}\n\n${generatedContent}` 
        : generatedContent;
      
      setContent(updatedContent);
      setAiPrompt('');
      
      toast({
        title: "Content generated",
        description: "AI-generated content added to note.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindConnections = async () => {
    if (!note || !content) return;

    try {
      setIsLoading(true);
      const notes = await noteService.getAllNotes();
      const related = await noteService.findRelatedNotes(note.id, notes);
      
      setRelatedNotes(related);
      
      if (related.length > 0) {
        toast({
          title: "Connections found",
          description: `Found ${related.length} related notes.`,
        });
      } else {
        toast({
          title: "No connections",
          description: "No related notes found.",
        });
      }
    } catch (error) {
      console.error("Error finding connections:", error);
      toast({
        title: "Error",
        description: "Failed to find connections. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckGrammar = async () => {
    if (!content) return;

    try {
      setIsLoading(true);
      const correctedContent = await noteService.checkGrammar(content);
      
      setContent(correctedContent);
      
      toast({
        title: "Grammar check complete",
        description: "Text has been checked and corrected.",
      });
    } catch (error) {
      console.error("Error checking grammar:", error);
      toast({
        title: "Error",
        description: "Failed to check grammar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p>Select a note or create a new one</p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Note Header */}
      <div className="border-b border-border p-4 flex flex-wrap justify-between items-center gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="flex-1 min-w-[200px] text-lg font-semibold bg-background"
        />
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                <Wand size={16} className="mr-1" />
                AI Tools
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleSummarizeNote} disabled={!content || isLoading}>
                <FileText size={14} className="mr-2" />
                Summarize Note
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSuggestTags} disabled={!content || isLoading}>
                <Hash size={14} className="mr-2" />
                Suggest Tags
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleFindConnections} disabled={!content || isLoading}>
                <Search size={14} className="mr-2" />
                Find Connections
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCheckGrammar} disabled={!content || isLoading}>
                <Check size={14} className="mr-2" />
                Grammar Check
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isPreview ? <Edit size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-obsidian-600 hover:bg-obsidian-700"
          >
            <Save size={16} className="mr-1" /> Save
          </Button>
        </div>
      </div>
      
      {/* Tags */}
      <div className="border-b border-border p-2 flex flex-wrap items-center gap-2">
        <Hash size={16} className="text-muted-foreground" />
        
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-muted text-obsidian-300 px-2 py-1 rounded-md flex items-center text-sm"
          >
            #{tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              &times;
            </button>
          </div>
        ))}
        
        <div className="flex items-center">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="Add tag..."
            className="h-8 w-24 min-w-24 bg-background"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddTag}
            className="h-8 w-8 p-0"
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>
      
      {/* AI Content Generator */}
      {!isPreview && (
        <div className="border-b border-border p-2 flex items-center gap-2">
          <Sparkles size={16} className="text-obsidian-300" />
          <Input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleGenerateContent()}
            placeholder="Enter a prompt for AI to generate content..."
            className="bg-background flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleGenerateContent}
            size="sm"
            disabled={!aiPrompt || isLoading}
            className="bg-obsidian-500 hover:bg-obsidian-600"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      )}
      
      {/* Editor/Preview Area */}
      <div className="flex-1 overflow-auto">
        {isPreview ? (
          <div className="p-4 markdown-preview">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="h-full min-h-[400px] p-4 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-background rounded-none"
          />
        )}
      </div>
      
      {/* Related Notes Panel */}
      {relatedNotes.length > 0 && (
        <div className="border-t border-border p-2">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-obsidian-300" />
            <h3 className="text-sm font-medium">Related Notes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedNotes.map((relatedNote) => (
              <div key={relatedNote.id} className="bg-muted px-2 py-1 rounded-md text-xs">
                {relatedNote.title || "Untitled"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;
