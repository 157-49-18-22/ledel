import React from 'react';
import './QualitySection.css';

const QualitySection = () => {
    const qualities = [
        {
            title: 'Industrial Durability',
            desc: 'All hardware is tested for IP66-IP68 resistance, ensuring performance in extreme climates.',
            icon: '🛡️'
        },
        {
            title: 'Zero Latency',
            desc: 'Edge-computing nodes in our CCTV systems ensure real-time threat detection without lag.',
            icon: '⚡'
        },
        {
            title: 'Energy ROI',
            desc: 'Our LED and Solar grids typically pay for themselves within 18-24 months of deployment.',
            icon: '📈'
        }
    ];

    return (
        <section className="quality-section section-padding">
            <div className="quality-wrapper">
                <div className="quality-grid">
                    {qualities.map((q, i) => (
                        <div key={i} className="quality-card glass-morphism">
                            <div className="q-icon">{q.icon}</div>
                            <h3 className="q-title font-heading">{q.title}</h3>
                            <p className="q-desc">{q.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="quality-visual">
                    <div className="blueprint-overlay">
                        <h2 className="title-large">Engineered <br /><span className="gradient-text">Without Compromise</span></h2>
                        <p className="lead-text">Every unit of Ledel hardware undergoes 48 hours of stress testing before leaving our facility.</p>
                        <div className="quality-badges">
                            <span className="q-badge">ISO 9001:2015</span>
                            <span className="q-badge">CE Certified</span>
                            <span className="q-badge">RoHS Compliant</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualitySection;
