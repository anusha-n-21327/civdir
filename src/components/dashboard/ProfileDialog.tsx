import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const ProfileDialog = ({ isOpen, onClose, userProfile, onUpdateProfile }: ProfileDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);

  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile, isOpen]);

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
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleCancel();
      }
      onClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Profile" : "User Profile"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update your profile details below." : "View and manage your profile details."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-4 py-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={formData.avatarUrl} alt={formData.name} />
            <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-grow">
            {isEditing ? (
              <>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} />
              </>
            ) : (
              <>
                <h4 className="text-lg font-semibold">{formData.name}</h4>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
                <p className="text-sm text-muted-foreground">{formData.department}</p>
              </>
            )}
          </div>
        </div>
        
        <Separator />

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm py-4">
          {isEditing ? (
            <>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={formData.email} onChange={handleInputChange} /></div>
              <div><Label htmlFor="age">Age</Label><Input id="age" type="number" value={formData.age} onChange={handleInputChange} /></div>
              <div><Label htmlFor="department">Department</Label><Input id="department" value={formData.department} onChange={handleInputChange} /></div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(v) => handleSelectChange('gender', v)}>
                  <SelectTrigger id="gender"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="state">State</Label><Input id="state" value={formData.state} onChange={handleInputChange} /></div>
              <div><Label htmlFor="country">Country</Label><Input id="country" value={formData.country} onChange={handleInputChange} /></div>
              <div className="col-span-2"><Label htmlFor="avatarUrl">Avatar URL</Label><Input id="avatarUrl" value={formData.avatarUrl} onChange={handleInputChange} /></div>
            </>
          ) : (
            <>
              <div className="font-medium text-muted-foreground">Age</div><div>{formData.age}</div>
              <div className="font-medium text-muted-foreground">Gender</div><div>{formData.gender}</div>
              <div className="font-medium text-muted-foreground">State</div><div>{formData.state}</div>
              <div className="font-medium text-muted-foreground">Country</div><div>{formData.country}</div>
            </>
          )}
        </div>

        <DialogFooter>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button className="w-full" onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;