import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper/modules';
import { Lightbulb, Video, Cpu, Zap, Shield, ArrowRight, Activity, Globe } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Services.css';

const services = [
    {
        id: '01',
        title: 'Adaptive LED Networks',
        tagline: 'Precision Illumination',
        description: 'High-efficiency industrial lighting with automated spectrum tuning and load balancing.',
        icon: <Lightbulb size={35} />,
        color: '#02C39A',
        specs: ['90% Energy ROI', 'Mesh Ready', 'AI Dimming']
    },
    {
        id: '02',
        title: 'Autonomous Surveillance',
        tagline: 'Visual Intelligence',
        description: 'Neural object tracking and thermal analytics for high-security enterprise perimeters.',
        icon: <Video size={35} />,
        color: '#00A896',
        specs: ['4K Edge Compute', 'Face Sync', '360° LiDAR']
    },
    {
        id: '03',
        title: 'AI Industrial Control',
        tagline: 'Operational Sync',
        description: 'Cloud-native SCADA systems providing digital twin synchronization for robotics.',
        icon: <Cpu size={35} />,
        color: '#028090',
        specs: ['Zero Latency', 'PLC Integration', 'Cloud Ops']
    },
    {
        id: '04',
        title: 'Precision Solar Grids',
        tagline: 'Power Evolution',
        description: 'Intelligent PV module management with predictive storage and peak-shaving logic.',
        icon: <Zap size={35} />,
        color: '#70e000',
        specs: ['Smart Feed-in', 'LiFePO4 Sync', 'Max ROI']
    }
];

const Services = () => {
    return (
        <section id="services" className="services-unique-carousel section-padding">
            <div className="section-head text-center">
                <span className="accent-tag">Service Architecture</span>
                <h2 className="title-large">Core <span className="gradient-text">Technologies</span></h2>
                <p className="lead-text">Strategic engineering for the next generation of industrial infrastructure.</p>
            </div>

            <div className="carousel-container-modern">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    loopedSlides={4}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                    className="unique-tech-swiper"
                >
                    {[...services, ...services].map((s, i) => (
                        <SwiperSlide key={i} className="tech-slide-v2">
                            <div className="tech-glass-panel" style={{ '--panel-color': s.color }}>
                                <div className="panel-header">
                                    <div className="panel-id">NODE_{s.id}</div>
                                    <div className="panel-icon-wrap">
                                        {s.icon}
                                    </div>
                                </div>

                                <div className="panel-content">
                                    <span className="panel-tag">{s.tagline}</span>
                                    <h3 className="panel-title">{s.title}</h3>
                                    <p className="panel-desc">{s.description}</p>

                                    <div className="panel-specs-grid">
                                        {s.specs.map((spec, idx) => (
                                            <div key={idx} className="spec-pill">
                                                <Activity size={12} />
                                                <span>{spec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="panel-footer">
                                    <button className="btn-panel-action">
                                        Initialize Setup
                                        <ArrowRight size={18} />
                                    </button>
                                    <div className="panel-status">
                                        <Globe size={14} />
                                        Ready
                                    </div>
                                </div>

                                <div className="panel-glow-effect"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Services;
