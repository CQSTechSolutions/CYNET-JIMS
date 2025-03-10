const About = () => {
    return(
        <section className={"w-full min-h-screen bg-gradient-to-b from-green-500 to-black text-white"}>
            <h2 className={"font-monot text-center text-4xl sm:text-5xl p-3 py-20"}>About - Cynet</h2>
            <div className={"font-poppins flex flex-col items-center justify-center text-justify text-lg sm:text-2xl gap-8 sm:gap-12 px-4 sm:px-12"}>
                <p className="text-base sm:text-lg">CYNET, the flagship Annual IT Fest of JIMS Vasant Kunj, has been a beacon of technological excellence for the past 20 years. This hallmark event is a dynamic convergence of creativity and innovation, showcasing a diverse array of competitions. From the precision of website design to the excitement of treasure hunts, the cinematic craft of reel making, and the strategic intensity of gaming competitions, CYNET offers a comprehensive platform for IT enthusiasts.</p>

                <p className="text-base sm:text-lg">What distinguishes CYNET is its broad appeal, drawing participants from across Delhi NCR. It has become a melting pot of talent, ideas, and enthusiasm, reflecting the rich diversity of the region's student community. As a testament to its success, CYNET has evolved beyond a mere fest becoming a hub for the exchange of ideas and the celebration of technological prowess.</p>
            </div>
        </section>
    )
};

export default About;