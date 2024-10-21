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
    <div className="report-home">
      <ReportHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-content">{renderContent()}</div> {/* Only display content of the active tab */}
    </div>
  );
};

export default ReportHome;
