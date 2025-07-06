
import { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { removeBackground, loadImage } from "@/utils/imageProcessing";

interface PhotoEditorProps {
  imageFile: File;
  onClose: () => void;
}

const PhotoEditor = ({ imageFile, onClose }: PhotoEditorProps) => {
  const [processedImage, setProcessedImage] = useState<string>('');
  const [originalImage, setOriginalImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useState(() => {
    const url = URL.createObjectURL(imageFile);
    setOriginalImage(url);
    setProcessedImage(url);
  }, [imageFile]);

  const handleRemoveBackground = async () => {
    setLoading(true);
    toast({
      title: "Processing...",
      description: "Removing background with AI. This may take a moment.",
    });

    try {
      const img = await loadImage(imageFile);
      const resultBlob = await removeBackground(img);
      const resultUrl = URL.createObjectURL(resultBlob);
      setProcessedImage(resultUrl);
      
      toast({
        title: "Success!",
        description: "Background removed successfully.",
      });
    } catch (error) {
      console.error('Background removal failed:', error);
      toast({
        title: "Error",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.filter = `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%)`;
      ctx.drawImage(img, 0, 0);
      
      const newImageUrl = canvas.toDataURL();
      setProcessedImage(newImageUrl);
    };
    img.src = originalImage;
  }, [brightness, contrast, saturation, originalImage]);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = `edited-${Date.now()}.png`;
    link.href = processedImage;
    link.click();
    
    toast({
      title: "Downloaded!",
      description: "Your edited image has been saved.",
    });
  };

  const resetImage = () => {
    setProcessedImage(originalImage);
    setBrightness([100]);
    setContrast([100]);
    setSaturation([100]);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Tools Sidebar */}
      <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold gradient-text">Photo Editor</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-6">
          {/* AI Tools */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">AI Tools</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={handleRemoveBackground}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Remove Background'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Adjustments */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Adjustments</h3>
              <div className="space-y-4">
                <div>
                  <Label>Brightness: {brightness[0]}%</Label>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    onValueCommit={applyFilters}
                    max={200}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Contrast: {contrast[0]}%</Label>
                  <Slider
                    value={contrast}
                    onValueChange={setContrast}
                    onValueCommit={applyFilters}
                    max={200}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label>Saturation: {saturation[0]}%</Label>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    onValueCommit={applyFilters}
                    max={200}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full" onClick={resetImage}>
                  Reset
                </Button>
                <Button className="w-full gradient-bg" onClick={downloadImage}>
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-8 canvas-area">
        <div className="relative max-w-4xl max-h-full">
          <img
            src={processedImage}
            alt="Edited"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            style={{
              filter: `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%)`
            }}
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default PhotoEditor;
