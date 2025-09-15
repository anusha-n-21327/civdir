import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorClass: string;
}

const StatCard = ({ title, value, icon: Icon, colorClass }: StatCardProps) => {
  return (
    <Card className="group hover:scale-105 hover:bg-accent transition-all duration-300 ease-in-out card-gradient-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium transition-colors group-hover:text-white">{title}</CardTitle>
        <Icon className={cn("h-4 w-4 transition-colors group-hover:text-white", colorClass)} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold transition-colors group-hover:text-white", colorClass)}>{value}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;