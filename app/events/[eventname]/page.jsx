"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import eventsData from '@/helpers/eventsdata.json';
import ClassicEvent from "@/helpers/eventpages/ClassicEvent";
import GamingEvent from "@/helpers/eventpages/GamingEvent";
import Navbar from "@/app/(components)/Navbar";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const eventname = params.eventname;

  // Get event data from JSON
  const event = eventsData.events.find(e => e.id === eventname);

  useEffect(() => {
    if (eventname && !event) {
      router.push("/404");
    }
  }, [eventname, router, event]);

  if (!eventname || !event) {
    return null;
  }

  // Check if it's a gaming event by looking for gaming-specific properties
  const isGamingEvent = event.platform && event.format;

  return (
    <>
      <Navbar />
      <div className="">
        {isGamingEvent ? (
          <GamingEvent event={event} />
        ) : (
          <ClassicEvent event={event} />
        )}
      </div>
    </>
  );
};

export default Page;
