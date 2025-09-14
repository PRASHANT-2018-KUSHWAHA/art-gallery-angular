import React from 'react';
import { motion } from 'motion/react';
import { Factory, Camera, BarChart3, CheckCircle } from 'lucide-react';

export default function IntroScene() {
  return (
    <div className="size-full flex flex-col items-center justify-center text-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]" />
        <div className="grid grid-cols-12 grid-rows-8 size-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <motion.div
              key={i}
              className="border-l border-t border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01, duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <Factory className="w-20 h-20 mx-auto mb-6 text-blue-400" />
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            WorkshopFlow Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            End-to-End Digital Workflow for Automotive Parts Manufacturing
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-3 gap-8 mt-16"
        >
          <div className="flex flex-col items-center">
            <Camera className="w-12 h-12 mb-4 text-cyan-400" />
            <h3 className="text-lg font-semibold mb-2">Smart Vision</h3>
            <p className="text-gray-400 text-center">AI-powered part counting and defect detection</p>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 mb-4 text-green-400" />
            <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-gray-400 text-center">Live workflow monitoring and quality control</p>
          </div>
          <div className="flex flex-col items-center">
            <BarChart3 className="w-12 h-12 mb-4 text-orange-400" />
            <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-400 text-center">Comprehensive performance insights</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12"
        >
          <div className="text-sm text-gray-400 uppercase tracking-wider">
            Demonstrating Complete Production Cycle
          </div>
        </motion.div>
      </div>

      {/* Animated Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}