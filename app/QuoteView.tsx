import { useEffect, useRef } from "react";
import { ethers, formatUnits } from "ethers";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";
import { Address } from "viem";
import type { PriceResponse, QuoteResponse } from "@/app/api/types";
import {
  POLYGON_TOKENS_BY_ADDRESS,
  AFFILIATE_FEE,
  FEE_RECIPIENT,
} from "@/lib/constants";
import Image from "next/image";
import qs from "qs";
import Link from "next/link";

export default function QuoteView({
  takerAddress,
  price,
  quote,
  setQuote,
  chainId,
}: {
  takerAddress: Address | undefined;
  price: PriceResponse;
  quote: QuoteResponse | undefined;
  setQuote: (price: any) => void;
  chainId: number;
}) {
  const sellTokenInfo = (chainId: number) => {
    switch (chainId) {
      case 137:
        return POLYGON_TOKENS_BY_ADDRESS[price.sellTokenAddress.toLowerCase()];
      default:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
    }
  };

  const buyTokenInfo = (chainId: number) => {
    switch (chainId) {
      case 137:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
      default:
        return POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()];
    }
  };

  // Fetch quote data
  useEffect(() => {
    const params = {
      sellToken: price.sellTokenAddress,
      buyToken: price.buyTokenAddress,
      sellAmount: price.sellAmount,
      takerAddress,
      feeRecipient: FEE_RECIPIENT,
      buyTokenPercentageFee: AFFILIATE_FEE,
      feeRecipientTradeSurplus: FEE_RECIPIENT,
    };

    async function main() {
      const response = await fetch(`/api/quote?${qs.stringify(params)}`);
      const data = await response.json();
      setQuote(data);
    }
    main();
  }, [
    price.sellTokenAddress,
    price.buyTokenAddress,
    price.sellAmount,
    takerAddress,
    setQuote,
    FEE_RECIPIENT,
    AFFILIATE_FEE,
  ]);

  const {
    data: hash,
    isPending,
    error,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  console.log("sellAmount:", quote?.sellAmount);
  console.log("decimals:", sellTokenInfo(chainId).decimals);
  

  if (!quote) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 max-w-5xl mx-auto">
        <p className="text-xl text-white">Getting the Best Quote</p>
        <div className=" text-center mx-auto">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  console.log("quote", quote);

  return (
    <div className="p-3 mx-auto max-w-screen-sm ">
      <form className="flex flex-col gap-3 items-center justify-center">
        <div className=" p-4 mb-3 border-2 border-[#5773ff] shadow-md rounded-2xl w-full">
          <div className="text-xl mb-2 text-white">Send</div>
          <div className="flex items-center text-lg sm:text-3xl text-white">
            <Image
              alt={sellTokenInfo(chainId).symbol}
              className="h-9 w-9 mr-2 rounded-md"
              src={sellTokenInfo(chainId || 137)?.logoURI}
              width={9}
              height={9}
            />
            <span>
              {formatUnits(quote.sellAmount, sellTokenInfo(chainId).decimals)}
            </span>
            <div className="ml-2">{sellTokenInfo(chainId).symbol}</div>
          </div>
        </div>
        <Image
          src={"/arrow.svg"}
          width={80}
          height={80}
          className="rotate-180 w-10 h-10 "
          alt="a down arrow"
        />

        <div className="border-2 border-[#5773ff] shadow-md rounded-2xl p-4  mb-3 w-full">
          <div className="text-xl mb-2 text-white">Receive</div>
          <div className="flex items-center text-lg sm:text-3xl text-white">
            <Image
              alt={"a cryptocoin image"}
              className="h-9 w-9 mr-2 rounded-full"
              src={
                POLYGON_TOKENS_BY_ADDRESS[price.buyTokenAddress.toLowerCase()]
                  .logoURI
              }
              width={9}
              height={9}
            />

            <span>
              {formatUnits(quote.buyAmount, buyTokenInfo(chainId).decimals)}
            </span>
            <div className="ml-2">{buyTokenInfo(chainId).symbol}</div>
          </div>
        </div>
      </form>

      <button
        className="bg-[#5773ff] hover:bg-[#647eff] text-white font-bold py-2 px-4 rounded-lg mt-5 w-full"
        disabled={isPending}
        onClick={() => {
          console.log("submitting quote to blockchain");
          console.log("to", quote.to);
          console.log("value", quote.value);
          

          sendTransaction &&
          sendTransaction({
            gas: BigInt(quote?.gas),
            to: quote.to as `0x${string}`,
            value:  BigInt(quote.value),
            data: quote.data as `0x${string}`,
            gasPrice: BigInt(quote.gasPrice),
          });
        }}
      >
        {isPending ? "Confirming..." : "Place Order"}
      </button> 
      <br></br>
      <br></br>
      <br></br>
      {isConfirming && (
        <div className="text-center text-white text-xl flex flex-col items-center justify-center gap-5">
          <span>Waiting for confirmation ⏳ ...</span>
        </div>
      )}
      {isConfirmed && (
        <div className="text-center text-white text-xl flex flex-col gap-2">
          <span>Transaction Confirmed! 🎉 </span>
          <Fireworks autorun={{ speed: 2, duration: 11000 }} />
          <Link
            href={`https://polygonscan.com/tx/${hash}`}
            className="underline text-blue-300"
          >
            Check Polygonscan
          </Link>
        </div>
      )}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  );
}