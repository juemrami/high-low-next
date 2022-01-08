import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Greeter from "../hardhat/artifacts/hardhat/contracts/Greeter.sol/Greeter.json";
import MetaMaskLogo from "../lib/MetaMaskLogo";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Router, useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";
import { ErrorDescription } from "@ethersproject/abi/lib/interface";
import MainMenu from "../lib/components/MainMenu";
import AddLobbyInterface, { Args } from "../lib/components/AddLobbyInterface";
declare let window: any;
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const customStyles = {
  code: "font-code text-code text-black bg-[#fafafa] rounded-[5px] p-3",
  container: "text-inherit pt-0 pb-0 pl-6 pr-6",
  title:
    "text-6xl text-gold font-body font-normal pt-[2rem] flex justify-center ",
  main: "min-h-[93vh] flex flex-1 flex-col justify-items-center align-center pb-[76px]",
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
      h-[30px]
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

const Home: NextPage = () => {
  const [greeting, setGreetingValue] = useState();
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [addLobby, setAddLobby] = useState(false);
  const router = useRouter();

  const handleNewLobby = () => {
    console.log("make new lobby");
    setAddLobby((prevState) => !prevState);
  };
  const handleJoinLobby = () => {
    console.log("join lobby");
  };

  const depolyContract = async (args:Args) => {
    console.log("contract deployed with rollSize: ", args.rollSize);
    router.push('/Lobby');
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
    const _account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(_account[0]);
    //metamask could have mutliple accounts
    console.log("account:", _account);
  }
  return (
    <>
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
          {addLobby ? (
            <AddLobbyInterface deployContractHandler={depolyContract} />
          ) : (
            <MainMenu
              handleJoinLobby={handleJoinLobby}
              handleNewLobby={handleNewLobby}
            />
          )}
          {/* <div
              className={`
              grid grid-cols-1 gap-10
              h-[600px]
              w-[900px]
              self-center
              content-center justify-items-center
              justify-around
              border rounded-[50px]
              pb-[3rem] pt-[4.5rem]`}
            >
              {addLobby ? (
                <AddLobbyInterface deployContractHandler={depolyContract} />
              ) : (
                <MainMenu
                  handleJoinLobby={handleJoinLobby}
                  handleNewLobby={handleNewLobby}
                />
              )}
            </div> */}
        </>
      )}
    </>
  );
};

export default Home;
