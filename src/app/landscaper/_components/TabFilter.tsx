'use client';

interface TabFilterProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export default function TabFilter({ tabs, active, onChange }: TabFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)}
          className={`px-4 py-2.5 rounded-[50px] text-xs font-semibold whitespace-nowrap border transition-all ${
            active === t
              ? 'bg-bright-green text-white border-bright-green'
              : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20'
          }`}>
          {t}
        </button>
      ))}
    </div>
  );
}
