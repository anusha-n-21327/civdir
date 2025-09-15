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

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const userProfile = {
  name: "Admin User",
  email: "admin@gov.in",
  avatarUrl: "https://github.com/shadcn.png",
  age: 35,
  department: "System Administration",
  gender: "Male",
  state: "Delhi",
  country: "India",
};

const ProfileDialog = ({ isOpen, onClose }: ProfileDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            View and manage your profile details.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-4 py-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-lg font-semibold">{userProfile.name}</h4>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            <p className="text-sm text-muted-foreground">{userProfile.department}</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm py-4">
          <div className="font-medium text-muted-foreground">Age</div>
          <div>{userProfile.age}</div>
          <div className="font-medium text-muted-foreground">Gender</div>
          <div>{userProfile.gender}</div>
          <div className="font-medium text-muted-foreground">State</div>
          <div>{userProfile.state}</div>
          <div className="font-medium text-muted-foreground">Country</div>
          <div>{userProfile.country}</div>
        </div>
        <DialogFooter>
          <Button className="w-full">Edit Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;