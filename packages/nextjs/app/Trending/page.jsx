"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "../../components/custom/ProductCard";
// import ScrollToTop from "react-scroll-to-top";
import ScrollToTop from "react-scroll-up";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Trending = () => {
  const [trending, setTrending] = useState([]);

  const [filteredTrending, setFilteredTrending] = useState([]);
  const fetchTrendingCoins = async () => {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    );
    const JsonData = await data.json();
    console.log(JsonData);
    setTrending(JsonData);
    setFilteredTrending(JsonData);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const handleSearch = e => {
    // console.log(e.target.value)
    // setTrending([...])
    const searchValue = e.target.value.toLowerCase();
    const filtered = trending.filter(
      coin => coin.name.toLowerCase().includes(searchValue) || coin.symbol.toLowerCase().includes(searchValue),
    );
    setFilteredTrending(filtered);
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="flex justify-center items-center mt-5">
          <div className="flex w-4/5">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search ..."
                onChange={handleSearch}
              />
            </div>
            <button
              type="submit"
              class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
        <div className="container px-5 py-12 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
            {filteredTrending?.map(cardData => {
              return (
                <>
                  <ProductCard cardData={cardData} />
                </>
              );
            })}
          </div>
        </div>
        <div className="bg-red-500" style={{ backgroundColor: "purple" }}>
          <ScrollToTop showUnder={160} style={{
  position: 'fixed',
  bottom: 50,
  right: 30,
  cursor: 'pointer',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'linear',
  transitionDelay: '0s',
  backgroundColor:'#F9FBFF',
  color:"#2f2f2f",
  padding:"1rem",
  borderRadius:"20px"

}}>
            <span>UP</span>
          </ScrollToTop>
        </div>
      </section>
    </>
  );
};

export default Trending;
