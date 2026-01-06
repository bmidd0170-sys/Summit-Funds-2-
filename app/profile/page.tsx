"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function ProfilePage() {
    const [authUser, setAuthUser] = useState<{ email: string | null; name: string | null }>({ email: null, name: null });
    const [profile, setProfile] = useState<{ name: string | null; email: string } | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setAuthUser({ email: user?.email ?? null, name: user?.displayName ?? null });

            if (!user?.email) {
                setProfile(null);
                setLoadingProfile(false);
                return;
            }

            try {
                const res = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`);
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data.user);
                } else {
                    setProfile(null);
                }
            } catch (err) {
                console.error("Failed to load profile", err);
                setProfile(null);
            } finally {
                setLoadingProfile(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const displayName = profile?.name || authUser.name || "User";
    const displayEmail = profile?.email || authUser.email || "";

    async function handleSignOut() {
        try {
            await signOut(auth);
            window.location.href = "/";
        } catch (err) {
            console.error("Sign out failed", err);
        }
    }

    return (
        <main className="profile-container py-8 px-4 md:px-12 max-w-5xl mx-auto">
            {/* Profile Card */}
            <div className="profile-card bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="profile-header flex flex-col md:flex-row items-center gap-8 border-b-2 border-gray-200 pb-8 mb-8">
                    <div className="profile-avatar w-28 h-28 rounded-full bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] flex items-center justify-center text-white text-4xl font-bold">
                        {displayName ? displayName.slice(0, 2).toUpperCase() : "JD"}
                    </div>
                    <div className="profile-info flex-1">
                        <h2 className="text-2xl font-bold mb-1">{displayName || "Loading..."}</h2>
                        <p className="text-[#5A5A5A] text-lg mb-2">{displayEmail || ""}</p>
                        <button className="btn btn-secondary mt-2 px-4 py-2 rounded-lg border border-gray-300 font-semibold">Change Profile Picture</button>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-[#2D5F7E] mb-6">Account Information</h3>
                <div className="info-row grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="info-field flex justify-between items-center bg-[#F8F9FA] rounded-lg p-4">
                        <span className="info-label font-semibold">Name:</span>
                        <span className="info-value text-[#5A5A5A]">{displayName || ""}</span>
                    </div>
                </div>
                <div className="info-row grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="info-field flex justify-between items-center bg-[#F8F9FA] rounded-lg p-4">
                        <span className="info-label font-semibold">Email:</span>
                        <span className="info-value text-[#5A5A5A]">{displayEmail || ""}</span>
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
                {loadingProfile && <div className="text-center text-[#5A5A5A] mb-2">Loading profile...</div>}
                <button
                    className="btn btn-primary w-full mt-4 py-3 bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] text-white rounded-lg font-semibold shadow hover:scale-105 transition"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
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
