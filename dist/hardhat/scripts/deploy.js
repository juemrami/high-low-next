"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hardhat_1 = require("hardhat");
async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');
    // We get the contract to deploy
    const Greeter = await hardhat_1.ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, Hardhat!");
    const Lobby = await hardhat_1.ethers.getContractFactory("HiLoLobby");
    const lobby = await Lobby.deploy(5);
    await greeter.deployed();
    await lobby.deployed();
    console.log("Greeter deployed to:", greeter.address);
    console.log("Lobby Deployed: High - Low @ ", lobby.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});