'use client';

interface GoodEveningProps {
  name: string;
}

export default function GoodEvening({ name }: GoodEveningProps) {
  return (
    <div className="w-full h-[12rem] flex items-end justify-start p-5 rounded-[20px] bg-gradient-to-r to-[#669281] from-[#205B45]">
      <p className="text-white text-4xl font-semibold">Good Day {name ? name.substring(0,10): "Ser."}</p>
    </div>
  );
};
