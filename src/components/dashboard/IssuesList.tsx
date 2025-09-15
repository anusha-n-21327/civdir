import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Issue } from "@/pages/Dashboard";
import { Label } from "@/components/ui/label";

interface IssuesListProps {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  onIssueClick: (issue: Issue) => void;
}

const statusBadgeStyles = {
  'New': 'bg-red-500 text-white animate-pulse-glow',
  'In Progress': 'bg-[#6366F1] text-white',
  'Completed': 'bg-[#34D399] text-black',
  'Rejected': 'bg-[#64748B] text-white',
};

const statusBorderStyles = {
  'New': 'border-red-500',
  'In Progress': 'border-[#6366F1]',
  'Completed': 'border-[#34D399]',
  'Rejected': 'border-[#64748B]',
};

const IssuesList = ({ issues, onIssueClick }: IssuesListProps) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(issues.map(issue => issue.category)))];
  const statuses = ["All", "New", "In Progress", "Completed", "Rejected"];

  const filteredIssues = issues.filter(issue => {
    const statusMatch = statusFilter === "All" || issue.status === statusFilter;
    const categoryMatch = categoryFilter === "All" || issue.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  return (
    <Card className="h-full flex flex-col card-gradient-border">
      <CardHeader>
        <CardTitle>Issues</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status-filter">Issue Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="category-filter">Issue Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category-filter" className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {filteredIssues.length > 0 ? (
            filteredIssues.map(issue => (
              <div 
                key={issue.id} 
                className={cn(
                  "p-4 border border-l-4 rounded-lg shadow-sm hover:shadow-lg hover:bg-accent hover:translate-y-[-2px] transition-all duration-200 cursor-pointer",
                  statusBorderStyles[issue.status]
                )}
                onClick={() => onIssueClick(issue)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground">{issue.category}</p>
                  </div>
                  <Badge className={cn(statusBadgeStyles[issue.status])}>{issue.status}</Badge>
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
  );
};

export default IssuesList;