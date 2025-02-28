import Image from "next/image";

const BigText = () => {
    const bigTextCnt = [{
        big_Letter: 'c', small_Letter: "JIMS VK"
    }, {
        big_Letter: 'y', small_Letter: "Present"
    }, {
        big_Letter: 'n', small_Letter: 'The'
    }, {
        big_Letter: 'e', small_Letter: "Greatest"
    }, {
        big_Letter: 't', small_Letter: "IT Fest"
    }]
    return (
        <div className={"h-full w-full flex flex-col items-center justify-center"}>
            <div id={"big-text-wrapper"} className={"flex items-center justify-center gap-5"}>
                {bigTextCnt.map((c, index) => (<div key={index} className={"text-white flex flex-col gap-1"}>
                    <p className={"mt-5 tracking-widest"}>{c.small_Letter}</p>
                    <h2 className={"text-[14vw] bg-gradient-to-b from-white to-white/40 text-transparent bg-clip-text -mt-16 font-monot"}>{c.big_Letter}</h2>
                </div>))}
            </div>
            <div>
                <p className={"font-poppins font-semibold text-xl text-white"}>[ On March 22nd, 2025 ]</p>
            </div>
            <Image src={"/cylogo.PNG"} alt={"cylogo"} width={120} height={120} className={"rounded-full mt-6"} />
        </div>
    );
}

export default BigText;