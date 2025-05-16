import { removeBackground } from '@imgly/background-removal';

interface RemoveBackgroundOptions {
  quality?: number;
  resize?: {
    width: number;
    height: number;
    fit: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
  };
}

export interface ApiResponse {
  success: boolean;
  data?: {
    url?: string;
    blob?: Blob;
  };
  error?: string;
}

/**
 * API service for background removal
 */
export const BackgroundRemovalApi = {
  /**
   * Remove background from an image file
   * @param file Image file to process
   * @param options Processing options
   * @returns Promise with the processed image URL or error
   */
  removeBackground: async (
    file: File | Blob,
    options: RemoveBackgroundOptions = {}
  ): Promise<ApiResponse> => {
    try {
      // Default options for smaller output
      const defaultOptions = {
        quality: 0.8,
        resize: {
          width: 1024,
          height: 1024,
          fit: 'inside' as const
        }
      };
      
      // Merge with user options
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Process the image
      const processedBlob = await removeBackground(file, mergedOptions);
      
      // Return success with the processed blob
      return {
        success: true,
        data: {
          url: URL.createObjectURL(processedBlob),
          blob: processedBlob
        }
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  },
  
  /**
   * Process multiple images in batch
   * @param files Array of image files to process
   * @param options Processing options
   * @returns Promise with array of results
   */
  batchProcess: async (
    files: File[],
    options: RemoveBackgroundOptions = {}
  ): Promise<ApiResponse[]> => {
    const results: ApiResponse[] = [];
    
    for (const file of files) {
      const result = await BackgroundRemovalApi.removeBackground(file, options);
      results.push(result);
    }
    
    return results;
  }
};

export default BackgroundRemovalApi;