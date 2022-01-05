import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "@typechain/hardhat";
import "solidity-coverage";
declare const config: HardhatUserConfig;
export default config;
