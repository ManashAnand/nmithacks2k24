"use client";

import Link from "next/link";
import { Button } from "../../../@/components/ui/button";
import HeroSection from "../components/custom/HeroSection";
import NumberSection from "../components/custom/NumberSection";
import PricingSection from "../components/custom/PricingSection";
import Spline from "@splinetool/react-spline";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NavBar from "~~/components/componentsIntegrated/navbar";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
    <div className="relative backdrop-blur-md h-screen">

      <Spline scene="https://prod.spline.design/mLn0zEOGOMad5XDj/scene.splinecode" >
      </Spline>
    </div>
    <div className="absolute top-14">

        <NavBar />
        <HeroSection />
    </div>
        <NumberSection />
        <PricingSection />
    </>
  );
};

export default Home;
