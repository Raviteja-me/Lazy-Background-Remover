import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Code } from 'lucide-react';

const ApiPage: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  
  const apiEndpoint = `${window.location.origin}/api/remove-background`;
  
  const fetchExample = `
fetch('${apiEndpoint}', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    // Use the processed image URL
    const imageUrl = data.data.url;
    console.log('Processed image:', imageUrl);
  } else {
    console.error('Error:', data.error);
  }
})
.catch(error => console.error('Error:', error));
  `.trim();
  
  const formDataExample = `
// Create a FormData instance
const formData = new FormData();

// Add the image file
formData.append('image', imageFile);

// Optional: Add quality parameter (0.1 to 1.0)
formData.append('quality', '0.8');

// Optional: Add resize parameters
formData.append('resize', JSON.stringify({
  width: 1024,
  height: 1024,
  fit: 'inside'
}));
  `.trim();
  
  const responseExample = `
// Success response
{
  "success": true,
  "data": {
    "url": "https://example.com/processed-image.png"
  }
}

// Error response
{
  "success": false,
  "error": "Failed to process image"
}
  `.trim();
  
  const batchExample = `
fetch('${apiEndpoint}/batch', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  // Array of results
  data.forEach((result, index) => {
    if (result.success) {
      console.log(\`Image \${index + 1} processed: \${result.data.url}\`);
    } else {
      console.error(\`Image \${index + 1} error: \${result.error}\`);
    }
  });
})
.catch(error => console.error('Error:', error));
  `.trim();
  
  const batchFormDataExample = `
// Create a FormData instance
const formData = new FormData();

// Add multiple image files
imageFiles.forEach((file, index) => {
  formData.append('images', file);
});

// Optional: Add quality parameter (0.1 to 1.0)
formData.append('quality', '0.8');
  `.trim();
  
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">API</span> Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrate our background removal technology directly into your applications
            </p>
          </div>
          
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-700 mb-6">
              Our API allows you to remove backgrounds from images programmatically. 
              You can use it to integrate background removal into your own applications.
            </p>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">API Endpoint</h3>
                <button 
                  onClick={() => handleCopy(apiEndpoint, 'endpoint')}
                  className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  {copied === 'endpoint' ? <Check size={16} /> : <Copy size={16} />}
                  {copied === 'endpoint' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-lg">
                <code>{apiEndpoint}</code>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Request Format</h3>
                <button 
                  onClick={() => handleCopy(formDataExample, 'formdata')}
                  className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  {copied === 'formdata' ? <Check size={16} /> : <Copy size={16} />}
                  {copied === 'formdata' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                <pre><code>{formDataExample}</code></pre>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Example Usage</h3>
                <button 
                  onClick={() => handleCopy(fetchExample, 'fetch')}
                  className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  {copied === 'fetch' ? <Check size={16} /> : <Copy size={16} />}
                  {copied === 'fetch' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                <pre><code>{fetchExample}</code></pre>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Response Format</h3>
                <button 
                  onClick={() => handleCopy(responseExample, 'response')}
                  className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  {copied === 'response' ? <Check size={16} /> : <Copy size={16} />}
                  {copied === 'response' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                <pre><code>{responseExample}</code></pre>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Batch Processing</h2>
            <p className="text-gray-700 mb-6">
              Process multiple images at once with our batch processing endpoint.
            </p>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Batch Endpoint</h3>
                <button 
                  onClick={() => handleCopy(`${apiEndpoint}/batch`, 'batch-endpoint')}
                  className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  {copied === 'batch-endpoint' ? <Check size={16} /> : <Copy size={16} />}
                  {copied === 'batch-endpoint' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-lg">
                <code>{apiEndpoint}/batch</code>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Batch Request Format</h3>
                <button 
                  onClick={() => handleCopy(batchFormDataExample, 'batch-formdata')}
                  className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  {copied === 'batch-formdata' ? <Check size={16} /> : <Copy size={16} />}
                  {copied === 'batch-formdata' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                <pre><code>{batchFormDataExample}</code></pre>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-medium">Batch Example Usage</h3>
                <button 
                  onClick={() => handleCopy(batchExample, 'batch-fetch')}
                  className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                >
                  {copied === 'batch-fetch' ? <Check size={16} /> : <Copy size={16} />}
                  {copied === 'batch-fetch' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                <pre><code>{batchExample}</code></pre>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-4">Rate Limits & Pricing</h2>
            <p className="text-gray-700 mb-4">
              Our API is available with the following plans:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Free</h3>
                <p className="text-3xl font-bold mb-4">$0<span className="text-sm text-gray-500">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>50 images/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Max 5MB per image</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Standard quality</span>
                  </li>
                </ul>
                <button className="w-full btn btn-secondary">Get Started</button>
              </div>
              
              <div className="bg-primary-50 p-6 rounded-lg shadow-sm border border-primary-100 relative">
                <div className="absolute -top-3 right-3 bg-primary-500 text-white text-xs py-1 px-2 rounded-full">Popular</div>
                <h3 className="text-lg font-semibold mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-4">$29<span className="text-sm text-gray-500">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>1,000 images/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Max 20MB per image</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>High quality</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Batch processing</span>
                  </li>
                </ul>
                <button className="w-full btn btn-primary">Subscribe</button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
                <p className="text-3xl font-bold mb-4">Custom</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Unlimited images</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Max 50MB per image</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Premium quality</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Priority processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <button className="w-full btn btn-outline">Contact Sales</button>
              </div>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="text-primary-600">
                  <Code size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Need a custom integration?</h3>
                  <p className="text-gray-700 mb-4">
                    Our team can help you integrate our background removal technology into your existing workflows and applications.
                  </p>
                  <button className="btn btn-primary">Contact Us</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApiPage;