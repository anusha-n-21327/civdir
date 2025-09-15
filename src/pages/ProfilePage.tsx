import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  age: number;
  department: string;
  gender: string;
  state: string;
  country: string;
}

interface OutletContextType {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const ProfilePage = () => {
  const { userProfile, onUpdateProfile } = useOutletContext<OutletContextType>();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);

  useEffect(() => {
    setFormData(userProfile);
    setIsEditing(false);
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: id === 'age' ? Number(value) : value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setIsEditing(false);
  };

  return (
    <Card className="max-w-3xl mx-auto card-gradient-border">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon" aria-label="Back to Dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <CardTitle>{isEditing ? "Edit Profile" : "User Profile"}</CardTitle>
            <CardDescription>
              {isEditing ? "Update your profile details below." : "View and manage your profile details."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={formData.avatarUrl} alt={formData.name} />
            <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-grow">
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold">{formData.name}</h2>
                <p className="text-muted-foreground">{formData.email}</p>
                <p className="text-muted-foreground">{formData.department}</p>
              </div>
            )}
          </div>
        </div>
        
        <Separator />

        {isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={formData.email} onChange={handleInputChange} /></div>
            <div className="space-y-2"><Label htmlFor="age">Age</Label><Input id="age" type="number" value={formData.age} onChange={handleInputChange} /></div>
            <div className="space-y-2"><Label htmlFor="department">Department</Label><Input id="department" value={formData.department} onChange={handleInputChange} /></div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(v) => handleSelectChange('gender', v)}>
                <SelectTrigger id="gender"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label htmlFor="state">State</Label><Input id="state" value={formData.state} onChange={handleInputChange} /></div>
            <div className="space-y-2"><Label htmlFor="country">Country</Label><Input id="country" value={formData.country} onChange={handleInputChange} /></div>
            <div className="sm:col-span-2 space-y-2"><Label htmlFor="avatarUrl">Avatar URL</Label><Input id="avatarUrl" value={formData.avatarUrl} onChange={handleInputChange} /></div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium text-muted-foreground">Age</p>
              <p className="text-sm">{formData.age}</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="text-sm">{formData.gender}</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium text-muted-foreground">State</p>
              <p className="text-sm">{formData.state}</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium text-muted-foreground">Country</p>
              <p className="text-sm">{formData.country}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isEditing ? (
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        ) : (
          <Button className="w-full sm:w-auto sm:ml-auto" onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfilePage;