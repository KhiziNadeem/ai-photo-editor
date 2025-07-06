
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import PhotoEditor from "@/components/PhotoEditor";

const EditorPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      <header className="border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <crop className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PhotoAI Editor</span>
          </div>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Start Editing Your Photo
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload an image to begin editing with our AI-powered tools
            </p>
          </div>
          
          <FileUpload onFileSelect={handleFileSelect} />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
