import React from 'react';


const ReportHeader = ({ activeTab, setActiveTab }) => {
  const tabs = ['Dashboard', 'PrimaryEvacuation', 'Other Trips', 'Finance'];

  return (
    <div className="report-header">
      <div className="report-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`report-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportHeader;
