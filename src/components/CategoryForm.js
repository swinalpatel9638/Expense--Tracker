import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoryForm.css';

const CategoryForm = ({ categories = [], onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    color: '#667eea'
  });

  const colorOptions = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'
  ];

  useEffect(() => {
    if (isEdit && categories.length > 0) {
      const category = categories.find(cat => cat.id === parseInt(id));
      if (category) {
        setFormData(category);
      }
    }
  }, [isEdit, id, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onSave(parseInt(id), formData);
    } else {
      onSave(formData);
    }
    navigate('/categories');
  };

  return (
    <div>
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/categories')}>← Back</button>
        <h1>{isEdit ? 'Edit Category' : 'Add Category'}</h1>
        <div style={{ width: '60px' }}></div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Food, Transport"
              required
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {colorOptions.map(color => (
                <div
                  key={color}
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{ background: color }}
                  onClick={() => setFormData({ ...formData, color })}
                ></div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn">{isEdit ? 'Update Category' : 'Add Category'}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/categories')}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
