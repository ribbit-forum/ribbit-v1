"use client";
import React, { useState, useEffect } from "react";
import { connect, disconnect } from "starknetkit";
import { ConnectedStarknetWindowObject } from "starknetkit";
import { RpcProvider, Contract } from "starknet";

const WalletConnect = () => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any | undefined>(undefined);
  const [theConnection, setConnection] = useState<ConnectedStarknetWindowObject>();

  // Connect to the wallet
  const connectWallet = async () => {
    try {
      const connection = await connect();

      if (connection && connection.isConnected) {
        setConnection(connection);
        setProvider(connection.account);
        setAddress(connection.selectedAddress);


        const deployedStarknetContract = "0x5f7cd1fd465baff2ba9d2d1501ad0a2eb5337d9a885be319366b5205a414fdd";

        const starknetABI = await connection.provider.getClassAt(deployedStarknetContract);
        
        
        if (!starknetABI) {
          throw new Error("ABI not found.");
        }

        const StarknetContract = new Contract(starknetABI.abi, deployedStarknetContract, connection.account);
        StarknetContract.connect(connection.account);

        const myCall = StarknetContract.populate("increase_balance", [10, 30]);
        const res = await StarknetContract.increase_balance(myCall.calldata);
        await connection.provider.waitForTransaction(res.transaction_hash);

        console.log("Done!");
        
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div>
      {!address ? (
        <button onClick={connectWallet}>Connect to StarkNet</button>
      ) : (
        <div>
          <p>Connected as: {address}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
