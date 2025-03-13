"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const GamingEvent = ({ event }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#210000] to-[#830101] text-white pt-28 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"/>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple-500/10 via-blue-500/10 to-transparent blur-2xl -z-10"/>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl -z-10"/>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-white text-transparent bg-gradient-to-r from-red-500 to-yellow-500 drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
            {event.name}
          </h1>
          {event.platform && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-red-600 to-yellow-600 text-white text-lg mb-6 
              shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] 
              transition-all duration-300 transform hover:scale-105"
            >
              {event.platform} | {event.format}
            </motion.div>
          )}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-300 font-medium tracking-wide"
          >
            Location: {event.location}
          </motion.p>
        </motion.div>

        {/*Register Button*/}
        <div className={"w-full flex items-center justify-center mb-8 animate-bounce"}><Link
            href="/register-for-events"
            className="inline-block bg-green-700 text-white px-10 py-4 rounded-xl font-bold
            shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]
            transition-all duration-300 transform hover:scale-105
            animate-gradient bg-[length:200%_auto] hover:bg-[length:300%_auto]"
        >
          Register Now {event.price > 0 && `(₹${event.price})`}
        </Link></div>

        {/* Game Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {/* Game Details Card */}
          <div className="backdrop-blur-sm bg-[#540909] p-8 rounded-2xl shadow-xl border border-white/10 
            hover:border-blue-500/30 transition-all duration-300 group">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Game Details
            </h3>
            <ul className="space-y-6">
              {[
                { icon: "🎮", label: "Platform", value: event.platform },
                { icon: "🏆", label: "Format", value: event.format },
                { icon: "📍", label: "Location", value: event.location },
                { icon: "💰", label: "Entry Fee", value: `₹${event.price}` }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center space-x-4 group-hover:transform group-hover:translate-x-2 transition-transform duration-300"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <span className="text-yellow-400 text-sm">{item.label}</span>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Rules Card */}
          <div className="backdrop-blur-sm bg-[#540909] p-8 rounded-2xl shadow-xl border border-white/10 
            hover:border-blue-500/30 transition-all duration-300">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Tournament Rules
            </h3>
            <ul className="space-y-4">
              {event.rules.map((rule, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-gray-300 flex items-start space-x-3 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
                >
                  <span className="text-yellow-400 text-xl">•</span>
                  <span className="group-hover:text-white transition-colors duration-300">{rule}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Mini Games Grid */}
        {event.miniGames && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20 backdrop-blur-sm bg-[#540909] rounded-2xl p-8 shadow-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Mini Games
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {event.miniGames.map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="backdrop-blur-sm bg-white/5 p-6 rounded-xl text-center
                    border border-white/10 hover:border-yellow-500/30
                    transition-all duration-300 transform hover:scale-105 group"
                >
                  <p className="text-gray-300 group-hover:text-yellow-400 transition-colors duration-300">{game}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Add coordinator section if available */}
        {event.coordinators && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8, delay: 0.8}}
            className="text-center mb-20"
          >
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Student Coordinators
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {event.coordinators.map((coordinator, index) => (
                <motion.div
                  key={index}
                  initial={{opacity: 0, scale: 0.9}}
                  animate={inView ? {opacity: 1, scale: 1} : {}}
                  transition={{duration: 0.5, delay: 0.1 * index}}
                  className="backdrop-blur-sm bg-white/5 p-6 rounded-xl shadow-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105 group"
                >
                  <p className="font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {coordinator.name}
                  </p>
                  {coordinator.semester && (
                    <p className="text-gray-400">Semester: {coordinator.semester}</p>
                  )}
                  {coordinator.contact && (
                    <p className="text-green-400 mt-2">{coordinator.contact}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamingEvent; 