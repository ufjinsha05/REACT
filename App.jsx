import React, { useState } from 'react';

export default function App() {
  // 1. Initial State Ledger
  const [transactions, setTransactions] = useState([
    { id: 1, text: "Monthly Salary", amount: 2500, type: "income", category: "Salary" },
    { id: 2, text: "Grocery Supplies", amount: 120, type: "expense", category: "Food" },
    { id: 3, text: "Electricity Bill", amount: 85, type: "expense", category: "Utilities" },
    { id: 4, text: "Movie Night Tickets", amount: 45, type: "expense", category: "Entertainment" }
  ]);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  const categories = ["Food", "Utilities", "Entertainment", "Transport", "Shopping", "Other"];

  // 2. Calculation Logic
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
  const balance = totalIncome - totalExpense;

  // 3. Category Analytics Summarizer
  const categorySummary = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  // 4. Form Actions
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!text.trim() || !amount || Number(amount) <= 0) return;

    setTransactions([
      {
        id: Date.now(),
        text,
        amount: Number(amount),
        type,
        category: type === 'income' ? 'Salary' : category
      },
      ...transactions
    ]);
    
    setText("");
    setAmount("");
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '25px', fontFamily: 'sans-serif', background: '#fafafa', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 5px 0', color: '#1a1a1a' }}>Daily Expense Analytics Dashboard</h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', margin: '0 0 25px 0' }}>Professional Spending Habits & Insights Tracker</p>
      
      {/* KPI Financial Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        <div style={{ padding: '15px', background: '#fff', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', uppercase: 'true' }}>Total Income</span>
          <h2 style={{ margin: '5px 0 0 0', color: '#22c55e' }}>+${totalIncome}</h2>
        </div>
        <div style={{ padding: '15px', background: '#fff', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', uppercase: 'true' }}>Total Expenses</span>
          <h2 style={{ margin: '5px 0 0 0', color: '#ef4444' }}>-${totalExpense}</h2>
        </div>
        <div style={{ padding: '15px', background: '#fff', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', uppercase: 'true' }}>Net Balance</span>
          <h2 style={{ margin: '5px 0 0 0', color: balance >= 0 ? '#1e3a8a' : '#ef4444' }}>${balance}</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '25px' }}>
        
        {/* Left Side: Input Logger Form */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Log New Entry</h3>
          <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Transaction Type</label>
              <select value={type} onChange={e => setType(e.target.value)} style={{ wFull: '100%', width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: '#fff' }}>
                <option value="expense">Expense (-)</option>
                <option value="income">Income (+)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Description</label>
              <input type="text" placeholder="e.g., Office Lunch" value={text} onChange={e => setText(e.target.value)} style={{ width: '92%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Value Amount ($)</label>
              <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '92%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} required />
            </div>

            {type === 'expense' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Category Classification</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: '#fff' }}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            )}

            <button type="submit" style={{ padding: '12px', background: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              Commit Entry Log
            </button>
          </form>
        </div>

        {/* Right Side: Basic Analytics & History Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Visual Analytics Segment */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Category Outflow Metrics</h3>
            {Object.keys(categorySummary).length === 0 ? (
              <p style={{ fontSize: '13px', color: '#aaa', textAlign: 'center' }}>No outgoing expenses logged yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(categorySummary).map(([cat, amt]) => {
                  const percentage = totalExpense > 0 ? (amt / totalExpense) * 100 : 0;
                  return (
                    <div key={cat}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px', fontWeight: '500' }}>
                        <span>{cat}</span>
                        <span style={{ color: '#444' }}>${amt} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div style={{ width: '100%', background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${percentage}%`, background: '#6366f1', height: '100%', borderRadius: '4px', transition: 'width 0.3s ease' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detailed Audit Stream */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>Historical Audit Ledger</h3>
            <div style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '5px' }}>
              {transactions.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>{t.text}</p>
                    <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#64748b', marginTop: '3px', display: 'inline-block' }}>{t.category}</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: t.type === 'income' ? '#22c55e' : '#ef4444' }}>
                    {t.type === 'income' ? '+' : '-'}${t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}