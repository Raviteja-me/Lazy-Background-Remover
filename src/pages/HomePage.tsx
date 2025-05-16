import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  UploadCloud, Download, Share2, Wand2, Zap, ImagePlus, 
} from 'lucide-react';

const HeroSection: React.FC = () => {
  const [showProcessed, setShowProcessed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowProcessed(prev => !prev);
    }, 2000); // 2 seconds interval for toggling

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-primary overflow-hidden">
      {/* Animated background image on right half, only when processed image is visible */}
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 1 }}
        animate={showProcessed ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="pointer-events-none select-none absolute top-0 bottom-0 right-0 w-1/2 h-1/2 z-20 flex items-end"
        style={{ overflow: "hidden" }}
      >
        <img
          src="https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg"
          alt="Background animation"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-radial from-primary-400/20 to-transparent z-10"></div>
      <div className="container relative z-30">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="text-center lg:text-left lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Remove Image Backgrounds <span className="text-accent-300">Instantly</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Our AI-powered tool makes background removal effortless. 
                No complex editing required. Just upload and get perfect results in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/editor" className="btn bg-white text-primary-600 hover:bg-white/90">
                  Try It Free
                </Link>
                <a href="#how-it-works" className="btn bg-transparent border border-white/30 text-white hover:bg-white/10">
                  See How It Works
                </a>
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Original image"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: showProcessed ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.img
                  src="https://media-hosting.imagekit.io/44b35f7b8b944e38/bg-removed-trt.png?Expires=1841855032&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=biQKbQXtNm7bJz7j2nFDLQWju-ie9KQim6ZzlTp9~DMnfSwbRHqu0eGQ2b9rQstXkWlqnqPIhV0F1dKKAAgDbGaHyWrG6~Ct8vNMaT2n5~jKR83jcg8Mq2rF4Hsoko5rNqkvP5OdalRH0jvT7cPlyCQk5rKXO7BlmoRzhpIsu7ss4o91BN0qLx1a6Ko7cAvtNNd0KzemmK5FooRgzTZTerq7z0lXIbCwQFY~pINPKkV7z2oHcIVxgvULSStlon8wbabnN5yimjdAcNrm5sCYCk9h6cv0oyngXAIhn2vRUBXgAKnj-ehdIH0Q7n1bZ9gVVKMpjKbs~d2iVV62~lqAhQ__"
                  alt="Processed image"
                  className="absolute -bottom-10 -right-10 w-2/3 rounded-lg shadow-xl border-4 border-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showProcessed ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-accent-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <Wand2 size={32} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 right-0 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
        <path fill="currentColor" fillOpacity="1" d="M0,64L120,80C240,96,480,128,720,128C960,128,1200,96,1320,80L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
      </svg>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const features = [
    {
      icon: <UploadCloud className="text-primary-500" size={32} />,
      title: "Easy Upload",
      description: "Drag and drop or click to upload your images securely and quickly.",
    },
    {
      icon: <Zap className="text-primary-500" size={32} />,
      title: "Instant Processing",
      description: "Our AI processes your image and removes the background in seconds.",
    },
    {
      icon: <Wand2 className="text-primary-500" size={32} />,
      title: "Perfect Results",
      description: "Get high-quality results with precise edge detection, even with complex images.",
    },
    {
      icon: <Download className="text-primary-500" size={32} />,
      title: "Simple Download",
      description: "Download your edited image instantly in PNG format with transparent background.",
    },
    {
      icon: <Share2 className="text-primary-500" size={32} />,
      title: "Easy Sharing",
      description: "Share your edited images directly to social media or copy the link.",
    },
    {
      icon: <ImagePlus className="text-primary-500" size={32} />,
      title: "Batch Processing",
      description: "Process multiple images at once to save time and boost productivity.",
    },
  ];
  
  return (
    <section id="features" className="section bg-white" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="section-subtitle">
            Our tool makes background removal simple with these powerful features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-primary-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const steps = [
    {
      number: "01",
      title: "Upload Your Image",
      description: "Drag and drop or select an image from your device.",
      icon: <UploadCloud className="text-white" size={24} />,
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Our AI automatically detects and removes the background.",
      icon: <Wand2 className="text-white" size={24} />,
    },
    {
      number: "03",
      title: "Download Result",
      description: "Preview, adjust if needed, and download your image.",
      icon: <Download className="text-white" size={24} />,
    },
  ];
  
  return (
    <section id="how-it-works" className="section bg-gray-50" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle">
            Remove backgrounds in just three simple steps
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-200 mb-4">{step.number}</div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const testimonials = [
    {
      quote: "This tool saved me hours of tedious work. The background removal is incredibly accurate!",
      author: "Sarah Johnson",
      role: "Graphic Designer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote: "I use this for my e-commerce store. The results are professional and it's so easy to use.",
      author: "Michael Chen",
      role: "Online Store Owner",
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    },
    {
      quote: "The best background remover I've tried. Fast, precise, and the batch processing is a game-changer.",
      author: "Emma Rodriguez",
      role: "Marketing Specialist",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
  ];
  
  return (
    <section className="section bg-white" ref={ref}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            What Our Users <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Thousands of people love our background remover. Here's what they think.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8"
            >
              <div className="mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section className="py-20 bg-gradient-primary" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Remove Backgrounds Effortlessly?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Join thousands of satisfied users who save time and create stunning visuals with our background remover.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/editor" className="btn bg-white text-primary-600 hover:bg-white/90">
              Try It Free Now
            </Link>
            <a href="#features" className="btn bg-transparent border border-white/30 text-white hover:bg-white/10">
              Explore Features
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
};

export default HomePage;