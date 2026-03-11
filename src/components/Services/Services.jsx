import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper/modules';
import { Lightbulb, Video, Cpu, Zap, Shield, ArrowRight, Activity, Globe } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Services.css';

import { useContent } from '../../hooks/useContent';

const Services = () => {
    const { data, loading, getImageUrl } = useContent('services');

    if (loading) return null;

    const mainTitle = data?.title || 'Core Technologies';
    const mainSubtitle = data?.description || 'Strategic engineering for the next generation of industrial infrastructure.';

    const defaultServices = [
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

    const displayServices = (data?.cards || []).length > 0 ? data.cards.map((s, i) => ({
        id: (i + 1).toString().padStart(2, '0'),
        title: s.title || 'New Service',
        tagline: s.category || 'Technology Node',
        description: s.description || '',
        image: getImageUrl(s.image),
        color: s.theme || (i === 0 ? '#02C39A' : i === 1 ? '#00A896' : i === 2 ? '#028090' : '#70e000'),
        specs: s.specs ? (Array.isArray(s.specs) ? s.specs : s.specs.split(',').map(sp => sp.trim())) : (s.description ? s.description.split(',').map(sp => sp.trim()) : ['Quality Service', 'Industrial Grade']),
        icon: i === 0 ? <Lightbulb size={35} /> : i === 1 ? <Video size={35} /> : i === 2 ? <Cpu size={35} /> : <Zap size={35} />
    })) : defaultServices;

    return (
        <section id="services" className="services-unique-carousel section-padding">
            <div className="section-head text-center">
                <span className="accent-tag">Service Architecture</span>
                <h2 className="title-large">
                    {mainTitle.includes(' ') ? mainTitle.split(' ').slice(0, -1).join(' ') : mainTitle} 
                    {' '}
                    <span className="gradient-text">{mainTitle.includes(' ') ? mainTitle.split(' ').slice(-1) : ''}</span>
                </h2>
                <p className="lead-text">{mainSubtitle}</p>
            </div>

            <div className="carousel-container-modern">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    loopedSlides={displayServices.length}
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
                    {displayServices.map((s, i) => (
                        <SwiperSlide key={i} className="tech-slide-v2">
                            <div className="tech-glass-panel" style={{ '--panel-color': s.color }}>
                                <div className="panel-header">
                                    <div className="panel-id">NODE_{s.id}</div>
                                    <div className="panel-icon-wrap">
                                        {s.image ? <img src={s.image} alt={s.title} style={{ width: '40px', height: '40px', objectFit: 'contain' }} /> : s.icon}
                                    </div>
                                </div>

                                <div className="panel-content">
                                    <span className="panel-tag">{s.tagline}</span>
                                    <h3 className="panel-title">{s.title}</h3>
                                    <p className="panel-desc">{s.description}</p>

                                    <div className="panel-specs-grid">
                                        {s.specs.slice(0, 3).map((spec, idx) => (
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
