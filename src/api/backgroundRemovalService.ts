import { removeBackground } from '@imgly/background-removal';

export interface RemovalOptions {
  quality?: number;
  resize?: {
    width: number;
    height: number;
    fit: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
  };
}

export async function processImage(imageData: Blob | string, options?: RemovalOptions): Promise<Blob> {
  try {
    const processedBlob = await removeBackground(imageData, {
      progress: (progress) => {
        console.log(`Processing progress: ${progress * 100}%`);
      },
      // Apply quality and resize options if provided
      ...options
    });
    
    return processedBlob;
  } catch (error) {
    console.error('Error in background removal:', error);
    throw new Error('Failed to process image');
  }
}

export async function processBatchImages(images: Array<Blob | string>, options?: RemovalOptions): Promise<Blob[]> {
  const results: Blob[] = [];
  
  for (const image of images) {
    try {
      const processedBlob = await processImage(image, options);
      results.push(processedBlob);
    } catch (error) {
      console.error('Error processing image in batch:', error);
      throw error;
    }
  }
  
  return results;
}