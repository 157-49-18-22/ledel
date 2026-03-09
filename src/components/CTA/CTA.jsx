import React from 'react';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <h2>Ready to Transform Your Infrastructure?</h2>
                <p>Join hundreds of satisfied EPC contractors who trust Ledel Enterprises for their lighting, security, and software needs. Let's build the future together.</p>
                <div className="cta-buttons">
                    <a href="#contact" className="cta-white-btn">Request a Quote</a>
                    <a href="#contact" className="cta-secondary-btn">Schedule Consultation</a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
