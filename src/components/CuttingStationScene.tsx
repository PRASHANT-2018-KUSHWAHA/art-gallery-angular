import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Scissors, CheckCircle, X, Zap } from 'lucide-react';

export default function CuttingStationScene() {
  const [processedParts, setProcessedParts] = useState(0);
  const [rejectedParts, setRejectedParts] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (processedParts + rejectedParts < 20) {
        setIsProcessing(true);
        setCameraActive(true);
        
        setTimeout(() => {
          setCurrentPart(prev => prev + 1);
          
          // Simulate rejection (2 out of 20)
          if (processedParts + rejectedParts === 9 || processedParts + rejectedParts === 16) {
            setRejectedParts(prev => prev + 1);
          } else {
            setProcessedParts(prev => prev + 1);
          }
          
          setIsProcessing(false);
          setCameraActive(false);
        }, 1500);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [processedParts, rejectedParts]);

  return (
    <div className="size-full flex items-center justify-center text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
      
      {/* Industrial Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-16 grid-rows-12 size-full">
          {Array.from({ length: 192 }).map((_, i) => (
            <div key={i} className="border-r border-b border-white/20" />
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
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Scissors className="w-12 h-12 text-blue-400" />
            <h2 className="text-4xl font-bold">Cutting Station</h2>
          </div>
          <p className="text-gray-300">Precision cutting with real-time quality monitoring</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-12 items-center">
          {/* Station Visualization */}
          <div className="col-span-2">
            <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              {/* Cutting Machine */}
              <div className="relative mb-8">
                <motion.div
                  className="w-full h-32 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg relative overflow-hidden"
                  animate={isProcessing ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.5, repeat: isProcessing ? Infinity : 0 }}
                >
                  {/* Cutting Laser */}
                  {isProcessing && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/50 to-transparent"
                      animate={{ x: [-200, 200] }}
                      transition={{ duration: 1.5, ease: 'linear' }}
                    />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={isProcessing ? { rotate: 360 } : {}}
                      transition={{ duration: 2, repeat: isProcessing ? Infinity : 0, ease: 'linear' }}
                    >
                      <Zap className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Camera System */}
                <motion.div
                  className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    cameraActive ? 'bg-green-500 border-green-400' : 'bg-gray-600 border-gray-500'
                  }`}
                  animate={cameraActive ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: cameraActive ? 3 : 0 }}
                >
                  <Camera className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Parts Flow */}
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Raw Material</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg mx-auto" />
                </div>

                <motion.div
                  className="flex-1 flex items-center justify-center"
                  key={currentPart}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 100, opacity: 1 }}
                    transition={{ duration: 2 }}
                  />
                </motion.div>

                <div className="text-center">
                  <div className="text-gray-400 mb-2">Cut Parts</div>
                  <div className="flex gap-2 flex-wrap justify-center max-w-24">
                    {Array.from({ length: Math.min(processedParts, 6) }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Technician Action */}
              <motion.div
                className="mt-8 text-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">Technician: Batch in progress...</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Real-time Stats */}
          <div className="space-y-6">
            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-400/30"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-semibold text-green-300">Successful</h3>
              </div>
              <motion.div
                className="text-5xl font-bold text-green-400"
                key={processedParts}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {processedParts}
              </motion.div>
              <div className="text-green-300/70">parts processed</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl p-6 border border-red-400/30"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <X className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-semibold text-red-300">Rejected</h3>
              </div>
              <motion.div
                className="text-5xl font-bold text-red-400"
                key={rejectedParts}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {rejectedParts}
              </motion.div>
              <div className="text-red-300/70">defective parts</div>
            </motion.div>

            {/* Camera Status */}
            <motion.div
              className={`rounded-xl p-4 border transition-all duration-300 ${
                cameraActive
                  ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-cyan-400/30'
                  : 'bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-400/30'
              }`}
              animate={cameraActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Camera className={`w-6 h-6 ${cameraActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span className={`text-sm ${cameraActive ? 'text-cyan-300' : 'text-gray-300'}`}>
                  {cameraActive ? 'Scanning...' : 'Camera Ready'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-gray-400 mb-2">Processing Progress</div>
          <div className="max-w-md mx-auto bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
              animate={{ width: `${((processedParts + rejectedParts) / 20) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm text-gray-300 mt-2">
            {processedParts + rejectedParts} / 20 parts processed
          </div>
        </motion.div>
      </div>
    </div>
  );
}