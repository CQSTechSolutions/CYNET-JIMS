"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import gamedata from '@/helpers/gamedata.json';
import GamingEvent from "@/helpers/eventpages/GamingEvent";
import Navbar from "@/app/(components)/Navbar";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const gamename = params.gamename;

  // Get game data from JSON
  const game = gamedata.gamedata.find(g => g.id === gamename);

  useEffect(() => {
    if (gamename && !game) {
      router.push("/404");
    }
  }, [gamename, router, game]);

  if (!gamename || !game) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="">
        <GamingEvent event={game} />
      </div>
    </>
  );
};

export default Page;
