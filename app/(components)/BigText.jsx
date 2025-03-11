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
    <div className="h-full w-full flex flex-col items-center justify-center px-4">
      {/* Big Text Wrapper */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        {bigTextCnt.map((c, index) => (
          <div key={index} className="text-white flex flex-col items-center">
            <p className="text-green-500 font-poppins text-[2vw] sm:text-[1.8vw] md:text-[1.5vw] lg:text-[1.2vw] 
                        tracking-wider font-semibold mb-0">
              {c.small_Letter}
            </p>
            <h2 className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] 
                         leading-none font-monot bg-gradient-to-b from-white to-white/40 
                         text-transparent bg-clip-text">
              {c.big_Letter}
            </h2>
          </div>
        ))}
      </div>

      {/* Subtitle Text */}
      <div className="text-center mt-4 sm:mt-6 md:mt-8">
        <p className="font-poppins font-semibold text-white 
                     text-[2.5vw] sm:text-[2vw] md:text-[1.8vw] lg:text-[1.5vw]">
          [ Jagannath International Management School, New Delhi ]
        </p>
        <p className="font-poppins font-bold text-white mt-2 
                     text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.8vw]">
          [ <span className="text-green-500">March 22nd, 2025</span> ]
        </p>
      </div>

      {/* Logo */}
      <Image
        src={"/cylogo.PNG"}
        alt={"cylogo"}
        width={120}
        height={120}
        className="mt-6 sm:mt-8 md:mt-10 
                  w-[15vw] h-[15vw] sm:w-[12vw] sm:h-[12vw] md:w-[10vw] md:h-[10vw] lg:w-[8vw] lg:h-[8vw] 
                  max-w-[120px] max-h-[120px] min-w-[60px] min-h-[60px]
                  rounded-full object-cover"
      />
    </div>
  );
};

export default BigText;
