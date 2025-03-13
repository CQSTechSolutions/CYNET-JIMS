"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const GamingEvent = ({ event }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 bg-[url('/cyber-grid.png')] opacity-10 bg-repeat" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl -z-10" />
          <h1 className="text-6xl md:text-8xl font-black mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 
              animate-gradient bg-[length:200%_auto] hover:bg-[length:300%_auto] transition-all duration-500
              drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]">
              {event.name}
            </span>
          </h1>
          {event.platform && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-lg mb-6 
              shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] 
              transition-all duration-300 transform hover:scale-105"
            >
              {event.platform} | {event.format}
            </motion.div>
          )}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-cyan-300 font-medium tracking-wide"
          >
            Location: {event.location}
          </motion.p>
        </motion.div>

        {/* Game Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {/* Game Details Card */}
          <div className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-2xl border border-purple-500/20 
            hover:border-purple-500/40 transition-all duration-300 group
            hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
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
                    <span className="text-cyan-400 text-sm">{item.label}</span>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Rules Card */}
          <div className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-2xl border border-purple-500/20 
            hover:border-purple-500/40 transition-all duration-300
            hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Tournament Rules
            </h3>
            <ul className="space-y-4">
              {event.rules.map((rule, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-start space-x-3 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
                >
                  <span className="text-cyan-400 mt-1">•</span>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{rule}</span>
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
            className="mb-20"
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
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
                    hover:bg-gradient-to-br hover:from-purple-800/50 hover:to-cyan-800/50
                    transition-all duration-300 transform hover:scale-105
                    border border-purple-500/20 hover:border-purple-500/40
                    shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                >
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{game}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Registration Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="/register-for-events"
            className="inline-block bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 text-white px-10 py-4 rounded-xl font-bold 
              shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] 
              transition-all duration-300 transform hover:scale-105
              animate-gradient bg-[length:200%_auto] hover:bg-[length:300%_auto]"
          >
            Register Now {event.price > 0 && `(₹${event.price})`}
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default GamingEvent; 