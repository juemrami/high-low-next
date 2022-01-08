import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Greeter from "../hardhat/artifacts/hardhat/contracts/Greeter.sol/Greeter.json";
import Head from "next/head";
const customStyles = {
  container: "text-inherit pt-0 pb-0 pl-6 pr-6",
  main: "min-h-[93vh] flex flex-1 flex-col justify-items-center align-center pb-[76px]",
  footer: ` 
      h-[30px]
      flex
      items-center
      justify-center
      justify-self-end
      content-end
      pt-[2rem] pb-[2rem]
      border-t-[1px] border-solid border-white`,
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>dApp Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={customStyles.container}>
        <div className={customStyles.main}>
          <Component {...pageProps} />
        </div>
        <footer className={customStyles.footer}>
          <a
            href="https://github.com/juemrami"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-gold hover:text-white"
          >
            https://github.com/juemrami
          </a>
        </footer>
      </div>
    </>
  );
}
export default MyApp;
