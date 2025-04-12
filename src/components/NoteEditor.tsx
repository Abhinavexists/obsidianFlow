
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Save, Eye, Edit, Hash, Plus } from 'lucide-react';
import { Note } from '@/types/note';
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/hooks/use-toast";

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
    </div>
  );
};

export default NoteEditor;
