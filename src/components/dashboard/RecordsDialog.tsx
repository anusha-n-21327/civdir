import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Issue } from "@/pages/Dashboard";
import { isThisMonth, isThisWeek, isThisYear, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RecordsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  issues: Issue[];
}

const RecordsDialog = ({ isOpen, onClose, issues }: RecordsDialogProps) => {
  const [dateFilter, setDateFilter] = useState("all");

  const completedIssues = useMemo(() => {
    return issues
      .filter(issue => {
        if (issue.status !== 'Completed') return false;
        
        const date = parseISO(issue.date);
        return (
          dateFilter === "all" ||
          (dateFilter === "week" && isThisWeek(date, { weekStartsOn: 1 })) ||
          (dateFilter === "month" && isThisMonth(date)) ||
          (dateFilter === "year" && isThisYear(date))
        );
      })
      .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
  }, [issues, dateFilter]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Completed Issue Records</DialogTitle>
          <DialogDescription>
            Browse and filter all completed issues.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
          <div className="space-y-4">
            {completedIssues.length > 0 ? (
              completedIssues.map(issue => (
                <div key={issue.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">{issue.category}</p>
                    </div>
                    <Badge className={cn("text-white bg-green-500")}>Completed</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    <span>Completed on {issue.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No completed issues match the current filters.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordsDialog;