export default function CoreAttribution() {
  return (
    <div className="fixed bottom-6 right-8 z-[99] px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/50 flex items-center gap-1.5 shadow-lg group cursor-pointer hover:bg-white/80 transition-all">
      <span className="text-[10px] uppercase tracking-wider text-[rgba(30,50,90,0.6)] font-medium">Developed by</span>
      <a
        href="https://sitora.org"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] uppercase tracking-wider font-bold text-[rgba(30,50,90,0.9)] border-b border-[rgba(30,50,90,0.3)] hover:border-[rgba(30,50,90,0.95)] transition-all"
      >
        Sitora Web
      </a>
    </div>
  );
}
