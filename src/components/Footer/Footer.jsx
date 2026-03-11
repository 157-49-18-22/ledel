import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowUpRight, ShieldCheck } from 'lucide-react';
import './Footer.css';

import { useContent } from '../../hooks/useContent';

const Footer = () => {
    const { data, loading, getImageUrl } = useContent('footer');

    if (loading) return null;

    const logo = getImageUrl(data?.image) || '/logo1.png';
    const description = data?.description || 'Architecting the hardware-software convergence for the modern industrial age. Engineering precision, delivering impact.';
    const address = data?.address || 'Indore, Madhya Pradesh, India';
    const email = data?.email || 'info@ledelenterprises.com';
    const phone = data?.phone || '+91 97705 55800';

    return (
        <footer className="footer-premium">
            <div className="footer-grid-bg"></div>

            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-info-brand">
                        <div className="footer-logo">
                            <img src={logo} alt="LEDEL" className="footer-logo-img" />
                        </div>
                        <p className="brand-pitch">
                            {description}
                        </p>
                        <div className="social-tech-row">
                            <a href={data?.linkedin || "#"} className="social-pill"><Linkedin size={18} /></a>
                            <a href={data?.twitter || "#"} className="social-pill"><Twitter size={18} /></a>
                            <a href={data?.instagram || "#"} className="social-pill"><Instagram size={18} /></a>
                            <a href={data?.facebook || "#"} className="social-pill"><Facebook size={18} /></a>
                        </div>
                    </div>

                    <div className="footer-links-column">
                        <h4 className="column-title">Infrastructure</h4>
                        <ul className="f-links">
                            <li><a href="#services">LED Luminaires <ArrowUpRight size={14} /></a></li>
                            <li><a href="#services">CCTV Networks <ArrowUpRight size={14} /></a></li>
                            <li><a href="#services">Solar Solutions <ArrowUpRight size={14} /></a></li>
                            <li><a href="#services">Cloud Control <ArrowUpRight size={14} /></a></li>
                            <li><a href="#services">Fire Security <ArrowUpRight size={14} /></a></li>
                        </ul>
                    </div>

                    <div className="footer-links-column">
                        <h4 className="column-title">Ecosystem</h4>
                        <ul className="f-links">
                            <li><a href="#industries">Sectors</a></li>
                            <li><a href="#products">Hardware List</a></li>
                            <li><a href="#">Compliance</a></li>
                            <li><a href="#">Technical Docs</a></li>
                            <li><a href="#">Partnerships</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact-column">
                        <h4 className="column-title">Operational HQ</h4>
                        <div className="contact-card-footer">
                            <div className="c-item">
                                <MapPin size={18} className="c-icon" />
                                <span>{address}</span>
                            </div>
                            <div className="c-item">
                                <Mail size={18} className="c-icon" />
                                <span>{email}</span>
                            </div>
                            <div className="c-item">
                                <Phone size={18} className="c-icon" />
                                <span>{phone}</span>
                            </div>
                        </div>
                        <div className="footer-status-tag">
                            <ShieldCheck size={14} />
                            {data?.statusTag || 'Verified Enterprise'}
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-bar">
                    <div className="b-left">
                        <p>&copy; {new Date().getFullYear()} Ledel Enterprises. Engineered with precision.</p>
                    </div>
                    <div className="b-right">
                        <a href="#">Privacy Policy</a>
                        <div className="v-divider"></div>
                        <a href="#">Terms of Service</a>
                        <div className="v-divider"></div>
                        <a href="#">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
