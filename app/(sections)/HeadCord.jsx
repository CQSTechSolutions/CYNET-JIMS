import Image from "next/image"

const HeadCord = () => {
    // TODO: populate with real data.
    // const heads = [];
    return (
        <section className={"w-full h-screen bg-gradient-to-b from-pink-500 to-black text-white"}>
            <h2 className={"font-monot text-center text-5xl p-3 py-20 flex flex-col justify-center items-center"}>
                <span>Head</span>
                <span>Coordinators</span>
            </h2>
            <div className={"flex items-center justify-center gap-12"}>
                {
                    Array.from({length: 4}).map((_, i) => (
                        <div key={i} className={"text-center"}>
                            <div>
                                <Image src={"/prs.webp"} alt={"picture"} width={200} height={200}/>
                                <p className={"font-poppins text-xl my-4"}>President</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
};

export default HeadCord;