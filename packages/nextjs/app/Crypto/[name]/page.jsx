"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { numberWithCommas } from "~~/app/Trending/page";
import LineChart from '../../../components/custom/LineChart'

const SingleCryptoData = () => {
  const { name } = useParams();

  const [coin, setCoin] = useState();

  const [historicalData,setHistoricalData] = useState();
    const [days,setDays] = useState(1);


    const fetchHistoricalData = async () => {
        const data = await fetch( `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=INR&days=0.25`);
        const JsonData = await data.json();
        setHistoricalData(JsonData.prices);

    }
  const fetchCoin = async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/${name}`);
    const JsonData = await data.json();
    console.log(JsonData);
    setCoin(JsonData);
  };
  console.log(historicalData);
  useEffect(() => {
    fetchCoin();
    
    fetchHistoricalData();
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
         
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8 ">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <img src={coin?.image?.large} alt="" />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4  text-lg uppercase text-neutral">{name}</h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                  <p className="text-base text-accent-content">
                   {
                    coin?.description?.en.slice(0,100) + "..."
                   }
                  </p>
                </div>
                <div>
                   { coin?.categories?.map((item) => {
                        return(
                            <>
                            <span class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center ">{item}</span>
                            </>
                        )
                    })}
                </div>
              </div>
              <div className=" sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left w-screen">
                  <LineChart historicalData={historicalData} coin={coin}/>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleCryptoData;
