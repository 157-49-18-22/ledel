import React from 'react';
import './Products.css';

const products = [
    {
        name: 'Industrial High-Bay LED',
        category: 'LED Luminaries',
        price: 'Enquire for Price',
        image: '/WhatsApp Image 2026-03-09 at 11.09.21 AM.jpeg',
        specs: ['IP66 Rated', '200W Output', '50,000 hrs Life']
    },
    {
        name: 'Autonomous Solar Street Light',
        category: 'Solar Solutions',
        price: 'Enquire for Price',
        image: '/integration.png',
        specs: ['Smart Motion Sensor', 'LiFePO4 Battery', 'Auto Dusk-to-Dawn']
    },
    {
        name: 'Neural CCTV Node 4K',
        category: 'Surveillance',
        price: 'Enquire for Price',
        image: '/security.png',
        specs: ['AI Object Tracking', 'Night Vision Pro', 'Edge Storage']
    },
    {
        name: 'Solar PV Module 550W',
        category: 'Solar Panels',
        price: 'Enquire for Price',
        image: '/WhatsApp Image 2026-03-09 at 11.09.20 AM (1).jpeg',
        specs: ['Monocrystalline', 'High Efficiency', '25yr Warranty']
    }
];

const Products = () => {
    return (
        <section id="products" className="products-section section-padding">
            <div className="section-head text-center">
                <span className="accent-tag">Hardware Catalog</span>
                <h2 className="title-large">Premium <span className="gradient-text">Commercial Gear</span></h2>
                <p className="lead-text">Industrial-grade precision hardware for EPC contractors and infrastructure developers.</p>
            </div>

            <div className="products-grid">
                {products.map((p, i) => (
                    <div key={i} className="product-card glass-morphism">
                        <div className="product-image">
                            <img src={p.image} alt={p.name} />
                            <div className="category-tag">{p.category}</div>
                        </div>

                        <div className="product-info">
                            <h3 className="product-name">{p.name}</h3>
                            <div className="product-specs">
                                {p.specs.map((s, idx) => (
                                    <span key={idx} className="spec-tag">{s}</span>
                                ))}
                            </div>
                            <div className="product-footer">
                                <span className="price-label">{p.price}</span>
                                <button className="btn-buy">
                                    Add to Quote
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="catalog-cta">
                <div className="catalog-banner glass-morphism">
                    <div className="banner-content">
                        <h3>Full Hardware Catalog 2026</h3>
                        <p>Download our complete technical specifications and enterprise pricing guide.</p>
                    </div>
                    <button className="btn-download">
                        Download PDF
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Products;
