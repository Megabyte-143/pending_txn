import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { config } from 'dotenv';
config();

const  API = process.env.API_KEY;

export default function Home() {

  const [trans, setTrans] = useState([]);
  let transactionArray = [];

  async function loadTxn() {
    const provider = new ethers.providers.WebSocketProvider(`wss://polygon-mumbai.g.alchemy.com/v2/${process.env.API_KEY}`);
    provider.on("pending", async (txn) => {
      const tnx = await provider.getTransaction(txn);
      if (txn) {
        transactionArray.push({ 'hash': tnx?.hash, 'from': tnx?.from, 'to': tnx?.to });
        console.log(transactionArray);
        setTrans(transactionArray);
      }
    });
  }
  useEffect(() => {
    loadTxn();
  }, [trans]);


  return (
    <div className='bg-black font-light text-green-600 min-h-screen'>
      {trans.map((tran, i) => (
        <div className='bg-gray-700 py-4 mb-4' key={i}>
          <h1>Transaction Hash: {tran.hash}</h1>
          <h2>From: {tran.from}</h2>
          <h3>To: {tran.to}</h3>
        </div>
      ))}
    </div>
  )
}