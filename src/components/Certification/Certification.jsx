import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

import './Certification.css';

import { useContent } from '../../hooks/useContent';

const Certification = () => {
    const { data, loading, getImageUrl } = useContent('certification');

    if (loading) return null;

    const mainTitle = data?.title || 'Official Compliance';
    const mainSubtitle = data?.description || 'Ledel Enterprises follows strict Tier-1 industrial standards and distribution protocols.';

    const defaultLogos = [
        { name: 'TUV SUD', id: 'TUV' },
        { name: 'MNRE INDIA', id: 'MNRE' },
        { name: 'BIS CERTIFIED', id: 'BIS' },
        { name: 'ISO 9001', id: 'ISO' },
        { name: 'CE EUROPE', id: 'CE' },
        { name: 'RoHS COMPLIANT', id: 'RoHS' },
        { name: 'BUREAU VERITAS', id: 'BV' },
    ];

    const displayLogos = (data?.cards || []).length > 0 ? data.cards.map(c => ({
        name: c.title || 'Certification',
        image: getImageUrl(c.image)
    })) : defaultLogos;

    return (
        <section className="cert-section section-padding">
            <div className="cert-intro text-center">
                <h2 className="title-large">
                    {mainTitle.includes(' ') ? mainTitle.split(' ').slice(0, -1).join(' ') : mainTitle} 
                    {' '}
                    <span className="gradient-text">{mainTitle.includes(' ') ? mainTitle.split(' ').slice(-1) : ''}</span>
                </h2>
                <p className="cert-text">{mainSubtitle}</p>
            </div>

            <div className="cert-marquee-container">
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    freeMode={true}
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    speed={3000}
                    modules={[Autoplay, FreeMode]}
                    className="cert-swiper"
                >
                    {displayLogos.map((logo, i) => (
                        <SwiperSlide key={i} className="cert-logo-slide">
                            <div className="cert-logo-box glass-morphism">
                                {logo.image ? (
                                    <img src={logo.image} alt={logo.name} style={{ height: '40px', maxWidth: '140px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
                                ) : (
                                    <span className="logo-name">{logo.name}</span>
                                )}
                                <div className="box-glow"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Certification;
