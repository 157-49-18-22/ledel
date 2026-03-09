import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

import './Certification.css';

const partnerLogos = [
    { name: 'TUV SUD', id: 'TUV' },
    { name: 'MNRE INDIA', id: 'MNRE' },
    { name: 'BIS CERTIFIED', id: 'BIS' },
    { name: 'ISO 9001', id: 'ISO' },
    { name: 'CE EUROPE', id: 'CE' },
    { name: 'RoHS COMPLIANT', id: 'RoHS' },
    { name: 'BUREAU VERITAS', id: 'BV' },
];

const Certification = () => {
    return (
        <section className="cert-section section-padding">
            <div className="cert-intro text-center">
                <h2 className="title-large">Official <span className="gradient-text">Compliance</span></h2>
                <p className="cert-text">Ledel Enterprises follows strict Tier-1 industrial standards and distribution protocols.</p>
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
                    {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                        <SwiperSlide key={i} className="cert-logo-slide">
                            <div className="cert-logo-box glass-morphism">
                                <span className="logo-name">{logo.name}</span>
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
