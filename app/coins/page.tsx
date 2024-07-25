'use client'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaCoins, FaWallet } from "react-icons/fa6";
import { Line } from 'react-chartjs-2';
import { WagmiConfig} from "wagmi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from 'next/navigation'
import { fetchChartData, fetchCoins, fetchTrendingCoins, numberWithCommas } from '../ApiFunctions'
import {ConnectKitButton,ConnectKitProvider} from 'connectkit'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
  
export interface ChartData {
  [key: string]: number[][];
}

const Page = () => {
  const [search, setSearch] = useState('')
  const [coins, setCoins] = useState<any[]>([])
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any>([]);
  const [current, setCurrent] = useState('trending');
  const [trendingCoins, setTrendingCoins] = useState<any[]>([])
  const [days, setDays] = useState(1)

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const coinData = current === 'all' ? await fetchCoins() : await fetchTrendingCoins();
      if(coinData.length > 0) {
        setCoins(coinData);
        setLoading(false)
      }

      const allChartsData: ChartData = {};
      for (const coin of coinData) {
        const chartData = await fetchChartData(coin.id, days);
        allChartsData[coin.id] = chartData;
      }
      setChartData(allChartsData);
    };

    const fetchTrendingData = async () => {
      const trendingData = await fetchTrendingCoins();
      setTrendingCoins(trendingData);
    };

    fetchTrendingData();
    fetchAllData();
  }, [current]);


  const handleSearch = () => {
    return current === "trending" 
      ? trendingCoins.filter(coin =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
      : coins.filter(coin =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
  };

  

  const router = useRouter();
  const handlePage = () => {
    setCurrent(current === 'trending' ? 'all' : 'trending');
    router.refresh();
  }

  return (
    <div className="flex-center flex-col items-center bg-black text-white min-h-screen poppins-regular">
      <div className='w-full h-[200px] flex-center poppins-bold relative'>
          <h1 className='text-[9.4rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-900 drop-shadow-lg'>
            C
          </h1>
          <h1 className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 drop-shadow-md'>
            rypto <br/> rruncies
          </h1>

          <span className='absolute top-16 right-14'>
            <ConnectKitProvider>
            <ConnectKitButton.Custom>
                {({ isConnected, isConnecting, show, hide, address, ensName, chain }:any) => {
                  return (
                    <button
                    onClick={show}
                    className={`bg-[#202946] flex-center gap-2 hover:bg-[#17203d] text-sm text-white font-semibold py-2 px-3 rounded-3xl border-none outline-none ${!isConnected ? '' : 'bg-[#409DA0] hover:bg-[#2c9094]'}`}
                    style={{ minWidth: '150px' }}
                  >
                    {isConnected ? `${address.slice(0, 12)}....` : "Connect Wallet"}
                    {!isConnected && <span className='text-[11px] text-gray-300 rotate-[-20deg]'><FaWallet /></span>}
                  </button>
                  
                  );
                }}
              </ConnectKitButton.Custom>
            </ConnectKitProvider>
          </span>
        </div>

      <div className='bg-[#171738] flex-center w-[500px] border-[1px] border-slate-900 rounded-2xl py-1 px-3 mt-6'>
        <Input 
          placeholder="Search" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='bg-transparent border-none outline-none placeholder:text-gray-100 placeholder:text-sm text-md'  
        />
        <span className='text-lg'><IoSearch /></span>
      </div>

      <div className='w-full flex items-center flex-col min-h-[600px] p-10 rounded-xl relative mt-7'>
        <div className='absolute right-14 top-[8px]'>
          <button onClick={handlePage} className='flex-center text-[#F1A204]'>
            see {current} coins 
            <span className='mt-1'>
              <MdKeyboardDoubleArrowRight />
            </span>
          </button>
        </div>
        <div className='w-full flex-between px-10 bg-[#14142f] py-3 rounded-t-xl pl-18 text-md font-bold brightness-75'>
          <div className='w-32 ml-8 flex-center gap-2'>Coin <span className=''><FaCoins /></span></div>
          <div className='w-32 ml-8'>Price(₹)</div>
          <div className='w-32 ml-4'>24h Change</div>
          <div className='w-32'>Market Cap</div>
        </div>

        {loading ? 
          <div className="flex w-full items-center justify-center min-h-[70vh]">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-4 border-transparent border-t-red-500 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-4 border-t-4 border-transparent border-t-green-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
          </div>
          : 
          handleSearch().map((row) => {
            const profit = row.price_change_percentage_24h > 0;
            return (
              <Link href={`/coins/${row.name.toLowerCase()}`} key={row.id} className='w-full flex-between px-10 bg-[#171738] hover:bg-[#12122B] duration-500 py-3 border-b-[.5px] border-slate-600'>
                <div className='flex-center min-w-[10rem] gap-6'>
                  <img
                    src={row?.image}
                    alt={row.name}
                    width={50}
                    height={50}
                    className=''
                  />
                  <div className='flex flex-col gap-0'>
                    <span className='uppercase font-bold text-2xl'>
                      {row.symbol}
                    </span>
                    <span className='text-gray-300 text-sm'>
                      {row.name}
                    </span>
                  </div>
                </div>

                <div className='min-w-[8rem]'>
                  {numberWithCommas(row.current_price.toFixed(2))}
                </div>

                <div className='flex-center flex-col mt-2'>
                  {chartData[row.id] &&  
                    <div style={{ width: '150px', height: '90px' }}>
                      <Line 
                        data={{
                          labels: chartData[row.id].slice(0,100).map((coin: any) => {
                            let date = new Date(coin[0]);
                            let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                          }),
                          datasets: [{
                            data: chartData[row.id].map((coin: any) => coin[1]),
                            label: 'Price',
                            borderColor: profit ? '#07DA74' : '#FF0000',
                          }]
                        }}
                        options={{
                          scales: {
                            x: { display: false },
                            y: { display: false },
                          },
                          plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false },
                          },
                          elements: {
                            point: { radius: 0 },
                          },
                        }}
                      />
                    </div>
                  }

                  <div className={`text-[.7rem] ${profit ? 'text-[#07DA74]' : 'text-red-500'} w-10`}>
                    ({profit && "+"}
                    {row.price_change_percentage_24h.toFixed(2)}%)
                  </div>
                </div>
                <div className='w-32'>
                  ₹ {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  )
}

export default Page
