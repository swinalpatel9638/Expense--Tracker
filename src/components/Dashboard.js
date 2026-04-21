import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ expenses, categories }) => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('all');

  const filterExpensesByTime = () => {
    const now = new Date();
    return expenses.filter(exp => {
      const expDate = new Date(exp.date);
      if (timeFilter === 'day') {
        return expDate.toDateString() === now.toDateString();
      } else if (timeFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return expDate >= weekAgo;
      } else if (timeFilter === 'month') {
        return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  const filteredExpenses = filterExpensesByTime();
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  const categoryTotals = categories.map(cat => {
    const total = filteredExpenses
      .filter(exp => exp.categoryId === cat.id)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    return { ...cat, total };
  });

  return (
    <div>
      <div className="header">
        <h1>Expense Tracker</h1>
      </div>
      <div className="content">
        <div className="time-filters">
          <button className={timeFilter === 'day' ? 'filter-btn active' : 'filter-btn'} onClick={() => setTimeFilter('day')}>Day</button>
          <button className={timeFilter === 'week' ? 'filter-btn active' : 'filter-btn'} onClick={() => setTimeFilter('week')}>Week</button>
          <button className={timeFilter === 'month' ? 'filter-btn active' : 'filter-btn'} onClick={() => setTimeFilter('month')}>Month</button>
          <button className={timeFilter === 'all' ? 'filter-btn active' : 'filter-btn'} onClick={() => setTimeFilter('all')}>All</button>
        </div>

        <div className="total-card">
          <div className="total-label">Total Expenses</div>
          <div className="total-amount">${totalAmount.toFixed(2)}</div>
        </div>

        <div className="category-totals">
          <h2>By Category</h2>
          {categoryTotals.map(cat => (
            <div key={cat.id} className="category-total-item">
              <div className="category-info">
                <div className="category-color" style={{ background: cat.color }}></div>
                <span>{cat.name}</span>
              </div>
              <span className="category-amount">${cat.total.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="quick-actions">
          <button className="btn" onClick={() => navigate('/expenses/add')}>Add Expense</button>
          <button className="btn btn-secondary" onClick={() => navigate('/expenses')}>View All Expenses</button>
          <button className="btn btn-secondary" onClick={() => navigate('/categories')}>Manage Categories</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
