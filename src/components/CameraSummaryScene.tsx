import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, BarChart3, CheckCircle, X, AlertTriangle } from 'lucide-react';

export default function CameraSummaryScene() {
  const [animationStep, setAnimationStep] = useState(0);

  // Station data
  const stationData = [
    { name: 'Cutting', success: 18, rejected: 2, total: 20, color: 'blue' },
    { name: 'Welding', success: 17, rejected: 1, total: 18, color: 'orange' },
    { name: 'Painting', success: 16, rejected: 1, total: 17, color: 'purple' }
  ];

  // Final calculations
  const finalPassed = 15;
  const finalRejected = 1;
  const totalStarted = 20;
  const totalRejectedAcrossSteps = 5;
  const yieldRate = 75;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStep(prev => Math.min(prev + 1, 4));
    }, 2000);

    return () => clearTimeout(timer);
  }, [animationStep]);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-400/30', text: 'text-blue-300' };
      case 'orange': return { bg: 'from-orange-500/20 to-orange-600/20', border: 'border-orange-400/30', text: 'text-orange-300' };
      case 'purple': return { bg: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-400/30', text: 'text-purple-300' };
      default: return { bg: 'from-gray-500/20 to-gray-600/20', border: 'border-gray-400/30', text: 'text-gray-300' };
    }
  };

  return (
    <div className="size-full flex items-center justify-center text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black" />
      
      {/* Digital Grid Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-12 size-full">
          {Array.from({ length: 240 }).map((_, i) => (
            <motion.div
              key={i}
              className="border-r border-b border-cyan-400/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (i % 20) * 0.02, duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Camera className="w-16 h-16 text-cyan-400" />
            <h2 className="text-5xl font-bold">Camera Summary</h2>
          </div>
          <p className="text-xl text-gray-300">AI-Powered Quality Control Analysis</p>
        </motion.div>

        {/* Station Summary Cards */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: animationStep >= 1 ? 1 : 0, y: animationStep >= 1 ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {stationData.map((station, index) => {
            const colors = getColorClasses(station.color);
            return (
              <motion.div
                key={station.name}
                className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border ${colors.border} backdrop-blur-sm`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: animationStep >= 1 ? 1 : 0.8, 
                  opacity: animationStep >= 1 ? 1 : 0 
                }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              >
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>{station.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <Camera className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 text-sm">Camera Active</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">Success</span>
                    </div>
                    <motion.span
                      className="text-2xl font-bold text-green-400"
                      initial={{ scale: 1 }}
                      animate={{ scale: animationStep >= 2 ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                    >
                      {station.success}
                    </motion.span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5 text-red-400" />
                      <span className="text-red-300">Rejected</span>
                    </div>
                    <motion.span
                      className="text-2xl font-bold text-red-400"
                      initial={{ scale: 1 }}
                      animate={{ scale: animationStep >= 2 ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                    >
                      {station.rejected}
                    </motion.span>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Input</span>
                      <span className="text-xl font-semibold text-white">{station.total}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Calculation Process */}
        <motion.div
          className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-2xl p-8 backdrop-blur-sm border border-white/10 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: animationStep >= 2 ? 1 : 0, 
            scale: animationStep >= 2 ? 1 : 0.95 
          }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">Batch Flow Analysis</h3>
            <p className="text-gray-400">Tracking parts through complete production cycle</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Started</div>
              <div className="text-4xl font-bold text-blue-400">{totalStarted}</div>
            </div>

            <div className="flex-1 mx-8">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Cut</div>
                  <div className="text-lg font-semibold text-blue-300">18</div>
                </div>
                
                <motion.div
                  className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-orange-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: animationStep >= 3 ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 3 }}
                />

                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Weld</div>
                  <div className="text-lg font-semibold text-orange-300">17</div>
                </div>
                
                <motion.div
                  className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-purple-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: animationStep >= 3 ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 3.2 }}
                />

                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Paint</div>
                  <div className="text-lg font-semibold text-purple-300">16</div>
                </div>
                
                <motion.div
                  className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-green-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: animationStep >= 3 ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 3.4 }}
                />
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Final</div>
              <div className="text-4xl font-bold text-green-400">{finalPassed}</div>
            </div>
          </div>
        </motion.div>

        {/* Final Summary */}
        <motion.div
          className="grid grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: animationStep >= 4 ? 1 : 0, 
            y: animationStep >= 4 ? 0 : 50 
          }}
          transition={{ duration: 1, delay: 4 }}
        >
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-400/30 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <div className="text-3xl font-bold text-green-400 mb-1">{finalPassed}</div>
            <div className="text-green-300/70 text-sm">Final Passed</div>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl p-6 border border-red-400/30 text-center">
            <X className="w-8 h-8 mx-auto mb-3 text-red-400" />
            <div className="text-3xl font-bold text-red-400 mb-1">{finalRejected}</div>
            <div className="text-red-300/70 text-sm">Final Rejected</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-6 border border-orange-400/30 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-orange-400" />
            <div className="text-3xl font-bold text-orange-400 mb-1">{totalRejectedAcrossSteps}</div>
            <div className="text-orange-300/70 text-sm">Total Rejected</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl p-6 border border-cyan-400/30 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <div className="text-3xl font-bold text-cyan-400 mb-1">{yieldRate}%</div>
            <div className="text-cyan-300/70 text-sm">Yield Rate</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}