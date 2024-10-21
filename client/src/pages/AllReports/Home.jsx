import React, { useState } from 'react';
import DashboardContent from './Dashboard';
import PrimaryEvacuationContent from './PE';
import OtherTripsContent from './OT';
import FinanceContent from './Finance';
import ReportHeader from './Header';

const ReportHome = () => {
  const [activeTab, setActiveTab] = useState('Dashboard'); // Default to Dashboard

  // This function renders content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'PrimaryEvacuation':
        return <PrimaryEvacuationContent />;
      case 'Other Trips':
        return <OtherTripsContent />;
      case 'Finance':
        return <FinanceContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div 
      className="report-home"
      style={{
        backgroundColor: '#f0f2f5', // Custom background color for the entire page
        minHeight: '100vh', // Ensure it takes up the full viewport height
        padding: '20px',
      }}
    >
      {/* Header with background */}
      <ReportHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Content with a different background */}
      <div
        className="tab-content"
        style={{
          backgroundColor: '#ffffff', // Background for the content section
          borderRadius: '8px', // Optional: add some rounding to the corners
          padding: '20px', // Padding around the content
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add a light shadow for emphasis
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ReportHome;
