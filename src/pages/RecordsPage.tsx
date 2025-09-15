import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Issue } from "@/pages/Dashboard";
import { isThisMonth, isThisWeek, isThisYear, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OutletContextType {
  issues: Issue[];
}

const RecordsPage = () => {
  const { issues } = useOutletContext<OutletContextType>();
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
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Completed Issue Records</CardTitle>
        <CardDescription>
          Browse and filter all completed issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
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
      </CardContent>
    </Card>
  );
};

export default RecordsPage;