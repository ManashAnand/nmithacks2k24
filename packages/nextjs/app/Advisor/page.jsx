"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import axios from "axios";
import Moralis from "moralis";
import useSWR from "swr";

import ReactMarkdown from "react-markdown";

const Defi = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [balance,setBalance] = useState("")
  const [symbol,setSymbol] = useState("");
  const [cryptoName,setCryptoName] = useState("")
  const [cryptoPayloadData,setCryptoPayloadData] = useState(null)

  // const fetcher = url => axios.get(url).then(res => res.data)

  const runApp = async () => {
    try {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_Moralis_Key,
      });

      const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        chain: "0x1",
        address: "0x2C1b291B3946e06ED41FB543B18a21558eBa3d62",
      });

      const { balanceFormatted, name, symbol } = response.result[0];
      setBalance(balanceFormatted);
      setCryptoName(name);
      setSymbol(symbol);
      console.log("first api hitted")
      const mainData = {
        balanceFormatted,
        name,
        symbol
      }
      // return response.result[0];
      return mainData;
    } catch (e) {
      console.error(e);
    }
  };

  const runSecondApiCall = async (payload) => {
    console.log("only after first api")
    // console.log(data);
    try {
      const response = await axios.get('/api/cmc');

      const filteredData  = response.data.cryptoData.data.filter(item => item.symbol == payload.symbol)
      console.log(filteredData )

      if (filteredData.length > 0) {
        const { circulating_supply } = filteredData[0];
        const { fully_diluted_market_cap, last_updated, market_cap, market_cap_dominance, percent_change_1h, percent_change_7d, percent_change_24h, percent_change_30d, percent_change_60d, percent_change_90d, price, volume_24h, volume_change_24h} = filteredData[0].quote.USD;

        const requiredObjectForOpenAi = {
          circulating_supply,
          fully_diluted_market_cap,
          last_updated,
          market_cap,
          market_cap_dominance,
          percent_change_1h,
          percent_change_7d,
          percent_change_24h,
          percent_change_30d,
          percent_change_60d,
          percent_change_90d,
          price,
          volume_24h,
          volume_change_24h,
        };

        console.log(requiredObjectForOpenAi);
        setCryptoPayloadData(requiredObjectForOpenAi);
      }
    } catch (e) {
      console.error('Error fetching crypto data:', e);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await runApp();
      if (tokenData) {
        await runSecondApiCall(tokenData);
      }
    };

    fetchData();
  }, []);
  const handleChat = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAPI_KEY;
    setLoading(true);
    console.log("API Key:", apiKey);

    if (!apiKey) {
      console.error("API key is not defined. Please set NEXT_PUBLIC_OPENAI_KEY in your environment variables.");
      return;
    }

    try {
      const userMessage = { role: "user", content: message };

      setChatHistory(prevChatHistory => [...prevChatHistory, userMessage]);

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content:
                "As an experienced financial advisor, your task is to analyze economic trends for a Crypto Market. You are required to conduct comprehensive research on current market conditions, historical data, and future projections. Your analysis should identify key factors influencing the sector, such as regulatory changes, technological advancements, and consumer behavior shifts. Provide detailed insights and actionable recommendations for stakeholders. Your report should be clear, concise, and backed by data, enabling informed decision-making for investors and businesses within the sector. Do not make the report too long " +
                message + JSON.stringify(cryptoPayloadData),
            },
          ],
          // model: 'gpt-3.5-turbo',
          model: "gpt-4o",
          temperature: 0,
          max_tokens: 200, 
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      const responseContent = res.data.choices[0].message.content;
      const assistantMessage = { role: "assistant", content: responseContent };

      setChatHistory(prevChatHistory => [...prevChatHistory, assistantMessage]);

      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (message.trim() === "") return;
    handleChat();
  };

  return (
    <div className="w-full  md:p-10 p-2 flex  flex-col xl:flex-row max-h-[85vh] ">
      <div className="  sm:flex flex-col items-center md:min-w-60  border-2 dark:border-0 border-primary overflow-hidden text-gray-400 bg-neutral-content rounded-xl">
        <Link className="flex items-center w-full px-3 mt-3 " href="/Defi">
          <svg
            className="w-8 h-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          <span className="ml-2 text-sm font-bold">User Search history</span>
        </Link>
        <div className="w-full px-2">
          <div className="flex flex-col items-center max-w-xs mt-3 border-t border-gray-700 overflow-y-auto">
            {chatHistory
              .filter(chat => chat.role === "user")
              .map(item => {
                return (
                  <>
                    <div
                      className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-secondary hover:text-gray-300"
                      // href="/CreateProduct"
                    >
                      <svg
                        className="w-6 h-6 stroke-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span className="ml-2 text-sm font-medium"> {item.content}</span>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <a
          className="flex items-center dark:bg-accent justify-center w-full h-16 mt-auto bg-primary hover:bg-neutral-contentt hover:text-gray-300"
          href="#"
        >
          <svg
            className="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2 text-sm font-medium ">Account</span>
        </a>
      </div>

      <div className="w-[60rem] mx-auto p-4 flex flex-col h-[70vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-primary">Defi Advisor</h1>
        <div className="flex-grow space-y-4 mb-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-2 rounded-lg max-w-xs 
          ${
            chat.role === "user"
              ? "bg-primary text-left chat-bubble min-w-[25rem] text-white"
              : "bg-neutral-content min-w-[50rem] text-left"
          }`}
              >
                <p>
                  <strong>{chat.role === "user" ? "Q:" : "A:"}</strong>
                  <ReactMarkdown children={chat?.content} />
                   {/* {chat.content} */}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-auto sticky bottom-0 ">
          <textarea
            type="text"
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Ask a question"
            className="flex-grow p-2 border border-gray-300 rounded-lg bg-neutral-content "
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg" disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Defi;
