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
          <div className="w-full flex-between py-5 px-16 bg-[#0c0c20] fixed top-0 left-0">
            <h1 className="text-gray-400 playwrite-font text-xl">Crypto tracker</h1>
            <ConnectButton/>
          </div>
          {mounted && <Hero />}
      
    </div>
  );
}
