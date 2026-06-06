export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white py-10 rounded-2xl shadow-xl mb-8 border border-slate-800/50">
      {/* Decorative background glow elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
            📋 TaskCenter
          </h1>
          <p className="text-indigo-200/80 font-medium text-sm md:text-base max-w-md">
            Streamline your daily workflow, track progress, and crush your academic goals.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 backdrop-blur-sm">
            v2.0 Dashboard
          </span>
        </div>
      </div>
    </header>
  );
}