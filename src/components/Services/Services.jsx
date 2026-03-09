import React from 'react';
import './Services.css';

const services = [
    {
        id: '01',
        title: 'Adaptive LED Networks',
        tagline: 'Precision Illumination',
        description: 'Dynamic lighting architectures that respond to environmental flux and occupancy patterns.',
        features: ['Real-time Load Balancing', 'Bio-centric Tuning', 'Lidar-assisted Coverage'],
        icon: '💡'
    },
    {
        id: '02',
        title: 'Autonomous Surveillance',
        tagline: 'Visual Intelligence',
        description: 'Neural-network powered monitoring systems with edge-computing capabilities for zero-latency detection.',
        features: ['Object Class Recognition', 'Thermal Signal Analysis', 'Ghost-Node Security'],
        icon: '📹',
        image: '/security.png'
    },
    {
        id: '03',
        title: 'AI Industrial Control',
        tagline: 'Operational Sync',
        description: 'Cloud-native SCADA ecosystems designed for the next era of industrial automation.',
        features: ['Predictive Failure Models', 'Digital Twin Sync', 'Energy Optimization AI'],
        icon: '⚙️',
        image: '/integration.png'
    }
];

const Services = () => {
    return (
        <section id="services" className="services-modern section-padding">
            <div className="section-head">
                <span className="accent-tag">The Ecosystem</span>
                <h2 className="title-large">Core <span className="gradient-text">Technologies</span></h2>
            </div>

            <div className="services-layout">
                {services.map((s) => (
                    <div key={s.id} className="service-node glass-morphism">
                        <div className="node-head">
                            <span className="node-id">{s.id}</span>
                            <span className="node-icon">{s.icon}</span>
                        </div>

                        <div className="node-body">
                            <span className="node-tag">{s.tagline}</span>
                            <h3 className="node-title">{s.title}</h3>
                            <p className="node-desc">{s.description}</p>

                            <ul className="node-features">
                                {s.features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </div>

                        {s.image && (
                            <div className="node-visual">
                                <img src={s.image} alt={s.title} />
                            </div>
                        )}

                        <button className="node-link">
                            Explore Blueprint
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M7 17l9.2-9.2M17 17V7H7" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
