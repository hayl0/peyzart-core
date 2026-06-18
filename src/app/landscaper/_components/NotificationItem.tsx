'use client';

interface NotificationItemProps {
  title: string;
  desc: string;
  time: string;
  dotColor: string;
  bgClass: string;
}

export default function NotificationItem({ title, desc, time, dotColor, bgClass }: NotificationItemProps) {
  return (
    <div className={`flex gap-2.5 p-2 rounded-[10px] ${bgClass}`}>
      <div className={`w-[6px] h-[6px] rounded-full mt-1 ${dotColor}`} />
      <div>
        <div className="text-[11px] font-semibold text-white/65">{title}</div>
        <div className="text-[10px] text-white/25 mt-[1px]">{desc} · {time}</div>
      </div>
    </div>
  );
}
