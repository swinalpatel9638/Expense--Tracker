import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpenseList.css';

const ExpenseList = ({ expenses, categories, deleteExpense }) => {
  const navigate = useNavigate();

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#999';
  };

  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1>Expenses</h1>
        <button className="back-btn" onClick={() => navigate('/expenses/add')}>+ Add</button>
      </div>
      <div className="content">
        {sortedExpenses.length === 0 ? (
          <div className="empty-state">
            <p>No expenses yet</p>
            <button className="btn" onClick={() => navigate('/expenses/add')}>Add Your First Expense</button>
          </div>
        ) : (
          <div className="expense-list">
            {sortedExpenses.map(expense => (
              <div key={expense.id} className="expense-item">
                <div className="expense-main">
                  <div className="expense-left">
                    <div className="expense-category" style={{ background: getCategoryColor(expense.categoryId) }}>
                      {getCategoryName(expense.categoryId).charAt(0)}
                    </div>
                    <div>
                      <div className="expense-description">{expense.description}</div>
                      <div className="expense-meta">
                        {getCategoryName(expense.categoryId)} • {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="expense-amount">${parseFloat(expense.amount).toFixed(2)}</div>
                </div>
                <div className="expense-actions">
                  <button className="btn-small" onClick={() => navigate(`/expenses/edit/${expense.id}`)}>Edit</button>
                  <button className="btn-small btn-danger" onClick={() => deleteExpense(expense.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
