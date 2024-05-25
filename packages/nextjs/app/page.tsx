"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import {Button} from '../../../@/components/ui/button'
import HeroSection from '../components/custom/HeroSection'
import NumberSection from '../components/custom/NumberSection'

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <HeroSection/>
      <NumberSection/>
    </>
  );
};

export default Home;
