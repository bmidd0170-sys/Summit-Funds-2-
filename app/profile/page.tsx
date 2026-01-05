"use client";
import React from "react";

export default function ProfilePage() {
  return (
    <main className="profile-container py-8 px-4 md:px-12 max-w-5xl mx-auto">
      {/* Profile Card */}
      <div className="profile-card bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="profile-header flex flex-col md:flex-row items-center gap-8 border-b-2 border-gray-200 pb-8 mb-8">
          <div className="profile-avatar w-28 h-28 rounded-full bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] flex items-center justify-center text-white text-4xl font-bold">
            JD
          </div>
          <div className="profile-info flex-1">
            <h2 className="text-2xl font-bold mb-1">John Doe</h2>
            <p className="text-[#5A5A5A] text-lg mb-2">john.doe@example.com</p>
            <button className="btn btn-secondary mt-2 px-4 py-2 rounded-lg border border-gray-300 font-semibold">Change Profile Picture</button>
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#2D5F7E] mb-6">Account Information</h3>
        <div className="info-row grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="info-field flex justify-between items-center bg-[#F8F9FA] rounded-lg p-4">
            <span className="info-label font-semibold">Name:</span>
            <span className="info-value text-[#5A5A5A]">John Doe</span>
          </div>
        </div>
        <div className="info-row grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="info-field flex justify-between items-center bg-[#F8F9FA] rounded-lg p-4">
            <span className="info-label font-semibold">Email:</span>
            <span className="info-value text-[#5A5A5A]">john.doe@example.com</span>
          </div>
          <button className="btn btn-secondary px-4 py-2 rounded-lg border border-gray-300 font-semibold">Change Email</button>
        </div>
        <div className="info-row grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="info-field flex justify-between items-center bg-[#F8F9FA] rounded-lg p-4">
            <span className="info-label font-semibold">Password:</span>
            <span className="info-value text-[#5A5A5A]">••••••••</span>
          </div>
          <button className="btn btn-secondary px-4 py-2 rounded-lg border border-gray-300 font-semibold">Change Password</button>
        </div>
      </div>

      {/* Financial Profile Card */}
      <div className="profile-card bg-white rounded-2xl shadow-lg p-8">
        <div className="section-header flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#2D5F7E]">Financial Profile</h3>
          <button className="btn btn-primary px-6 py-2 rounded-lg font-semibold">Update Profile</button>
        </div>
        <div className="financial-stats grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="stat-card bg-[#F8F9FA] rounded-lg p-6 text-center">
            <div className="stat-label text-xs uppercase text-[#8E8E8E] font-semibold mb-1">Total Amount</div>
            <div className="stat-value text-2xl font-bold text-[#2D5F7E]">$8,450</div>
          </div>
          <div className="stat-card bg-[#F8F9FA] rounded-lg p-6 text-center">
            <div className="stat-label text-xs uppercase text-[#8E8E8E] font-semibold mb-1">Number of Expenses</div>
            <div className="stat-value text-2xl font-bold text-[#2D5F7E]">127</div>
          </div>
          <div className="stat-card bg-[#F8F9FA] rounded-lg p-6 text-center">
            <div className="stat-label text-xs uppercase text-[#8E8E8E] font-semibold mb-1">Number of Goals</div>
            <div className="stat-value text-2xl font-bold text-[#2D5F7E]">3</div>
          </div>
        </div>
      </div>
    </main>
  );
}
