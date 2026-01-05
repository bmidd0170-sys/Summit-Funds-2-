import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="logo flex items-center gap-2 font-sora text-2xl font-bold text-[#2D5F7E]">
        <span className="logo-icon w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#2D5F7E] to-[#4A7FA0] text-white font-bold text-lg">S</span>
        <span>Summit Funds</span>
      </Link>
      <div className="nav-links flex gap-8 items-center">
        <Link href="/about" className="nav-link text-[#5A5A5A] font-medium hover:text-[#2D5F7E] border-b-2 border-transparent hover:border-[#2D5F7E] transition">About</Link>
        <Link href="/howto" className="nav-link text-[#5A5A5A] font-medium hover:text-[#2D5F7E] border-b-2 border-transparent hover:border-[#2D5F7E] transition">How To</Link>
        <Link href="/login" className="btn btn-primary bg-gradient-to-r from-[#2D5F7E] to-[#4A7FA0] text-white px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition">Login/Register</Link>
      </div>
    </nav>
  );
}
