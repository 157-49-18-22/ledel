import React from 'react';
import { Send, Calendar, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useContent } from '../../hooks/useContent';
import './CTA.css';

const CTA = () => {
    const { data, loading } = useContent('cta');

    if (loading) return null;

    const title = data?.title || "Let's Engineer the Next Industrial Era";
    const subtitle = data?.description || "Secure your hardware-software matrix with Ledel's Tier-1 industrial ecosystem. Scaling precision for the world's most critical infrastructures.";
    const btn1 = data?.btn1 || "Initialize Project";
    const btn2 = data?.btn2 || "Technical Roadmap";
    const badgeText = data?.badge || "Global Infrastructure Node";
    const foot1 = data?.foot1 || "ISO 9001:2015 Verified Operations";
    const foot2 = data?.foot2 || "High-Density Rapid Deployment";

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
                            <span>{badgeText}</span>
                        </div>
                    </div>

                    <h2 className="portal-title">
                        {title.includes('Next') ? (
                            <>
                                {title.split('Next')[0]} <br />
                                <span className="text-reveal">Next {title.split('Next')[1]}</span>
                            </>
                        ) : title}
                    </h2>

                    <p className="portal-subtitle">
                        {subtitle}
                    </p>

                    <div className="portal-actions">
                        <button className="btn-portal-primary">
                            <span className="btn-text">{btn1}</span>
                            <div className="btn-icon">
                                <Send size={20} />
                            </div>
                        </button>
                        <button className="btn-portal-secondary">
                            <Calendar size={20} />
                            <span>{btn2}</span>
                            <ArrowRight size={16} className="arrow-move" />
                        </button>
                    </div>

                    <div className="portal-footer">
                        <div className="trust-signature">
                            <ShieldCheck size={16} />
                            <span>{foot1}</span>
                        </div>
                        <div className="f-divider"></div>
                        <div className="trust-signature">
                            <Zap size={16} />
                            <span>{foot2}</span>
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
