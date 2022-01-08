import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Router, useRouter } from "next/router";
import { NextPageContext } from "next";
export interface myNexyPageContext extends NextPageContext{
    query:{
        id: string;
    }
}
const customStyles = {
  title:
    "text-6xl text-gold font-body font-normal pt-[2rem] flex justify-center ",
};
const Lobby = (props) => {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(props.contractAddress);
  const router = useRouter();
  
  useEffect(() => {
    let _account;
    let _signer;
    let _provider;
    (async () => {
      if (typeof window.ethereum !== "undefined") {
        //initialize Provider/Signer State
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(_provider);
        setSigner(() => {
          _signer = _provider.getSigner();
          return _signer;
        });
        //initialize Account State
        _account = await (window as any).ethereum.request({
          method: "eth_accounts",
        });
        setAccount(() => _account[0]);
      }
      console.log("account: ", _account);
      console.log("contract address: ",router.query.id)
      setContractAddress(await router.query.id);
    })();
  }, []);
  return (
    <>
      <h1 className="min-h-[92px] text-6xl text-gold font-body font-normal pt-[2rem] flex items-end justify-center ">
        <p
          onClick={() => router.push("/")}
          className="hover:cursor-pointer text-6xl mr-[20px] font-code font-bold"
        >
          &larr;
        </p>
        lobby_room
      </h1>

      <div
        className={`mt-[4rem] mb-[4rem]
                border-[1px] rounded-lg border-solid border-gray
                self-center
                flex
                flex-col
                align-items-center
                text-[1.3rem]`}
      >
        {account
          ? `Account Connected: ${account}`
          : `Please Connect To MetaMask`}
      </div>
      <div className="flex flex-col">
        <div
          className={`
              grid grid-cols-1 gap-5
              h-[600px]
              w-[900px]
              self-center
              justify-items-center
              border rounded-[50px]
              pb-[3rem] pt-[4.5rem]
          `}
        >
          <h1 className="text-2xl text-gold ">
            contract address: {contractAddress}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Lobby;
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

Lobby.getInitialProps =  (context: myNexyPageContext) => {
    const _contractAddress  =   context.query.id;
    return {
        props: {
            contractAddress: _contractAddress
        }
    }
}