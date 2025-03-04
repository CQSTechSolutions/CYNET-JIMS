import Image from "next/image";

const EventOrg = () => {
    // TODO: Populate with real data.
    // const eventOrganisers = [];
    return(
        <section className={"w-full h-screen bg-gradient-to-br from-cyan-600 to-black text-white"}>
            <h2 className={"font-monot flex flex-col items-center justify-center text-center text-5xl p-3 py-20"}>
                <span>Event</span>
                <span>Oraganisers</span>
            </h2>
            <div className={"flex items-center justify-center gap-16"}>
                {
                    Array.from({length: 4}).map((item, i) => (
                        <div key={i} className={"bg-gradient-to-tr from-blue-500 to-transparent rounded-md flex flex-col items-center justify-center gap-4"}>
                            <Image src={"/smporg.webp"} alt={"sample_org"} width={200} height={200}/>
                            <p className={"font-poppins text-xl"}>Fresca</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default EventOrg;