import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ExpenseForm.css';

const ExpenseForm = ({ expenses = [], categories, onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isEdit && expenses.length > 0) {
      const expense = expenses.find(exp => exp.id === parseInt(id));
      if (expense) {
        setFormData(expense);
      }
    }
  }, [isEdit, id, expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onSave(parseInt(id), formData);
    } else {
      onSave(formData);
    }
    navigate('/expenses');
  };

  return (
    <div>
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/expenses')}>← Back</button>
        <h1>{isEdit ? 'Edit Expense' : 'Add Expense'}</h1>
        <div style={{ width: '60px' }}></div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Lunch at cafe"
              required
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn">{isEdit ? 'Update Expense' : 'Add Expense'}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/expenses')}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
