import Home from "@/app/(components)/Home";
import About from "@/app/(sections)/About";
import EventOrg from "@/app/(sections)/EventOrg";
import HeadCord from "@/app/(sections)/HeadCord";
import Ourteam from "@/app/(sections)/Ourteam";

export default function Page() {
  return (
    <div className={"overflow-x-hidden select-none"}>
      <Home />
      <About />
      {/*<EventOrg/>*/}
      <HeadCord />
      <Ourteam />
    </div>
  );
}
