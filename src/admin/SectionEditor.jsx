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
    const [editingIndex, setEditingIndex] = useState(null);
    const [itemForm, setItemForm] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
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
        const newCards = [...(data.cards || []), { title: '', description: '', image: '', category: '', price: '' }];
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
                <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px dashed var(--admin-accent)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ color: 'var(--admin-accent)', margin: 0 }}>Left Sidebar Collection</h4>
                        <button className="btn-admin" style={{ backgroundColor: '#38bdf8', color: '#0f172a', scale: '0.8' }} onClick={addSidebarCard}>
                            <Plus size={16} /> Add Sidebar Card
                        </button>
                    </div>
                    
                    {(data.sidebarCards || []).map((card, index) => (
                        <div key={index} className="card-editor" style={{ marginBottom: '1rem', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                            <button className="btn-remove" onClick={() => removeSidebarCard(index)} style={{ top: '0.5rem', right: '0.5rem' }}>
                                <Trash2 size={16} />
                            </button>
                            <div className="form-group">
                                <label>Card Title</label>
                                <input 
                                    className="form-control" 
                                    value={card.title || ''} 
                                    onChange={(e) => handleSidebarCardChange(index, 'title', e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    className="form-control" 
                                    rows="2"
                                    value={card.description || ''} 
                                    onChange={(e) => handleSidebarCardChange(index, 'description', e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>Card Image / Icon</label>
                                <div className="file-upload-wrapper">
                                    <label className="file-upload-label">
                                        <Upload size={18} />
                                        Choose Card Photo
                                        <input 
                                            type="file" 
                                            className="file-upload-input" 
                                            onChange={(e) => handleImageUpload(e, 'image', index, true)} 
                                        />
                                    </label>
                                    {card.image && (
                                        <button className="btn-admin" style={{ backgroundColor: '#475569', padding: '0.4rem' }} onClick={() => clearImage('image', index, true)}>
                                            Clear
                                        </button>
                                    )}
                                </div>
                                {card.image && <img src={getPreviewUrl(card.image)} className="image-preview" alt="Preview" />}
                            </div>
                        </div>
                    ))}
                    
                    {(!data.sidebarCards || data.sidebarCards.length === 0) && (
                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>No custom sidebar cards. Default "The Hardware Stack" will be shown.</p>
                    )}
                </div>
            )}

            {sectionId === 'hero' && (
                <div className="form-group">
                    <label>Badge Text</label>
                    <input 
                        className="form-control" 
                        value={data.badge || ''} 
                        onChange={(e) => handleTextChange(e, 'badge')} 
                    />
                </div>
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
            {(sectionId !== 'cta' && sectionId !== 'footer' && sectionId !== 'navbar') && (
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
                            <div className="form-group">
                                <label>Item Name / Title</label>
                                <input 
                                    className="form-control" 
                                    value={itemForm.title || ''} 
                                    onChange={(e) => handleItemFormChange('title', e.target.value)}
                                    placeholder="Enter heading text"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category / Link / Price</label>
                                <input 
                                    className="form-control" 
                                    value={itemForm.category || ''} 
                                    onChange={(e) => handleItemFormChange('category', e.target.value)}
                                    placeholder="Add category or details"
                                />
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label>Description / Subheading Details</label>
                                <textarea 
                                    className="form-control" 
                                    rows="2"
                                    value={itemForm.description || ''} 
                                    onChange={(e) => handleItemFormChange('description', e.target.value)}
                                    placeholder="Enter subheading text"
                                />
                            </div>
                            <div className="form-group">
                                <label>Visibility Status</label>
                                <select 
                                    className="form-control"
                                    value={itemForm.status || 'Active'}
                                    onChange={(e) => handleItemFormChange('status', e.target.value)}
                                >
                                    <option value="Active">Active (Visible)</option>
                                    <option value="Inactive">Inactive (Hidden)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Display Sort Order</label>
                                <input 
                                    type="number"
                                    className="form-control" 
                                    value={itemForm.sortOrder} 
                                    onChange={(e) => handleItemFormChange('sortOrder', e.target.value)}
                                    placeholder="Enter order number"
                                />
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label>Item Photo / Image</label>
                                <div className="file-upload-wrapper">
                                    <label className="file-upload-label">
                                        <Upload size={18} />
                                        Upload Item Photo
                                        <input 
                                            type="file" 
                                            className="file-upload-input" 
                                            onChange={handleItemImageUpload} 
                                        />
                                    </label>
                                    {itemForm.image && (
                                        <button className="btn-admin" style={{ backgroundColor: '#475569' }} onClick={() => clearImage('itemFormImage')}>
                                            Clear Selected
                                        </button>
                                    )}
                                </div>
                                {itemForm.image && <img src={getPreviewUrl(itemForm.image)} className="image-preview" style={{ maxHeight: '150px' }} alt="Preview" />}
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
