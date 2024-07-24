'use client'
import { WagmiConfig, createConfig} from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { useEffect, useState } from "react";
import Hero from "./Hero";

export const config = createConfig(
  getDefaultConfig({
    alchemyId: "694e17d7355746af9fb38735f691cd58",
    walletConnectProjectId: "562aea3f83c0e1cf67741ee500ec6821",
    appName: "0x Next.js Demo App",
    appDescription: "A Next.js demo app for 0x Swap API and ConnectKit",
  })
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-black text-white">
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <div className="w-full h-[80px] bg-[#0E0A1F] px-10 flex-between p-4 fixed top-0 left-0">
            <span className="ml-16 playwrite-font">
              <h1 className="text-lg">Crypto Tracker</h1>
            </span>
            <ConnectKitButton className='bg-blue-500' />
          </div>
          {mounted && <Hero/>}
        </ConnectKitProvider>
      </WagmiConfig>
    </div>
  );
}
