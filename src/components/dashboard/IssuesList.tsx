import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Issue } from "@/pages/Dashboard";
import RejectIssueDialog from "./RejectIssueDialog";
import IssueDetailsDialog from "./IssueDetailsDialog";
import { showSuccess } from "@/utils/toast";

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
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issueToUpdate, setIssueToUpdate] = useState<Issue | null>(null);

  const categories = ["All", ...Array.from(new Set(issues.map(issue => issue.category)))];
  const statuses = ["All", "New", "In Progress", "Completed", "Rejected"];

  const filteredIssues = issues.filter(issue => {
    const statusMatch = statusFilter === "All" || issue.status === statusFilter;
    const categoryMatch = categoryFilter === "All" || issue.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDetailsDialogOpen(true);
  };

  const handleUpdateIssue = (updatedIssue: Issue, isRejecting: boolean) => {
    if (isRejecting) {
      setIssueToUpdate(updatedIssue);
      setIsDetailsDialogOpen(false);
      setIsRejectDialogOpen(true);
    } else {
      setIssues(prev => prev.map(i => i.id === updatedIssue.id ? updatedIssue : i));
    }
  };

  const handleRejectSubmit = (reason: string) => {
    if (!issueToUpdate) return;

    const finalIssue = {
      ...issueToUpdate,
      notes: `${issueToUpdate.notes}\n\nRejection Reason: ${reason}`.trim(),
    };

    setIssues(prev => prev.map(i => i.id === finalIssue.id ? finalIssue : i));
    
    showSuccess("Issue has been rejected.");
    setIsRejectDialogOpen(false);
    setIssueToUpdate(null);
    setSelectedIssue(null);
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
                <div 
                  key={issue.id} 
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleIssueClick(issue)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">{issue.category}</p>
                    </div>
                    <Badge className={cn("text-white", statusColors[issue.status])}>{issue.status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    <span>Submitted by {issue.submittedBy} on {issue.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">No issues match the current filters.</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <IssueDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        issue={selectedIssue}
        onUpdate={handleUpdateIssue}
      />

      <RejectIssueDialog
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </>
  );
};

export default IssuesList;