
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FileUpload from "./FileUpload";
import PhotoEditor from "./PhotoEditor";
import { Crop, User, Upload, Image } from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recentProjects] = useState([
    { id: 1, name: "Portrait Edit", date: "2024-01-15", type: "Background Removal" },
    { id: 2, name: "Product Photo", date: "2024-01-14", type: "Resize & Crop" },
    { id: 3, name: "Landscape", date: "2024-01-13", type: "Color Adjustment" },
  ]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleCloseEditor = () => {
    setSelectedFile(null);
  };

  if (selectedFile) {
    return <PhotoEditor imageFile={selectedFile} onClose={handleCloseEditor} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Crop className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PhotoAI Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" onClick={onLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to Your Creative Space
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Upload an image to start editing with AI-powered tools
              </p>
            </div>

            {/* Upload Area */}
            <FileUpload onFileSelect={handleFileSelect} />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crop className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Upload className="h-6 w-6 mb-2" />
                    Batch Upload
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Image className="h-6 w-6 mb-2" />
                    Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.date}</p>
                      </div>
                      <Badge variant="secondary">{project.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card>
              <CardHeader>
                <CardTitle>AI Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Background Removal</span>
                    <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Smart Crop</span>
                    <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto Enhance</span>
                    <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Color Correction</span>
                    <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Images Processed</span>
                      <span className="text-sm font-medium">24</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Storage Used</span>
                      <span className="text-sm font-medium">2.4 GB</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
