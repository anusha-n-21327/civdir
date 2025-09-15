import { useState, useMemo } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isThisMonth, isThisWeek, isThisYear, isToday, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export interface Feedback {
  id: string;
  name: string;
  date: string; // ISO 8601 format: "YYYY-MM-DD"
  area: string;
  rating: number; // 1-5
  comment: string;
}

interface FeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feedbackData: Feedback[];
}

const FeedbackDialog = ({ isOpen, onClose, feedbackData }: FeedbackDialogProps) => {
  const [dateFilter, setDateFilter] = useState("all");

  const filteredAndSortedFeedback = useMemo(() => {
    return feedbackData
      .filter(feedback => {
        const date = parseISO(feedback.date);
        return (
          dateFilter === "all" ||
          (dateFilter === "today" && isToday(date)) ||
          (dateFilter === "week" && isThisWeek(date, { weekStartsOn: 1 })) ||
          (dateFilter === "month" && isThisMonth(date)) ||
          (dateFilter === "year" && isThisYear(date))
        );
      })
      .sort((a, b) => b.rating - a.rating);
  }, [feedbackData, dateFilter]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Citizen Feedback</DialogTitle>
          <DialogDescription>
            Review feedback submitted by citizens. Sorted by highest rating first.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-4 py-4">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
          <div className="space-y-4">
            {filteredAndSortedFeedback.length > 0 ? (
              filteredAndSortedFeedback.map(feedback => (
                <div key={feedback.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{feedback.name}</div>
                      <div className="text-xs text-muted-foreground">{new Date(feedback.date).toLocaleDateString()}</div>
                    </div>
                    {renderStars(feedback.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{feedback.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No feedback matches the current filters.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;