'use client'
import React from 'react'
import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import QuoteView from "./QuoteView";
import PriceView from "./PriceView";
import { PriceResponse } from "./api/types";
import Coins from '@/components/Coins';
import { MdArrowRightAlt } from 'react-icons/md';

const Hero = () => {
    const [tradeDirection, setTradeDirection] = useState("sell");
    const [finalize, setFinalize] = useState(false);
    const [price, setPrice] = useState<PriceResponse | undefined>();
    const [quote, setQuote] = useState();
    const { address } = useAccount();
    const chainId = useChainId() || 137;
    console.log("chainId: ", chainId);
  
    return (
      <main className={`w-full min-h-screen flex noto-font flex-col`}>
        <div className='flex-center gap-10 min-h-[60vh] mt-[12rem] mb-6'>
            <div className='w-[500px] h-auto pl-20'>
              <h1 className='text-8xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 poppins-font to-gray-600 drop-shadow-md'>Token Swap</h1>
              <p className='mt-2 text-gray-400 italic flex items-center'>swap your tokens <span className='text-lg animate-leftright'><MdArrowRightAlt /></span></p>
            </div>
            <div className='ml-16'>
              {finalize && price ? (
                  <QuoteView
                    takerAddress={address}
                    price={price}
                    quote={quote}
                    setQuote={setQuote}
                    chainId={chainId}
                  />
                ) : (
                  <PriceView
                    takerAddress={address}
                    price={price}
                    setPrice={setPrice}
                    setFinalize={setFinalize}
                    chainId={chainId}
                  />
                )}
            </div>
        </div>

        <div className='mt-4'>
          <Coins/>
        </div>
      </main>
    );
}

export default Hero