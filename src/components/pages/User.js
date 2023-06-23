import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Admin.css"
// Import your smart contract ABI here
import contractABI from "../../abi.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const contractAddress = "0x8E6f73126d81e00c377524F735751aD4D8693408"; // Replace with your actual contract address

const User = () => {
  const [employeeAtkBalance, setEmployeeAtkBalance] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeeNftBalance, setEmployeeNftBalance] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenURI, setTokenURI] = useState("");

  // Initialize ethers.js provider and signer
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Create the contract instance with the signer
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Function to get employee's ATK balance
  const getBalanceOfATK = async () => {
    try {
      const balance = await contract.getBalanceOfATK();
      setEmployeeAtkBalance(balance.toString());
    } catch (error) {
      console.error("Error getting Employee ATK Balance:", error);
    }
  };

  // Function to get NFT balance of an employee
  const balanceOf = async (address) => {
    try {
      const balance = await contract.balanceOf(address);
      setEmployeeNftBalance(balance.toString());
    } catch (error) {
      console.error("Error getting Employee NFT Balance:", error);
    }
  };

  // Function to get token URI
  const getTokenURI = async () => {
    try {
      const uri = await contract.tokenURI(tokenId);
      setTokenURI(uri);
    } catch (error) {
      console.error("Error getting Token URI:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    balanceOf(employeeAddress);
  };

  // Handle token ID input change
  const handleTokenIdChange = (event) => {
    setTokenId(event.target.value);
  };

  // Handle fetch token URI
  const handleFetchTokenURI = (event) => {
    event.preventDefault();
    getTokenURI();
  };

  // Extract video URL from token URI
  const getVideoUrl = (uri) => {
    // Check if the URI points to a file sharing service (e.g., Google Drive)
    if (uri.includes("drive.google.com")) {
      // Modify the URL to retrieve the actual video file
      const fileId = uri.match(/[-\w]{25,}/);
      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId[0]}`;
      }
    }
    
    // Handle other types of token URIs here (e.g., web pages)
    // You may need to extract the video URL from the page source or API response

    // If the video URL cannot be determined, return the original token URI
    return uri;
  };

  useEffect(() => {
    if (tokenURI) {
      const videoUrl = getVideoUrl(tokenURI);
      setTokenURI(videoUrl);
    }
  }, [tokenURI]);

  return (
    <div>
      <h1 className="admin-container">User Panel</h1>
      <div className="element"><ConnectButton /></div>
      <button onClick={getBalanceOfATK}>Get Employee ATK Balance</button>
      <p>Employee ATK Balance: {employeeAtkBalance}</p>

      <h2>Get NFT Balance of Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Address"
          value={employeeAddress}
          onChange={(event) => setEmployeeAddress(event.target.value)}
        />
        <button type="submit">Get Balance</button>
      </form>
      <p>Employee NFT Balance: {employeeNftBalance}</p>

      <h2>Fetch Token URI</h2>
      <form onSubmit={handleFetchTokenURI}>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={handleTokenIdChange}
        />
        <button type="submit">Fetch Token URI</button>
      </form>

      {tokenURI && (
        <div>
          <h2>Token URI</h2>
          <video controls src={tokenURI} width="400" height="300" />
        </div>
      )}
    </div>
  );
};

export default User;
