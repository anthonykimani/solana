import { Keypair } from "@solana/web3.js";
import * as dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";


// const generate_keypair = Keypair.generate(); // The public key is:  4yHWNy3nQx2pp5xMzJ3q3WXG8PxPPpTv5Fm6WoPSxso1
const load_keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log("The Key Pair is", load_keypair);
console.log(
    `✅ Finished! We've loaded our secret key securely, using an env file!`
  );