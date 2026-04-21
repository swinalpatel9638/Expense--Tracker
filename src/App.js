import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food', color: '#FF6B6B' },
    { id: 2, name: 'Transportation', color: '#4ECDC4' },
    { id: 3, name: 'Entertainment', color: '#45B7D1' },
    { id: 4, name: 'Utilities', color: '#FFA07A' }
  ]);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedCategories = localStorage.getItem('categories');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...updatedExpense, id } : exp));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const addCategory = (category) => {
    setCategories([...categories, { ...category, id: Date.now() }]);
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(categories.map(cat => cat.id === id ? { ...updatedCategory, id } : cat));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setExpenses(expenses.map(exp => exp.categoryId === id ? { ...exp, categoryId: null } : exp));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard expenses={expenses} categories={categories} />} />
          <Route path="/expenses" element={<ExpenseList expenses={expenses} categories={categories} deleteExpense={deleteExpense} />} />
          <Route path="/expenses/add" element={<ExpenseForm categories={categories} onSave={addExpense} />} />
          <Route path="/expenses/edit/:id" element={<ExpenseForm expenses={expenses} categories={categories} onSave={updateExpense} />} />
          <Route path="/categories" element={<CategoryList categories={categories} deleteCategory={deleteCategory} />} />
          <Route path="/categories/add" element={<CategoryForm onSave={addCategory} />} />
          <Route path="/categories/edit/:id" element={<CategoryForm categories={categories} onSave={updateCategory} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
