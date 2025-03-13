"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Navbar from "@/app/(components)/Navbar";
import eventsData from '@/helpers/eventsdata.json';
import ComingSoon from "@/app/(components)/ComingSoon";

const EventCard = ({ event, isGaming = false }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Link href={`/events/${event.id}`}>
        <div className="backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 shadow-xl border border-white/10 
          hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105
          hover:shadow-[0_0_30px_rgba(0,0,255,0.2)]">
          {/* Card Header */}
          <div className="relative z-10">
            <h3 className={`text-2xl font-bold mb-2 bg-clip-text text-transparent 
              ${isGaming 
                ? 'bg-gradient-to-r from-blue-400 to-purple-600' 
                : 'bg-gradient-to-r from-purple-600 to-blue-800'}`}>
              {event.name}
            </h3>
            {event.subtitle && (
              <p className="text-gray-300 mb-2">{event.subtitle}</p>
            )}
            {isGaming && (
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300">
                  {event.platform}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300">
                  {event.format}
                </span>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="mt-4">
            {event.description && (
              <p className="text-gray-300 line-clamp-2 mb-4">{event.description}</p>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {event.coordinators && (
                  <span className="text-sm text-gray-300">
                    {event.coordinators.length} coordinator{event.coordinators.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="text-right">
                {event.price > 0 ? (
                  <span className="text-blue-400 font-semibold">₹{event.price}</span>
                ) : (
                  <span className="text-blue-400 font-semibold">Free</span>
                )}
              </div>
            </div>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </div>
      </Link>
    </motion.div>
  );
};

const EventsPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Separate regular events from gaming events
  const regularEvents = eventsData.events.filter(event => !event.platform);
  const gamingEvents = eventsData.events.filter(event => event.platform);

  return (
    // <>
    //   <Navbar />
    //   <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white py-20 overflow-hidden">
    //     <div className="container mx-auto px-4 relative" ref={ref}>
    //       {/* Decorative Elements */}
    //       <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
    //       <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-2xl -z-10" />
    //
    //       {/* Main Events Section */}
    //       <section className="mb-20">
    //         <motion.div
    //           initial={{ opacity: 0, y: 20 }}
    //           animate={inView ? { opacity: 1, y: 0 } : {}}
    //           transition={{ duration: 0.8 }}
    //           className="text-center mb-12"
    //         >
    //           <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-400 to-blue-600">
    //             Featured Events
    //           </h1>
    //           <p className="text-gray-300 text-lg">Discover and participate in our exciting events</p>
    //         </motion.div>
    //
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //           {regularEvents.map((event, index) => (
    //             <EventCard key={event.id} event={event} />
    //           ))}
    //         </div>
    //       </section>
    //
    //       {/* Gaming Events Section */}
    //       <section>
    //         <motion.div
    //           initial={{ opacity: 0, y: 20 }}
    //           animate={inView ? { opacity: 1, y: 0 } : {}}
    //           transition={{ duration: 0.8 }}
    //           className="text-center mb-12"
    //         >
    //           <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-600 to-purple-400">
    //             Gaming Tournaments
    //           </h2>
    //           <p className="text-gray-300 text-lg">Compete in our thrilling gaming competitions</p>
    //         </motion.div>
    //
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //           {gamingEvents.map((event, index) => (
    //             <EventCard key={event.id} event={event} isGaming={true} />
    //           ))}
    //         </div>
    //       </section>
    //     </div>
    //   </div>
    // </>
      <ComingSoon />
  );
};

export default EventsPage;