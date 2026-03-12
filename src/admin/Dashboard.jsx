import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to Ledel Admin</h1>
      <p>Select a section from the sidebar to start editing your website content.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem' }}>
          <h3>Quick Stats</h3>
          <p>Website is LIVE</p>
          <p>Total Sections: 9</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem' }}>
          <h3>System Status</h3>
          <p>Backend: {import.meta.env.VITE_API_URL ? 'Cloud' : 'Local'} ({import.meta.env.VITE_API_URL || 'http://localhost:5000'})</p>
          <p>Database: Supabase (PostgreSQL)</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
