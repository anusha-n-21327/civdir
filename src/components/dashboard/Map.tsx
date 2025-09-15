import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Issue {
  id: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Rejected';
  location: { top: string; left: string };
}

interface MapProps {
  issues: Issue[];
}

const statusColors = {
  'New': 'bg-red-500',
  'In Progress': 'bg-yellow-500',
  'Completed': 'bg-green-500',
  'Rejected': 'bg-gray-500',
};

const Map = ({ issues }: MapProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-0 h-full">
        <div className="relative h-full w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
          {/* This is a placeholder for a real map */}
          <img src="https://www.openstreetmap.org/assets/map-placeholder-3209e0c65f4bafd1a00b759b69600f1de625b1e2a60b3a599f17f53f71b20b7a.png" alt="Map placeholder" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Map Area</p>
          </div>
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={cn(
                "absolute w-3 h-3 rounded-full border-2 border-white",
                statusColors[issue.status]
              )}
              style={{ top: issue.location.top, left: issue.location.left }}
              title={issue.status}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Map;