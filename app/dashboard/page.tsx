
"use client";
import React, { useState } from "react";

export default function DashboardPage() {
      // State for created budget plans
      const [budgetPlans, setBudgetPlans] = useState<Array<{ name: string; amount: string }>>([]);
    // Handlers for goal modal
    const handleOpenModal = () => setShowGoalModal(true);
    const handleCloseModal = () => {
      setShowGoalModal(false);
      setGoalName("");
      setGoalDesc("");
      setGoalDate("");
      setGoalAmount("");
    };
    const handleGoalSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setGoals([
        ...goals,
        {
          name: goalName,
          desc: goalDesc,
          date: goalDate,
          amount: goalAmount,
        },
      ]);
      handleCloseModal();
    };
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalDesc, setGoalDesc] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goals, setGoals] = useState<Array<{ name: string; desc: string; date: string; amount: string }>>([]);

  // Budget modal state
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  // Suggestions are always shown at the bottom of the modal

  const handleOpenBudgetModal = () => {
    setShowBudgetModal(true);
    // setBudgetSuggestions removed
  };
  const handleCloseBudgetModal = () => {
    setShowBudgetModal(false);
    // Removed: setProfileIncome, setProfileExpenses, setProfileOther
    // setBudgetSuggestions removed
  };

  // Generate suggestions live as user types

  // Fetch AI suggestion when budgetName, budgetAmount, or goals change
  React.useEffect(() => {
    if (!budgetName || !budgetAmount) {
      setAiSuggestion("Enter a name and amount for your budget to get tips.");
      return;
    }
    setAiLoading(true);
    setAiError("");
    fetch("/api/budget-suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budgetName, budgetAmount, goals }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setAiSuggestion(data.suggestion);
      })
      .catch(() => setAiError("Could not fetch suggestion."))
      .finally(() => setAiLoading(false));
  }, [budgetName, budgetAmount, goals]);

  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add the new budget plan to the list
    setBudgetPlans([
      ...budgetPlans,
      { name: budgetName, amount: budgetAmount },
    ]);
    setBudgetName("");
    setBudgetAmount("");
    handleCloseBudgetModal();
  };
  return (
    <main className="dashboard bg-[#F8F9FA] min-h-screen font-sans p-6 md:p-12">
      <div className="dashboard-header mb-8">
        <h1 className="dashboard-title text-3xl md:text-4xl font-bold text-[#2D5F7E] mb-2">Dashboard</h1>
        <p className="text-[#5A5A5A] text-lg">Welcome back! Here's your financial overview</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="stat-label text-xs uppercase text-[#8E8E8E] font-semibold mb-1">Total Balance</div>
          <div className="stat-value text-2xl font-bold text-[#2D5F7E]">$8,450.00</div>
        </div>
        <div className="stat-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="stat-label text-xs uppercase text-[#8E8E8E] font-semibold mb-1">Monthly Income</div>
          <div className="stat-value text-2xl font-bold text-[#2D5F7E]">$4,200.00</div>
        </div>
        <div className="stat-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="stat-label text-xs uppercase text-[#8E8E8E] font-semibold mb-1">Monthly Expenses</div>
          <div className="stat-value text-2xl font-bold text-[#2D5F7E]">$2,890.00</div>
        </div>
        <div className="stat-card bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <div className="stat-label text-xs uppercase text-[#8E8E8E] font-semibold mb-1">Savings</div>
          <div className="stat-value text-2xl font-bold text-[#2D5F7E]">$1,310.00</div>
        </div>
      </div>


      {/* Budget Plans Section */}
      <div className="budget-section bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="section-header flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#2D5F7E]">Budget Plans</h2>
          <button
            className="btn btn-primary bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
            onClick={handleOpenBudgetModal}
          >
            Create Budget Plan
          </button>
        </div>
        {/* ...existing code for budget plan cards... */}
      </div>

      {/* Modal for creating a new budget plan (now outside budget-section) */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={handleCloseBudgetModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#2D5F7E]">Create Budget Plan</h2>
            <form onSubmit={handleBudgetSubmit} className="space-y-4 pb-20">
              <div>
                <label className="block font-semibold mb-1">Budget Name</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2D5F7E]"
                  value={budgetName}
                  onChange={e => setBudgetName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Budget Amount</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2D5F7E]"
                  value={budgetAmount}
                  onChange={e => setBudgetAmount(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                  onClick={handleCloseBudgetModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
                >
                  Create Plan
                </button>
              </div>
            </form>
            {/* AI Suggestions always visible at the bottom */}
            <div className="fixed left-0 right-0 bottom-0 p-4 bg-white border-t border-gray-200 z-50 max-w-md mx-auto rounded-b-xl shadow-lg">
              <h3 className="text-sm font-bold mb-1 text-[#2D5F7E]">AI Tips & Suggestions</h3>
              {aiLoading ? (
                <div className="text-xs text-gray-500">Loading suggestions...</div>
              ) : aiError ? (
                <div className="text-xs text-red-500">{aiError}</div>
              ) : (
                <pre className="bg-gray-100 rounded p-2 text-xs whitespace-pre-wrap mb-0">{aiSuggestion}</pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Goals Section */}
      <div className="budget-section bg-white rounded-xl shadow-md p-6">
        <div className="section-header flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#2D5F7E]">Your Goals</h2>
          <button
            className="btn btn-primary bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
            onClick={handleOpenModal}
          >
            Add New Goal
          </button>
        </div>
              {/* Modal for adding a new goal */}
              {showGoalModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                      onClick={handleCloseModal}
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4 text-[#2D5F7E]">Add New Goal</h2>
                    <form onSubmit={handleGoalSubmit} className="space-y-4">
                      <div>
                        <label className="block font-semibold mb-1">Name</label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2D5F7E]"
                          value={goalName}
                          onChange={e => setGoalName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                          className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2D5F7E]"
                          value={goalDesc}
                          onChange={e => setGoalDesc(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Target Date</label>
                        <input
                          type="date"
                          className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2D5F7E]"
                          value={goalDate}
                          onChange={e => setGoalDate(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Goal Amount</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2D5F7E]"
                          value={goalAmount}
                          onChange={e => setGoalAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
                        >
                          Add Goal
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
        <div className="goals-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Render user-added goals as cards */}
          {goals.map((goal: { name: string; desc: string; date: string; amount: string }, idx: number) => (
            <div key={idx} className="goal-card bg-[#F8F9FA] rounded-lg p-6 shadow">
              <div className="goal-icon text-3xl mb-2">🎯</div>
              <h3 className="goal-name font-semibold text-lg mb-1">{goal.name}</h3>
              <p className="goal-target text-xs text-[#8E8E8E] mb-2">Target: {goal.date}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] h-2 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <div className="goal-amount flex justify-between text-sm">
                <span className="goal-current font-semibold text-[#2D5F7E]">$0</span>
                <span>of ${goal.amount}</span>
              </div>
              <p className="text-xs text-[#5A5A5A] mt-2">{goal.desc}</p>
            </div>
          ))}
          {/* Example static cards */}
          <div className="goal-card bg-[#F8F9FA] rounded-lg p-6 shadow">
            <div className="goal-icon text-3xl mb-2">✈️</div>
            <h3 className="goal-name font-semibold text-lg mb-1">Vacation Fund</h3>
            <p className="goal-target text-xs text-[#8E8E8E] mb-2">Target: June 2026</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] h-2 rounded-full" style={{ width: "65%" }}></div>
            </div>
            <div className="goal-amount flex justify-between text-sm">
              <span className="goal-current font-semibold text-[#2D5F7E]">$3,250</span>
              <span>of $5,000</span>
            </div>
          </div>
          <div className="goal-card bg-[#F8F9FA] rounded-lg p-6 shadow">
            <div className="goal-icon text-3xl mb-2">🏠</div>
            <h3 className="goal-name font-semibold text-lg mb-1">Emergency Fund</h3>
            <p className="goal-target text-xs text-[#8E8E8E] mb-2">Target: December 2026</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] h-2 rounded-full" style={{ width: "42%" }}></div>
            </div>
            <div className="goal-amount flex justify-between text-sm">
              <span className="goal-current font-semibold text-[#2D5F7E]">$4,200</span>
              <span>of $10,000</span>
            </div>
          </div>
          <div className="goal-card bg-[#F8F9FA] rounded-lg p-6 shadow">
            <div className="goal-icon text-3xl mb-2">💻</div>
            <h3 className="goal-name font-semibold text-lg mb-1">New Laptop</h3>
            <p className="goal-target text-xs text-[#8E8E8E] mb-2">Target: March 2026</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] h-2 rounded-full" style={{ width: "88%" }}></div>
            </div>
            <div className="goal-amount flex justify-between text-sm">
              <span className="goal-current font-semibold text-[#2D5F7E]">$1,320</span>
              <span>of $1,500</span>
            </div>
          </div>
        </div>
      </div>



    
    </main>
  );
}

