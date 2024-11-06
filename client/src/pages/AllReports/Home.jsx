import React, { useState } from 'react';
import DashboardContent from './Dashboard';
import PrimaryEvacuationContent from './PE';
import OtherTripsContent from './OT';
import ReportHeader from './Header';
import LegalObligations from './LegalObligations';
import ReportsHomeSidebar from './SideBar';


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
      case 'Legal Obligations':
        return <LegalObligations />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div 
      className="report-home"
      style={{
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex', // Use flex to position sidebar and content side by side
      }}
    >
      {/* Sidebar */}
      <ReportsHomeSidebar setSelectedDashboard={setActiveTab} />

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px' }}> {/* Flex 1 to take remaining space */}
        <ReportHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div
          className="tab-content"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            marginTop: '20px', // Space between header and content
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ReportHome;
