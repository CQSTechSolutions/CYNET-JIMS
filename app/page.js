import Home from "@/app/(components)/Home";
import About from "@/app/(sections)/About";
import EventOrg from "@/app/(sections)/EventOrg";
import HeadCord from "@/app/(sections)/HeadCord";


export default function Page() {
    return (
        <div className={"overflow-x-hidden select-none"}>
            <Home/>
            <About/>
            {/*<EventOrg/>*/}
            <HeadCord />
        </div>
    );
}
