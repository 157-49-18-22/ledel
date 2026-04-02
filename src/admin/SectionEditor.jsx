import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Upload, Plus, Trash2, Save, Edit2, X, CheckCircle, XCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SectionEditor = () => {
    // Helper to get image URL for preview
    const getPreviewUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const domain = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace('/api', '');
        return `${domain}${path}`;
    };
    const { sectionId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSidebarSettings, setShowSidebarSettings] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [itemForm, setItemForm] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        nodes: '',
        image: '',
        status: 'Active',
        sortOrder: ''
    });

    useEffect(() => {
        fetchData();
    }, [sectionId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/sections/${sectionId}`);
            setData(res.data);
        } catch (err) {
            console.error(err);
            // Default empty data if not found
            setData({});
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.post(`${API_BASE}/sections/${sectionId}`, data);
            alert('Saved successfully!');
        } catch (err) {
            alert('Error saving data');
        }
        setSaving(false);
    };

    const handleReset = async () => {
        if (window.confirm('Are you sure you want to reset this section? All customizations will be deleted and it will return to default.')) {
            try {
                await axios.delete(`${API_BASE}/sections/${sectionId}`);
                setData({});
                alert('Section reset to defaults');
                fetchData();
            } catch (err) {
                alert('Error resetting section');
            }
        }
    };

    const handleTextChange = (e, field) => {
        setData({ ...data, [field]: e.target.value });
    };

    const handleCardChange = (index, field, value) => {
        const newCards = [...(data.cards || [])];
        newCards[index] = { ...newCards[index], [field]: value };
        setData({ ...data, cards: newCards });
    };

    const handleSidebarCardChange = (index, field, value) => {
        const newCards = [...(data.sidebarCards || [])];
        newCards[index] = { ...newCards[index], [field]: value };
        setData({ ...data, sidebarCards: newCards });
    };

    const addCard = () => {
        const newCards = [...(data.cards || []), { title: '', description: '', image: '', category: '', price: '', nodes: '' }];
        setData({ ...data, cards: newCards });
    };

    const addSidebarCard = () => {
        const newCards = [...(data.sidebarCards || []), { title: '', description: '', icon: '' }];
        setData({ ...data, sidebarCards: newCards });
    };

    const removeCard = (index) => {
        if (window.confirm('Delete this item?')) {
            const newCards = data.cards.filter((_, i) => i !== index);
            setData({ ...data, cards: newCards });
        }
    };

    const [showSidebarForm, setShowSidebarForm] = useState(false);
    const [editingSidebarIndex, setEditingSidebarIndex] = useState(null);
    const [sidebarForm, setSidebarForm] = useState({
        title: '',
        description: '',
        image: ''
    });

    const resetSidebarForm = () => {
        setEditingSidebarIndex(null);
        setSidebarForm({ title: '', description: '', image: '' });
        setShowSidebarForm(false);
    };

    const editSidebarCard = (index) => {
        setEditingSidebarIndex(index);
        setSidebarForm(data.sidebarCards[index]);
        setShowSidebarForm(true);
    };

    const submitSidebarForm = () => {
        const newCards = [...(data.sidebarCards || [])];
        if (editingSidebarIndex !== null) {
            newCards[editingSidebarIndex] = sidebarForm;
        } else {
            newCards.push(sidebarForm);
        }
        setData({ ...data, sidebarCards: newCards });
        resetSidebarForm();
    };

    const handleSidebarFormChange = (field, value) => {
        setSidebarForm({ ...sidebarForm, [field]: value });
    };

    const handleSidebarImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post(`${API_BASE}/upload`, formData);
            setSidebarForm({ ...sidebarForm, image: res.data.imageUrl });
        } catch (err) { alert('Upload failed'); }
    };

    const removeSidebarCard = (index) => {
        if (window.confirm('Delete this sidebar item?')) {
            const newCards = data.sidebarCards.filter((_, i) => i !== index);
            setData({ ...data, sidebarCards: newCards });
        }
    };

    const handleImageUpload = async (e, field, index = null, isSidebar = false) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${API_BASE}/upload`, formData);
            const imageUrl = res.data.imageUrl;

            if (isSidebar) {
                handleSidebarCardChange(index, field, imageUrl);
            } else if (index !== null) {
                handleCardChange(index, field, imageUrl);
            } else {
                setData({ ...data, [field]: imageUrl });
            }
        } catch (err) {
            alert('Upload failed');
        }
    };

    const clearImage = (field, index = null, isSidebar = false) => {
        if (isSidebar) {
            handleSidebarCardChange(index, field, '');
        } else if (index !== null) {
            handleCardChange(index, field, '');
        } else if (field === 'itemFormImage') {
            setItemForm({ ...itemForm, image: '' });
        } else {
            setData({ ...data, [field]: '' });
        }
    };

    const handleItemFormChange = (field, value) => {
        setItemForm({ ...itemForm, [field]: value });
    };

    const handleItemImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${API_BASE}/upload`, formData);
            setItemForm({ ...itemForm, image: res.data.imageUrl });
        } catch (err) {
            alert('Upload failed');
        }
    };

    const submitItemForm = () => {
        const newCards = [...(data.cards || [])];
        if (editingIndex !== null) {
            newCards[editingIndex] = itemForm;
        } else {
            newCards.push(itemForm);
        }
        setData({ ...data, cards: newCards });
        resetItemForm();
    };

    const editItem = (index) => {
        setEditingIndex(index);
        setItemForm(data.cards[index]);
        // Scroll to form
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const resetItemForm = () => {
        setEditingIndex(null);
        setItemForm({
            title: '',
            category: '',
            description: '',
            price: '',
            nodes: '',
            image: '',
            status: 'Active',
            sortOrder: ''
        });
    };

    const scrollToForm = () => {
        resetItemForm();
        const element = document.getElementById('item-form-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="editor-container">
            <div className="editor-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h1>Edit {sectionId.toUpperCase()}</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn-admin" style={{ backgroundColor: '#f87171', color: 'white' }} onClick={handleReset}>
                            <Trash2 size={18} />
                            Reset Data
                        </button>
                        <button className="btn-admin" onClick={handleSave} disabled={saving}>
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label>Top Main Title</label>
                <input 
                    className="form-control" 
                    value={data.title || ''} 
                    onChange={(e) => handleTextChange(e, 'title')} 
                    placeholder="e.g. Industrial Inventory"
                />
            </div>

            <div className="form-group">
                <label>Top Subtitle</label>
                <textarea 
                    className="form-control" 
                    rows="3"
                    value={data.description || ''} 
                    onChange={(e) => handleTextChange(e, 'description')} 
                />
            </div>

            {sectionId === 'products' && (
                <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2.2rem', border: '1px dashed var(--admin-accent)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ color: 'var(--admin-accent)', margin: 0 }}>Left Sidebar Collection</h3>
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            <button className="btn-admin" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--admin-border)' }} 
                                onClick={() => setShowSidebarSettings(!showSidebarSettings)}>
                                <Edit2 size={16} /> {showSidebarSettings ? 'Hide Stats' : 'Edit Sidebar Stats'}
                            </button>
                            <button className="btn-admin" style={{ backgroundColor: '#38bdf8', color: '#0f172a' }} onClick={() => setShowSidebarForm(true)}>
                                <Plus size={16} /> Add Sidebar Card
                            </button>
                        </div>
                    </div>

                    {/* Global Sidebar Settings (Togglable) */}
                    {showSidebarSettings && (
                        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--admin-border)' }}>
                            <h4 style={{ marginTop: 0, color: 'var(--admin-accent)' }}>Global Sidebar Configuration</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="form-group">
                                    <label>Units Shipped (Number)</label>
                                    <input className="form-control" value={data.shippedCount || ''} onChange={(e) => handleTextChange(e, 'shippedCount')} placeholder="e.g. 2k+" />
                                </div>
                                <div className="form-group">
                                    <label>Units Shipped (Label)</label>
                                    <input className="form-control" value={data.shippedLabel || ''} onChange={(e) => handleTextChange(e, 'shippedLabel')} placeholder="e.g. Units Shipped" />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {[1, 2, 3, 4].map(num => (
                                    <div key={num} className="form-group">
                                        <label>Feature {num}</label>
                                        <input className="form-control" value={data[`feature${num}`] || ''} onChange={(e) => handleTextChange(e, `feature${num}`)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sidebar Card Table */}
                    <div className="admin-table-container" style={{ margin: 0, overflow: 'hidden' }}>
                        <table className="admin-table" style={{ fontSize: '0.85rem' }}>
                            <thead>
                                <tr>
                                    <th>TITLE</th>
                                    <th>IMAGE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(data.sidebarCards || []).map((card, idx) => (
                                    <tr key={idx}>
                                        <td>{card.title || 'Untitled'}</td>
                                        <td>{card.image ? <img src={getPreviewUrl(card.image)} style={{ width: '40px', height: '40px', borderRadius: '4px' }} alt="SBar" /> : '-'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="action-btn edit" onClick={() => editSidebarCard(idx)}><Edit2 size={14} /></button>
                                                <button className="action-btn delete" onClick={() => removeSidebarCard(idx)}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!data.sidebarCards || data.sidebarCards.length === 0) && (
                                    <tr><td colSpan="3" style={{ textAlign: 'center', opacity: 0.5 }}>No sidebar cards.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Sidebar Card Form (Modal-like) */}
                    {showSidebarForm && (
                        <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: '0.5rem', border: '1px solid var(--admin-accent)' }}>
                            <h4 style={{ marginTop: 0, color: 'var(--admin-accent)' }}>{editingSidebarIndex !== null ? 'Edit' : 'Add New'} Sidebar Card</h4>
                            <div className="form-group">
                                <label>Card Title</label>
                                <input className="form-control" value={sidebarForm.title || ''} onChange={(e) => handleSidebarFormChange('title', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" rows="2" value={sidebarForm.description || ''} onChange={(e) => handleSidebarFormChange('description', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Sidebar Card Image</label>
                                <div className="file-upload-wrapper">
                                    <label className="file-upload-label">
                                        <Upload size={18} /> Choose Card Photo
                                        <input type="file" className="file-upload-input" onChange={handleSidebarImageUpload} />
                                    </label>
                                </div>
                                {sidebarForm.image && <img src={getPreviewUrl(sidebarForm.image)} className="image-preview" style={{ maxHeight: '80px', marginTop: '0.5rem' }} alt="P" />}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button className="btn-admin" onClick={submitSidebarForm}>Submit</button>
                                <button className="btn-admin" style={{ backgroundColor: 'transparent', border: '1px solid var(--admin-border)' }} onClick={resetSidebarForm}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {sectionId === 'hero' && (
                <>
                    <div className="form-group">
                        <label>Badge Text</label>
                        <input 
                            className="form-control" 
                            value={data.badge || ''} 
                            onChange={(e) => handleTextChange(e, 'badge')} 
                        />
                    </div>

                    {/* Hero Metrics Editor */}
                    <div style={{ 
                        backgroundColor: 'rgba(56, 189, 248, 0.05)', 
                        padding: '1.5rem', 
                        borderRadius: '0.75rem', 
                        marginBottom: '1.5rem',
                        border: '1px dashed var(--admin-accent)'
                    }}>
                        <h4 style={{ color: 'var(--admin-accent)', marginBottom: '1.25rem', marginTop: 0 }}>
                            📊 Stats / Metric Cards
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem', marginTop: 0 }}>
                            Yahan se "15+ Years R&D", "500+ Smart Nodes", "99.9% Uptime" jaise stats change kar sakte ho.
                        </p>
                        {[
                            { default_label: 'Years R&D', default_value: '15+' },
                            { default_label: 'Smart Nodes', default_value: '500+' },
                            { default_label: 'Uptime', default_value: '99.9%' },
                        ].map((def, index) => {
                            const currentCards = data.cards && data.cards[index] && !data.cards[index].icon
                                ? data.cards 
                                : (data.metricCards || []);
                            const card = (data.metricCards || [])[index] || { label: def.default_label, value: def.default_value };
                            return (
                                <div key={index} style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: '1fr 1fr', 
                                    gap: '1rem', 
                                    marginBottom: '1rem',
                                    padding: '1rem',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    borderRadius: '0.5rem',
                                    border: '1px solid var(--admin-border)'
                                }}>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ fontSize: '0.8rem' }}>Stat #{index + 1} — Value (e.g. 15+)</label>
                                        <input 
                                            className="form-control"
                                            value={card.value || ''}
                                            placeholder={def.default_value}
                                            onChange={(e) => {
                                                const updated = [...(data.metricCards || [
                                                    { label: 'Years R&D', value: '15+' },
                                                    { label: 'Smart Nodes', value: '500+' },
                                                    { label: 'Uptime', value: '99.9%' },
                                                ])];
                                                updated[index] = { ...updated[index], value: e.target.value };
                                                setData({ ...data, metricCards: updated });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ fontSize: '0.8rem' }}>Stat #{index + 1} — Label (e.g. Years R&D)</label>
                                        <input 
                                            className="form-control"
                                            value={card.label || ''}
                                            placeholder={def.default_label}
                                            onChange={(e) => {
                                                const updated = [...(data.metricCards || [
                                                    { label: 'Years R&D', value: '15+' },
                                                    { label: 'Smart Nodes', value: '500+' },
                                                    { label: 'Uptime', value: '99.9%' },
                                                ])];
                                                updated[index] = { ...updated[index], label: e.target.value };
                                                setData({ ...data, metricCards: updated });
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {sectionId === 'footer' && (
                <div style={{ padding: '1.5rem', backgroundColor: 'rgba(56, 189, 248, 0.05)', borderRadius: '1rem', marginTop: '1rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--admin-accent)' }}>Company Contact & Socials</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label>Operational HQ Address</label>
                            <input className="form-control" value={data.address || ''} onChange={(e) => handleTextChange(e, 'address')} />
                        </div>
                        <div className="form-group">
                            <label>Contact Email</label>
                            <input className="form-control" value={data.email || ''} onChange={(e) => handleTextChange(e, 'email')} />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input className="form-control" value={data.phone || ''} onChange={(e) => handleTextChange(e, 'phone')} />
                        </div>
                        <div className="form-group">
                            <label>Status Tag (e.g. Verified Enterprise)</label>
                            <input className="form-control" value={data.statusTag || ''} onChange={(e) => handleTextChange(e, 'statusTag')} />
                        </div>
                        <div className="form-group">
                            <label>LinkedIn URL</label>
                            <input className="form-control" value={data.linkedin || ''} onChange={(e) => handleTextChange(e, 'linkedin')} />
                        </div>
                        <div className="form-group">
                            <label>Twitter URL</label>
                            <input className="form-control" value={data.twitter || ''} onChange={(e) => handleTextChange(e, 'twitter')} />
                        </div>
                        <div className="form-group">
                            <label>Instagram URL</label>
                            <input className="form-control" value={data.instagram || ''} onChange={(e) => handleTextChange(e, 'instagram')} />
                        </div>
                        <div className="form-group">
                            <label>Facebook URL</label>
                            <input className="form-control" value={data.facebook || ''} onChange={(e) => handleTextChange(e, 'facebook')} />
                        </div>
                    </div>
                </div>
            )}

            {sectionId === 'navbar' && (
                <div style={{ padding: '1.5rem', backgroundColor: 'rgba(56, 189, 248, 0.05)', borderRadius: '1rem', marginTop: '1rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--admin-accent)' }}>Navbar Settings</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label>Action Button Text (e.g. Connect)</label>
                            <input className="form-control" value={data.buttonText || ''} onChange={(e) => handleTextChange(e, 'buttonText')} />
                        </div>
                    </div>
                </div>
            )}

            {sectionId === 'cta' ? (
                <div style={{ padding: '1rem', backgroundColor: 'rgba(56, 189, 248, 0.05)', borderRadius: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label>CTA Badge Text</label>
                            <input className="form-control" value={data.badge || ''} onChange={(e) => handleTextChange(e, 'badge')} />
                        </div>
                        <div className="form-group">
                            <label>Button 1 Label</label>
                            <input className="form-control" value={data.btn1 || ''} onChange={(e) => handleTextChange(e, 'btn1')} />
                        </div>
                        <div className="form-group">
                            <label>Button 2 Label</label>
                            <input className="form-control" value={data.btn2 || ''} onChange={(e) => handleTextChange(e, 'btn2')} />
                        </div>
                        <div className="form-group">
                            <label>Trust Footer 1</label>
                            <input className="form-control" value={data.foot1 || ''} onChange={(e) => handleTextChange(e, 'foot1')} />
                        </div>
                        <div className="form-group">
                            <label>Trust Footer 2</label>
                            <input className="form-control" value={data.foot2 || ''} onChange={(e) => handleTextChange(e, 'foot2')} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="form-group">
                    <label>Section Background / Icon</label>
                    <div className="file-upload-wrapper">
                        <label className="file-upload-label">
                            <Upload size={18} />
                            Choose Background
                            <input 
                                type="file" 
                                className="file-upload-input" 
                                onChange={(e) => handleImageUpload(e, 'image')} 
                            />
                        </label>
                        {data.image && (
                            <button className="btn-admin" style={{ backgroundColor: '#475569', padding: '0.5rem' }} onClick={() => clearImage('image')}>
                                Clear Image
                            </button>
                        )}
                    </div>
                    {data.image && <img src={getPreviewUrl(data.image)} className="image-preview" alt="Preview" />}
                </div>
            )}

            {/* Manage Items Section (Table & Form) */}
            {(sectionId !== 'cta' && sectionId !== 'footer' && sectionId !== 'navbar' && sectionId !== 'hero') && (
                <div className="manage-items-section" style={{ marginTop: '3rem' }}>
                    <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>Manage {sectionId.toUpperCase()} Items</h3>
                        <button className="btn-admin" style={{ backgroundColor: '#10b981' }} onClick={scrollToForm}>
                            <Plus size={18} />
                            Add More Item
                        </button>
                    </div>

                    {/* Item Form */}
                    <div id="item-form-section" className="item-management-form" style={{ 
                        backgroundColor: 'rgba(255,255,255,0.03)', 
                        padding: '2rem', 
                        borderRadius: '1rem', 
                        marginBottom: '2rem',
                        border: '1px solid var(--admin-border)'
                    }}>
                        <h4 style={{ marginBottom: '1.5rem', color: 'var(--admin-accent)' }}>
                            {editingIndex !== null ? 'Update Selected Item' : 'Add New Item Configuration'}
                        </h4>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            {/* Always show Title */}
                            <div className="form-group">
                                <label>{sectionId === 'certification' ? 'Logo Name' : 'Item Title'}</label>
                                <input 
                                    className="form-control" 
                                    value={itemForm.title || ''} 
                                    onChange={(e) => handleItemFormChange('title', e.target.value)}
                                    placeholder="Heading text"
                                />
                            </div>

                            {/* Section Specific Fields */}
                            {sectionId !== 'certification' && (
                                <div className="form-group">
                                    <label>
                                        {sectionId === 'industries' ? 'Badge (e.g. CDS)' : 
                                         sectionId === 'navbar' || sectionId === 'footer' ? 'Link URL' : 
                                         'Category / Badge'}
                                    </label>
                                    <input 
                                        className="form-control" 
                                        value={itemForm.category || ''} 
                                        onChange={(e) => handleItemFormChange('category', e.target.value)}
                                        placeholder="Sub-label or Link"
                                    />
                                </div>
                            )}

                            {sectionId === 'industries' && (
                                <>
                                    <div className="form-group">
                                        <label>Efficiency (%)</label>
                                        <input 
                                            className="form-control" 
                                            value={itemForm.price || ''} 
                                            onChange={(e) => handleItemFormChange('price', e.target.value)}
                                            placeholder="e.g. 94"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Smart Nodes Count</label>
                                        <input 
                                            className="form-control" 
                                            value={itemForm.nodes || ''} 
                                            onChange={(e) => handleItemFormChange('nodes', e.target.value)}
                                            placeholder="e.g. 1,000+"
                                        />
                                    </div>
                                </>
                            )}

                            {(sectionId === 'products' || sectionId === 'industries') && (
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label>Description</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="2"
                                        value={itemForm.description || ''} 
                                        onChange={(e) => handleItemFormChange('description', e.target.value)}
                                        placeholder="Details text..."
                                    />
                                </div>
                            )}

                            {sectionId !== 'navbar' && sectionId !== 'footer' && (
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label>{sectionId === 'certification' ? 'Logo Image' : 'Item Photo'}</label>
                                    <div className="file-upload-wrapper">
                                        <label className="file-upload-label">
                                            <Upload size={18} />
                                            Upload {sectionId === 'certification' ? 'Logo' : 'Photo'}
                                            <input 
                                                type="file" 
                                                className="file-upload-input" 
                                                onChange={handleItemImageUpload} 
                                            />
                                        </label>
                                        {itemForm.image && (
                                            <button className="btn-admin" style={{ backgroundColor: '#475569' }} onClick={() => clearImage('itemFormImage')}>
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                    {itemForm.image && <img src={getPreviewUrl(itemForm.image)} className="image-preview" style={{ maxHeight: '100px' }} alt="Preview" />}
                                </div>
                            )}

                            {/* Common Utility Fields */}
                            <div className="form-group">
                                <label>Visibility</label>
                                <select 
                                    className="form-control"
                                    value={itemForm.status || 'Active'}
                                    onChange={(e) => handleItemFormChange('status', e.target.value)}
                                >
                                    <option value="Active">Visible</option>
                                    <option value="Inactive">Hidden</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Order</label>
                                <input 
                                    type="number"
                                    className="form-control" 
                                    value={itemForm.sortOrder} 
                                    onChange={(e) => handleItemFormChange('sortOrder', e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button className="btn-admin" onClick={submitItemForm} style={{ minWidth: '150px' }}>
                                {editingIndex !== null ? 'UPDATE ITEM' : 'SUBMIT'}
                            </button>
                            {editingIndex !== null && (
                                <button className="btn-admin" style={{ backgroundColor: '#475569' }} onClick={resetItemForm}>
                                    <X size={18} /> Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>S. NO.</th>
                                    <th>NAME</th>
                                    <th>PHOTO</th>
                                    <th>SORT ORDER</th>
                                    <th>STATUS</th>
                                    <th>EDIT</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(data.cards || []).map((card, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div style={{ fontWeight: 'bold' }}>{card.title || 'Untitled'}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{card.category}</div>
                                        </td>
                                        <td>
                                            {card.image ? (
                                                <img src={getPreviewUrl(card.image)} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
                                            ) : (
                                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>No image</span>
                                            )}
                                        </td>
                                        <td>{card.sortOrder || 0}</td>
                                        <td>
                                            <span style={{ 
                                                padding: '0.25rem 0.5rem', 
                                                borderRadius: '4px', 
                                                fontSize: '0.75rem', 
                                                backgroundColor: card.status === 'Inactive' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                                color: card.status === 'Inactive' ? '#f87171' : '#34d399'
                                            }}>
                                                {card.status || 'Active'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="action-btn edit" onClick={() => editItem(index)}>
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                        <td>
                                            <button className="action-btn delete" onClick={() => removeCard(index)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(!data.cards || data.cards.length === 0) && (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                            No items found. Add your first item above.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SectionEditor;
