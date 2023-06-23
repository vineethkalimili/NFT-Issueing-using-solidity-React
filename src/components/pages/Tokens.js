import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./Tokens.css";
import { sepoliaId, contractAddress } from "../../constants";
import contractABI from "../../abi.json";

const Tokens = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState("");
  const [userWalletAddress, setUserWalletAddress] = useState("");
  
  useEffect(() => {
    const storedWalletAddress = localStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
    return () => {
      handleDisconnectWallet();
    };
  }, []);

  const handleConnectWallet = async () => {
    try {
      if (window.ethereum && !isConnected) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          localStorage.setItem("walletAddress", address);
          setIsConnected(true);
        }
      } else {
        console.error("No Ethereum wallet found");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress("");
    localStorage.removeItem("walletAddress");
    setIsConnected(false);
  };

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  


  return (
    <div>
      <div>
        <h1 className="page-header1">NFT DAPP</h1>
      </div>
      <div className="wallet-container">
        {walletAddress ? (
          <>
            <p className="wallet-address">{walletAddress}</p>
            <button
              className="disconnect-wallet-button"
              onClick={handleDisconnectWallet}
            >
              Disconnect Wallet
            </button>
          </>
        ) : (
          <button
            className="connect-wallet-button"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <div className="account-summary">
        <h1 className="page-header">Account Details</h1>
        {!isAccountDetailsVisible && (
          <button
            className="account-details-button"
            onClick={handleAccountDetailsButtonClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Request Account Details"}
          </button>
        )}
        {isAccountDetailsVisible && (
          <div className="summary-fields">
            <div className="field">
              <label>Wallet Address:</label>
              <input type="text" value={walletAddress} readOnly />
            </div>
            
            <div className="field">
              <label>Balance</label>
              <input type="text" value={balance} readOnly />
            </div>
            
          </div>
        )}
      </div>

      <div className="mint">
        <h2 className="page-header">ADMIN</h2>
        <div className="field">
          <label>Total Supply</label>
          <input type="text" value={totalSupply} readOnly />
        </div>
        <div className="field">
          <label>Mint NFT</label>
          <div className="input-container">
            <input
              type="number"
              className="input-field"
              value={userWalletAddress}
              onChange={handleMintChange}
            />
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleMintButtonClick}>Mint</button>
        </div>
      </div>
    </div>
  );
};

export default Tokens;

