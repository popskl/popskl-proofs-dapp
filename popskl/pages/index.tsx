import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useEffect } from "react";
import { initContract, login } from "../services/initContract";
import logo from '../assets/logo.jpeg'

const Home: NextPage = () => {
    const router = useRouter();       

    const [signedIn, setSignedIn] = React.useState(false);
    const [signedOut, setSignedOut] = React.useState(false);
    const [loadingState, setLoadingState] = React.useState("not-loaded");

    useEffect(() => {
        initContract()
            .then(async () => {
                console.log("window.walletConnection: ", window.walletConnection);
                console.log("window.currentUser: ", window.currentUser);
                console.log("window.contract: ", window.contract);
                console.log("signedIn(): ", window.walletConnection.isSignedIn());
                window.walletConnection.isSignedIn() ? signedInFlow() : signedOutFlow();
                setLoadingState("loaded");
            })
            .catch((err) => console.log("initContract error: ", err));
    }, []);

    function signedInFlow() {
        setSignedIn(true);
        const currentstate = sessionStorage.getItem('currentstate');
        if (currentstate && currentstate == 'login')
            router.push("/Dashboard");
    }

    function signedOutFlow() {
        setSignedOut(true);
    }
    return (
        <>
            <Head>
                <title>popskl</title>
                <meta
                    name="description"
                    content="popskl - Near"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={styles.hero}>
                    <div className={styles.header}>
                        <div   className={styles.img} >
                            <Image src={logo} />
                        </div>
                        {/* <div className={styles.title}>POPSKL</div> */}
                        <div className={styles.title_txt}>WELCOME</div>
                        <button onClick={login} className={styles.connect}>
                            Sign In
                        </button>
                    </div>
                </div>
                {/* <Footer /> */}
            </main>
        </>
    );
}
export default Home;
