import { Badge } from "@/components/ui/badge";
import { Safari } from "@/components/magicui/safari";

function SolutionFeature() {
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
          <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
            <div>
              <Badge>Solution</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                Chat. Create. Teach.
              </h2>
              <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                Share your subject and topic in plain language. Specify grade level, goals, and preferences through our simple interface. Get professionally crafted lesson plans, guides, and assessments instantly.
              </p>
            </div>
          </div>
          <div className="w-full flex-1 lg:ml-8">
            <Safari
              url="tailark.ai/create"
              imageSrc="/dashboard_hero.png"
              className="w-full h-auto"
              width={800}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { SolutionFeature }; 