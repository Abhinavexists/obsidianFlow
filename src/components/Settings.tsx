
import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon,
  Moon,
  Sun,
  Check,
  X,
  Database,
  Sparkles,
  BookOpen,
  ArrowLeftRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

interface SettingsProps {
  onClose?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [useAiFeatures, setUseAiFeatures] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(5);
  const [editorFontSize, setEditorFontSize] = useState(14);
  const [spellCheck, setSpellCheck] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);
  
  useEffect(() => {
    // Load settings from localStorage
    const savedTheme = localStorage.getItem('obsidian-theme');
    const savedUseAiFeatures = localStorage.getItem('obsidian-use-ai');
    const savedAutoSave = localStorage.getItem('obsidian-autosave');
    const savedAutoSaveInterval = localStorage.getItem('obsidian-autosave-interval');
    const savedEditorFontSize = localStorage.getItem('obsidian-font-size');
    const savedSpellCheck = localStorage.getItem('obsidian-spellcheck');
    const savedSyncEnabled = localStorage.getItem('obsidian-sync');
    
    if (savedTheme) setTheme(savedTheme as 'light' | 'dark' | 'system');
    if (savedUseAiFeatures) setUseAiFeatures(savedUseAiFeatures === 'true');
    if (savedAutoSave) setAutoSave(savedAutoSave === 'true');
    if (savedAutoSaveInterval) setAutoSaveInterval(parseInt(savedAutoSaveInterval));
    if (savedEditorFontSize) setEditorFontSize(parseInt(savedEditorFontSize));
    if (savedSpellCheck) setSpellCheck(savedSpellCheck === 'true');
    if (savedSyncEnabled) setSyncEnabled(savedSyncEnabled === 'true');
  }, []);
  
  const saveSettings = () => {
    // Save settings to localStorage
    localStorage.setItem('obsidian-theme', theme);
    localStorage.setItem('obsidian-use-ai', useAiFeatures.toString());
    localStorage.setItem('obsidian-autosave', autoSave.toString());
    localStorage.setItem('obsidian-autosave-interval', autoSaveInterval.toString());
    localStorage.setItem('obsidian-font-size', editorFontSize.toString());
    localStorage.setItem('obsidian-spellcheck', spellCheck.toString());
    localStorage.setItem('obsidian-sync', syncEnabled.toString());
    
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <SettingsIcon className="mr-2" size={20} />
          Settings
        </CardTitle>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        )}
      </CardHeader>
      <CardContent className="pb-4">
        <Tabs defaultValue="appearance">
          <TabsList className="mb-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="ai">AI Features</TabsTrigger>
            <TabsTrigger value="sync">Sync</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Theme</h3>
                <RadioGroup 
                  value={theme} 
                  onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="flex items-center">
                      <Sun size={16} className="mr-2" />
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="flex items-center">
                      <Moon size={16} className="mr-2" />
                      Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="editor">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autosave">Auto Save</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically save changes to notes
                    </div>
                  </div>
                  <Switch 
                    id="autosave" 
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>
                
                {autoSave && (
                  <div className="ml-4 mt-2">
                    <Label htmlFor="autosave-interval">
                      Auto Save Interval (seconds)
                    </Label>
                    <Input 
                      id="autosave-interval"
                      type="number"
                      min="1"
                      max="60"
                      value={autoSaveInterval}
                      onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
                      className="w-20 mt-1"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Editor Font Size</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="font-size"
                    type="number" 
                    min="8"
                    max="36"
                    value={editorFontSize}
                    onChange={(e) => setEditorFontSize(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">px</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="spellcheck">Spell Check</Label>
                  <div className="text-sm text-muted-foreground">
                    Highlight spelling errors in the editor
                  </div>
                </div>
                <Switch 
                  id="spellcheck" 
                  checked={spellCheck}
                  onCheckedChange={setSpellCheck}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-features" className="flex items-center">
                    <Sparkles size={16} className="mr-2 text-obsidian-300" />
                    AI Features
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    Enable AI-powered features (summarization, suggestions, etc.)
                  </div>
                </div>
                <Switch 
                  id="ai-features" 
                  checked={useAiFeatures}
                  onCheckedChange={setUseAiFeatures}
                />
              </div>
              
              {useAiFeatures && (
                <div className="ml-4 space-y-4">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <BookOpen size={14} className="mr-2" />
                      Active AI Features
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center">
                        <Check size={14} className="mr-2 text-green-500" /> 
                        Note summarization
                      </li>
                      <li className="flex items-center">
                        <Check size={14} className="mr-2 text-green-500" /> 
                        Tag suggestions
                      </li>
                      <li className="flex items-center">
                        <Check size={14} className="mr-2 text-green-500" /> 
                        Content generation
                      </li>
                      <li className="flex items-center">
                        <Check size={14} className="mr-2 text-green-500" /> 
                        Smart search
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="sync">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sync" className="flex items-center">
                    <ArrowLeftRight size={16} className="mr-2" />
                    Sync
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    Synchronize notes across devices
                  </div>
                </div>
                <Switch 
                  id="sync" 
                  checked={syncEnabled}
                  onCheckedChange={setSyncEnabled}
                />
              </div>
              
              {syncEnabled && (
                <div className="ml-4 space-y-4">
                  <div className="flex items-center">
                    <Database size={16} className="mr-2 text-green-500" />
                    <span className="text-sm">Connected to Supabase database</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Your notes are automatically synced to the cloud when changes are made.
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          variant="default" 
          className="bg-obsidian-600 hover:bg-obsidian-700"
          onClick={saveSettings}
        >
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Settings;
