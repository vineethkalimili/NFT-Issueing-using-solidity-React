import React, { useState } from 'react';
import { ethers } from 'ethers';
import "./Admin.css"
import { ConnectButton } from "@rainbow-me/rainbowkit";


// Import your smart contract ABI here
import contractABI from "../../abi.json";

const contractAddress = '0x8E6f73126d81e00c377524F735751aD4D8693408'; // Replace with your actual contract address

const Admin = () => {
  const [atkTotalSupply, setAtkTotalSupply] = useState('');
  const [adminAtkBalance, setAdminAtkBalance] = useState('');
  const [mintUserAddress, setMintUserAddress] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [employeeNftBalance, setEmployeeNftBalance] = useState('');
  const [mintResult, setMintResult] = useState('');

  // Initialize ethers.js provider and signer
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Create the contract instance with the signer
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Function to get ATK total supply
  const getATKTotalSupply = async () => {
    try {
      const totalSupply = await contract.getATKTotalSupply();
      setAtkTotalSupply(totalSupply.toString());
    } catch (error) {
      console.error('Error getting ATK Total Supply:', error);
    }
  };

  // Function to get admin's ATK balance
  const getBalanceOfATK = async () => {
    try {
      const balance = await contract.getBalanceOfATK();
      setAdminAtkBalance(balance.toString());
    } catch (error) {
      console.error('Error getting Admin ATK Balance:', error);
    }
  };

  // Function to mint Ascendion Employee Award NFT
  const safeMint = async (to) => {
    try {
      const transaction = await contract.safeMint(to);
      await transaction.wait(); // Wait for the transaction to be mined
      setMintResult('NFT minted successfully');
    } catch (error) {
      console.error('Error minting NFT:', error);
      setMintResult('Error minting NFT');
    }
  };

  // Function to get NFT balance of an employee
  const balanceOf = async (address) => {
    try {
      const balance = await contract.balanceOf(address);
      setEmployeeNftBalance(balance.toString());
    } catch (error) {
      console.error('Error getting Employee NFT Balance:', error);
    }
  };

  // Handle mint form submission
  const handleMintSubmit = (event) => {
    event.preventDefault();
    safeMint(mintUserAddress);
  };

  // Handle employee balance form submission
  const handleBalanceSubmit = (event) => {
    event.preventDefault();
    balanceOf(employeeAddress);
  };

  return (
    <div>
      <h1 className='admin-container'>Admin Panel</h1>
      <div className='element'><ConnectButton  /></div>
      <button onClick={getATKTotalSupply}>Get ATK Total Supply</button>
      <p>ATK Total Supply: {atkTotalSupply}</p>

      <button onClick={getBalanceOfATK}>Get Admin ATK Balance</button>
      <p>Admin ATK Balance: {adminAtkBalance}</p>

      <h2>Mint Ascendion Employee Award NFT</h2>
      <form onSubmit={handleMintSubmit}>
        <input
          type="text"
          placeholder="Employee Address"
          value={mintUserAddress}
          onChange={(event) => setMintUserAddress(event.target.value)}
        />
        <button type="submit">Mint NFT</button>
      </form>
      <p>{mintResult}</p>

      <h2>Get NFT Balance of Employee</h2>
      <form onSubmit={handleBalanceSubmit}>
        <input
          type="text"
          placeholder="Employee Address"
          value={employeeAddress}
          onChange={(event) => setEmployeeAddress(event.target.value)}
        />
        <button type="submit">Get Balance</button>
      </form>
      <p>Employee NFT Balance: {employeeNftBalance}</p>
    </div>
  );
};

export default Admin;
