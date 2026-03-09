import React from 'react';
import './Certification.css';

const Certification = () => {
    return (
        <section className="cert-section section-padding">
            <div className="cert-container glass-morphism">
                <div className="cert-content">
                    <h2 className="title-large">Official <span className="gradient-text">Ecosystem Partners</span></h2>
                    <p className="cert-text">Ledel Enterprises is a direct importer and authorized distributor for Tier-1 industrial hardware manufacturers.</p>
                </div>

                <div className="cert-logos">
                    <div className="logo-placeholder">TUV SUD</div>
                    <div className="logo-placeholder">MNRE</div>
                    <div className="logo-placeholder">BIS INDIA</div>
                    <div className="logo-placeholder">ISO CERT</div>
                </div>
            </div>
        </section>
    );
};

export default Certification;
