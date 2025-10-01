import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Square,
  Video,
  VideoOff,
  Lock,
  Unlock,
  AlertTriangle,
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Flame,
  Clock,
  CheckCircle,
  FileText,
  Wifi,
  Zap,
  Target,
  TrendingUp,
  Radio,
  Signal,
  Waves,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [streamActive, setStreamActive] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [lockEngaged, setLockEngaged] = useState(false);
  const [recentCommands, setRecentCommands] = useState<
    Array<{ cmd: string; status: "success" | "fail"; timestamp: string }>
  >([]);
  const [runtime, setRuntime] = useState(0);
  
  // Mock sensor data (replace with real data from ThingSpeak/Blynk)
  const [sensorData] = useState({
    dht11: { temp: 28.4, humidity: 56 },
    mq2: 120,
    mq135: 180,
    irSensor: { detections: 7, lastDetection: "2 min ago", active: true }
  });

  const [quickStats] = useState({
    totalDistance: 124.5,
    avgSpeed: 0.8,
    commandsExecuted: 342,
    uptime: 99.2
  });

  // Runtime tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setRuntime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatRuntime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendCommand = (cmd: string) => {
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    const timestamp = new Date().toLocaleTimeString();
    const newCommand = {
      cmd,
      status: Math.random() > 0.1 ? "success" : "fail" as "success" | "fail",
      timestamp
    };

    setRecentCommands(prev => [newCommand, ...prev].slice(0, 10));

    // TODO: Replace with actual API call
    // fetch('/api/robot/command', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ cmd, speed: speed[0] / 100 })
    // });

    toast.success(`Command sent: ${cmd}`);
  };

  const toggleStream = () => {
    setStreamActive(!streamActive);
    toast.info(streamActive ? "Stream stopped" : "Stream started");
  };

  const toggleLock = () => {
    if (!lockEngaged) {
      // Show confirmation for engaging lock
      if (confirm("Engage servo lock? This will secure the door/actuator.")) {
        setLockEngaged(true);
        toast.success("Lock engaged");
      }
    } else {
      setLockEngaged(false);
      toast.success("Lock disengaged");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header with Welcome Message */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success animate-pulse" />
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Hey! <span className="gradient-text">Your bot is up and running</span>
                  </h1>
                </div>
                <p className="text-muted-foreground">Remote robot operation and monitoring</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">{formatRuntime(runtime)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-card p-4 hover:scale-105 transition-transform duration-300 animate-fade-in-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="text-xl font-bold">{quickStats.totalDistance}m</p>
              </div>
            </div>
          </Card>
          
          <Card className="glass-card p-4 hover:scale-105 transition-transform duration-300 animate-fade-in-left" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Speed</p>
                <p className="text-xl font-bold">{quickStats.avgSpeed} m/s</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4 hover:scale-105 transition-transform duration-300 animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Commands</p>
                <p className="text-xl font-bold">{quickStats.commandsExecuted}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-4 hover:scale-105 transition-transform duration-300 animate-fade-in-left" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Activity className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Uptime</p>
                <p className="text-xl font-bold">{quickStats.uptime}%</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Camera & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera feed */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up glow-on-hover">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary animate-pulse" />
                  Live Camera Feed
                </h2>
                <Button
                  variant={streamActive ? "destructive" : "default"}
                  size="sm"
                  onClick={toggleStream}
                  className="hover:scale-105 transition-transform"
                >
                  {streamActive ? (
                    <>
                      <VideoOff className="w-4 h-4 mr-2" />
                      Stop Stream
                    </>
                  ) : (
                    <>
                      <Video className="w-4 h-4 mr-2" />
                      Start Stream
                    </>
                  )}
                </Button>
              </div>

              <div className="aspect-video bg-muted/30 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden relative group">
                {streamActive ? (
                  <div className="text-center space-y-2">
                    <div className="status-dot status-online mx-auto" />
                    <p className="text-sm text-muted-foreground animate-fade-in">
                      Stream URL: ws://your-server.example.com/stream
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Video className="w-12 h-12 mx-auto text-muted-foreground/50 animate-bounce-subtle" />
                    <p className="text-muted-foreground">Click "Start Stream" to begin</p>
                  </div>
                )}
                {streamActive && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                  </div>
                )}
              </div>
            </Card>

            {/* Movement controls */}
            <Card className="glass-card p-6 space-y-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Movement Controls</h2>
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Speed: {speed[0]}%</span>
                </div>
              </div>

              {/* Directional pad */}
              <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                <div className="col-start-2">
                  <Button
                    variant="control"
                    size="lg"
                    className="w-full aspect-square hover:scale-110 active:scale-95 transition-transform"
                    onClick={() => sendCommand("forward")}
                  >
                    <ArrowUp className="w-6 h-6" />
                  </Button>
                </div>
                <Button
                  variant="control"
                  size="lg"
                  className="w-full aspect-square hover:scale-110 active:scale-95 transition-transform"
                  onClick={() => sendCommand("left")}
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="w-full aspect-square hover:scale-110 active:scale-95 transition-transform animate-glow-pulse"
                  onClick={() => sendCommand("stop")}
                >
                  <Square className="w-6 h-6" />
                </Button>
                <Button
                  variant="control"
                  size="lg"
                  className="w-full aspect-square hover:scale-110 active:scale-95 transition-transform"
                  onClick={() => sendCommand("right")}
                >
                  <ArrowRight className="w-6 h-6" />
                </Button>
                <div className="col-start-2">
                  <Button
                    variant="control"
                    size="lg"
                    className="w-full aspect-square hover:scale-110 active:scale-95 transition-transform"
                    onClick={() => sendCommand("backward")}
                  >
                    <ArrowDown className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Speed slider */}
              <div className="space-y-2 pt-4">
                <Label className="text-sm font-medium">Motor Speed</Label>
                <Slider
                  value={speed}
                  onValueChange={setSpeed}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>

              {/* Servo/Lock control */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant={lockEngaged ? "destructive" : "outline"}
                  className="w-full hover:scale-105 transition-transform"
                  onClick={toggleLock}
                >
                  {lockEngaged ? (
                    <>
                      <Lock className="w-4 h-4 mr-2 animate-pulse" />
                      Disengage Lock
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 mr-2" />
                      Engage Lock
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right column - Status, Sensors & Commands */}
          <div className="space-y-6">
            {/* IR Sensor Widget */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up glow-on-hover" style={{ animationDelay: "0.15s" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Radio className="w-5 h-5 text-accent animate-pulse" />
                IR Proximity Sensor
              </h2>

              <div className="relative p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 overflow-hidden">
                {/* Radar Effect Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-accent animate-ping" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${sensorData.irSensor.active ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                      <span className="text-sm font-medium">
                        {sensorData.irSensor.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <Eye className="w-5 h-5 text-accent animate-bounce-subtle" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-background/60 backdrop-blur">
                      <p className="text-xs text-muted-foreground mb-1">Total Detections</p>
                      <p className="text-3xl font-bold text-accent">{sensorData.irSensor.detections}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/60 backdrop-blur">
                      <p className="text-xs text-muted-foreground mb-1">Last Detection</p>
                      <p className="text-sm font-semibold text-foreground">{sensorData.irSensor.lastDetection}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <Waves className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">
                      Captures screenshot on defect detection
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Network Status */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Wifi className="w-5 h-5 text-success" />
                Network Status
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30 hover:bg-success/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4 text-success" />
                    <span className="text-sm">ESP32 Connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="status-dot status-online" />
                    <span className="text-xs font-mono text-success">98ms</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30 hover:bg-success/20 transition-colors">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-success" />
                    <span className="text-sm">Camera Stream</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-success">30 FPS</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Signal Strength</span>
                    <span className="text-xs font-semibold text-primary">-42 dBm</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-success w-4/5 animate-pulse-glow" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Sensor Readings */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Environmental Sensors
              </h2>

              <div className="space-y-3">
                {/* DHT11 - Temperature & Humidity */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Thermometer className="w-4 h-4 text-primary animate-bounce-subtle" />
                    <span className="text-sm font-semibold">DHT11 Sensor</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="text-2xl font-bold text-primary">{sensorData.dht11.temp}°C</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Droplets className="w-3 h-3" />
                        Humidity
                      </p>
                      <p className="text-2xl font-bold text-cyan-400">{sensorData.dht11.humidity}%</p>
                    </div>
                  </div>
                </div>

                {/* MQ-2 Gas Sensor */}
                <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20 hover:bg-orange-500/10 transition-all hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                      <span className="text-sm font-semibold">MQ-2 (Flammable Gas)</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded transition-colors ${
                      sensorData.mq2 < 200 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {sensorData.mq2 < 200 ? 'Safe' : 'Alert'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-orange-500">{sensorData.mq2} <span className="text-sm text-muted-foreground">PPM</span></p>
                </div>

                {/* MQ-135 Air Quality */}
                <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 hover:bg-purple-500/10 transition-all hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-purple-500 animate-float" />
                      <span className="text-sm font-semibold">MQ-135 (Air Quality)</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded transition-colors ${
                      sensorData.mq135 < 250 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {sensorData.mq135 < 250 ? 'Good' : 'Moderate'}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-purple-500">{sensorData.mq135} <span className="text-sm text-muted-foreground">PPM</span></p>
                </div>
              </div>
            </Card>

            {/* Safety status */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Safety Status
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30 hover:bg-success/20 transition-all hover:scale-[1.02]">
                  <span className="text-sm">Edge Detection</span>
                  <div className="status-dot status-online" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30 hover:bg-success/20 transition-all hover:scale-[1.02]">
                  <span className="text-sm">Tether Tension</span>
                  <span className="text-xs text-success">Normal</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30 hover:bg-success/20 transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-success" />
                    <span className="text-sm">Battery Level</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-success font-semibold">87%</span>
                    <div className="w-16 h-1 bg-background rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-success w-[87%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All safety systems operational. Commands are enabled.
                </p>
              </div>
            </Card>

            {/* Recent commands */}
            <Card className="glass-card p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Command History</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Inspection Report</DialogTitle>
                      <DialogDescription>
                        Summary of detected defects and robot telemetry
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h3 className="font-semibold mb-2">Session Details</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><span className="text-muted-foreground">Runtime:</span> {formatRuntime(runtime)}</div>
                          <div><span className="text-muted-foreground">Commands Sent:</span> {recentCommands.length}</div>
                          <div><span className="text-muted-foreground">Temperature:</span> {sensorData.dht11.temp}°C</div>
                          <div><span className="text-muted-foreground">Humidity:</span> {sensorData.dht11.humidity}%</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          Detected Defects (3)
                        </h3>
                        <div className="space-y-3">
                          {[
                            { type: "Crack", severity: "High", lat: "12.9716°N", lon: "77.5946°E", alt: "45.2m" },
                            { type: "Rust Patch", severity: "Medium", lat: "12.9718°N", lon: "77.5948°E", alt: "43.8m" },
                            { type: "Surface Leak", severity: "Low", lat: "12.9720°N", lon: "77.5950°E", alt: "42.5m" }
                          ].map((defect, idx) => (
                            <div key={idx} className="p-3 rounded bg-background border border-border space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm">{defect.type}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                  defect.severity === "High" ? "bg-destructive/20 text-destructive" :
                                  defect.severity === "Medium" ? "bg-warning/20 text-warning" :
                                  "bg-muted text-muted-foreground"
                                }`}>
                                  {defect.severity}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground font-mono">
                                📍 {defect.lat}, {defect.lon} • Alt: {defect.alt}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                        <h3 className="font-semibold mb-2">Recommendations</h3>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Schedule immediate repair for high-severity crack</li>
                          <li>Monitor rust patch progression in next inspection</li>
                          <li>Verify surface leak source and drainage system</li>
                        </ul>
                      </div>

                      <Button className="w-full" onClick={() => toast.success("Report downloaded")}>
                        Download Full Report (PDF)
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {recentCommands.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No commands sent yet
                  </p>
                ) : (
                  recentCommands.map((cmd, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-sm ${
                        cmd.status === "success"
                          ? "bg-success/10 border-success/30"
                          : "bg-destructive/10 border-destructive/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-semibold">{cmd.cmd}</span>
                        <span
                          className={`text-xs ${
                            cmd.status === "success" ? "text-success" : "text-destructive"
                          }`}
                        >
                          {cmd.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{cmd.timestamp}</p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Backend integration note */}
        <Card className="glass-card p-6 mt-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-lg font-semibold mb-3">Backend Integration Notes</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Command endpoint:</strong> POST to
              <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                /api/robot/command
              </code>
            </p>
            <p>
              <strong className="text-foreground">Stream URL:</strong>
              <code className="ml-2 px-2 py-1 bg-muted rounded text-xs">
                ws://your-server.example.com/stream
              </code>
            </p>
            <p className="pt-2 text-xs">
              Replace placeholders with your Flask server endpoints. Commands should be forwarded to ESP32 via MQTT/Socket/Serial.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Simple Label component if not using shadcn
const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`block text-sm font-medium ${className}`}>{children}</label>
);

export default Dashboard;
