export default function ScrollProgressBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 bg-white/[0.03]">
      <div
        data-scroll-progress
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#9A6EF5] via-[#4CE7FF] to-[#9A6EF5] shadow-[0_0_24px_rgba(76,231,255,0.45)]"
      />
    </div>
  );
}
