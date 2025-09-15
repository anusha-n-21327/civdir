import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard, { Issue } from "./pages/Dashboard";
import Layout from "./components/Layout";
import ProfilePage, { UserProfile } from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import FeedbackPage, { Feedback } from "./pages/FeedbackPage";
import RecordsPage from "./pages/RecordsPage";
import { showSuccess } from "./utils/toast";

const queryClient = new QueryClient();

const initialIssues: Issue[] = [
  { id: '1', title: 'Broken streetlight on Main St', category: 'Streetlight', status: 'New', submittedBy: 'John Doe', date: '2023-10-26', description: 'The streetlight at the corner of Main St and 1st Ave has been flickering for a week and is now completely out.', location: 'Main St & 1st Ave', imageUrl: 'https://picsum.photos/seed/streetlight/400/300', assignedTo: 'Public Works', notes: '' },
  { id: '2', title: 'Pothole on Elm St', category: 'Roads', status: 'In Progress', submittedBy: 'Jane Smith', date: '2023-10-25', description: 'A large pothole has formed on Elm St near the intersection with Oak Ave. It is a hazard to vehicles.', location: 'Elm St & Oak Ave', imageUrl: 'https://picsum.photos/seed/pothole/400/300', assignedTo: 'Roads', notes: 'Scheduled for repair on 2023-10-28.' },
  { id: '3', title: 'Overflowing trash can at park', category: 'Sanitation', status: 'Completed', submittedBy: 'Peter Jones', date: '2023-10-24', description: 'The main trash can near the playground at Central Park is overflowing.', location: 'Central Park Playground', imageUrl: 'https://picsum.photos/seed/trash/400/300', assignedTo: 'Sanitation', notes: 'Cleaned up on 2023-10-24.' },
  { id: '4', title: 'Leaky fire hydrant', category: 'Water', status: 'New', submittedBy: 'Mary Johnson', date: '2023-10-26', description: 'A fire hydrant is leaking water continuously at the end of Pine St.', location: 'End of Pine St', imageUrl: 'https://picsum.photos/seed/hydrant/400/300', assignedTo: 'Water', notes: '' },
  { id: '5', title: 'Graffiti on city hall', category: 'Vandalism', status: 'Rejected', submittedBy: 'Sam Wilson', date: '2023-10-23', description: 'There is graffiti on the east wall of city hall.', location: 'City Hall, East Wall', imageUrl: 'https://picsum.photos/seed/graffiti/400/300', assignedTo: 'Vandalism', notes: 'Rejection Reason: This is a commissioned mural, not graffiti.' },
];

const initialFeedback: Feedback[] = [
    { id: 'f1', name: 'Alice', date: '2024-07-22', area: 'Downtown', rating: 5, comment: 'The new park is beautiful and very well-maintained. Great job!' },
    { id: 'f2', name: 'Bob', date: '2024-07-21', area: 'North Suburbs', rating: 4, comment: 'Road repairs on Maple St were completed quickly. Much appreciated.' },
    { id: 'f3', name: 'Charlie', date: '2024-06-15', area: 'Downtown', rating: 2, comment: 'The public library hours are too short. It closes before I can get there after work.' },
    { id: 'f4', name: 'Diana', date: '2024-07-22', area: 'West End', rating: 5, comment: 'The city festival was a huge success! Very well organized.' },
    { id: 'f5', name: 'Ethan', date: '2023-11-01', area: 'North Suburbs', rating: 3, comment: 'Trash pickup is often delayed on my street.' },
];

const defaultProfile: UserProfile = {
  name: "Admin User",
  email: "admin@gov.in",
  avatarUrl: "https://github.com/shadcn.png",
  age: 35,
  department: "System Administration",
  gender: "Male",
  state: "Delhi",
  country: "India",
};

const App = () => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [feedback] = useState<Feedback[]>(initialFeedback);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    showSuccess("Profile updated successfully!");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Layout 
                  issues={issues} 
                  setIssues={setIssues} 
                  userProfile={userProfile} 
                  onUpdateProfile={handleUpdateProfile} 
                  feedbackData={feedback} 
                />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="records" element={<RecordsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;