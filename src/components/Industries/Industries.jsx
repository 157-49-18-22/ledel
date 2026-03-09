import React from 'react';
import { BatteryCharging, Building2, Factory, Package, Stethoscope, Database, ArrowRight, Activity, Percent, Zap } from 'lucide-react';
import './Industries.css';

const industries = [
    {
        name: 'Renewable Hubs',
        icon: <BatteryCharging size={24} />,
        color: '#02C39A',
        efficiency: 94,
        nodes: '1,240',
        image: '/WhatsApp Image 2026-03-09 at 11.09.20 AM (1).jpeg',
        tag: 'Solar Optima'
    },
    {
        name: 'Smart Urbanism',
        icon: <Building2 size={24} />,
        color: '#00A896',
        efficiency: 88,
        nodes: '5,500',
        image: '/integration.png',
        tag: 'Mesh City'
    },
    {
        name: 'Industrial Heavy',
        icon: <Factory size={24} />,
        color: '#028090',
        efficiency: 99,
        nodes: '840',
        image: '/WhatsApp Image 2026-03-09 at 11.09.21 AM.jpeg',
        tag: 'Line Control'
    },
    {
        name: 'Logistics 4.0',
        icon: <Package size={24} />,
        color: '#05668d',
        efficiency: 92,
        nodes: '2,100',
        image: '/WhatsApp Image 2026-03-09 at 11.09.20 AM.jpeg',
        tag: 'Route Neural'
    },
    {
        name: 'Critical Systems',
        icon: <Stethoscope size={24} />,
        color: '#00b4d8',
        efficiency: 100,
        nodes: '150',
        image: '/security.png',
        tag: 'Safe-Grid'
    },
    {
        name: 'Data Centers',
        icon: <Database size={24} />,
        color: '#48cae4',
        efficiency: 97,
        nodes: '420',
        image: '/WhatsApp Image 2026-03-09 at 11.09.20 AM (1).jpeg',
        tag: 'T4 Hosting'
    }
];

const Industries = () => {
    return (
        <section id="industries" className="industries-pro-section section-padding">
            <div className="section-head text-center">
                <span className="accent-tag">Global Deployment</span>
                <h2 className="title-large">Sector <span className="gradient-text">Intelligence</span></h2>
                <p className="lead-text">Real-time performance matrices across the modern industrial landscape.</p>
            </div>

            <div className="industries-bento-grid">
                {industries.map((ind, i) => (
                    <div key={i} className="sector-card-pro" style={{ '--accent': ind.color }}>
                        <div className="card-bg-image">
                            <img src={ind.image} alt={ind.name} />
                            <div className="card-overlay"></div>
                        </div>

                        <div className="card-content-wrap">
                            <div className="card-top-header">
                                <div className="sector-badge">
                                    {ind.icon}
                                    <span>{ind.tag}</span>
                                </div>
                                <div className="status-indicator">
                                    <span className="dot pulse"></span> Active
                                </div>
                            </div>

                            <div className="card-main-title">
                                <h3 className="industry-name">{ind.name}</h3>
                                <p className="industry-brief">Optimizing infrastructure with hardware-software synchronization.</p>
                            </div>

                            <div className="industry-stats-bar">
                                <div className="stat-unit">
                                    <div className="stat-label">Efficiency</div>
                                    <div className="stat-value-row">
                                        <span className="stat-v">{ind.efficiency}</span>
                                        <Percent size={14} />
                                    </div>
                                    <div className="stat-progress-bg">
                                        <div className="stat-progress-fill" style={{ width: `${ind.efficiency}%` }}></div>
                                    </div>
                                </div>
                                <div className="stat-unit">
                                    <div className="stat-label">Smart Nodes</div>
                                    <div className="stat-v">{ind.nodes}</div>
                                </div>
                            </div>

                            <div className="card-bottom-actions">
                                <button className="btn-explore-sector">
                                    Live Matrix
                                    <ArrowRight size={18} />
                                </button>
                                <div className="power-draw">
                                    <Zap size={14} />
                                    <span>Optimal ROI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Industries;
