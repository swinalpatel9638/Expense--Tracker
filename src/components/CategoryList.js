import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = ({ categories, deleteCategory }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1>Categories</h1>
        <button className="back-btn" onClick={() => navigate('/categories/add')}>+ Add</button>
      </div>
      <div className="content">
        {categories.length === 0 ? (
          <div className="empty-state">
            <p>No categories yet</p>
            <button className="btn" onClick={() => navigate('/categories/add')}>Add Your First Category</button>
          </div>
        ) : (
          <div className="category-list">
            {categories.map(category => (
              <div key={category.id} className="category-item">
                <div className="category-main">
                  <div className="category-color-large" style={{ background: category.color }}></div>
                  <span className="category-name">{category.name}</span>
                </div>
                <div className="category-actions">
                  <button className="btn-small" onClick={() => navigate(`/categories/edit/${category.id}`)}>Edit</button>
                  <button className="btn-small btn-danger" onClick={() => deleteCategory(category.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
