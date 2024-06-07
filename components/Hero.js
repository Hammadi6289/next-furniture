import React from "react";
import { Fade } from "react-reveal";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <Fade bottom>
        <div>
          <Image
            src="/images/HERO.png"
            alt="Mr. Furniture Logo"
            layout="responsive"
            width={100}
            height={50}
            className="hover:opacity-80 transition duration-300"
          />
        </div>
      </Fade>
    </div>
  );
};

export default Hero;
