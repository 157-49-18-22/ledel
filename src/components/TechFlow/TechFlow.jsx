import React from 'react';
import './TechFlow.css';

const TechFlow = () => {
    return (
        <section className="tech-flow section-padding">
            <div className="flow-container glass-morphism">
                <div className="flow-content">
                    <span className="accent-tag">Engineering Logic</span>
                    <h2 className="title-large">From <span className="gradient-text">Concept to Grid</span></h2>
                    <p className="flow-text">
                        Our systems aren't just products; they are part of a closed-loop engineering ecosystem.
                        We optimize every stage—from capture to utilization—ensuring maximum technical efficiency.
                    </p>

                    <div className="flow-steps">
                        <div className="step">
                            <span className="step-num">01</span>
                            <h4>Data Capture</h4>
                        </div>
                        <div className="step">
                            <span className="step-num">02</span>
                            <h4>Precision Compression</h4>
                        </div>
                        <div className="step">
                            <span className="step-num">03</span>
                            <h4>Grid Integration</h4>
                        </div>
                    </div>
                </div>

                <div className="flow-visual">
                    <img src="/WhatsApp Image 2026-03-09 at 11.09.20 AM.jpeg" alt="Technical Flow" />
                    <div className="visual-overlay"></div>
                </div>
            </div>
        </section>
    );
};

export default TechFlow;
