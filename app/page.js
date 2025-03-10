import Home from "@/app/(components)/Home";
import About from "@/app/(sections)/About";
import EventOrg from "@/app/(sections)/EventOrg";
import HeadCord from "@/app/(sections)/HeadCord";
import Footer from "@/app/(components)/Footer";
import Ourteam from "./(sections)/Ourteam";
import Events from "./(sections)/Events";


export default function Page() {
    return (
        <div className={"overflow-x-hidden select-none"}>
            <Home/>
            <Events />
            <About/>
            {/*<EventOrg/>*/}
            <HeadCord />
            <Ourteam />
            <Footer />
        </div>
    );
}
