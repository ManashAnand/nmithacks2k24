import { NextResponse } from "next/server";
import axios from 'axios'
export async function GET(req) {
  try {
 

    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_CMC_API_KEY,
        },
      });
    //   console.log(response)
      const cryptoData = response.data;
    return NextResponse.json({ cryptoData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}