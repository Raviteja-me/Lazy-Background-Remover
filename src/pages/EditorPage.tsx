import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { removeBackground } from '@imgly/background-removal';
import { 
  UploadCloud, Download, Share2, Trash2, Undo, Loader 
} from 'lucide-react';
import ImageComparisonSlider from '../components/ImageComparisonSlider';

const EditorPage: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const processImage = async (file: File): Promise<string> => {
    try {
      // Convert File to Blob
      const blob = new Blob([file], { type: file.type });
      
      // Remove background
      const processedBlob = await removeBackground(blob);
      
      // Convert Blob to data URL
      return URL.createObjectURL(processedBlob);
    } catch (err) {
      throw new Error('Failed to process image. Please try again.');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setUploadedFileName(file.name);
    setError(null);
    
    // Create object URL for the original image
    const objectUrl = URL.createObjectURL(file);
    setOriginalImage(objectUrl);
    setProcessedImage(null);
    
    // Start processing
    setIsProcessing(true);
    try {
      const result = await processImage(file);
      setProcessedImage(result);
    } catch (error) {
      setError((error as Error).message);
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setUploadedFileName('');
    setError(null);
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `bg-removed-${uploadedFileName || 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleShare = async () => {
    if (!processedImage) return;
    
    try {
      // Try using the Web Share API first
      if (navigator.share) {
        // Create a blob from the image URL
        const response = await fetch(processedImage);
        const blob = await response.blob();
        const file = new File([blob], `bg-removed-${uploadedFileName || 'image.png'}`, { type: blob.type });
        
        await navigator.share({
          title: 'My Background-Removed Image',
          text: 'Check out this image I created with LazyRemover!',
          files: [file]
        });
        return;
      }
      
      // Fallback for browsers that don't support Web Share API
      // Create a temporary input to copy the image URL
      const input = document.createElement('input');
      input.value = processedImage;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      
      // Show a simple alert that the link was copied
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
            Upload your image and we'll automatically remove the background for you.
            Get professional results in seconds.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {!originalImage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8"
            >
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center">
                    <UploadCloud size={40} className="text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    or click to browse your files
                  </p>
                  <p className="text-sm text-gray-400">
                    Supports JPG and PNG up to 10MB
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {uploadedFileName || 'Your Image'}
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={handleReset} 
                    className="p-2 text-gray-600 hover:text-error-600 transition-colors rounded-full hover:bg-gray-100"
                    title="Upload a new image"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              
              {error ? (
                <div className="text-center p-8">
                  <div className="text-error-600 mb-4">{error}</div>
                  <button 
                    onClick={handleReset}
                    className="btn btn-secondary flex items-center justify-center gap-2 mx-auto"
                  >
                    <Undo size={20} />
                    Try Again
                  </button>
                </div>
              ) : isProcessing ? (
                <div className="flex flex-col items-center justify-center p-12">
                  <Loader size={48} className="text-primary-500 animate-spin mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Processing your image...</h3>
                  <p className="text-gray-500">This will only take a moment</p>
                </div>
              ) : processedImage ? (
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <ImageComparisonSlider
                      originalImage={originalImage}
                      processedImage={processedImage}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleDownload}
                      className="btn btn-primary flex items-center justify-center gap-2"
                    >
                      <Download size={20} />
                      Download Image
                    </button>
                    <button 
                      onClick={handleShare}
                      className="btn btn-secondary flex items-center justify-center gap-2"
                    >
                      <Share2 size={20} />
                      Share Image
                    </button>
                    <button 
                      onClick={handleReset}
                      className="btn btn-secondary flex items-center justify-center gap-2"
                    >
                      <UploadCloud size={20} />
                      Upload New Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12">
                  <div className="mb-6">
                    <img 
                      src={originalImage} 
                      alt="Original" 
                      className="max-h-80 rounded-lg object-contain"
                    />
                  </div>
                  <p className="text-gray-500 mb-4">Image uploaded successfully.</p>
                  <button 
                    onClick={handleReset}
                    className="btn btn-secondary flex items-center justify-center gap-2"
                  >
                    <Undo size={20} />
                    Upload Different Image
                  </button>
                </div>
              )}
            </motion.div>
          )}
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <UploadCloud className="text-primary-500" size={24} />
                </div>
                <h4 className="font-semibold mb-2">Upload</h4>
                <p className="text-gray-600 text-sm">Upload your image with a simple drag & drop</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Loader className="text-primary-500" size={24} />
                </div>
                <h4 className="font-semibold mb-2">Process</h4>
                <p className="text-gray-600 text-sm">Our AI automatically removes the background</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Download className="text-primary-500" size={24} />
                </div>
                <h4 className="font-semibold mb-2">Download</h4>
                <p className="text-gray-600 text-sm">Download your image with a transparent background</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;