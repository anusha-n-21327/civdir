import { useState } from "react";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import IssuesList from "@/components/dashboard/IssuesList";
import { AlertCircle, CheckCircle, Clock, FilePlus, XCircle } from "lucide-react";

const initialIssues = [
  { 
    id: '1', 
    title: 'Broken streetlight on Main St', 
    category: 'Streetlight', 
    status: 'New', 
    submittedBy: 'John Doe', 
    date: '2023-10-26',
    imageUrl: '/placeholder.svg',
    description: 'The streetlight at the corner of Main St and 1st Ave has been flickering for a week and is now completely out.',
    location: 'Main St & 1st Ave',
    assignedTo: 'Public Works',
    notes: ''
  },
  { 
    id: '2', 
    title: 'Pothole on Elm St', 
    category: 'Roads', 
    status: 'In Progress', 
    submittedBy: 'Jane Smith', 
    date: '2023-10-25',
    imageUrl: '/placeholder.svg',
    description: 'A large pothole is forming in the right lane of Elm St, just past the intersection with Oak St. It is a hazard to traffic.',
    location: 'Elm St, near Oak St',
    assignedTo: 'Transportation Dept',
    notes: 'Scheduled for repair on 2023-10-28.'
  },
  { 
    id: '3', 
    title: 'Overflowing trash can at park', 
    category: 'Sanitation', 
    status: 'Completed', 
    submittedBy: 'Peter Jones', 
    date: '2023-10-24',
    imageUrl: '/placeholder.svg',
    description: 'The main trash can near the playground at Central Park is overflowing and needs to be emptied.',
    location: 'Central Park Playground',
    assignedTo: 'Sanitation Dept',
    notes: 'Emptied on 2023-10-24.'
  },
  { 
    id: '4', 
    title: 'Leaky fire hydrant', 
    category: 'Water', 
    status: 'New', 
    submittedBy: 'Mary Johnson', 
    date: '2023-10-26',
    imageUrl: '/placeholder.svg',
    description: 'A fire hydrant is leaking water onto the street.',
    location: '456 Oak Avenue',
    assignedTo: 'Water Department',
    notes: ''
  },
  { 
    id: '5', 
    title: 'Graffiti on city hall', 
    category: 'Vandalism', 
    status: 'Rejected', 
    submittedBy: 'Sam Wilson', 
    date: '2023-10-23',
    imageUrl: '/placeholder.svg',
    description: 'There is graffiti on the east wall of the city hall building.',
    location: 'City Hall',
    assignedTo: 'Public Works',
    notes: 'This is a commissioned mural, not graffiti.'
  },
  { 
    id: '6', 
    title: 'Water supply issue in Sector 4', 
    category: 'Water', 
    status: 'In Progress', 
    submittedBy: 'Emily Davis', 
    date: '2023-10-25',
    imageUrl: '/placeholder.svg',
    description: 'The water pressure has been extremely low for the past 2 days.',
    location: 'Sector 4 Residential Area',
    assignedTo: 'Water Department',
    notes: 'Investigating a possible main line break.'
  },
  { 
    id: '7', 
    title: 'Fallen tree blocking sidewalk', 
    category: 'Parks', 
    status: 'Completed', 
    submittedBy: 'Chris Brown', 
    date: '2023-10-22',
    imageUrl: '/placeholder.svg',
    description: 'A large branch has fallen from a tree and is blocking the sidewalk.',
    location: 'Maple Street Park',
    assignedTo: 'Parks & Recreation',
    notes: 'Branch was removed on 2023-10-22.'
  },
];

export interface Issue {
  id: string;
  title: string;
  category: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Rejected';
  submittedBy: string;
  date: string;
  imageUrl: string;
  description: string;
  location: string;
  assignedTo: string;
  notes: string;
}

const Dashboard = () => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);

  const stats = {
    newReports: issues.filter(i => i.status === 'New').length,
    totalIssues: issues.length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    completed: issues.filter(i => i.status === 'Completed').length,
    rejected: issues.filter(i => i.status === 'Rejected').length,
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="p-4 md:p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <StatCard title="New Reports" value={stats.newReports.toString()} icon={FilePlus} />
          <StatCard title="Total Issues" value={stats.totalIssues.toString()} icon={AlertCircle} />
          <StatCard title="In Progress" value={stats.inProgress.toString()} icon={Clock} />
          <StatCard title="Completed" value={stats.completed.toString()} icon={CheckCircle} />
          <StatCard title="Rejected" value={stats.rejected.toString()} icon={XCircle} />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <IssuesList issues={issues} setIssues={setIssues} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;