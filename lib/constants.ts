import type { Address } from "wagmi";

export const MAX_ALLOWANCE =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export const exchangeProxy = "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";

/* type Token = {
  address: Address;
}; */

interface Token {
  name: string;
  address: Address;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
}

export const POLYGON_TOKENS: Token[] = [
  {
    chainId: 137,
    name: "Wrapped Matic",
    symbol: "WMATIC",
    decimals: 18,
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    logoURI:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png",
  },
  {
    chainId: 137,
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
  {
    chainId: 137,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
  {
    chainId: 137,
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    address: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/uni.svg",
  },
  {
    chainId: 137,
    name: "Tether USD - PoS",
    symbol: "USDT",
    decimals: 6,
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdt.svg",
  },
  {
    chainId: 137,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  {
    chainId: 137,
    name: "Chainlink",
    symbol: "LINK",
    decimals: 18,
    address: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
  },
  {
    chainId: 137,
    name: "Aave",
    symbol: "AAVE",
    decimals: 18,
    address: "0xd7aA96A97fAB3B1D47f9F722839DF0f7e54D3B3e",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
  },
  {
    chainId: 137,
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    decimals: 8,
    address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  },
  {
    chainId: 137,
    name: "Compound",
    symbol: "COMP",
    decimals: 18,
    address: "0xada28E25D9f9c9dB6f84E8309c89e49676dA2161",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
  },
  {
    chainId: 11155111,
    name: "SepoliaETH",
    symbol: "ETH",
    decimals: 18,
    address: "0xb50c2a93683b8da575cd8f93602f3db89a27a1e4", // Placeholder address for native tokens
    logoURI: "https://ethereum.org/static/3c17ac21b6ff75ae11030ff1c6ec6d97/31987/eth-diamond-black.webp",
  },
];

export const POLYGON_TOKENS_BY_SYMBOL: Record<string, Token> = {
  wmatic: {
    chainId: 137,
    name: "Wrapped Matic",
    symbol: "WMATIC",
    decimals: 18,
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    logoURI:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png",
  },
  dai: {
    chainId: 137,
    name: "Dai - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
  usdc: {
    chainId: 137,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
  uni: {
    chainId: 137,
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    address: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/uni.svg",
  },
  usdt: {
    chainId: 137,
    name: "Tether USD - PoS",
    symbol: "USDT",
    decimals: 6,
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdt.svg",
  },
  eth: {
    chainId: 137,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  link: {
    chainId: 137,
    name: "Chainlink",
    symbol: "LINK",
    decimals: 18,
    address: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
  },
  aave: {
    chainId: 137,
    name: "Aave",
    symbol: "AAVE",
    decimals: 18,
    address: "0xd7aA96A97fAB3B1D47f9F722839DF0f7e54D3B3e",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
  },
  wbtc: {
    chainId: 137,
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    decimals: 8,
    address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  },
  comp: {
    chainId: 137,
    name: "Compound",
    symbol: "COMP",
    decimals: 18,
    address: "0xada28E25D9f9c9dB6f84E8309c89e49676dA2161",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
  },
  sepoliaeth: {
    chainId: 11155111,
    name: "SepoliaETH",
    symbol: "ETH",
    decimals: 18,
    address: "0xb50c2a93683b8da575cd8f93602f3db89a27a1e4", // Placeholder address for native tokens
    logoURI: "https://ethereum.org/static/3c17ac21b6ff75ae11030ff1c6ec6d97/31987/eth-diamond-black.webp",
  },
};


export const POLYGON_TOKENS_BY_ADDRESS: Record<string, Token> = {
  "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270": {
    chainId: 137,
    name: "Wrapped Matic",
    symbol: "WMATIC",
    decimals: 18,
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    logoURI:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png",
  },
  "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": {
    chainId: 137,
    name: "DAI - PoS",
    symbol: "DAI",
    decimals: 18,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
  "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359": {
    chainId: 137,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
  "0xb33eaad8d922b1083446dc23f610c2567fb5180f": {
    chainId: 137,
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
    address: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/uni.svg",
  },
  "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": {
    chainId: 137,
    name: "Tether USD - PoS",
    symbol: "USDT",
    decimals: 6,
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdt.svg",
  },
  "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": {
    chainId: 137,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39": {
    chainId: 137,
    name: "Chainlink",
    symbol: "LINK",
    decimals: 18,
    address: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
  },
  "0xd7aA96A97fAB3B1D47f9F722839DF0f7e54D3B3e": {
    chainId: 137,
    name: "Aave",
    symbol: "AAVE",
    decimals: 18,
    address: "0xd7aA96A97fAB3B1D47f9F722839DF0f7e54D3B3e",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
  },
  "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6": {
    chainId: 137,
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    decimals: 8,
    address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
  },
  "0xada28E25D9f9c9dB6f84E8309c89e49676dA2161": {
    chainId: 137,
    name: "Compound",
    symbol: "COMP",
    decimals: 18,
    address: "0xada28E25D9f9c9dB6f84E8309c89e49676dA2161",
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
  },
  "0xb50c2a93683b8da575cd8f93602f3db89a27a1e4": {
    chainId: 11155111,
    name: "SepoliaETH",
    symbol: "ETH",
    decimals: 18,
    address: "0xb50c2a93683b8da575cd8f93602f3db89a27a1e4", // Placeholder address for native tokens
    logoURI: "https://ethereum.org/static/3c17ac21b6ff75ae11030ff1c6ec6d97/31987/eth-diamond-black.webp",
  },
};
