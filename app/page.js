import Home from "@/app/(components)/Home";
import About from "@/app/(sections)/About";
import EventOrg from "@/app/(sections)/EventOrg";
import HeadCord from "@/app/(sections)/HeadCord";
<<<<<<< HEAD
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
=======
import Footer from "@/app/(components)/Footer";


export default function Page() {
    return (
        <div className={"overflow-x-hidden select-none"}>
            <Home/>
            <About/>
            {/*<EventOrg/>*/}
            <HeadCord />
            <Footer />
        </div>
    );
>>>>>>> dbc5365148da8f70df8089f936670833dc1d7859
}
