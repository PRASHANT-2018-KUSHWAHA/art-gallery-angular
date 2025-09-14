import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Monitor, CheckCircle, Clock, AlertTriangle, Users, Settings } from 'lucide-react';

export default function TrackingUIScene() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Batch #1247 completed cutting station', type: 'success', time: '2:34 PM' },
    { id: 2, message: 'Quality check passed at welding', type: 'info', time: '2:36 PM' },
    { id: 3, message: 'Painting station ready for next batch', type: 'warning', time: '2:38 PM' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Add new notifications periodically
    const notificationTimer = setInterval(() => {
      setNotifications(prev => [
        { 
          id: Date.now(), 
          message: 'Camera detected defect - part rejected', 
          type: 'error', 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...prev.slice(0, 2)
      ]);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(notificationTimer);
    };
  }, []);

  return (
    <div className="size-full bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white relative">
      {/* App Header */}
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm border-b border-white/10 px-8 py-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Monitor className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">WorkshopFlow Pro</h1>
            <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">Production Monitor</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-gray-400">Current Time</div>
              <div className="text-lg font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300 text-sm">System Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex h-[calc(100%-80px)]">
        {/* Sidebar */}
        <motion.aside
          className="w-80 bg-slate-800/30 backdrop-blur-sm border-r border-white/10 p-6"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="space-y-6">
            {/* Current Batch Status */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-400/30">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">Active Batch</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Batch ID</span>
                  <span className="font-mono text-blue-300">#1247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Started</span>
                  <span className="text-white">1:45 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Parts</span>
                  <span className="text-white">20 pcs</span>
                </div>
              </div>
            </div>

            {/* Station Status */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">Station Status</h3>
              
              {[
                { name: 'Cutting', status: 'completed', progress: 100, color: 'green' },
                { name: 'Welding', status: 'completed', progress: 100, color: 'green' },
                { name: 'Painting', status: 'in-progress', progress: 85, color: 'blue' }
              ].map((station, index) => (
                <motion.div
                  key={station.name}
                  className="bg-slate-700/50 rounded-lg p-3"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{station.name}</span>
                    <div className={`flex items-center gap-1 text-sm ${
                      station.status === 'completed' ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      {station.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                      {station.status === 'completed' ? 'Complete' : 'Active'}
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        station.status === 'completed' 
                          ? 'from-green-400 to-green-500' 
                          : 'from-blue-400 to-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${station.progress}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg p-3 text-center transition-colors">
                  <Users className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                  <span className="text-xs text-blue-300">Staff</span>
                </button>
                <button className="bg-gray-500/20 hover:bg-gray-500/30 border border-gray-400/30 rounded-lg p-3 text-center transition-colors">
                  <Settings className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <span className="text-xs text-gray-300">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <motion.div
            className="h-full space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Production Summary Cards */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { title: 'Total Parts', value: 20, icon: CheckCircle, color: 'blue' },
                { title: 'Completed', value: 15, icon: CheckCircle, color: 'green' },
                { title: 'In Progress', value: 1, icon: Clock, color: 'yellow' },
                { title: 'Rejected', value: 5, icon: AlertTriangle, color: 'red' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className={`bg-gradient-to-br ${
                      item.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                      item.color === 'green' ? 'from-green-500/20 to-green-600/20' :
                      item.color === 'yellow' ? 'from-yellow-500/20 to-yellow-600/20' :
                      'from-red-500/20 to-red-600/20'
                    } rounded-xl p-6 border ${
                      item.color === 'blue' ? 'border-blue-400/30' :
                      item.color === 'green' ? 'border-green-400/30' :
                      item.color === 'yellow' ? 'border-yellow-400/30' :
                      'border-red-400/30'
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-300 text-sm">{item.title}</p>
                        <p className={`text-3xl font-bold ${
                          item.color === 'blue' ? 'text-blue-400' :
                          item.color === 'green' ? 'text-green-400' :
                          item.color === 'yellow' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {item.value}
                        </p>
                      </div>
                      <Icon className={`w-8 h-8 ${
                        item.color === 'blue' ? 'text-blue-400' :
                        item.color === 'green' ? 'text-green-400' :
                        item.color === 'yellow' ? 'text-yellow-400' :
                        'text-red-400'
                      }`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Workflow Visualization */}
            <motion.div
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Production Workflow</h2>
              
              <div className="flex items-center justify-between">
                {[
                  { station: 'Cutting', completed: 18, rejected: 2, color: 'blue' },
                  { station: 'Welding', completed: 17, rejected: 1, color: 'orange' },
                  { station: 'Painting', completed: 16, rejected: 1, color: 'purple' }
                ].map((station, index) => (
                  <React.Fragment key={station.station}>
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full border-4 ${
                        station.color === 'blue' ? 'border-blue-400 bg-blue-400/20' :
                        station.color === 'orange' ? 'border-orange-400 bg-orange-400/20' :
                        'border-purple-400 bg-purple-400/20'
                      } flex items-center justify-center mb-3`}>
                        <CheckCircle className={`w-8 h-8 ${
                          station.color === 'blue' ? 'text-blue-400' :
                          station.color === 'orange' ? 'text-orange-400' :
                          'text-purple-400'
                        }`} />
                      </div>
                      <h3 className="font-semibold mb-2">{station.station}</h3>
                      <div className="text-sm text-gray-400">
                        <div className="text-green-400">{station.completed} success</div>
                        <div className="text-red-400">{station.rejected} rejected</div>
                      </div>
                    </div>
                    
                    {index < 2 && (
                      <motion.div
                        className="flex-1 h-0.5 bg-gradient-to-r from-current to-transparent mx-8"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.5 + index * 0.3, duration: 0.8 }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Live Notifications */}
            <motion.div
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Live Updates</h3>
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      notification.type === 'success' ? 'bg-green-500/10 border border-green-500/20' :
                      notification.type === 'error' ? 'bg-red-500/10 border border-red-500/20' :
                      notification.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                      'bg-blue-500/10 border border-blue-500/20'
                    }`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'success' ? 'bg-green-400' :
                      notification.type === 'error' ? 'bg-red-400' :
                      notification.type === 'warning' ? 'bg-yellow-400' :
                      'bg-blue-400'
                    }`} />
                    <span className="flex-1 text-sm">{notification.message}</span>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}