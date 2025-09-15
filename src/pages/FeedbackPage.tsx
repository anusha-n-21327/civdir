import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isThisMonth, isThisWeek, isThisYear, isToday, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export interface Feedback {
  id: string;
  name: string;
  date: string;
  area: string;
  rating: number;
  comment: string;
}

interface OutletContextType {
  feedbackData: Feedback[];
}

const FeedbackPage = () => {
  const { feedbackData } = useOutletContext<OutletContextType>();
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
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Citizen Feedback</CardTitle>
        <CardDescription>
          Review feedback submitted by citizens. Sorted by highest rating first.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 pb-4">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
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
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
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
      </CardContent>
    </Card>
  );
};

export default FeedbackPage;