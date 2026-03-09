import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Zap, Activity, MousePointer2 } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="hero-premium">
            <div className="hero-bg-wrapper">
                <img
                    src="/hero-bg.png"
                    alt="Technical Background"
                    style={{ transform: `scale(${1 + scrolled * 0.0005}) translateY(${scrolled * 0.2}px)` }}
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content-modern">
                <div className="hero-badge">
                    <span className="pulse"></span>
                    Next-Gen Infrastructure Solutions
                </div>

                <h1 className="hero-title">
                    <span className="line">Empowering the</span>
                    <span className="line gradient-text">Modern Ecosystem</span>
                </h1>

                <p className="hero-description">
                    Ledel Enterprises integrates advanced LED architectures, autonomous security networks,
                    and cloud-driven industrial intelligence. We don't just build; we simulate the future.
                </p>

                <div className="hero-action-group">
                    <button className="btn-primary-glow">
                        Initialize Project
                        <ArrowRight size={20} />
                    </button>
                    <button className="btn-secondary-outline">
                        Technical Ecosystem
                    </button>
                </div>

                <div className="hero-metrics">
                    <div className="metric">
                        <Calendar className="metric-icon" size={24} />
                        <span className="metric-val">15+</span>
                        <span className="metric-label">Years R&D</span>
                    </div>
                    <div className="metric-divider"></div>
                    <div className="metric">
                        <Zap className="metric-icon" size={24} />
                        <span className="metric-val">500+</span>
                        <span className="metric-label">Smart Nodes</span>
                    </div>
                    <div className="metric-divider"></div>
                    <div className="metric">
                        <Activity className="metric-icon" size={24} />
                        <span className="metric-val">99.9%</span>
                        <span className="metric-label">Uptime</span>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
