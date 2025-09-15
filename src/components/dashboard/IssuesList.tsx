import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Issue } from "@/pages/Dashboard";
import RejectIssueDialog from "./RejectIssueDialog";
import { showSuccess } from "@/utils/toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface IssuesListProps {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}

const statusColors = {
  'New': 'bg-red-500 hover:bg-red-600',
  'In Progress': 'bg-yellow-500 hover:bg-yellow-600',
  'Completed': 'bg-green-500 hover:bg-green-600',
  'Rejected': 'bg-gray-500 hover:bg-gray-600',
};

const IssuesList = ({ issues, setIssues }: IssuesListProps) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [officialNotes, setOfficialNotes] = useState<Record<string, string>>({});

  const categories = ["All", ...Array.from(new Set(issues.map(issue => issue.category)))];
  const statuses = ["All", "New", "In Progress", "Completed", "Rejected"];

  const filteredIssues = issues.filter(issue => {
    const statusMatch = statusFilter === "All" || issue.status === statusFilter;
    const categoryMatch = categoryFilter === "All" || issue.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const handleOpenRejectDialog = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsRejectDialogOpen(true);
  };

  const handleRejectSubmit = (reason: string) => {
    if (!selectedIssue) return;

    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === selectedIssue.id ? { ...issue, status: 'Rejected', notes: reason } : issue
      )
    );
    console.log(`Issue ${selectedIssue.id} rejected. Reason: ${reason}`);
    showSuccess("Issue has been rejected.");
    setIsRejectDialogOpen(false);
    setSelectedIssue(null);
  };

  const handleNoteChange = (issueId: string, value: string) => {
    setOfficialNotes(prev => ({ ...prev, [issueId]: value }));
  };

  const handleSaveNote = (issueId: string) => {
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, notes: officialNotes[issueId] ?? issue.notes } : issue
      )
    );
    showSuccess("Note saved successfully.");
  };

  const handleStatusUpdate = (issueId: string, newStatus: Issue['status']) => {
    if (!newStatus) return;
    setIssues(prevIssues =>
      prevIssues.map(issue =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
    showSuccess(`Issue status updated to ${newStatus}.`);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Issues</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          <div className="space-y-4">
            {filteredIssues.length > 0 ? (
              filteredIssues.map(issue => (
                <div key={issue.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="font-semibold">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">{issue.category}</p>
                    </div>
                    <Badge className={cn("text-white self-start", statusColors[issue.status])}>{issue.status}</Badge>
                  </div>

                  {issue.imageUrl && (
                    <div className="flex justify-center">
                      <img src={issue.imageUrl} alt={issue.title} className="rounded-lg w-full max-w-md h-auto object-cover" />
                    </div>
                  )}

                  <div className="space-y-2 text-sm border-t pt-4">
                    <div><span className="font-semibold">Description:</span> {issue.description}</div>
                    <div><span className="font-semibold">Location:</span> {issue.location}</div>
                    <div><span className="font-semibold">Assigned To:</span> {issue.assignedTo}</div>
                    <div className="text-xs text-muted-foreground">Submitted by {issue.submittedBy} on {issue.date}</div>
                  </div>

                  {(issue.status === 'New' || issue.status === 'In Progress') && (
                    <div className="pt-4 border-t space-y-4">
                      <div>
                        <Label htmlFor={`notes-${issue.id}`} className="font-semibold">Official Notes</Label>
                        <Textarea
                          id={`notes-${issue.id}`}
                          placeholder="Add official notes here..."
                          defaultValue={issue.notes}
                          onChange={(e) => handleNoteChange(issue.id, e.target.value)}
                          className="mt-1"
                        />
                        <Button size="sm" className="mt-2" onClick={() => handleSaveNote(issue.id)}>Save Note</Button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <Label className="font-semibold whitespace-nowrap">Update Status:</Label>
                          <Select defaultValue={issue.status} onValueChange={(value) => handleStatusUpdate(issue.id, value as Issue['status'])}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {issue.status === 'New' && <SelectItem value="New">New</SelectItem>}
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {issue.status === 'New' && (
                          <Button size="sm" variant="destructive" onClick={() => handleOpenRejectDialog(issue)}>
                            Reject Issue
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">No issues match the current filters.</p>
            )}
          </div>
        </CardContent>
      </Card>
      <RejectIssueDialog
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </>
  );
};

export default IssuesList;