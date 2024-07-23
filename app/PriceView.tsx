'use client'
import useSWR from "swr";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { useState, ChangeEvent } from "react";
import { formatUnits, parseUnits } from "ethers";
import {
  erc20ABI,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useBalance,
  type Address,
} from "wagmi";
import {
  POLYGON_TOKENS,
  POLYGON_TOKENS_BY_SYMBOL,
  POLYGON_TOKENS_BY_ADDRESS,
  MAX_ALLOWANCE,
  exchangeProxy,
} from "@/lib/constants";

interface PriceRequestParams {
  sellToken: string;
  buyToken: string;
  buyAmount?: string;
  sellAmount?: string;
  takerAddress?: string;
}

const AFFILIATE_FEE = 0.01; // Percentage of the buyAmount that should be attributed to feeRecipient as affiliate fees
const FEE_RECIPIENT = "0x75A94931B81d81C7a62b76DC0FcFAC77FbE1e917"; // The ETH address that should receive affiliate fees

export const fetcher = ([endpoint, params]: [string, PriceRequestParams]) => {
  const { sellAmount, buyAmount } = params;
  if (!sellAmount && !buyAmount) return;
  const qs = require('qs')
  const query = qs.stringify(params);

  return fetch(`${endpoint}?${query}`).then((res) => res.json());
};

export default function PriceView({
  price,
  setPrice,
  setFinalize,
  takerAddress,
}: {
  price: any;
  setPrice: (price: any) => void;
  setFinalize: (finalize: boolean) => void;
  takerAddress: Address | undefined;
}) {
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [tradeDirection, setTradeDirection] = useState("sell");
  const [sellToken, setSellToken] = useState("wmatic");
  const [buyToken, setBuyToken] = useState("dai");

  const handleSellTokenChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSellToken(e.target.value);
  };

  function handleBuyTokenChange(e: ChangeEvent<HTMLSelectElement>) {
    setBuyToken(e.target.value);
  }

  const sellTokenDecimals = POLYGON_TOKENS_BY_SYMBOL[sellToken].decimals;

  console.log(sellAmount, sellTokenDecimals, "<-");
  const parsedSellAmount =
    sellAmount && tradeDirection === "sell"
      ? parseUnits(sellAmount, sellTokenDecimals).toString()
      : undefined;

  const buyTokenDecimals = POLYGON_TOKENS_BY_SYMBOL[buyToken].decimals;

  const parsedBuyAmount =
    buyAmount && tradeDirection === "buy"
      ? parseUnits(buyAmount, buyTokenDecimals).toString()
      : undefined;

  // fetch price here
  const { isLoading: isLoadingPrice } = useSWR(
    [
      "/api/price",
      {
        sellToken: POLYGON_TOKENS_BY_SYMBOL[sellToken].address,
        buyToken: POLYGON_TOKENS_BY_SYMBOL[buyToken].address,
        sellAmount: parsedSellAmount,
        buyAmount: parsedBuyAmount,
        takerAddress,
        feeRecipient: FEE_RECIPIENT,
        buyTokenPercentageFee: AFFILIATE_FEE,
      },
    ],
    fetcher,
    {
      onSuccess: (data) => {
        setPrice(data);
        if (tradeDirection === "sell") {
          console.log(formatUnits(data.buyAmount, buyTokenDecimals), data);
          setBuyAmount(formatUnits(data.buyAmount, buyTokenDecimals));
        } else {
          setSellAmount(formatUnits(data.sellAmount, sellTokenDecimals));
        }
      },
    }
  );

  const { data, isError, isLoading } = useBalance({
    address: takerAddress,
    token: POLYGON_TOKENS_BY_SYMBOL[sellToken].address,
  });

  console.log(sellAmount);

  const disabled =
    data && sellAmount
      ? parseUnits(sellAmount, sellTokenDecimals) > data.value
      : true;

  return (
    <form>
      <p className="text-2xl text-gray-400 text-center font-bold mb-2">Polygon Network</p>

      <div className="bg-[#0E0A1F] dark:bg-slate-800 p-6 rounded-xl mb-5 w-[500px]">
        <section className="mt-4 flex items-start justify-center py-3">
          <label htmlFor="sell-select" className="sr-only"></label>
          <img
            alt={sellToken}
            className="h-14 w-14 mr-3 rounded-md"
            src={POLYGON_TOKENS_BY_SYMBOL[sellToken].logoURI}
          />
          <div className="h-14">
            <select
              value={sellToken}
              name="sell-token-select"
              id="sell-token-select"
              className="mr-2 h-12 p-2 bg-[#171738] outline-none border-none rounded-xl"
              onChange={handleSellTokenChange}
            >
              {POLYGON_TOKENS.map((token) => {
                return (
                  <option
                    key={token.address}
                    value={token.symbol.toLowerCase()}
                  >
                    {token.symbol}
                  </option>
                );
              })}
            </select>
          </div>
          <label htmlFor="sell-amount" className="sr-only"></label>
          <input
            id="sell-amount"
            value={sellAmount}
            className="h-12 w-full rounded-xl bg-[#171738] outline-none pl-4"
            style={{ border: "1px solid black" }}
            onChange={(e) => {
              setTradeDirection("sell");
              setSellAmount(e.target.value);
            }}
          />
        </section>
        <section className="flex-center mb-6 mt-4 w-full py-3">
          <label htmlFor="buy-token" className="sr-only"></label>
          <img
            alt={buyToken}
            className="h-14 w-14 mr-3 rounded-md"
            src={POLYGON_TOKENS_BY_SYMBOL[buyToken].logoURI}
          />
          <select
            name="buy-token-select"
            id="buy-token-select"
            value={buyToken}
            className="mr-2 h-12 p-2 bg-[#171738] outline-none rounded-xl"
            onChange={(e) => handleBuyTokenChange(e)}
          >
            {POLYGON_TOKENS.map((token) => {
              return (
                <option key={token.address} value={token.symbol.toLowerCase()}>
                  {token.symbol}
                </option>
              );
            })}
          </select>
          <label htmlFor="buy-amount" className="sr-only"></label>
          <input
            id="buy-amount"
            value={buyAmount}
            className="h-12 w-full rounded-xl bg-[#171738] outline-none pl-4"
            style={{ border: "1px solid black" }}
            disabled
            onChange={(e) => {
              setTradeDirection("buy");
              setBuyAmount(e.target.value);
            }}
          />
        </section>
        <div className="text-slate-400">
          {price && price.grossBuyAmount
            ? "Affiliate Fee: " +
              Number(
                formatUnits(
                  BigInt(price.grossBuyAmount),
                  POLYGON_TOKENS_BY_SYMBOL[buyToken].decimals
                )
              ) *
                AFFILIATE_FEE +
              " " +
              POLYGON_TOKENS_BY_SYMBOL[buyToken].symbol
            : null}
        </div>

        <div className="h-5">
          {isLoadingPrice && (
          <div className="text-center mt-2 text-green-300">Fetching the best price...</div>
        )}
        </div>
      </div>

      {takerAddress ? (
        <ApproveOrReviewButton
          sellTokenAddress={POLYGON_TOKENS_BY_SYMBOL[sellToken].address}
          takerAddress={takerAddress}
          onClick={() => {
            setFinalize(true);
          }}
          disabled={disabled}
        />
      ) : (
        <ConnectKitButton.Custom>
          {({
            isConnected,
            isConnecting,
            show,
            hide,
            address,
            ensName,
            chain,
          }:any) => {
            return (
              <button
                onClick={show}
                type="button"
                className="bg-[#0E0A1F] hover:bg-[#171238] text-gray-200 font-bold py-4 px-4 rounded-xl w-full"
              >
                {isConnected ? address : "Connect Wallet"}
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      )}

    
    </form>
  );
}

function ApproveOrReviewButton({
  takerAddress,
  onClick,
  sellTokenAddress,
  disabled,
}: {
  takerAddress: Address;
  onClick: () => void;
  sellTokenAddress: Address;
  disabled?: boolean;
}) {
  // 1. Read from erc20, does spender (0x Exchange Proxy) have allowance?
  const { data: allowance, refetch } = useContractRead({
    address: sellTokenAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [takerAddress, exchangeProxy],
  });

  // 2. (only if no allowance): write to erc20, approve 0x Exchange Proxy to spend max integer
  const { config } = usePrepareContractWrite({
    address: sellTokenAddress,
    abi: erc20ABI,
    functionName: "approve",
    args: [exchangeProxy, MAX_ALLOWANCE],
  });

  const {
    data: writeContractResult,
    writeAsync: approveAsync,
    error,
  } = useContractWrite(config);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: writeContractResult ? writeContractResult.hash : undefined,
    onSuccess(data) {
      refetch();
    },
  });

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  if (allowance?.toString() === "0" && approveAsync) {
    return (
      <>
        <button
          type="button"
          className="bg-[#0E0A1F] hover:bg-[#171238] text-white font-bold py-4 px-4 rounded-xl w-full"
          onClick={async () => {
            const writtenValue = await approveAsync();
          }}
        >
          {isApproving ? "Approving…" : "Approve"}
        </button>
      </>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="bg-[#0E0A1F] text-gray-600 cursor-not-allowed font-bold py-4 px-4 rounded-xl w-full"
    >
      {disabled ? "Insufficient Balance" : "Review Trade"}
    </button>
  );
}
