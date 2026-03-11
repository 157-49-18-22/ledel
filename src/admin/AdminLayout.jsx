import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Type, 
  Image as ImageIcon, 
  Grid, 
  Layers, 
  MessageSquare, 
  Info, 
  ShieldCheck, 
  Zap,
  Menu,
  Settings
} from 'lucide-react';
import './Admin.css';

const AdminLayout = () => {
  const sections = [
    { id: 'hero', name: 'Hero', icon: <Layers size={18} /> },
    { id: 'products', name: 'Products', icon: <Grid size={18} /> },
    { id: 'techflow', name: 'TechFlow', icon: <Zap size={18} /> },
    { id: 'services', name: 'Services', icon: <Settings size={18} /> },
    { id: 'industries', name: 'Industries', icon: <Layers size={18} /> },
    { id: 'certification', name: 'Certification', icon: <ShieldCheck size={18} /> },
    { id: 'cta', name: 'CTA', icon: <MessageSquare size={18} /> },
    { id: 'footer', name: 'Footer', icon: <Type size={18} /> },
    { id: 'navbar', name: 'Navbar', icon: <Menu size={18} /> },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Ledel Admin</h2>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          {sections.map(section => (
            <NavLink 
              key={section.id} 
              to={`/admin/edit/${section.id}`} 
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              {section.icon}
              {section.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
