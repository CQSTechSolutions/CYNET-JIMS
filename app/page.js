import Home from "@/app/(components)/Home";
import About from "@/app/(sections)/About";
import EventOrg from "@/app/(sections)/EventOrg";
import HeadCord from "@/app/(sections)/HeadCord";
import Footer from "@/app/(components)/Footer";
import Ourteam from "./(sections)/Ourteam";


export default function Page() {
    return (
        <div className={"overflow-x-hidden select-none"}>
            <Home/>
            <About/>
            {/*<EventOrg/>*/}
            <HeadCord />
            <Ourteam />
            <Footer />
        </div>
    );
}
