import React from 'react';
import { Send, Calendar, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta-portal-section">
            <div className="portal-atmosphere">
                <div className="portal-grid"></div>
                <div className="glow-sphere s1"></div>
                <div className="glow-sphere s2"></div>
            </div>

            <div className="container">
                <div className="portal-content-box">
                    <div className="portal-header">
                        <div className="status-badge">
                            <Globe size={14} className="spin-slow" />
                            <span>Global Infrastructure Node</span>
                        </div>
                    </div>

                    <h2 className="portal-title">
                        Let's Engineer the <br />
                        <span className="text-reveal">Next Industrial Era</span>
                    </h2>

                    <p className="portal-subtitle">
                        Secure your hardware-software matrix with Ledel's Tier-1 industrial ecosystem.
                        Scaling precision for the world's most critical infrastructures.
                    </p>

                    <div className="portal-actions">
                        <button className="btn-portal-primary">
                            <span className="btn-text">Initialize Project</span>
                            <div className="btn-icon">
                                <Send size={20} />
                            </div>
                        </button>
                        <button className="btn-portal-secondary">
                            <Calendar size={20} />
                            <span>Technical Roadmap</span>
                            <ArrowRight size={16} className="arrow-move" />
                        </button>
                    </div>

                    <div className="portal-footer">
                        <div className="trust-signature">
                            <ShieldCheck size={16} />
                            <span>ISO 9001:2015 Verified Operations</span>
                        </div>
                        <div className="f-divider"></div>
                        <div className="trust-signature">
                            <Zap size={16} />
                            <span>High-Density Rapid Deployment</span>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="corner-bracket top-left"></div>
                    <div className="corner-bracket top-right"></div>
                    <div className="corner-bracket bottom-left"></div>
                    <div className="corner-bracket bottom-right"></div>
                    <div className="scanner-beam"></div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
