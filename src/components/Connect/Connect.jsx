import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import './Connect.css';

const Connect = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert("Message sent! We'll get back to you soon.");
    };

    return (
        <section className="connect-page">
            <div className="connect-container">
                <div className="connect-header">
                    <span className="subtitle">CONTACT US</span>
                    <h1 className="gradient-text">Let's Interface</h1>
                    <p>Ready to deploy next-gen solutions? Our team is standing by to bridge the gap between vision and reality.</p>
                </div>

                <div className="connect-grid">
                    {/* Contact Info Card */}
                    <div className="contact-info-card glass-morphism">
                        <div className="info-group">
                            <div className="info-icon">
                                <Mail size={24} />
                            </div>
                            <div className="info-text">
                                <h3>Email</h3>
                                <p>hello@ledel.tech</p>
                                <p>support@ledel.tech</p>
                            </div>
                        </div>

                        <div className="info-group">
                            <div className="info-icon">
                                <Phone size={24} />
                            </div>
                            <div className="info-text">
                                <h3>Phone</h3>
                                <p>+1 (555) 000-1111</p>
                                <p>Mon - Fri, 9am - 6pm</p>
                            </div>
                        </div>

                        <div className="info-group">
                            <div className="info-icon">
                                <MapPin size={24} />
                            </div>
                            <div className="info-text">
                                <h3>Location</h3>
                                <p>Indore, Madhya Pradesh</p>
                                <p>India</p>
                            </div>
                        </div>

                        <div className="info-extra">
                            <div className="extra-item">
                                <Clock size={16} />
                                <span>Response time: &lt; 24h</span>
                            </div>
                            <div className="extra-item">
                                <Globe size={16} />
                                <span>Global Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="contact-form-card glass-morphism">
                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>First Name</label>
                                    <input type="text" placeholder="John" required />
                                </div>
                                <div className="input-group">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="john@example.com" required />
                            </div>

                            <div className="input-group">
                                <label>Service Interest</label>
                                <select required>
                                    <option value="">Select a service</option>
                                    <option value="hardware">Hardware Architecture</option>
                                    <option value="solutions">Digital Solutions</option>
                                    <option value="infrastructure">Infrastructure</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Message</label>
                                <textarea placeholder="How can we help you evolve?" rows="4" required></textarea>
                            </div>

                            <button type="submit" className="btn-submit">
                                <span>Initialize Connection</span>
                                <Send size={20} />
                                <div className="btn-glow"></div>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="map-section glass-morphism">
                    <div className="map-info">
                        <h2>Visit Our HQ</h2>
                        <p>Experience the technical ecosystem in person. Our headquarters is designed to foster innovation and precision engineering.</p>
                        <a 
                            href="https://www.google.com/maps/search/?api=1&query=Indore+Madhya+Pradesh+India" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-directions"
                        >
                            Get Directions
                        </a>
                    </div>
                    <div className="map-frame">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.67401188647!2d75.786255!3d22.7239116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b4cbd13%3A0x11166317bc2d4a04!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710180000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="LEDEL HQ Location"
                        ></iframe>
                    </div>
                </div>

                {/* Background accents */}
                <div className="bg-blob blob-1"></div>
                <div className="bg-blob blob-2"></div>
            </div>
        </section>
    );
};

export default Connect;
