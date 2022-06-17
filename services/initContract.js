import {
    connect,
    Contract,
    WalletConnection,
    keyStores,
    KeyPair,
    utils,
} from "near-api-js";
import getConfig from "./config";

export const nearConfig = getConfig(process.env.NODE_ENV || "testnet");

export async function initContract(accountName, publicKey, privateKey) {
    const near = await connect(
        Object.assign(
            { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
            nearConfig
        )
    );

    // // Wallet connection is created by using near connection already established
    window.walletConnection = new WalletConnection(near);

    // Once we get the wallet details , we save the user details like account it and balance in currentUser object
    if (window.walletConnection.getAccountId()) {
        window.currentUser = {
            accountId: window.walletConnection.getAccountId(),
            balance: (await window.walletConnection.account().state()).amount,
        };
    }

    //   // Initializing our contract APIs by contract name and configuration
    window.contract = await new Contract(
        window.walletConnection.account(),
        nearConfig.contractName,
        {
            changeMethods: ["confirm_code"],
            viewMethods: ["get_code","get_visitors"],
            //sender is required for signing in
            sender: window.walletConnection.account(),
        }
    );

    //     //Returns necessary details that will be used in App.js
    return { nearConfig };
}

export function logout() {
    window.walletConnection.signOut();
    // reload page
    window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
    // Allow the current app to make calls to the specified contract on the
    // user's behalf.
    // This works by creating a new access key for the user's account and storing
    // the private key in localStorage.
    sessionStorage.setItem('currentstate', 'login');
   // window.walletConnection.requestSignIn(nearConfig.contractName);
    window.walletConnection.requestSignIn(
        {contractId: nearConfig.contractName, methodNames: [contract.get_code.name, contract.confirm_code.name]}, //contract requesting access
        'popskl', //optional name
        null, //optional URL to redirect to if the sign in was successful
        null //optional URL to redirect to if the sign in was NOT successful
    );
}
