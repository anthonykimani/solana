import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const fromKeypair = Keypair.generate();
const toKeypair = Keypair.generate();

// Setting connection to Solana Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
console.log(`✅ Connected!`);

// Reading from the Network!
// const address = new PublicKey('x');
const address = fromKeypair.publicKey;
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
console.log(`✅ Finished!`);

// Creating Transactions on the Solana Network!

const transaction = new Transaction();

const sendSOL = SystemProgram.transfer({
  fromPubkey: fromKeypair.publicKey,
  toPubkey: toKeypair.publicKey,
  lamports: LAMPORTS_PER_SOL * 10,
});

const tx = transaction.add(sendSOL);
console.log("Transaction Output", tx);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  fromKeypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_PER_SOL * 10} to the address ${
    toKeypair.publicKey
  }. `
);
console.log(`Transaction signature is ${signature}!`);
