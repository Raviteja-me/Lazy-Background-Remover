import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { removeBackground } from '@imgly/background-removal';
import { 
  UploadCloud, Download, Share2, Trash2, Undo, Loader, X 
} from 'lucide-react';
import ImageComparisonSlider from '../components/ImageComparisonSlider';

interface ProcessedImage {
  id: string;
  originalUrl: string;
  processedUrl: string | null;
  fileName: string;
  status: 'processing' | 'completed' | 'error';
  error?: string;
}

const EditorPage: React.FC = () => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async (file: File): Promise<string> => {
    try {
      // Convert File to Blob
      const blob = new Blob([file], { type: file.type });
      
      // Remove background with smaller output size
      const processedBlob = await removeBackground(blob, {
        // Reduce output quality for smaller file size
        quality: 0.8,
        // Resize large images to reduce processing time and output size
        resize: {
          width: 1024,
          height: 1024,
          fit: 'inside'
        }
      });
      
      // Convert Blob to data URL
      return URL.createObjectURL(processedBlob);
    } catch (err) {
      throw new Error('Failed to process image. Please try again.');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    // Create new image entries with pending status
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      originalUrl: URL.createObjectURL(file),
      processedUrl: null,
      fileName: file.name,
      status: 'processing' as const
    }));
    
    setImages(prev => [...prev, ...newImages]);
    setIsProcessing(true);
    
    // Process each image sequentially to avoid overwhelming the browser
    for (const [index, file] of acceptedFiles.entries()) {
      const imageId = newImages[index].id;
      try {
        const result = await processImage(file);
        
        // Update the specific image with its processed result
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, processedUrl: result, status: 'completed' as const } 
            : img
        ));
      } catch (error) {
        // Update the specific image with error status
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, status: 'error' as const, error: (error as Error).message } 
            : img
        ));
        console.error('Error processing image:', error);
      }
    }
    
    setIsProcessing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true // Enable multiple file selection
  });

  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleRemoveAll = () => {
    // Revoke all object URLs to prevent memory leaks
    images.forEach(img => {
      if (img.originalUrl) URL.revokeObjectURL(img.originalUrl);
      if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
    });
    setImages([]);
  };

  const handleDownload = (image: ProcessedImage) => {
    if (!image.processedUrl) return;
    
    const link = document.createElement('a');
    link.href = image.processedUrl;
    link.download = `bg-removed-${image.fileName || 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleDownloadAll = () => {
    // For each completed image, trigger download
    images.forEach(image => {
      if (image.status === 'completed' && image.processedUrl) {
        handleDownload(image);
      }
    });
  };
  
  const handleShare = async (image: ProcessedImage) => {
    if (!image.processedUrl) return;
    
    try {
      // Try using the Web Share API first
      if (navigator.share) {
        // Create a blob from the image URL
        const response = await fetch(image.processedUrl);
        const blob = await response.blob();
        const file = new File([blob], `bg-removed-${image.fileName || 'image.png'}`, { type: blob.type });
        
        await navigator.share({
          title: 'My Background-Removed Image',
          text: 'Check out this image I created with LazyRemover!',
          files: [file]
        });
        return;
      }
      
      // Fallback for browsers that don't support Web Share API
      const input = document.createElement('input');
      input.value = image.processedUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      
      alert('Image link copied to clipboard! You can now paste it to share.');
    } catch (error) {
      console.error('Error sharing image:', error);
      alert('Failed to share image. Please try downloading and sharing manually.');
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Background Remover</span> Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload multiple images and we'll automatically remove the backgrounds for you.
            Get professional results in seconds.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 mb-8"
          >
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
                  <UploadCloud size={32} className="text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold">
                  {isDragActive ? 'Drop your images here' : 'Drag & drop your images here'}
                </h3>
                <p className="text-gray-500 mb-2">
                  or click to browse your files
                </p>
                <p className="text-sm text-gray-400">
                  Supports multiple JPG and PNG files up to 10MB each
                </p>
              </div>
            </div>
          </motion.div>
          
          {images.length > 0 && (
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Images ({images.length})</h2>
              <div className="flex gap-2">
                {images.some(img => img.status === 'completed') && (
                  <button 
                    onClick={handleDownloadAll}
                    className="btn btn-primary flex items-center justify-center gap-2 text-sm py-2"
                  >
                    <Download size={16} />
                    Download All
                  </button>
                )}
                <button 
                  onClick={handleRemoveAll}
                  className="btn btn-secondary flex items-center justify-center gap-2 text-sm py-2"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map(image => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium truncate max-w-[200px]">
                    {image.fileName}
                  </h3>
                  <button 
                    onClick={() => handleRemoveImage(image.id)} 
                    className="p-1 text-gray-600 hover:text-error-600 transition-colors rounded-full hover:bg-gray-100"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                {image.status === 'error' ? (
                  <div className="text-center p-4">
                    <div className="text-error-600 mb-2 text-sm">{image.error || 'Failed to process image'}</div>
                  </div>
                ) : image.status === 'processing' ? (
                  <div className="flex flex-col items-center justify-center p-6">
                    <Loader size={32} className="text-primary-500 animate-spin mb-3" />
                    <p className="text-sm text-gray-500">Processing...</p>
                  </div>
                ) : (
                  <>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <ImageComparisonSlider
                        originalImage={image.originalUrl}
                        processedImage={image.processedUrl || ''}
                      />
                    </div>
                    
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => handleDownload(image)}
                        className="btn btn-primary flex items-center justify-center gap-1 text-xs py-1 px-3"
                      >
                        <Download size={14} />
                        Download
                      </button>
                      <button 
                        onClick={() => handleShare(image)}
                        className="btn btn-secondary flex items-center justify-center gap-1 text-xs py-1 px-3"
                      >
                        <Share2 size={14} />
                        Share
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
          
          {images.length === 0 && (
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <UploadCloud className="text-primary-500" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Upload</h4>
                  <p className="text-gray-600 text-sm">Upload multiple images with a simple drag & drop</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Loader className="text-primary-500" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Process</h4>
                  <p className="text-gray-600 text-sm">Our AI automatically removes the backgrounds</p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Download className="text-primary-500" size={24} />
                  </div>
                  <h4 className="font-semibold mb-2">Download</h4>
                  <p className="text-gray-600 text-sm">Download your images with transparent backgrounds</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;