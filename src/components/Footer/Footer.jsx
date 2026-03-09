import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3>LEDEL ENTERPRISES</h3>
                    <p>Leading provider of premium LED lighting, CCTV surveillance, fire safety systems, and industrial software services. Empowering infrastructure with intelligent solutions.</p>
                    <div className="contact-info">
                        <p><strong>Email:</strong> info@ledelenterprises.com</p>
                        <p><strong>Phone:</strong> +91 [Your Number]</p>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Services</h4>
                    <ul className="footer-links">
                        <li><a href="#services">LED Lighting</a></li>
                        <li><a href="#services">CCTV Systems</a></li>
                        <li><a href="#services">Fire Safety</a></li>
                        <li><a href="#services">Industrial Software</a></li>
                        <li><a href="#services">Integration</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Company</h4>
                    <ul className="footer-links">
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#industries">Industries</a></li>
                        <li><a href="#">Case Studies</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul className="footer-links">
                        <li><a href="#">Product Catalog</a></li>
                        <li><a href="#">Technical Docs</a></li>
                        <li><a href="#">Certifications</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Ledel Enterprises. All rights reserved. | Powering India's Infrastructure with Premium Solutions</p>
            </div>
        </footer>
    );
};

export default Footer;
