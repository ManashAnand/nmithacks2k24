
import { headers } from "next/headers";
import Web3ModalProvider from "../components/Integrate/Web3modal";
import { config } from "../components/Integrate/config";
import "@rainbow-me/rainbowkit/styles.css";
import { cookieToInitialState } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Defi companion",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html suppressHydrationWarning>
      <body>
          <Web3ModalProvider initialState={initialState}>
            <ThemeProvider enableSystem>
              {/* <ScaffoldEthAppWithProviders> */}
              <Header />
              {children}
              {/* </ScaffoldEthAppWithProviders> */}
              <Footer />
            </ThemeProvider>
          </Web3ModalProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
