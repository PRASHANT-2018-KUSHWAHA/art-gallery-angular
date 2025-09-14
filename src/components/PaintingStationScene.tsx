import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Droplets, CheckCircle, X, Paintbrush } from 'lucide-react';

export default function PaintingStationScene() {
  const [processedParts, setProcessedParts] = useState(0);
  const [rejectedParts, setRejectedParts] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);
  const [isPainting, setIsPainting] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (processedParts + rejectedParts < 17) {
        setIsPainting(true);
        setCameraActive(true);
        
        setTimeout(() => {
          setCurrentPart(prev => prev + 1);
          
          // Simulate rejection (1 out of 17)
          if (processedParts + rejectedParts === 8) {
            setRejectedParts(prev => prev + 1);
          } else {
            setProcessedParts(prev => prev + 1);
          }
          
          setIsPainting(false);
          setCameraActive(false);
        }, 2000);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [processedParts, rejectedParts]);

  return (
    <div className="size-full flex items-center justify-center text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-purple-900/20 to-black" />
      
      {/* Paint Particles Effect */}
      {isPainting && (
        <>
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
              initial={{
                x: window.innerWidth / 2 - 100,
                y: window.innerHeight / 2,
                opacity: 0.8,
              }}
              animate={{
                x: window.innerWidth / 2 + 100 + (Math.random() - 0.5) * 100,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 150,
                opacity: 0,
                scale: [1, 0.5, 0],
              }}
              transition={{ duration: 1.5, delay: Math.random() * 0.8 }}
            />
          ))}
        </>
      )}

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
            <Paintbrush className="w-12 h-12 text-purple-400" />
            <h2 className="text-4xl font-bold">Painting Station</h2>
          </div>
          <p className="text-gray-300">Automated coating with color consistency monitoring</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-12 items-center">
          {/* Station Visualization */}
          <div className="col-span-2">
            <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              {/* Painting Booth */}
              <div className="relative mb-8">
                <motion.div
                  className="w-full h-32 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg relative overflow-hidden"
                  animate={isPainting ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.4, repeat: isPainting ? Infinity : 0 }}
                >
                  {/* Paint Spray Effect */}
                  {isPainting && (
                    <>
                      <motion.div
                        className="absolute left-4 inset-y-0 w-8 bg-gradient-to-r from-blue-400/60 to-transparent"
                        animate={{ 
                          x: [0, 150],
                          opacity: [0.8, 0.4, 0.8] 
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        className="absolute left-4 inset-y-0 w-12 bg-gradient-to-r from-purple-400/40 to-transparent"
                        animate={{ 
                          x: [0, 150],
                          opacity: [0.6, 0.2, 0.6] 
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                      />
                    </>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={isPainting ? { rotate: [0, 15, -15, 0] } : {}}
                      transition={{ duration: 1, repeat: isPainting ? Infinity : 0 }}
                    >
                      <Droplets className={`w-8 h-8 ${isPainting ? 'text-blue-300' : 'text-gray-400'}`} />
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
                  <div className="text-gray-400 mb-2">Welded Parts</div>
                  <div className="flex gap-2 flex-wrap justify-center max-w-24">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded" />
                    ))}
                  </div>
                </div>

                <motion.div
                  className="flex-1 flex items-center justify-center"
                  key={currentPart}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded relative"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 100, opacity: 1 }}
                    transition={{ duration: 2.5 }}
                  >
                    {isPainting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-blue-400/50 rounded"
                        animate={{ opacity: [0, 0.8, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </motion.div>

                <div className="text-center">
                  <div className="text-gray-400 mb-2">Painted Parts</div>
                  <div className="flex gap-2 flex-wrap justify-center max-w-24">
                    {Array.from({ length: Math.min(processedParts, 6) }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded"
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
                <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-400/30">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300">Technician: Final coating...</span>
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
              <div className="text-green-300/70">parts painted</div>
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
              <div className="text-red-300/70">uneven coating</div>
            </motion.div>

            {/* Paint Quality Monitor */}
            <motion.div
              className={`rounded-xl p-4 border transition-all duration-300 ${
                isPainting
                  ? 'bg-gradient-to-br from-purple-500/20 to-blue-600/20 border-purple-400/30'
                  : 'bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-400/30'
              }`}
              animate={isPainting ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <Droplets className={`w-6 h-6 ${isPainting ? 'text-purple-400' : 'text-gray-400'}`} />
                <span className={`text-sm ${isPainting ? 'text-purple-300' : 'text-gray-300'}`}>
                  {isPainting ? 'Coating Active' : 'Ready'}
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
          <div className="text-gray-400 mb-2">Painting Progress</div>
          <div className="max-w-md mx-auto bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-blue-400"
              animate={{ width: `${((processedParts + rejectedParts) / 17) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm text-gray-300 mt-2">
            {processedParts + rejectedParts} / 17 parts processed
          </div>
        </motion.div>
      </div>
    </div>
  );
}