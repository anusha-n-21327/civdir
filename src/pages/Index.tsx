import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Directive Officer Dashboard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Welcome. Access the main dashboard to view and manage issues.
        </p>
        <Button asChild size="lg">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
      <div className="absolute bottom-0">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;