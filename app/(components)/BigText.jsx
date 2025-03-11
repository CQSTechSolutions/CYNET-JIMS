import Image from "next/image";

const BigText = () => {
  const bigTextCnt = [
    {
      big_Letter: "c",
      small_Letter: "JIMS VK",
    },
    {
      big_Letter: "y",
      small_Letter: "Present",
    },
    {
      big_Letter: "n",
      small_Letter: "The",
    },
    {
      big_Letter: "e",
      small_Letter: "Greatest",
    },
    {
      big_Letter: "t",
      small_Letter: "IT Fest",
    },
  ];
  return (
    <div
      className={
        "h-full w-full flex flex-col items-center justify-center px-2 md:px-4"
      }
    >
      <div
        id={"big-text-wrapper"}
        className={"flex items-center justify-center gap-1 md:gap-5"}
      >
        {bigTextCnt.map((c, index) => (
          <div key={index} className={"text-white flex flex-col gap-1"}>
            <p
              className={
                "mt-3 md:mt-5 text-center font-poppins tracking-[0.2vw] md:tracking-[0.5vw] text-[10px] md:text-base whitespace-nowrap"
              }
            >
              {c.small_Letter}
            </p>
            <h2
              className={
                "text-[18vw] md:text-[14vw] bg-gradient-to-b from-white to-white/40 text-transparent bg-clip-text -mt-6 md:-mt-16 font-monot"
              }
            >
              {c.big_Letter}
            </h2>
          </div>
        ))}
      </div>
      <div className="text-center text-xs md:text-sm">
        <p className={"font-poppins font-semibold text-white"}>
          [ At, Jagannath International Management School, ]
        </p>
        <p className={"font-poppins font-bold text-white mt-1 text-3xl"}>
          [ On March 22nd, 2025 ]
        </p>
      </div>
      <Image
        src={"/cylogo.PNG"}
        alt={"cylogo"}
        width={120}
        height={120}
        className={
          "rounded-full mt-4 md:mt-6 w-32 h-32 md:w-[120px] md:h-[120px]"
        }
      />
    </div>
  );
};

export default BigText;
