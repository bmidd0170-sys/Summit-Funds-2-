export default function About() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen font-sans">
      <section className="content-section py-20 px-6 max-w-4xl mx-auto">
        <h1 className="section-title text-4xl font-sora font-bold text-[#2D5F7E] mb-6">About Summit Funds</h1>
        <p className="section-text text-lg text-[#5A5A5A] mb-6">
          Summit Funds is designed to solve a critical problem: many people struggle to manage their finances effectively, 
          leading to stress, missed opportunities, and financial instability. We believe that everyone deserves access to 
          smart financial tools that make budgeting simple and effective.
        </p>
        <p className="section-text text-lg text-[#5A5A5A] mb-10">
          Our platform combines intelligent budget planning, goal tracking, and real-time financial insights to help you 
          take control of your money. Whether you're saving for a vacation, planning for retirement, or just trying to 
          make ends meet, Summit Funds provides the tools and guidance you need to succeed.
        </p>

        <div className="section-title text-2xl font-sora font-semibold text-[#2D5F7E] mt-16 mb-6">Common Questions</div>
        <div className="space-y-4">
          <div className="feature-card bg-white p-8 rounded-xl shadow-md text-left">
            <h3 className="font-sora text-lg font-semibold mb-2">How does Summit Funds work?</h3>
            <p className="feature-desc text-[#5A5A5A]">We use a comprehensive financial quiz to understand your situation, then create a personalized budget plan and help you track progress toward your goals.</p>
          </div>
          <div className="feature-card bg-white p-8 rounded-xl shadow-md text-left">
            <h3 className="font-sora text-lg font-semibold mb-2">Is my financial data secure?</h3>
            <p className="feature-desc text-[#5A5A5A]">Absolutely. We use bank-level encryption and never share your personal information with third parties.</p>
          </div>
          <div className="feature-card bg-white p-8 rounded-xl shadow-md text-left">
            <h3 className="font-sora text-lg font-semibold mb-2">How much does it cost?</h3>
            <p className="feature-desc text-[#5A5A5A]">Summit Funds offers a free tier with essential features, plus premium plans for advanced analytics and personalized coaching.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
