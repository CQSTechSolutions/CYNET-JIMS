import BigText from "@/app/(components)/BigText";
import Image from "next/image";

const Home = () => {
    return (
        <section className={"w-screen h-screen overflow-hidden relative select-none"}>
            <div className={"flex items-center justify-center absolute top-0 left-2 z-10"}>
                <Image src={"/jimslogo.webp"} alt={"logo"} width={100} height={100} />
                <p className={"text-white text-4xl font-monot"}>X</p>
                <Image src={"/eglogo.webp"} className={"ml-4"} alt={"logo"} width={70} height={70} />
            </div>
            <video src={"/nnn.mp4"} autoPlay muted loop></video>
            <div id={"black-overlay"} className={"w-screen h-screen bg-black/30 absolute top-0 left-0"}></div>
            <div className={"absolute top-0 left-0 w-screen h-screen"}>
                <BigText/>
            </div>
        </section>
    );
}

export default Home;