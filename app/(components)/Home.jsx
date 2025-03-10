'use client';
import BigText from "@/app/(components)/BigText";
import Navbar from "./Navbar";

const Home = () => {

    return (
        <section className={"w-screen h-screen overflow-hidden relative select-none"}>
            <Navbar />
            {/* Background Video */}
            <video 
                src={"/nnn.mp4"} 
                autoPlay 
                muted 
                loop 
                className="h-full w-full object-cover"
            ></video>
            {/* <div id={"black-overlay"} className={"w-screen h-screen bg-black/30 absolute top-0 left-0"}></div> */}
            <div className={"absolute top-0 left-0 w-screen h-screen"}>
                <BigText/>
            </div>
        </section>
    );
}

export default Home;