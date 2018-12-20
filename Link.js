import { Wallet } from 'icon-sdk-js'

// Generates a wallet.
const wallet = Wallet.create();

// Loads a wallet from the private key.
const wallet = Wallet.load("0x0000...000");