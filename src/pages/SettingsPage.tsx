import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from "@/utils/toast";

const languages = [
  "English", "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kannada",
  "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi",
  "Nepali", "Odia", "Punjabi", "Sanskrit", "Santali", "Sindhi", "Tamil",
  "Telugu", "Urdu"
].sort();

const SettingsPage = () => {
  const handlePasswordSave = () => {
    showSuccess("Password updated successfully!");
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your application settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="language" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>
          <TabsContent value="language" className="py-6">
            <div className="space-y-2 max-w-sm">
              <Label htmlFor="language">Application Language</Label>
              <Select>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang.toLowerCase()}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="py-6">
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="allow-notifications">Allow notifications</Label>
                <Switch id="allow-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="show-on-lockscreen">Show on lock screen</Label>
                <Switch id="show-on-lockscreen" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password" className="py-6">
            <div className="space-y-4 max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button onClick={handlePasswordSave} className="w-full mt-4">Save Changes</Button>
            </div>
          </TabsContent>
          <TabsContent value="help" className="py-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h4 className="font-semibold">How to Use This Application</h4>
              <ol className="list-decimal list-inside space-y-2 mt-2 text-sm text-muted-foreground">
                <li><strong>Dashboard Overview:</strong> The main dashboard provides a summary of all civic issues.</li>
                <li><strong>Viewing Issues:</strong> Click on any issue in the list to view its details, including the description, location, and submitted image.</li>
                <li><strong>Updating an Issue:</strong> In the details view, you can assign the issue to a department, update its status, and add official notes.</li>
                <li><strong>Filtering:</strong> Use the dropdown menus at the top of the issues list to filter by status or category.</li>
                <li><strong>Rejecting an Issue:</strong> To reject an issue, change its status to "Rejected". You will be prompted to provide a reason.</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;