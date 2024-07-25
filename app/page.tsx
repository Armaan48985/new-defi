'use client';
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import { ConnectButton } from "@/components/ConnectButton";


export default function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div>
       
          <div className="w-full flex-between py-5 px-10 bg-[#13132d] fixed top-0 left-0">
            <h1 className="text-gray-300 playwrite-font text-xl">Crypto tracker</h1>
            <ConnectButton/>
          </div>
          {mounted && <Hero />}
      
    </div>
  );
}
