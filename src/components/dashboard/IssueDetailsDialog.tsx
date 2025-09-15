import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Issue } from "@/pages/Dashboard";
import { useEffect, useState } from "react";
import { showSuccess } from "@/utils/toast";

interface IssueDetailsDialogProps {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedIssue: Issue, isRejecting: boolean) => void;
  onStartReject: (issue: Issue) => void;
}

const departments = ["Public Works", "Sanitation", "Roads", "Water", "Parks", "Vandalism", "Unassigned"];
const statuses: Issue['status'][] = ["New", "In Progress", "Completed", "Rejected"];

const IssueDetailsDialog = ({ issue, isOpen, onClose, onUpdate, onStartReject }: IssueDetailsDialogProps) => {
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState<Issue['status']>('New');
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (issue) {
      setAssignedTo(issue.assignedTo || "Unassigned");
      setStatus(issue.status);
      setNotes(issue.notes || "");
    }
  }, [issue]);

  if (!issue) return null;

  const handleSaveChanges = () => {
    const isRejecting = status === 'Rejected' && issue.status !== 'Rejected';
    const updatedIssue: Issue = {
      ...issue,
      assignedTo,
      status,
      notes,
    };
    onUpdate(updatedIssue, isRejecting);
    if (!isRejecting) {
      showSuccess("Issue updated successfully.");
      onClose();
    }
  };

  const handleImplement = () => {
    const updatedIssue: Issue = {
      ...issue,
      status: 'In Progress',
      assignedTo: assignedTo === "Unassigned" ? "Public Works" : assignedTo,
    };
    onUpdate(updatedIssue, false);
    showSuccess("Issue is now In Progress.");
    onClose();
  };

  const handleReject = () => {
    onStartReject(issue);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{issue.title}</DialogTitle>
          <DialogDescription>
            Submitted by {issue.submittedBy} on {issue.date}
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 space-y-6">
          <div>
            <img src={issue.imageUrl} alt={issue.title} className="rounded-lg w-full object-cover" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{issue.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Location</h4>
            <p className="text-sm text-muted-foreground">{issue.location}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger id="assignedTo">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Update Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Issue['status'])}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Official Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add official notes here..."
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          {issue.status === 'New' ? (
            <div className="w-full grid grid-cols-2 gap-2">
              <Button variant="destructive" onClick={handleReject}>Reject</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleImplement}>Implement</Button>
            </div>
          ) : (
            <>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IssueDetailsDialog;