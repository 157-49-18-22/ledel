import React from 'react';
import { ShieldCheck, Zap, Thermometer, Droplets, Activity, Gauge, Cpu, Binary } from 'lucide-react';
import './QualitySection.css';

const QualitySection = () => {
    const metrics = [
        {
            title: 'Thermal Resilience',
            value: '+85°C/-40°C',
            icon: <Thermometer size={28} />,
            color: 'rgb(255, 77, 77)',
            shortDesc: 'Continuous Cycle'
        },
        {
            title: 'Submersion Grade',
            value: 'IP68 GOLD',
            icon: <Droplets size={28} />,
            color: 'rgb(0, 212, 255)',
            shortDesc: '24H Underwater'
        },
        {
            title: 'Neural Response',
            value: '3.2 ms',
            icon: <Binary size={28} />,
            color: 'rgb(2, 195, 154)',
            shortDesc: 'Edge-Synced'
        }
    ];

    return (
        <section id="quality" className="quality-v2 section-padding">
            <div className="quality-backdrop">
                <div className="noise-overlay"></div>
                <div className="dynamic-glow g1"></div>
                <div className="dynamic-glow g2"></div>
            </div>

            <div className="container">
                <div className="quality-bridge-header">
                    <div className="v-marker">DEPT_QUALITY_CONTROL</div>
                    <div className="main-info">
                        <span className="p-tag">Precision Standards</span>
                        <h2 className="title-large">Certified For <span className="gradient-text">Zero-Failure</span> Scenarios</h2>
                    </div>
                </div>

                <div className="quality-dashboard-grid">
                    {/* LEFT PANEL: REAL-TIME MONITOR */}
                    <div className="monitor-panel">
                        <div className="monitor-frame">
                            <div className="monitor-header">
                                <div className="m-title">
                                    <Activity size={16} className="pulse-icon" />
                                    <span>HARDWARE_SYNCHRONIZER_A1</span>
                                </div>
                                <div className="m-status">LOGGING_ACTIVE</div>
                            </div>

                            <div className="monitor-body">
                                <div className="radar-orbit">
                                    <div className="radar-circle"></div>
                                    <div className="radar-sweep"></div>
                                    <Gauge size={40} className="center-gauge" />
                                </div>

                                <div className="live-data-stream">
                                    <div className="data-bit"><span>Uptime:</span> <span className="v">99.999%</span></div>
                                    <div className="data-bit"><span>Load:</span> <span className="v">Optimum</span></div>
                                    <div className="data-bit"><span>Sync:</span> <span className="v">Locked</span></div>
                                </div>
                            </div>

                            <div className="terminal-feed">
                                <p>&gt; Checking Ingress Integrity...</p>
                                <p className="success">&gt; IP68 Sealing: PASSED</p>
                                <p>&gt; Thermal Stress Test @ 85°C...</p>
                                <p className="success">&gt; Core Stability: NOMINAL</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: SPEC CARDS */}
                    <div className="specs-stack">
                        {metrics.map((m, i) => (
                            <div key={i} className="quality-spec-node" style={{ '--accent-glow': m.color }}>
                                <div className="node-icon-hex" style={{ backgroundColor: m.color }}>
                                    {m.icon}
                                </div>
                                <div className="node-info">
                                    <span className="n-label">{m.shortDesc}</span>
                                    <h3 className="n-title">{m.title}</h3>
                                    <div className="n-value-row">
                                        <div className="n-progress">
                                            <div className="n-fill"></div>
                                        </div>
                                        <span className="n-v-text">{m.value}</span>
                                    </div>
                                </div>
                                <div className="node-scan-line"></div>
                            </div>
                        ))}

                        <div className="quality-cert-footer">
                            <div className="cert-item"><ShieldCheck size={18} /> <span>CE_COMPLIANT</span></div>
                            <div className="cert-item"><Cpu size={18} /> <span>ROHS_2.0</span></div>
                            <div className="cert-item"><Activity size={18} /> <span>ISO_9001</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualitySection;
