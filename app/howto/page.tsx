export default function HowTo() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen font-sans">
      <section className="content-section py-20 px-6 max-w-4xl mx-auto">
        <h1 className="section-title text-4xl font-sora font-bold text-[#2D5F7E] mb-6">How to Use Summit Funds</h1>
        <p className="section-text text-lg text-[#5A5A5A] mb-10">
          Get started with Summit Funds in four simple steps. Our platform guides you through every stage of your financial journey.
        </p>
        <div className="steps-container flex flex-col gap-8 mt-12">
          <div className="step-card bg-white p-8 rounded-2xl shadow-md flex gap-8 items-start">
            <div className="step-number w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white text-3xl font-bold">1</div>
            <div className="step-content">
              <h3 className="font-sora text-xl font-semibold mb-2">Sign Up and Complete the Quiz</h3>
              <p className="text-[#5A5A5A]">Create your account and take our comprehensive financial quiz. This helps us understand your income, expenses, goals, and financial habits so we can create a personalized plan.</p>
            </div>
          </div>
          <div className="step-card bg-white p-8 rounded-2xl shadow-md flex gap-8 items-start">
            <div className="step-number w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white text-3xl font-bold">2</div>
            <div className="step-content">
              <h3 className="font-sora text-xl font-semibold mb-2">Set Your Goals</h3>
              <p className="text-[#5A5A5A]">Define what you're working toward—whether it's an emergency fund, vacation, home purchase, or retirement. Set target amounts and timelines for each goal.</p>
            </div>
          </div>
          <div className="step-card bg-white p-8 rounded-2xl shadow-md flex gap-8 items-start">
            <div className="step-number w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white text-3xl font-bold">3</div>
            <div className="step-content">
              <h3 className="font-sora text-xl font-semibold mb-2">Receive Your Smart Budget Plan</h3>
              <p className="text-[#5A5A5A]">Based on your financial profile, we'll generate a customized budget plan that allocates your income across expenses, savings, and goals in an optimal way.</p>
            </div>
          </div>
          <div className="step-card bg-white p-8 rounded-2xl shadow-md flex gap-8 items-start">
            <div className="step-number w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white text-3xl font-bold">4</div>
            <div className="step-content">
              <h3 className="font-sora text-xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-[#5A5A5A]">Use your dashboard to monitor all your goals, expenses, and financial information in real-time. Adjust your plan as your situation changes.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
