
import { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface CropToolProps {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onClose: () => void;
}

const CropTool = ({ imageUrl, onCropComplete, onClose }: CropToolProps) => {
  const [cropX, setCropX] = useState([0]);
  const [cropY, setCropY] = useState([0]);
  const [cropWidth, setCropWidth] = useState([100]);
  const [cropHeight, setCropHeight] = useState([100]);
  const [rotation, setRotation] = useState([0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const applyCrop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Calculate crop dimensions
      const x = (cropX[0] / 100) * img.width;
      const y = (cropY[0] / 100) * img.height;
      const width = (cropWidth[0] / 100) * img.width;
      const height = (cropHeight[0] / 100) * img.height;

      canvas.width = width;
      canvas.height = height;

      // Apply rotation
      if (rotation[0] !== 0) {
        ctx.translate(width / 2, height / 2);
        ctx.rotate((rotation[0] * Math.PI) / 180);
        ctx.translate(-width / 2, -height / 2);
      }

      // Draw cropped image
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      const croppedImageUrl = canvas.toDataURL();
      onCropComplete(croppedImageUrl);
    };
    img.src = imageUrl;
  }, [imageUrl, cropX, cropY, cropWidth, cropHeight, rotation, onCropComplete]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Crop & Rotate</h3>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Preview */}
          <div className="flex items-center justify-center bg-accent/20 rounded-lg p-4 min-h-[300px]">
            <img
              src={imageUrl}
              alt="Crop preview"
              className="max-w-full max-h-full object-contain"
              style={{
                transform: `rotate(${rotation[0]}deg)`,
                clipPath: `inset(${cropY[0]}% ${100 - cropX[0] - cropWidth[0]}% ${100 - cropY[0] - cropHeight[0]}% ${cropX[0]}%)`
              }}
            />
          </div>

          {/* Controls */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label>Crop X: {cropX[0]}%</Label>
                <Slider
                  value={cropX}
                  onValueChange={setCropX}
                  max={100}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Crop Y: {cropY[0]}%</Label>
                <Slider
                  value={cropY}
                  onValueChange={setCropY}
                  max={100}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Width: {cropWidth[0]}%</Label>
                <Slider
                  value={cropWidth}
                  onValueChange={setCropWidth}
                  max={100}
                  min={10}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Height: {cropHeight[0]}%</Label>
                <Slider
                  value={cropHeight}
                  onValueChange={setCropHeight}
                  max={100}
                  min={10}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Rotation: {rotation[0]}°</Label>
                <Slider
                  value={rotation}
                  onValueChange={setRotation}
                  max={360}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={applyCrop} className="flex-1">
                  Apply Crop
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default CropTool;
