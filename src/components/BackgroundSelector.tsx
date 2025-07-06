
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface BackgroundSelectorProps {
  onBackgroundSelect: (backgroundUrl: string, type: 'gradient' | 'image') => void;
  onClose: () => void;
}

const BackgroundSelector = ({ onBackgroundSelect, onClose }: BackgroundSelectorProps) => {
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const gradientBackgrounds = [
    { name: 'Sunset', value: 'linear-gradient(135deg, #ff6b6b, #feca57)' },
    { name: 'Ocean', value: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { name: 'Forest', value: 'linear-gradient(135deg, #11998e, #38ef7d)' },
    { name: 'Purple Dream', value: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
    { name: 'Fire', value: 'linear-gradient(135deg, #ff9a9e, #fecfef)' },
    { name: 'Sky', value: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
    { name: 'Mint', value: 'linear-gradient(135deg, #00b894, #00cec9)' },
    { name: 'Rose Gold', value: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  ];

  const presetBackgrounds = [
    { 
      name: 'Starry Night', 
      url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1920&h=1080&fit=crop&crop=center',
      thumbnail: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=200&h=120&fit=crop&crop=center'
    },
    { 
      name: 'Mountain Dawn', 
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop&crop=center',
      thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=120&fit=crop&crop=center'
    },
    { 
      name: 'Ocean Wave', 
      url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&h=1080&fit=crop&crop=center',
      thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=200&h=120&fit=crop&crop=center'
    },
    { 
      name: 'Desert Dunes', 
      url: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=1920&h=1080&fit=crop&crop=center',
      thumbnail: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=200&h=120&fit=crop&crop=center'
    },
    { 
      name: 'Forest Light', 
      url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1920&h=1080&fit=crop&crop=center',
      thumbnail: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=200&h=120&fit=crop&crop=center'
    },
    { 
      name: 'Lake Reflection', 
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop&crop=center',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=120&fit=crop&crop=center'
    },
  ];

  const handleCustomUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedBackground(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyBackground = () => {
    if (selectedBackground) {
      onBackgroundSelect(selectedBackground, selectedBackground.startsWith('linear-gradient') ? 'gradient' : 'image');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Select Background</h3>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-8">
          {/* Gradient Backgrounds */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">Color Gradients</Label>
            <div className="grid grid-cols-4 gap-4">
              {gradientBackgrounds.map((bg) => (
                <div
                  key={bg.name}
                  className={`relative h-20 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedBackground === bg.value ? 'border-primary scale-105' : 'border-transparent hover:scale-102'
                  }`}
                  style={{ background: bg.value }}
                  onClick={() => setSelectedBackground(bg.value)}
                >
                  <div className="absolute inset-0 bg-black/20 rounded-lg flex items-end p-2">
                    <span className="text-white text-xs font-medium">{bg.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preset Images */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">Preset Backgrounds</Label>
            <div className="grid grid-cols-3 gap-4">
              {presetBackgrounds.map((bg) => (
                <div
                  key={bg.name}
                  className={`relative h-24 rounded-lg cursor-pointer border-2 transition-all overflow-hidden ${
                    selectedBackground === bg.url ? 'border-primary scale-105' : 'border-transparent hover:scale-102'
                  }`}
                  onClick={() => setSelectedBackground(bg.url)}
                >
                  <img
                    src={bg.thumbnail}
                    alt={bg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-end p-2">
                    <span className="text-white text-xs font-medium">{bg.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Upload */}
          <div>
            <Label className="text-lg font-semibold mb-4 block">Custom Background</Label>
            <Card>
              <CardContent className="p-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCustomUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-20 border-dashed"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-6 w-6" />
                    <span>Upload Custom Background</span>
                  </div>
                </Button>
                {selectedBackground && !selectedBackground.startsWith('linear-gradient') && !selectedBackground.startsWith('https://') && (
                  <div className="mt-4">
                    <img
                      src={selectedBackground}
                      alt="Custom background preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={applyBackground} disabled={!selectedBackground} className="flex-1">
              Apply Background
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelector;
