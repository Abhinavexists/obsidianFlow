
import { Note } from '@/types/note';
import { v4 as uuidv4 } from 'uuid';

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

## Tips

- Create a new note with the + button in the sidebar
- Use markdown for formatting
- Tag your notes for better organization
- Toggle between edit and preview modes

Happy note-taking!`,
    tags: ['welcome', 'getting-started'],
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
  }
};

export default noteService;
