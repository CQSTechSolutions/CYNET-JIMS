'use client';
import BigText from "@/app/(components)/BigText";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <section className="w-full h-screen overflow-hidden relative select-none bg-[#1A0F0F]">
            <Navbar />
            {/* Background Video with Overlay */}
            <div className="relative w-full h-full">
                <video 
                    src={"/nnn.mp4"} 
                    autoPlay 
                    muted 
                    loop 
                    className="h-full w-full object-cover opacity-50"
                ></video>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A0F0F]/80"></div>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <BigText/>
            </div>
        </section>
    );
}

export default Home;