"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import eventsData from '@/helpers/eventsdata.json';
import ClassicEvent from "@/helpers/eventpages/ClassicEvent";
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

  return (
    <>
      <Navbar />
      <div className="">
        <ClassicEvent event={event} />
      </div>
    </>
  );
};

export default Page;
