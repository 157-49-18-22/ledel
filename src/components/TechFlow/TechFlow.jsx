import React from 'react';
import { Database, Cpu, Share2, Activity, ArrowRight, Binary, Settings } from 'lucide-react';
import './TechFlow.css';

import { useContent } from '../../hooks/useContent';

const TechFlow = () => {
    const { data, loading, getImageUrl } = useContent('techflow');

    if (loading) return null;

    const mainTitle = data?.title || 'The Engineering Synchronization Flow';
    const mainSubtitle = data?.description || "We don't just manufacture hardware; we architect intelligent pipelines that optimize the path from data capture to autonomous grid response.";
    const badgeText = data?.badge || 'Industrial Protocol V4.2';

    const defaultPipeline = [
        {
            id: '01',
            title: 'Data Acquisition',
            label: 'Edge Sensors',
            desc: 'Multi-modal hardware capturing environmental flux and high-fidelity video streams.',
            icon: <Database size={24} />
        },
        {
            id: '02',
            title: 'Neural Synthesis',
            label: 'Edge Compute',
            desc: 'Real-time object classification and data compression via local neural processing chips.',
            icon: <Cpu size={24} />
        },
        {
            id: '03',
            title: 'Grid Integration',
            label: 'Cloud Uplink',
            desc: 'Seamless synchronization with centralized SCADA and smart city management protocols.',
            icon: <Share2 size={24} />
        },
        {
            id: '04',
            title: 'Autonomous Logic',
            label: 'Optimization',
            desc: 'Closed-loop feedback systems adjusting hardware output based on AI-driven analytics.',
            icon: <Settings size={24} />
        }
    ];

    const pipeline = (data?.cards || []).length > 0 ? data.cards.map((c, i) => ({
        id: (i + 1).toString().padStart(2, '0'),
        title: c.title || 'New Step',
        label: c.category || 'Pipeline Node',
        desc: c.description || '',
        image: getImageUrl(c.image),
        icon: i === 0 ? <Database size={24} /> : i === 1 ? <Cpu size={24} /> : i === 2 ? <Share2 size={24} /> : <Settings size={24} />
    })) : defaultPipeline;

    return (
        <section id="tech-flow" className="tech-pipeline-section section-padding">
            <div className="pipeline-bg-effects">
                <div className="p-glow g-top"></div>
                <div className="p-glow g-bottom"></div>
            </div>

            <div className="container">
                <div className="pipeline-intro">
                    <div className="p-badge">
                        <Binary size={14} />
                        <span>{badgeText}</span>
                    </div>
                    <h2 className="title-large" dangerouslySetInnerHTML={{ __html: mainTitle.includes(' ') ? `${mainTitle.split(' ').slice(0, -2).join(' ')} <br /><span className="gradient-text">${mainTitle.split(' ').slice(-2).join(' ')}</span>` : mainTitle }}></h2>
                    <p className="lead-text">{mainSubtitle}</p>
                </div>

                <div className="pipeline-visual">
                    <div className="pipeline-line-deco">
                        <div className="flow-particle p1"></div>
                        <div className="flow-particle p2"></div>
                        <div className="flow-particle p3"></div>
                    </div>

                    <div className="pipeline-grid">
                        {pipeline.map((step, i) => (
                            <div key={i} className="pipeline-node">
                                <div className="node-connector-line"></div>
                                <div className="node-box glass-morphism">
                                    <div className="node-header">
                                        <span className="node-id">{step.id}</span>
                                        <div className="node-icon-circle">
                                            {step.image ? <img src={step.image} alt={step.title} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : step.icon}
                                        </div>
                                    </div>
                                    <div className="node-body">
                                        <span className="node-label">{step.label}</span>
                                        <h3 className="node-title">{step.title}</h3>
                                        <p className="node-desc">{step.desc}</p>
                                    </div>
                                    <div className="node-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pipeline-output-card glass-morphism">
                    <div className="output-top">
                        <Activity className="text-accent" />
                        <span>Live System Output</span>
                    </div>
                    <div className="output-content">
                        <div className="o-metric">
                            <span className="o-l">Network Latency</span>
                            <span className="o-v">3.8ms</span>
                        </div>
                        <div className="o-metric">
                            <span className="o-l">Sync Accuracy</span>
                            <span className="o-v">99.8%</span>
                        </div>
                        <div className="o-metric">
                            <span className="o-l">Edge Uplink</span>
                            <span className="o-v">Stable</span>
                        </div>
                    </div>
                    <div className="scanning-bar"></div>
                </div>
            </div>
        </section>
    );
};

export default TechFlow;
