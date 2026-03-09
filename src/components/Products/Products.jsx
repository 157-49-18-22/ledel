import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Navigation } from 'swiper/modules';
import { Plus, Download, ShoppingCart, Info, ArrowRight, Rotate3d } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

import './Products.css';

const products = [
    {
        name: 'Industrial High-Bay LED',
        category: 'LED Luminaries',
        price: 'Enquire for Price',
        image: '/WhatsApp Image 2026-03-09 at 11.09.21 AM.jpeg',
        specs: ['IP66 Rated', '200W Output', '50,000 hrs Life'],
        theme: '#02C39A'
    },
    {
        name: 'Autonomous Solar Street Light',
        category: 'Solar Solutions',
        price: 'Enquire for Price',
        image: '/integration.png',
        specs: ['Smart Motion Sensor', 'LiFePO4 Battery', 'Auto Dusk-to-Dawn'],
        theme: '#00A896'
    },
    {
        name: 'Neural CCTV Node 4K',
        category: 'Surveillance',
        price: 'Enquire for Price',
        image: '/security.png',
        specs: ['AI Object Tracking', 'Night Vision Pro', 'Edge Storage'],
        theme: '#028090'
    },
    {
        name: 'Solar PV Module 550W',
        category: 'Solar Panels',
        price: 'Enquire for Price',
        image: '/WhatsApp Image 2026-03-09 at 11.09.20 AM (1).jpeg',
        specs: ['Monocrystalline', 'High Efficiency', '25yr Warranty'],
        theme: '#70e000'
    }
];

const Products = () => {
    const [isViewing360, setIsViewing360] = React.useState(false);

    return (
        <section id="products" className={`products-premium section-padding ${isViewing360 ? 'mode-grid-active' : ''}`}>
            <div className="section-head text-center">
                <span className="accent-tag">Hardware Collection</span>
                <h2 className="title-large">Industrial <span className="gradient-text">Inventory</span></h2>
                <p className="lead-text">Precision-engineered hardware for large-scale infrastructure deployment.</p>
            </div>

            <div className="discovery-engine">
                {!isViewing360 && (
                    <div className="engine-left">
                        <div className="stat-pill glass-morphism">
                            <span className="stat-n">2k+</span>
                            <span className="stat-t">Units Shipped</span>
                        </div>
                        <h3 className="engine-title">The Hardware <br /> Stack</h3>
                        <p className="engine-desc">Browse our core catalogue of enterprise gear. Every product is synchronized with our cloud ecosystem.</p>

                        <div className="engine-features">
                            <div className="ef-item">
                                <div className="ef-icon"><Info size={16} /></div>
                                <span>Real-time Stock Tracking</span>
                            </div>
                            <div className="ef-item">
                                <div className="ef-icon"><ShoppingCart size={16} /></div>
                                <span>Volume Pricing Available</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`engine-right ${isViewing360 ? 'grid-spread' : ''}`}>
                    {!isViewing360 ? (
                        <>
                            <Swiper
                                effect={'cards'}
                                grabCursor={true}
                                modules={[EffectCards, Autoplay, Navigation]}
                                className="product-cards-swiper"
                                autoplay={{ delay: 3500 }}
                                navigation={true}
                            >
                                {products.map((p, i) => (
                                    <SwiperSlide key={i} className="p-card-slide">
                                        <div className="p-card-content" style={{ '--p-theme': p.theme }}>
                                            <div className="p-card-top">
                                                <img src={p.image} alt={p.name} />
                                                <div className="p-cat">{p.category}</div>
                                            </div>
                                            <div className="p-card-body">
                                                <h4 className="p-name">{p.name}</h4>
                                                <div className="p-specs-row">
                                                    {p.specs.map((s, idx) => (
                                                        <span key={idx} className="p-s-tag">{s}</span>
                                                    ))}
                                                </div>
                                                <div className="p-card-footer">
                                                    <span className="p-price">{p.price}</span>
                                                    <button className="p-btn-quote">
                                                        Request Quote
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="discovery-footer">
                                <p className="discovery-hint">Maximize visibility to explore the full architectural matrix</p>
                                <button
                                    className="btn-grid-vision"
                                    onClick={() => setIsViewing360(true)}
                                >
                                    <Rotate3d size={18} />
                                    <span>Expand All Hardware (360°)</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="inventory-full-grid-wrapper">
                            <div className="grid-control">
                                <button className="btn-exit-grid" onClick={() => setIsViewing360(false)}>
                                    <ArrowRight size={18} className="rotate-180" />
                                    <span>Back to Focus View</span>
                                </button>
                            </div>
                            <div className="inventory-full-grid">
                                {products.map((p, i) => (
                                    <div key={i} className="grid-item-tech glass-morphism" style={{ '--p-theme': p.theme }}>
                                        <div className="g-img">
                                            <img src={p.image} alt={p.name} />
                                            <div className="g-badge">{p.category}</div>
                                        </div>
                                        <div className="g-info">
                                            <h4>{p.name}</h4>
                                            <div className="g-specs">
                                                {p.specs.slice(0, 2).map((s, idx) => (
                                                    <span key={idx}>{s}</span>
                                                ))}
                                            </div>
                                            <button className="g-btn">Details <Plus size={14} /></button>
                                        </div>
                                        <div className="g-corner"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="technical-archive-vault glass-morphism">
                <div className="vault-left">
                    <div className="vault-icon-box">
                        <Download size={32} className="vault-main-icon" />
                        <div className="icon-pulse"></div>
                    </div>
                    <div className="vault-text">
                        <span className="v-tag">Central Repository</span>
                        <h4 className="v-title">2026 Technical Archive</h4>
                        <p className="v-desc">Access encrypted datasheets, CAD blueprints, and compliance certifications for our entire hardware ecosystem.</p>
                    </div>
                </div>

                <div className="vault-metrics">
                    <div className="v-m-item">
                        <span className="count">48+</span>
                        <span className="label">Datasheets</span>
                    </div>
                    <div className="v-divider"></div>
                    <div className="v-m-item">
                        <span className="count">12+</span>
                        <span className="label">CAD Models</span>
                    </div>
                </div>

                <button className="v-download-btn">
                    <span>Initialize Bulk Download</span>
                    <ArrowRight size={20} />
                </button>

                <div className="vault-scanner-beam"></div>
            </div>
        </section>
    );
};

export default Products;
