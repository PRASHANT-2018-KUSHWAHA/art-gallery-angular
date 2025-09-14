import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, Zap, CheckCircle, X, Flame } from 'lucide-react';

export default function WeldingStationScene() {
  const [processedParts, setProcessedParts] = useState(0);
  const [rejectedParts, setRejectedParts] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);
  const [isWelding, setIsWelding] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (processedParts + rejectedParts < 18) {
        setIsWelding(true);
        setCameraActive(true);
        
        setTimeout(() => {
          setCurrentPart(prev => prev + 1);
          
          // Simulate rejection (1 out of 18)
          if (processedParts + rejectedParts === 12) {
            setRejectedParts(prev => prev + 1);
          } else {
            setProcessedParts(prev => prev + 1);
          }
          
          setIsWelding(false);
          setCameraActive(false);
        }, 1800);
      }
    }, 2200);

    return () => clearInterval(interval);
  }, [processedParts, rejectedParts]);

  return (
    <div className="size-full flex items-center justify-center text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-orange-900/20 to-black" />
      
      {/* Welding Sparks Effect */}
      {isWelding && (
        <>
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full"
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1,
              }}
              animate={{
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
                opacity: 0,
              }}
              transition={{ duration: 0.8, delay: Math.random() * 0.5 }}
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
            <Flame className="w-12 h-12 text-orange-400" />
            <h2 className="text-4xl font-bold">Welding Station</h2>
          </div>
          <p className="text-gray-300">High-precision welding with thermal monitoring</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-12 items-center">
          {/* Station Visualization */}
          <div className="col-span-2">
            <div className="relative bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              {/* Welding Machine */}
              <div className="relative mb-8">
                <motion.div
                  className="w-full h-32 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg relative overflow-hidden"
                  animate={isWelding ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ duration: 0.3, repeat: isWelding ? Infinity : 0 }}
                >
                  {/* Welding Arc */}
                  {isWelding && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/70 to-transparent"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 0.15, repeat: Infinity, delay: 0.1 }}
                      />
                    </>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={isWelding ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3, repeat: isWelding ? Infinity : 0 }}
                    >
                      <Zap className={`w-8 h-8 ${isWelding ? 'text-orange-300' : 'text-gray-400'}`} />
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
                  <div className="text-gray-400 mb-2">Cut Parts</div>
                  <div className="flex gap-1 flex-wrap justify-center max-w-16">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gradient-to-br from-green-500 to-green-600 rounded" />
                    ))}
                  </div>
                </div>

                <motion.div
                  className="flex-1 flex items-center justify-center"
                  key={currentPart}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded relative"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 100, opacity: 1 }}
                    transition={{ duration: 2.2 }}
                  >
                    {isWelding && (
                      <motion.div
                        className="absolute inset-0 bg-orange-400/50 rounded"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </motion.div>

                <div className="text-center">
                  <div className="text-gray-400 mb-2">Welded Parts</div>
                  <div className="flex gap-2 flex-wrap justify-center max-w-24">
                    {Array.from({ length: Math.min(processedParts, 6) }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded"
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
                <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-400/30">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-300">Technician: Welding in progress...</span>
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
              <div className="text-green-300/70">parts welded</div>
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
              <div className="text-red-300/70">weak welds</div>
            </motion.div>

            {/* Temperature Monitor */}
            <motion.div
              className={`rounded-xl p-4 border transition-all duration-300 ${
                isWelding
                  ? 'bg-gradient-to-br from-orange-500/20 to-red-600/20 border-orange-400/30'
                  : 'bg-gradient-to-br from-gray-500/20 to-gray-600/20 border-gray-400/30'
              }`}
              animate={isWelding ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Flame className={`w-6 h-6 ${isWelding ? 'text-orange-400' : 'text-gray-400'}`} />
                <span className={`text-sm ${isWelding ? 'text-orange-300' : 'text-gray-300'}`}>
                  {isWelding ? 'Active: 2,400°C' : 'Standby'}
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
          <div className="text-gray-400 mb-2">Welding Progress</div>
          <div className="max-w-md mx-auto bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-400 to-red-400"
              animate={{ width: `${((processedParts + rejectedParts) / 18) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm text-gray-300 mt-2">
            {processedParts + rejectedParts} / 18 parts processed
          </div>
        </motion.div>
      </div>
    </div>
  );
}