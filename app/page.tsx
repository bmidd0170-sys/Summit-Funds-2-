
export default function Home() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <h1 className="font-sora text-4xl md:text-6xl font-extrabold mb-6 text-[#1A1A1A] leading-tight">Grow Wealth and Obtain Knowledge of How to Keep It</h1>
        <p className="text-xl md:text-2xl text-[#5A5A5A] mb-12 font-normal">Smart budgeting, goal tracking, and financial insights all in one place</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center hero-cta">
          <a href="/register" className="btn btn-primary bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition">Get Started</a>
          <a href="/about" className="btn btn-secondary bg-[#F8F9FA] text-[#1A1A1A] border-2 border-[#E0E4E8] px-8 py-3 rounded-lg font-semibold hover:bg-white hover:border-[#2D5F7E] transition">Learn More</a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <div className="feature-card bg-white p-10 rounded-2xl shadow-md text-center hover:shadow-xl transition">
            <div className="feature-icon w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white text-4xl">📊</div>
            <h3 className="feature-title font-sora text-xl font-semibold mb-2">Real Time Dashboard</h3>
            <p className="feature-desc text-[#5A5A5A]">Monitor your finances with live updates and comprehensive insights</p>
          </div>
          <div className="feature-card bg-white p-10 rounded-2xl shadow-md text-center hover:shadow-xl transition">
            <div className="feature-icon w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white text-4xl">💰</div>
            <h3 className="feature-title font-sora text-xl font-semibold mb-2">Smart Budget Plan</h3>
            <p className="feature-desc text-[#5A5A5A]">Personalized budget recommendations based on your financial profile</p>
          </div>
          <div className="feature-card bg-white p-10 rounded-2xl shadow-md text-center hover:shadow-xl transition">
            <div className="feature-icon w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white text-4xl">🎯</div>
            <h3 className="feature-title font-sora text-xl font-semibold mb-2">Goal Tracking</h3>
            <p className="feature-desc text-[#5A5A5A]">Set and achieve your financial goals with progress tracking</p>
          </div>
          <div className="feature-card bg-white p-10 rounded-2xl shadow-md text-center hover:shadow-xl transition">
            <div className="feature-icon w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white text-4xl">📝</div>
            <h3 className="feature-title font-sora text-xl font-semibold mb-2">Financial Quiz</h3>
            <p className="feature-desc text-[#5A5A5A]">Build your personalized financial profile with our comprehensive quiz</p>
          </div>
        </div>
      </section>
    </main>
  );
}
