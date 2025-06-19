import {
  Bell,
  Calendar,
  FileText,
  Globe,
  Search,
} from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Globe as GlobeComponent } from "@/components/magicui/globe";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Waves } from "@/components/bento/wave-background";
import { Meteors } from "@/components/magicui/meteors";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { MagnetLines } from "@/components/ui/magnet-lines";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const features = [
  // First 5 cards - exact same as demo.tsx
  {
    Icon: FileText,
    name: "Inline renders",
    description: "View components, hooks, and more inside your IDE.",
    href: "/",
    cta: "Learn more",
    background: <div className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3 relative",
    splashCursor: (
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <SplashCursor 
          SIM_RESOLUTION={64}
          DYE_RESOLUTION={512}
          DENSITY_DISSIPATION={1.9}
          VELOCITY_DISSIPATION={1.5}
          PRESSURE={0.12}
          CURL={2}
          SPLAT_RADIUS={0.15}
          SPLAT_FORCE={5000}
          COLOR_UPDATE_SPEED={8}
          TRANSPARENT={true}
        />
      </div>
    ),
  },
  {
    Icon: Search,
    name: "Performance Metrics",
    description: "Monitor your app's performance in real-time.",
    href: "/",
    cta: "Learn more",
    background: (
      <Waves 
        className="absolute inset-0"
        strokeColor="#CBCADB"
        backgroundColor="transparent"
        pointerSize={0.3}
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Globe,
    name: "Lightweight",
    description: "Best in class performance: <4kB gzipped and <1% of JS execution time.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        <Meteors 
          number={30}
          className="!bg-[#BA5E7A] shadow-[0_0_0_1px_#BA5E7A40] [&>div]:!bg-gradient-to-r [&>div]:!from-[#BA5E7A] [&>div]:!to-transparent"
        />
      </div>
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Calendar,
    name: "Optimizing Compiler",
    description: "Use the Million.js compiler to optimize DOM-heavy operations by up to 70%.",
    href: "/",
    cta: "Learn more",
    background: (
      <GridPattern
        width={32}
        height={32}
        x={-1}
        y={-1}
        strokeDasharray="0"
        className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] fill-gray-300/70 stroke-gray-300/50"
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [7, 8],
          [13, 5],
          [2, 12],
        ]}
      />
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Bell,
    name: "Replay",
    description: "Investigate and reproduce performance issues.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        <MagnetLines 
          rows={9}
          columns={9}
          containerSize="100%"
          lineColor="tomato"
          lineWidth="0.8vmin"
          lineHeight="5vmin"
          baseAngle={0}
          className="opacity-90"
        />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
  },
  // Two new cards for the 4th row
  {
    Icon: Globe,
    name: "Production observability",
    description: "Collect production application data (errors, performance) and see it in your IDE.",
    href: "/",
    cta: "Learn more",
    background: (
      <GlobeComponent 
        className="absolute -right-20 -bottom-[307px] h-[614px] w-[614px] opacity-60" 
      />
    ),
    className: "lg:col-start-1 lg:col-end-3 lg:row-start-4 lg:row-end-5",
  },
  {
    Icon: Calendar,
    name: "24/7 support",
    description: "Can't solve a problem? We're here to help.",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 overflow-hidden flex items-start justify-end p-2 pointer-events-none">
        <CalendarComponent 
          className="opacity-60 scale-[0.85] -mt-2 border-2 border-gray-300/60 rounded-md bg-white/20"
        />
      </div>
    ),
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-4 lg:row-end-5",
  },
];

function BentoDemo() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#E8E5DB' }}>
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:text-4xl">
            AI Features Built for Modern Classrooms
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-caudex md:text-2xl">
            From auto-generated lesson plans to adaptive assessments, everything you need to save time and teach smarter.
          </p>
        </div>

        {/* Bento Grid */}
        <div 
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4"
          style={{
            gridTemplateRows: '16rem 16rem 16rem 22rem'
          }}
        >
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { BentoDemo }; 