
import { Note } from '@/types/note';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

// Initial sample notes
const initialNotes: Note[] = [
  {
    id: uuidv4(),
    title: 'Welcome to ObsidianFlow',
    content: `# Welcome to ObsidianFlow!

This is your new knowledge management workspace. Here are some features to explore:

## Features

- **Markdown Support**: Write in markdown with live preview
- **Link Notes**: Create connections between your notes with [[double brackets]]
- **Tags**: Organize your notes with #tags
- **Search**: Quickly find what you need
- **AI Features**: Leverage AI to enhance your notes

## Tips

- Create a new note with the + button in the sidebar
- Use markdown for formatting
- Tag your notes for better organization
- Toggle between edit and preview modes
- Use AI features to generate content, summarize notes, and more

Happy note-taking!`,
    tags: ['welcome', 'getting-started', 'ai-enabled'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Markdown Cheat Sheet',
    content: `# Markdown Cheat Sheet

## Headings
# Heading 1
## Heading 2
### Heading 3

## Formatting
**Bold text**
*Italic text*
~~Strikethrough~~

## Lists
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Second item

## Links & Images
[Link text](https://example.com)
![Image alt text](https://example.com/image.jpg)

## Blockquotes
> This is a blockquote
> It can span multiple lines

## Code
Inline \`code\` with backticks

\`\`\`javascript
// Code blocks with syntax highlighting
function hello() {
  console.log('Hello world!');
}
\`\`\`

## Tables
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

## Task Lists
- [x] Completed task
- [ ] Incomplete task
`,
    tags: ['markdown', 'reference'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Use local storage to persist notes
const loadNotes = (): Note[] => {
  if (typeof window === 'undefined') return initialNotes;
  
  const savedNotes = localStorage.getItem('obsidianflow-notes');
  if (savedNotes) {
    try {
      return JSON.parse(savedNotes);
    } catch (e) {
      console.error('Failed to parse saved notes:', e);
    }
  }
  
  // If no saved notes or error parsing, return initial notes and save them
  localStorage.setItem('obsidianflow-notes', JSON.stringify(initialNotes));
  return initialNotes;
};

const saveNotes = (notes: Note[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('obsidianflow-notes', JSON.stringify(notes));
};

// AI service methods
const aiService = {
  callGeminiAPI: async (action: string, content: string, note?: Note): Promise<string> => {
    try {
      const response = await supabase.functions.invoke("gemini-ai", {
        body: { action, content, note },
      });
      
      if (response.error) {
        throw new Error(response.error.message || "Failed to process with AI");
      }
      
      return response.data.result;
    } catch (error) {
      console.error(`AI ${action} error:`, error);
      throw error;
    }
  },
  
  summarizeNote: async (content: string): Promise<string> => {
    return await aiService.callGeminiAPI("summarize", content);
  },
  
  suggestTags: async (content: string): Promise<string[]> => {
    const tagsResult = await aiService.callGeminiAPI("suggest-tags", content);
    return tagsResult.split(',').map(tag => tag.trim());
  },
  
  generateContent: async (prompt: string): Promise<string> => {
    return await aiService.callGeminiAPI("generate-content", prompt);
  },
  
  findConnections: async (content: string): Promise<string> => {
    return await aiService.callGeminiAPI("find-connections", content);
  },
  
  checkGrammar: async (content: string): Promise<string> => {
    return await aiService.callGeminiAPI("grammar-check", content);
  },
  
  smartSearch: async (query: string, notes: Note[]): Promise<Note[]> => {
    try {
      const searchTerms = await aiService.callGeminiAPI("smart-search", query);
      const terms = searchTerms.split(',').map(term => term.trim().toLowerCase());
      
      // Enhanced search using AI-suggested terms
      return notes.filter(note => {
        const noteContent = `${note.title} ${note.content} ${note.tags.join(' ')}`.toLowerCase();
        return terms.some(term => noteContent.includes(term));
      });
    } catch (error) {
      console.error("Smart search error:", error);
      // Fallback to basic search if AI fails
      return notes.filter(note => {
        const noteContent = `${note.title} ${note.content} ${note.tags.join(' ')}`.toLowerCase();
        return noteContent.includes(query.toLowerCase());
      });
    }
  }
};

// Note service methods
export const noteService = {
  getAllNotes: (): Promise<Note[]> => {
    return Promise.resolve(loadNotes());
  },
  
  getNoteById: (id: string): Promise<Note | null> => {
    const notes = loadNotes();
    const note = notes.find(n => n.id === id) || null;
    return Promise.resolve(note);
  },
  
  createNote: (): Promise<Note> => {
    const notes = loadNotes();
    const newNote: Note = {
      id: uuidv4(),
      title: 'Untitled',
      content: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    notes.unshift(newNote);
    saveNotes(notes);
    return Promise.resolve(newNote);
  },
  
  updateNote: (updatedNote: Note): Promise<Note> => {
    const notes = loadNotes();
    const index = notes.findIndex(n => n.id === updatedNote.id);
    
    if (index !== -1) {
      notes[index] = {
        ...updatedNote,
        updatedAt: new Date().toISOString()
      };
      saveNotes(notes);
    }
    
    return Promise.resolve(updatedNote);
  },
  
  deleteNote: (id: string): Promise<boolean> => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(n => n.id !== id);
    
    if (filteredNotes.length < notes.length) {
      saveNotes(filteredNotes);
      return Promise.resolve(true);
    }
    
    return Promise.resolve(false);
  },
  
  // AI-enhanced methods
  summarizeNote: async (noteId: string): Promise<string> => {
    const note = await noteService.getNoteById(noteId);
    if (!note) throw new Error("Note not found");
    return await aiService.summarizeNote(note.content);
  },
  
  suggestTags: async (noteId: string): Promise<string[]> => {
    const note = await noteService.getNoteById(noteId);
    if (!note) throw new Error("Note not found");
    return await aiService.suggestTags(note.content);
  },
  
  generateContent: async (prompt: string): Promise<string> => {
    return await aiService.generateContent(prompt);
  },
  
  findRelatedNotes: async (noteId: string, notes: Note[]): Promise<Note[]> => {
    const note = await noteService.getNoteById(noteId);
    if (!note) throw new Error("Note not found");
    
    const concepts = await aiService.findConnections(note.content);
    const conceptList = concepts.split(',').map(c => c.trim().toLowerCase());
    
    return notes.filter(n => {
      if (n.id === noteId) return false; // Exclude the current note
      const noteText = `${n.title} ${n.content} ${n.tags.join(' ')}`.toLowerCase();
      return conceptList.some(concept => noteText.includes(concept));
    });
  },
  
  checkGrammar: async (content: string): Promise<string> => {
    return await aiService.checkGrammar(content);
  },
  
  smartSearch: async (query: string): Promise<Note[]> => {
    const notes = loadNotes();
    return await aiService.smartSearch(query, notes);
  }
};

export { aiService };
export default noteService;
