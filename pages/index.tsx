import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Greeter from "../hardhat/artifacts/hardhat/contracts/Greeter.sol/Greeter.json";
import MetaMaskLogo from "../lib/MetaMaskLogo";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";
import { ErrorDescription } from "@ethersproject/abi/lib/interface";
import MainMenu from "../lib/components/Contacts/MainMenu";
declare let window: any;
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const customStyles = {
  code: "font-code text-code text-black bg-[#fafafa] rounded-[5px] p-3",
  container: "text-inherit pt-0 pb-0 pl-6 pr-6",
  title:
    "text-6xl text-gold font-body font-normal pt-[2rem] flex justify-center ",
  main: " h-[93vh] flex flex-1 flex-col justify-items-center align-center",
  itemGrid: "",
  metaMaskPrompt: `
    mt-[4rem] mb-[4rem]
    max-w-[300px]
    shadow-md
    border-[1px] rounded-lg border-solid border-gray
    self-center
    flex
    flex-col
    align-items-center
    text-[1.3rem]
    bg-gray
    hover:text-gold hover:border-gold hover:cursor-pointer`,
  footer: `
      h-[7vh]
      flex
      items-center
      justify-center
      justify-self-end
      content-end
      pt-[2rem] pb-[2rem]
      border-t-[1px] border-solid border-white`,
  mainButton: `
      w-[200px]
      h-[50px]
      shadow-md
      border-[1px] rounded-lg border-solid border-gray
      self-centers
      self-align-center
      flex
      flex-col
      align-items-center
      text-[1.3rem]
      bg-gray
      hover:text-gold hover:border-gold hover:cursor-pointer
  `,
};
export const addLobby = async () => {
  return <></>;
};

const Home: NextPage = () => {
  const [greeting, setGreetingValue] = useState();
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  const handleNewLobby = () => {
    console.log("make new lobby");
  };
  const handleJoinLobby = () => {
    console.log("join lobby");
  };

  //initial PageLoad
  useEffect(() => {
    let _account;
    let _signer;
    let _provider;
    (async () => {
      if (typeof window.ethereum !== "undefined") {
        //initialize Provider/Signer State
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);
        console.log("provider:", _provider);
        setSigner(() => {
          _signer = _provider.getSigner();
          console.log("signer: ", _signer);
          return _signer;
        });
        //initialize Account State
        _account = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccount(() => _account[0]);
      }
      console.log("account: ", _account);
    })();
  }, []);

  //Contract Deploy Logic

  async function fetchGreeting() {
    //when metamask or wallet is connected window.ethereum is a valid object

    if (typeof window.ethereum !== "undefined") {
      setProvider(() => new ethers.providers.Web3Provider(window.ethereum));
      const contract = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log(`data: ${data}`);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }
  }
  // async function setGreeting() {
  //   if (!greeting) return;
  //   if (typeof window.ethereum !== "undefined") {
  //     await requestAccount();
  //     setProvider(()=> new ethers.providers.Web3Provider(window.ethereum));
  //     const _signer = _provider.getSigner();
  //     const contract = new ethers.Contract(
  //       contractAddress,
  //       Greeter.abi,
  //       signer
  //     );
  //     const transaction = await contract.setGreeting(greeting);
  //     await transaction.wait();
  //     fetchGreeting();
  //   }
  // }
  async function requestAccount() {
    //this json RPC request returns the metamask acount and asks to connect.
    const _account = window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(await _account[0]);
    //metamask could have mutliple accounts
    console.log("account:", _account);
  }
  return (
    <div className={customStyles.container}>
      <Head>
        <title>dApp Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={customStyles.main}>
        <h1 className={customStyles.title}>
          <a>Welcome to Lotter.io</a>
        </h1>

        {account == undefined ? (
          <div
            className={customStyles.metaMaskPrompt}
            onClick={() => {
              if (provider) {
                requestAccount();
              } else {
                window.open("https://metamask.io/download.html");
              }
            }}
          >
            {provider == undefined ? (
              <>
                <p className=" flex flex-1 pl-3 pr-3 pt-1">
                  Install MetaMask to Cotinue
                </p>
              </>
            ) : (
              <>
                <text className="pl-3 pr-3 pt-1">Connect to MetaMask</text>
                <div className="flex self-center">
                  <MetaMaskLogo />
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div
              className={`mt-[4rem] mb-[4rem]
                border-[1px] rounded-lg border-solid border-gray
                self-center
                flex
                flex-col
                align-items-center
                text-[1.3rem]`}
            >
              Account Connected: {account}
            </div>

            <MainMenu
              handleNewLobby={handleNewLobby}
              handleJoinLobby={handleJoinLobby}
            />
          </>
        )}
      </main>
      <footer className={customStyles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          Powered by{" "}
          <span className="h-[1em] ml-[.5rem]">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
