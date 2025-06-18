import { Badge } from "@/components/ui/badge";
import { Safari } from "@/components/magicui/safari";

function Feature() {
  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
          <div className="w-full flex-1 lg:ml-8">
            <Safari
              url="tailark.ai"
              imageSrc="/dashboard_hero.png"
              className="w-full h-auto"
              width={800}
              height={500}
            />
          </div>
          <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
            <div>
              <Badge>Problem</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                Less Planning. More Teaching.
              </h2>
              <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                Teachers spend countless hours each week creating lesson plans, searching for resources, and aligning content with standards. This repetitive planning work leaves little time for what matters most: actual teaching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
