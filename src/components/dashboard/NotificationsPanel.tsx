import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Issue } from "@/pages/Dashboard";

interface NotificationsPanelProps {
  newIssues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

const NotificationsPanel = ({ newIssues, onIssueClick }: NotificationsPanelProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {newIssues.length > 0 && (
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">New Reports</h4>
            <p className="text-sm text-muted-foreground">
              You have {newIssues.length} new issues to review.
            </p>
          </div>
          <div className="grid gap-2">
            {newIssues.length > 0 ? (
              newIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="grid grid-cols-[25px_1fr] items-start pb-4 last:pb-0 cursor-pointer hover:bg-accent p-2 rounded-md"
                  onClick={() => onIssueClick(issue)}
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">{issue.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Submitted by {issue.submittedBy}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center">No new reports.</p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPanel;