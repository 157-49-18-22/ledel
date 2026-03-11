import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Zap, Activity, MousePointer2 } from 'lucide-react';
import { useContent } from '../../hooks/useContent';
import './Hero.css';

const Hero = () => {
    const [scrolled, setScrolled] = useState(0);
    const { data, loading, getImageUrl } = useContent('hero');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) return <div className="hero-loading">Loading...</div>;

    // Use fetched data or fallbacks
    const title = data?.title || 'Empowering the Modern Ecosystem';
    const description = data?.description || "Ledel Enterprises integrates advanced LED architectures, autonomous security networks, and cloud-driven industrial intelligence. We don't just build; we simulate the future.";
    const badge = data?.badge || 'Next-Gen Infrastructure Solutions';
    const bgImage = getImageUrl(data?.image) || '/hero-bg-v4.png';
    const cards = data?.cards || [
        { label: 'Years R&D', value: '15+', icon: <Calendar className="metric-icon" size={24} /> },
        { label: 'Smart Nodes', value: '500+', icon: <Zap className="metric-icon" size={24} /> },
        { label: 'Uptime', value: '99.9%', icon: <Activity className="metric-icon" size={24} /> },
    ];

    return (
        <section className="hero-premium">
            <div className="hero-bg-wrapper">
                <img
                    src={bgImage}
                    alt="Technical Background"
                    style={{ transform: `scale(${1 + scrolled * 0.0005}) translateY(${scrolled * 0.2}px)` }}
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content-modern">
                <div className="hero-badge">
                    <span className="pulse"></span>
                    {badge}
                </div>

                <h1 className="hero-title">
                    <span className="line">{title.includes(' ') ? title.split(' ').slice(0, 2).join(' ') : title}</span>
                    <span className="line gradient-text">{title.includes(' ') ? title.split(' ').slice(2).join(' ') : ''}</span>
                </h1>

                <p className="hero-description">
                    {description}
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
                    {cards.map((metric, idx) => (
                        <React.Fragment key={idx}>
                            <div className="metric">
                                {metric.icon || <Activity className="metric-icon" size={24} />}
                                <span className="metric-val">{metric.value}</span>
                                <span className="metric-label">{metric.label}</span>
                            </div>
                            {idx < cards.length - 1 && <div className="metric-divider"></div>}
                        </React.Fragment>
                    ))}
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
