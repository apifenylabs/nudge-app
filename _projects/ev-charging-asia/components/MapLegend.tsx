export default function MapLegend() {
  return (
    <div className="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-3 text-xs">
      <div className="font-semibold mb-1.5 text-gray-700">🔌 Charger Types</div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">C</span>
          <span>CCS2</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">H</span>
          <span>CHAdeMO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold">T</span>
          <span>Type 2 AC</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold">G</span>
          <span>GB/T</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">N</span>
          <span>NACS</span>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-2 pt-2">
        <div className="font-semibold mb-1 text-gray-700">⚡ Power Level</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span>Fast (150kW+)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Medium (50-150kW)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
          <span>Slow (&lt;50kW)</span>
        </div>
      </div>
    </div>
  );
}
