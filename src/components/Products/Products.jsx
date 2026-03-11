import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay, Navigation } from 'swiper/modules';
import { Plus, Download, ShoppingCart, Info, ArrowRight, Rotate3d } from 'lucide-react';
import { useContent } from '../../hooks/useContent';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

import './Products.css';

const Products = () => {
    const [isViewing360, setIsViewing360] = React.useState(false);
    const { data, loading, getImageUrl } = useContent('products');

    if (loading) return null;

    const mainTitle = data?.title || 'Industrial Inventory';
    const mainSubtitle = data?.description || 'Precision-engineered hardware for large-scale infrastructure deployment.';
    
    // Dynamic sidebar titles
    const stackTitle = data?.stackTitle || 'The Hardware Stack';
    const stackDesc = data?.stackDesc || 'Browse our core catalogue of enterprise gear. Every product is synchronized with our cloud ecosystem.';

    // Default products if none in backend
    const displayProducts = (data?.cards || []).length > 0 ? (data.cards.map(p => ({
        name: p.title || 'New Product',
        category: p.category || 'Product Category',
        price: p.price || 'Enquire for Price',
        image: getImageUrl(p.image) || '/placeholder.png',
        theme: p.theme || '#02C39A',
        specs: p.specs ? (Array.isArray(p.specs) ? p.specs : p.specs.split(',').map(s => s.trim())) : (p.description ? p.description.split(',').map(s => s.trim()) : ['High Quality', 'Industrial Grade'])
    }))) : [
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
        }
    ];

    return (
        <section id="products" className={`products-premium section-padding ${isViewing360 ? 'mode-grid-active' : ''}`}>
            {/* Background Decorations */}
            <div className="products-premium-glow-1"></div>
            <div className="products-premium-glow-2"></div>

            <div className="section-head text-center">
                <div className="accent-tag-container">
                    <span className="accent-tag">Hardware Collection</span>
                </div>
                <h2 className="title-large">
                    {mainTitle.includes(' ') ? mainTitle.split(' ').slice(0, -1).join(' ') : mainTitle} 
                    {' '}
                    <span className="gradient-text">{mainTitle.includes(' ') ? mainTitle.split(' ').slice(-1) : ''}</span>
                </h2>
                <p className="lead-text">{mainSubtitle}</p>
            </div>

            <div className="discovery-engine">
                {!isViewing360 && (
                    <div className="engine-left">
                        <div className="stat-pill">
                            <span className="stat-n">2k+</span>
                            <span className="stat-t">Units Shipped</span>
                        </div>
                        
                        {(data?.sidebarCards && data.sidebarCards.length > 0) ? (
                            data.sidebarCards.slice(0, 1).map((sc, idx) => (
                                <div key={idx} className="sidebar-custom-card">
                                    <h3 className="engine-title" dangerouslySetInnerHTML={{ __html: (sc.title || '').replace('Hardware', 'Hardware <br />') }}></h3>
                                    <p className="engine-desc">{sc.description}</p>
                                </div>
                            ))
                        ) : (
                            <>
                                <h3 className="engine-title" dangerouslySetInnerHTML={{ __html: stackTitle.replace('Hardware', 'Hardware <br />') }}></h3>
                                <p className="engine-desc">{stackDesc}</p>
                            </>
                        )}

                        <div className="engine-features">
                            <div className="ef-item">
                                <div className="ef-icon"><Info size={16} /></div>
                                <span>Real-time Tracking</span>
                            </div>
                            <div className="ef-item">
                                <div className="ef-icon"><ShoppingCart size={16} /></div>
                                <span>Volume Pricing</span>
                            </div>
                            <div className="ef-item">
                                <div className="ef-icon"><Rotate3d size={16} /></div>
                                <span>360° Inspection</span>
                            </div>
                            <div className="ef-item">
                                <div className="ef-icon"><Plus size={16} /></div>
                                <span>Global Logistics</span>
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
                                autoplay={{ delay: 4000, disableOnInteraction: false }}
                                navigation={true}
                                speed={800}
                            >
                                {displayProducts.map((p, i) => (
                                    <SwiperSlide key={i} className="p-card-slide">
                                        <div className="p-card-content" style={{ '--p-theme': p.theme }}>
                                            <div className="p-card-top">
                                                <img src={p.image} alt={p.name} />
                                                <div className="p-cat">{p.category}</div>
                                                {i === 0 && <div className="p-featured-badge">Featured</div>}
                                            </div>
                                            <div className="p-card-body">
                                                <h4 className="p-name">{p.name}</h4>
                                                <div className="p-specs-row">
                                                    {p.specs.map((s, idx) => (
                                                        <span key={idx} className="p-s-tag">{s}</span>
                                                    ))}
                                                </div>
                                                <div className="p-card-footer">
                                                    <div className="p-price-box">
                                                        <span className="p-price-label">Starting from</span>
                                                        <span className="p-price">{p.price}</span>
                                                    </div>
                                                    <button className="p-btn-quote">
                                                        <span>Quote</span>
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="discovery-footer">
                                <p className="discovery-hint">Global Inventory Vision</p>
                                <button
                                    className="btn-grid-vision"
                                    onClick={() => setIsViewing360(true)}
                                >
                                    <Rotate3d size={18} />
                                    <span>Expand All Hardware</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="inventory-full-grid-wrapper">
                            <div className="grid-control">
                                <button className="btn-exit-grid" onClick={() => setIsViewing360(false)}>
                                    <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
                                    <span>Back to Focus</span>
                                </button>
                            </div>
                            <div className="inventory-full-grid">
                                {displayProducts.map((p, i) => (
                                    <div key={i} className="grid-item-tech" style={{ '--p-theme': p.theme }}>
                                        <div className="g-img">
                                            <img src={p.image} alt={p.name} />
                                            <div className="g-badge">{p.category}</div>
                                        </div>
                                        <div className="g-info">
                                            <h4>{p.name}</h4>
                                            <div className="g-specs">
                                                {p.specs.slice(0, 3).map((s, idx) => (
                                                    <span key={idx}>{s}</span>
                                                ))}
                                            </div>
                                            <button className="g-btn">View Details <Plus size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="technical-archive-vault">
                <div className="vault-left">
                    <div className="vault-icon-box">
                        <Download size={32} className="vault-main-icon" />
                        <div className="icon-pulse"></div>
                    </div>
                    <div className="vault-text">
                        <span className="v-tag">Service Repository</span>
                        <h4 className="v-title">Technical Archive</h4>
                        <p className="v-desc">Access high-resolution blueprints, technical data sheets, and compliance documentation for all products.</p>
                    </div>
                </div>

                <div className="vault-metrics">
                    <div className="v-m-item">
                        <span className="count">48+</span>
                        <span className="label">Datasheets</span>
                    </div>
                    <div className="v-m-item">
                        <span className="count">12+</span>
                        <span className="label">CAD Models</span>
                    </div>
                </div>

                <button className="v-download-btn">
                    <span>Download All</span>
                    <ArrowRight size={20} />
                </button>

                <div className="vault-scanner-beam"></div>
            </div>
        </section>
    );
};

export default Products;
