import React from 'react';
import './Industries.css';

const industries = [
    { name: 'Renewable Hubs', icon: '🔋', color: '#02C39A' },
    { name: 'Smart Urbanism', icon: '🏙️', color: '#00A896' },
    { name: 'Industrial Heavy', icon: '🏭', color: '#028090' },
    { name: 'Logistics 4.0', icon: '📦', color: '#70e000' },
    { name: 'Health Systems', icon: '🏥', color: '#00b4d8' },
    { name: 'Data Centers', icon: '💾', color: '#caf0f8' }
];

const Industries = () => {
    return (
        <section id="industries" className="industries-premium section-padding">
            <div className="industries-container-modern">
                <div className="side-label">Sector Integration</div>

                <div className="industries-content">
                    <h2 className="title-large">Global <span className="gradient-text">Impact</span></h2>
                    <p className="industries-lead">
                        We deploy scalable hardware-software matrices across critical sectors,
                        optimizing energy and security throughput.
                    </p>

                    <div className="industries-matrix">
                        {industries.map((ind, i) => (
                            <div key={i} className="ind-cell glass-morphism">
                                <span className="ind-icon">{ind.icon}</span>
                                <span className="ind-name">{ind.name}</span>
                                <div className="ind-glow" style={{ background: ind.color }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Industries;
