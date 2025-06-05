import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiBarChart2, FiClock, FiDollarSign, FiShield, FiTrendingUp } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import ParticleBackground from '../components/ui/ParticleBackground';

const Home = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: 'AI-Powered Accuracy',
      description: 'Our advanced machine learning model analyzes thousands of data points to provide the most accurate price predictions in the market.',
      icon: <FiBarChart2 className="w-6 h-6" />
    },
    {
      title: 'Instant Results',
      description: 'Get real-time price estimates in seconds, not hours. No waiting for manual appraisals.',
      icon: <FiClock className="w-6 h-6" />
    },
    {
      title: 'Market Insights',
      description: 'Understand how different factors affect your car\'s value with detailed breakdowns and comparisons.',
      icon: <FiTrendingUp className="w-6 h-6" />
    },
    {
      title: 'No Hidden Fees',
      description: 'Get transparent pricing with no surprises. What you see is what you pay.',
      icon: <FiDollarSign className="w-6 h-6" />
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ParticleBackground darkMode={darkMode} />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-spin-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <AnimatePresence>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            {/* Badge */}
            <motion.div 
              variants={item}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                AI-Powered Predictions
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1 
              variants={item}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 pb-2"
            >
              <span className="block">Revolutionizing Car</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Price Predictions</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={item}
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Harness the power of artificial intelligence to get accurate, real-time 
              price estimates for any vehicle. Make smarter buying and selling decisions 
              with our cutting-edge prediction technology.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={item}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10"
            >
              <Link
                to="/predict"
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 flex items-center"
              >
                <span className="relative z-10">Get Started for Free</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-colors duration-300 hover:shadow-lg hover:shadow-white/5"
              >
                Learn How It Works
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Features Carousel */}
        <motion.div 
          className="mt-24 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm"></div>
          
          <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
            {/* Feature content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="min-h-[200px] flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 mb-6">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {features[activeFeature].title}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {features[activeFeature].description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeFeature === index ? 'w-8 bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-white/20'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute -bottom-16 -right-10 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
