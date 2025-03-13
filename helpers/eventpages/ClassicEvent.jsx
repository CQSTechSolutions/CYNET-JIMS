"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ClassicEvent = ({ event }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative" ref={ref}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-2xl -z-10" />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-3xl -z-10" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
            {event.name}
          </h1>
          {event.subtitle && (
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-4 font-light tracking-wide">
              {event.subtitle}
            </h2>
          )}
          {event.tagline && (
            <p className="text-lg md:text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-medium italic">
              {event.tagline}
            </p>
          )}
        </motion.div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 text-center max-w-3xl mx-auto backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
        >
          <p className="text-lg text-gray-300 leading-relaxed">{event.description}</p>
        </motion.div>

        {/* Rules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20 backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
        >
          <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Rules & Guidelines
          </h3>
          <ul className="list-none max-w-2xl mx-auto space-y-4">
            {event.rules.map((rule, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-gray-300 flex items-start space-x-3 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
              >
                <span className="text-purple-400 text-xl">•</span>
                <span className="group-hover:text-white transition-colors duration-300">{rule}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Judging Criteria Section */}
        {event.judgingCriteria && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20 backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
          >
            <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Judging Criteria
            </h3>
            <ul className="list-none max-w-2xl mx-auto space-y-4">
              {event.judgingCriteria.map((criteria, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-gray-300 flex items-start space-x-3 group hover:bg-white/5 p-3 rounded-lg transition-all duration-300"
                >
                  <span className="text-purple-400 text-xl">•</span>
                  <span className="group-hover:text-white transition-colors duration-300">{criteria}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Coordinators Section */}
        {event.coordinators && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-20"
          >
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Student Coordinators
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {event.coordinators.map((coordinator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="backdrop-blur-sm bg-white/5 p-6 rounded-xl shadow-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105 group"
                >
                  <p className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors duration-300">
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

        {/* Registration Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <a
            href="/register-for-events"
            className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold 
            shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] 
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

export default ClassicEvent;
