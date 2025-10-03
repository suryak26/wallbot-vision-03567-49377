import { Card } from "@/components/ui/card";
import { Lightbulb, Sparkles, Trophy, Zap } from "lucide-react";

const highlights = [
  {
    icon: Lightbulb,
    title: "Edge AI Processing",
    description: "Unlike cloud-dependent solutions, S4V-WallBot runs TinyML models directly on-device for instant defect detection without network latency or privacy concerns."
  },
  {
    icon: Zap,
    title: "Hybrid Adhesion System",
    description: "Proprietary combination of vacuum suction and motorized wheels adapts to diverse surfaces—concrete, glass, metal—where competitors fail on texture variations."
  },
  {
    icon: Sparkles,
    title: "Real-Time IoT Telemetry",
    description: "Live sensor fusion from DHT11, MQ2, MQ135, and IR sensors streams to a custom dashboard with OTA firmware updates, enabling continuous improvement post-deployment."
  },
  {
    icon: Trophy,
    title: "Safety-First Architecture",
    description: "Multi-layered fail-safes including edge detection, emergency stop, and tether monitoring ensure zero-accident operation—a critical differentiator in high-risk inspection scenarios."
  }
];

export const Uniqueness = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Uniqueness & <span className="gradient-text">Novelty</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            What sets S4V-WallBot apart from traditional inspection methods and competing robotics solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {highlights.map((highlight, index) => (
            <Card
              key={highlight.title}
              className="glass-card p-8 space-y-4 glow-on-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <highlight.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{highlight.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {highlight.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Key Innovation Callout */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="glass-card p-8 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-lg">Core Innovation</h4>
                <p className="text-muted-foreground leading-relaxed">
                  S4V-WallBot is the first student-built autonomous wall crawler to integrate <strong>onboard TinyML inference</strong>, 
                  <strong> multi-sensor IoT telemetry</strong>, and <strong>adaptive surface adhesion</strong> in a single platform—
                  delivering enterprise-grade structural inspection capabilities at a fraction of traditional costs.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};