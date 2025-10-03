import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Download, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import prototypeImg from "@/assets/stage-prototype.png";
import esp32Img from "@/assets/stage-esp32.png";
import tinymlImg from "@/assets/stage-tinyml.png";
import safetyImg from "@/assets/stage-safety.png";
import productionImg from "@/assets/stage-production.png";

const models = [
  {
    id: "prototype",
    name: "Prototype Model",
    stage: "Stage 1",
    description: "Initial concept with basic suction mechanism",
    notes: "First functional prototype demonstrating wall adhesion principles",
    image: prototypeImg
  },
  {
    id: "stage2",
    name: "ESP32-CAM Integration",
    stage: "Stage 2",
    description: "Added camera module and WiFi streaming",
    notes: "Real-time video feed enables remote monitoring capability",
    image: esp32Img
  },
  {
    id: "stage3",
    name: "TinyML Version",
    stage: "Stage 3",
    description: "Integrated edge AI for defect detection",
    notes: "Onboard neural network provides instant crack identification",
    image: tinymlImg
  },
  {
    id: "stage4",
    name: "Safety Enhanced",
    stage: "Stage 4",
    description: "Added comprehensive safety systems",
    notes: "Edge detection, tether monitoring, and emergency stop features",
    image: safetyImg
  },
  {
    id: "current",
    name: "Current Production",
    stage: "Current",
    description: "Full-featured autonomous inspection platform",
    notes: "Complete IoT integration with OTA updates and dashboard control",
    image: productionImg
  }
];

const Explore = () => {
  const [selectedModel, setSelectedModel] = useState<string>("prototype");
  const [zoom, setZoom] = useState(100);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const currentModel = models.find(m => m.id === selectedModel);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">
            Explore <span className="gradient-text">Our Bot</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            View the 3D evolution models of S4V-WallBot through each development stage
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Image Viewer */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-8 space-y-6 animate-fade-in-up">
              <div className="relative aspect-video bg-muted/30 rounded-xl border-2 border-border overflow-hidden flex items-center justify-center">
                {currentModel?.image ? (
                  <img 
                    src={currentModel.image} 
                    alt={currentModel.name}
                    style={{ transform: `scale(${zoom / 100})`, transition: 'transform 0.3s ease' }}
                    className="max-w-full max-h-full object-contain cursor-zoom-in"
                    onClick={() => setFullscreenImage(currentModel.image)}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Box className="w-16 h-16 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No image available</p>
                  </div>
                )}
              </div>

              {/* Zoom controls */}
              <div className="flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setZoom(Math.max(50, zoom - 25))}
                  disabled={zoom <= 50}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground min-w-[60px] text-center">{zoom}%</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                  disabled={zoom >= 200}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {currentModel?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentModel?.stage}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {currentModel?.description}
                </p>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Technical Note:</span>{" "}
                    {currentModel?.notes}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <strong>Controls:</strong> Use zoom buttons to adjust view · Click image for fullscreen
                </p>
              </div>
            </Card>
          </div>

          {/* Model list */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Evolution Stages</h2>
            {models.map((model, index) => (
              <Card
                key={model.id}
                className={`p-4 cursor-pointer transition-all animate-fade-in-up ${
                  selectedModel === model.id
                    ? "glass-card border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                    : "bg-card hover:bg-card/80 border-border"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    selectedModel === model.id ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <Box className={`w-5 h-5 ${
                      selectedModel === model.id ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{model.name}</p>
                    <p className="text-xs text-muted-foreground">{model.stage}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Image Dialog */}
      <Dialog open={!!fullscreenImage} onOpenChange={() => setFullscreenImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          <img 
            src={fullscreenImage || ""} 
            alt="Fullscreen view"
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Explore;
