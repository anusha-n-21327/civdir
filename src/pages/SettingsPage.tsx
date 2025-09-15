import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, ChevronRight, HelpCircle, Languages, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";

const languageOptions = [
  "English", "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kannada",
  "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi",
  "Nepali", "Odia", "Punjabi", "Sanskrit", "Santali", "Sindhi", "Tamil",
  "Telugu", "Urdu"
].sort();

type SettingsSection = "main" | "language" | "notifications" | "password" | "help";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>("main");
  const [language, setLanguage] = useState("english");

  const handlePasswordSave = () => {
    showSuccess("Password updated successfully!");
  };

  const handleLanguageChange = (langValue: string) => {
    setLanguage(langValue);
    const selectedLanguage = languageOptions.find(l => l.toLowerCase() === langValue);
    if (selectedLanguage) {
      showSuccess(`Language changed to ${selectedLanguage}`);
    }
  };

  const sectionTitles: Record<SettingsSection, string> = {
    main: "Settings",
    language: "Language",
    notifications: "Notifications",
    password: "Password",
    help: "Help",
  };

  const renderMainOptions = () => (
    <div className="space-y-2">
      <button onClick={() => setActiveSection('language')} className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-accent transition-colors">
        <div className="flex items-center"><Languages className="mr-3 h-5 w-5 text-muted-foreground" /><span>Language</span></div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>
      <button onClick={() => setActiveSection('notifications')} className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-accent transition-colors">
        <div className="flex items-center"><Bell className="mr-3 h-5 w-5 text-muted-foreground" /><span>Notifications</span></div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>
      <button onClick={() => setActiveSection('password')} className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-accent transition-colors">
        <div className="flex items-center"><Lock className="mr-3 h-5 w-5 text-muted-foreground" /><span>Password</span></div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>
      <button onClick={() => setActiveSection('help')} className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-accent transition-colors">
        <div className="flex items-center"><HelpCircle className="mr-3 h-5 w-5 text-muted-foreground" /><span>Help</span></div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'language':
        return (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2 max-w-sm">
                <Label htmlFor="language">Application Language</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language"><SelectValue placeholder="Select a language" /></SelectTrigger>
                  <SelectContent>{languageOptions.map(lang => (<SelectItem key={lang} value={lang.toLowerCase()}>{lang}</SelectItem>))}</SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );
      case 'notifications':
        return (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="allow-notifications" className="flex-grow">Allow notifications</Label>
                <Switch id="allow-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="show-on-lockscreen" className="flex-grow">Show on lock screen</Label>
                <Switch id="show-on-lockscreen" />
              </div>
            </CardContent>
          </Card>
        );
      case 'password':
        return (
          <Card>
            <CardContent className="pt-6 space-y-4 max-w-sm mx-auto">
              <div className="space-y-2"><Label htmlFor="current-password">Current Password</Label><Input id="current-password" type="password" /></div>
              <div className="space-y-2"><Label htmlFor="new-password">New Password</Label><Input id="new-password" type="password" /></div>
              <div className="space-y-2"><Label htmlFor="confirm-password">Confirm New Password</Label><Input id="confirm-password" type="password" /></div>
              <Button onClick={handlePasswordSave} className="w-full !mt-6">Save Changes</Button>
            </CardContent>
          </Card>
        );
      case 'help':
        return (
          <Card>
            <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
              <h4 className="font-semibold">How to Use This Application</h4>
              <ol className="list-decimal list-inside space-y-2 mt-2 text-sm text-muted-foreground">
                <li><strong>Dashboard Overview:</strong> The main dashboard provides a summary of all civic issues.</li>
                <li><strong>Viewing Issues:</strong> Click on any issue in the list to view its details.</li>
                <li><strong>Updating an Issue:</strong> In the details view, you can assign the issue, update its status, and add notes.</li>
                <li><strong>Filtering:</strong> Use the dropdown menus to filter issues by status or category.</li>
                <li><strong>Rejecting an Issue:</strong> To reject an issue, change its status to "Rejected" and provide a reason.</li>
              </ol>
            </CardContent>
          </Card>
        );
      default:
        return renderMainOptions();
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {activeSection !== 'main' && (
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => setActiveSection('main')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <CardTitle>{sectionTitles[activeSection]}</CardTitle>
              {activeSection === 'main' && <CardDescription>Manage your application settings and preferences.</CardDescription>}
            </div>
          </div>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {renderSectionContent()}
      </CardContent>
    </Card>
  );
};

export default SettingsPage;