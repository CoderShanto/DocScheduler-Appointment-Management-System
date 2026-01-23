import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { Heart, Clock, Users, Shield, Star, Zap } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    initial: { 
      backgroundColor: '#f8fafc',
      color: '#334155',
      scale: 1,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    hover: { 
      backgroundColor: '#1e40af',
      color: 'white',
      scale: 1.05,
      boxShadow: '0 20px 25px -5px rgba(30, 64, 175, 0.3), 0 10px 10px -5px rgba(30, 64, 175, 0.2)',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">US</span>
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content Section */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Image Section */}
          <motion.div 
            className="flex-shrink-0"
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <img 
                className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-white" 
                src={assets.about_image} 
                alt="About Prescripto" 
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-15 blur-xl"></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="flex flex-col justify-center space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-6">
              <motion.p 
                className="text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CHOOSE US</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mt-2"></div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { 
              title: "Efficiency", 
              description: "Streamlined appointment scheduling that fits into your busy lifestyle.",
              icon: Clock,
              gradient: "from-blue-500 to-cyan-500"
            },
            { 
              title: "Convenience", 
              description: "Access to a network of trusted healthcare professionals in your area.",
              icon: Users,
              gradient: "from-indigo-500 to-purple-500"
            },
            { 
              title: "Personalization", 
              description: "Tailored recommendations and reminders to help you stay on top of your health.",
              icon: Shield,
              gradient: "from-emerald-500 to-teal-500"
            },
            { 
              title: "Security", 
              description: "Enterprise-grade security to protect your sensitive health information.",
              icon: Shield,
              gradient: "from-red-500 to-orange-500"
            },
            { 
              title: "Reliability", 
              description: "99.9% uptime guarantee with 24/7 technical support available.",
              icon: Zap,
              gradient: "from-amber-500 to-orange-500"
            },
            { 
              title: "Innovation", 
              description: "Cutting-edge AI technology to enhance your healthcare experience.",
              icon: Star,
              gradient: "from-pink-500 to-rose-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="h-full p-8 rounded-2xl border border-gray-200 bg-white backdrop-blur-sm"
                variants={hoverVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:bg-opacity-20 transition-all duration-300`}>
                  <feature.icon className="w-6 h-6 text-white group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Healthcare Experience?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who have already made the switch to Prescripto.
            </p>
            <motion.button
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
