import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, AlertTriangle, Activity, Target, Clock, Settings, Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboardScene() {
  const [animationStep, setAnimationStep] = useState(0);

  // Sample data for charts
  const productionData = [
    { day: 'Mon', produced: 85, rejected: 8 },
    { day: 'Tue', produced: 92, rejected: 5 },
    { day: 'Wed', produced: 78, rejected: 12 },
    { day: 'Thu', produced: 88, rejected: 7 },
    { day: 'Fri', produced: 95, rejected: 4 },
    { day: 'Sat', produced: 90, rejected: 6 },
    { day: 'Sun', produced: 87, rejected: 9 }
  ];

  const efficiencyData = [
    { time: '08:00', efficiency: 85 },
    { time: '10:00', efficiency: 92 },
    { time: '12:00', efficiency: 88 },
    { time: '14:00', efficiency: 95 },
    { time: '16:00', efficiency: 89 },
    { time: '18:00', efficiency: 91 }
  ];

  const stationPerformance = [
    { name: 'Cutting', value: 90, color: '#3B82F6' },
    { name: 'Welding', value: 94, color: '#F59E0B' },
    { name: 'Painting', value: 88, color: '#8B5CF6' }
  ];

  const defectTypes = [
    { name: 'Dimension', value: 35, color: '#EF4444' },
    { name: 'Surface', value: 25, color: '#F59E0B' },
    { name: 'Weld Quality', value: 20, color: '#8B5CF6' },
    { name: 'Paint Coverage', value: 20, color: '#10B981' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => Math.min(prev + 1, 3));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="size-full bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-auto">
      {/* Header */}
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm border-b border-white/10 px-8 py-6 sticky top-0 z-10"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-10 h-10 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-gray-400">Production Intelligence &amp; Performance Metrics</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div
              className="bg-green-500/20 border border-green-400/30 px-4 py-2 rounded-lg flex items-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300 text-sm">Real-time Data</span>
            </motion.div>
            
            <button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </button>
            
            <button className="bg-gray-500/20 hover:bg-gray-500/30 border border-gray-400/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Configure</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="p-8 space-y-8">
        {/* KPI Cards */}
        <motion.div
          className="grid grid-cols-5 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: animationStep >= 1 ? 1 : 0, y: animationStep >= 1 ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {[
            { title: 'Total Parts Processed', value: '1,247', change: '+12%', icon: Target, color: 'blue' },
            { title: 'Overall Yield Rate', value: '87.5%', change: '+3.2%', icon: TrendingUp, color: 'green' },
            { title: 'Active Alerts', value: '3', change: '-2', icon: AlertTriangle, color: 'yellow' },
            { title: 'Avg. Cycle Time', value: '4.2min', change: '-0.3min', icon: Clock, color: 'purple' },
            { title: 'System Uptime', value: '99.2%', change: '+0.1%', icon: Activity, color: 'cyan' }
          ].map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.title}
                className={`bg-gradient-to-br ${
                  kpi.color === 'blue' ? 'from-blue-500/20 to-blue-600/20 border-blue-400/30' :
                  kpi.color === 'green' ? 'from-green-500/20 to-green-600/20 border-green-400/30' :
                  kpi.color === 'yellow' ? 'from-yellow-500/20 to-yellow-600/20 border-yellow-400/30' :
                  kpi.color === 'purple' ? 'from-purple-500/20 to-purple-600/20 border-purple-400/30' :
                  'from-cyan-500/20 to-cyan-600/20 border-cyan-400/30'
                } rounded-xl p-6 border backdrop-blur-sm`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className={`w-7 h-7 ${
                    kpi.color === 'blue' ? 'text-blue-400' :
                    kpi.color === 'green' ? 'text-green-400' :
                    kpi.color === 'yellow' ? 'text-yellow-400' :
                    kpi.color === 'purple' ? 'text-purple-400' :
                    'text-cyan-400'
                  }`} />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    kpi.change.startsWith('+') ? 'bg-green-500/20 text-green-300' : 
                    kpi.change.startsWith('-') && kpi.title.includes('Alert') ? 'bg-green-500/20 text-green-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className={`text-2xl font-bold ${
                    kpi.color === 'blue' ? 'text-blue-400' :
                    kpi.color === 'green' ? 'text-green-400' :
                    kpi.color === 'yellow' ? 'text-yellow-400' :
                    kpi.color === 'purple' ? 'text-purple-400' :
                    'text-cyan-400'
                  }`}>{kpi.value}</p>
                  <p className="text-gray-300 text-sm">{kpi.title}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Production Trends */}
          <motion.div
            className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: animationStep >= 2 ? 1 : 0, x: animationStep >= 2 ? 0 : -50 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              Weekly Production Trends
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Bar dataKey="produced" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rejected" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-sm text-gray-300">Produced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <span className="text-sm text-gray-300">Rejected</span>
              </div>
            </div>
          </motion.div>

          {/* Efficiency Trends */}
          <motion.div
            className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: animationStep >= 2 ? 1 : 0, x: animationStep >= 2 ? 0 : 50 }}
            transition={{ duration: 1, delay: 1.7 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-green-400" />
              Real-time Efficiency
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[75, 100]} />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <span className="text-2xl font-bold text-green-400">91.2%</span>
              <p className="text-sm text-gray-300">Current Efficiency</p>
            </div>
          </motion.div>
        </div>

        {/* Station Performance & Defect Analysis */}
        <div className="grid grid-cols-2 gap-8">
          {/* Station Performance */}
          <motion.div
            className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: animationStep >= 3 ? 1 : 0, y: animationStep >= 3 ? 0 : 50 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-400" />
              Station Performance
            </h3>
            <div className="space-y-4">
              {stationPerformance.map((station, index) => (
                <div key={station.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{station.name}</span>
                    <span className="font-semibold" style={{ color: station.color }}>
                      {station.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="h-3 rounded-full"
                      style={{ backgroundColor: station.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${station.value}%` }}
                      transition={{ duration: 1.5, delay: 2.8 + index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Station Details */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { name: 'Cutting', uptime: '98.5%', throughput: '95/hr' },
                { name: 'Welding', uptime: '99.1%', throughput: '87/hr' },
                { name: 'Painting', uptime: '96.8%', throughput: '82/hr' }
              ].map((station, index) => (
                <div key={station.name} className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-400 mb-1">{station.name}</p>
                  <p className="text-lg font-semibold text-white">{station.uptime}</p>
                  <p className="text-xs text-gray-500">{station.throughput}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Defect Analysis */}
          <motion.div
            className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: animationStep >= 3 ? 1 : 0, y: animationStep >= 3 ? 0 : 50 }}
            transition={{ duration: 1, delay: 2.7 }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              Defect Analysis
            </h3>
            <div className="flex items-center justify-center h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={defectTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {defectTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {defectTypes.map((type, index) => (
                <div key={type.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-sm text-gray-300">{type.name}</span>
                  <span className="text-sm font-semibold text-white ml-auto">{type.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Alerts & Recommendations */}
        <motion.div
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-400/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            Active Alerts &amp; Recommendations
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { 
                type: 'Warning', 
                message: 'Cutting station efficiency below target (88%)', 
                action: 'Schedule maintenance check',
                severity: 'medium'
              },
              { 
                type: 'Critical', 
                message: 'Paint quality variance detected in last batch', 
                action: 'Calibrate spray system',
                severity: 'high'
              },
              { 
                type: 'Info', 
                message: 'Weekly efficiency target achieved (91.2%)', 
                action: 'Continue current settings',
                severity: 'low'
              }
            ].map((alert, index) => (
              <div 
                key={index}
                className={`rounded-lg p-4 border ${
                  alert.severity === 'high' ? 'bg-red-500/10 border-red-400/30' :
                  alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-400/30' :
                  'bg-blue-500/10 border-blue-400/30'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'high' ? 'bg-red-400' :
                    alert.severity === 'medium' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{alert.type}</p>
                    <p className="text-sm text-gray-300">{alert.message}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 italic">→ {alert.action}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}