import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import LPKDashboard from "@/components/dashboards/LPKDashboard";
import JobSeekerDashboard from "@/components/dashboards/JobSeekerDashboard";
import GovernmentDashboard from "@/components/dashboards/GovernmentDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'lpk' | 'jobseeker' | 'government'>('landing');

  const handleRoleSelect = (role: 'lpk' | 'jobseeker' | 'government') => {
    setCurrentView(role);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  if (currentView === 'lpk') {
    return <LPKDashboard onBack={handleBackToLanding} />;
  }

  if (currentView === 'jobseeker') {
    return <JobSeekerDashboard onBack={handleBackToLanding} />;
  }

  if (currentView === 'government') {
    return <GovernmentDashboard onBack={handleBackToLanding} />;
  }

  return <LandingPage onRoleSelect={handleRoleSelect} />;
};

export default Index;
