import Link from "next/link";
import React from "react";

const ProductCard = ({ cardData }) => {
  // console.log(cardData)

  let profit = cardData.price_change_percentage_24h >= 0;
  return (
    <>
      <Link href={`Crypto/${cardData?.id}`}
        key={cardData?.ath}
        className="card m-auto text-gray-300 w-[clamp(260px,80%,300px)] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900  rounded-lg overflow-hidden relative "
      >
        <div className="px-8 py-10 hover:shadow-2xl ">
          {/* <div className="bg-orange-500 w-10 h-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all">

          </div> */}
          <img src={cardData?.image} className="w-16 h-16 mb-4" />
          <div className="uppercase font-bold text-xl">{cardData?.name}</div>
          <div className="text-gray-300 uppercase tracking-widest">{cardData?.symbol}</div>
          <div className="text-gray-400 mt-8">
            <p >
            {"%"} change in 24 hr
            <span className={`font-bold ml-2 ${profit > 0 ? "text-green-500" : "text-red-500"}`}>

              {profit && "+"}
              {cardData?.price_change_percentage_24h.toFixed(2)}%
            </span>
            </p>
            <p>₹{cardData?.current_price}</p>
          </div>
        </div>

        <div className="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
        <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
      </Link>
    </>
  );
};

export default ProductCard;
