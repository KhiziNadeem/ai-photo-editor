
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { crop } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  return (
    <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
      <CardContent className="p-12">
        <div
          {...getRootProps()}
          className={`text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? 'scale-105' : ''
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
            <crop className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">
            {isDragActive ? 'Drop your image here' : 'Upload Your Photo'}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            Drag and drop an image file, or click to browse
          </p>
          
          <Button className="gradient-bg hover:opacity-90">
            Choose File
          </Button>
          
          <div className="mt-6 text-sm text-muted-foreground">
            Supports: PNG, JPG, JPEG, GIF, BMP, WebP
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
