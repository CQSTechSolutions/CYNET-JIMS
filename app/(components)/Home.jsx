import BigText from "@/app/(components)/BigText";
import Image from "next/image";

const Home = () => {
    return (
        <section className={"w-screen h-screen overflow-hidden relative select-none"}>
            <div className={"flex items-center justify-center absolute top-2 left-0 right-0 md:left-4 md:right-auto z-10"}>
                <Image 
                    src={"/jimslogo.webp"} 
                    alt={"logo"} 
                    width={100} 
                    height={100}
                    className="w-14 h-14 md:w-[100px] md:h-[100px]" 
                />
                <p className={"text-white text-xl md:text-4xl font-monot mx-2"}>X</p>
                <Image 
                    src={"/eglogo.webp"} 
                    className={"w-10 h-10 md:w-[70px] md:h-[70px]"} 
                    alt={"logo"} 
                    width={70} 
                    height={70} 
                />
            </div>
            {/* Background Video */}
            <video 
                src={"/nnn.mp4"} 
                autoPlay 
                muted 
                loop 
                className="h-full w-full object-cover"
            ></video>
            <div id={"black-overlay"} className={"w-screen h-screen bg-black/30 absolute top-0 left-0"}></div>
            <div className={"absolute top-0 left-0 w-screen h-screen"}>
                <BigText/>
            </div>
        </section>
    );
}

export default Home;