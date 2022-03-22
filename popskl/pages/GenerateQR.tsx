import Head from "next/head";
import React, {Component, useEffect, useState} from "react";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import {NextPage} from "next";
import { useQRCode } from 'next-qrcode';
import { useRouter } from 'next/router'

const GenerateQR: NextPage = () => {
    const [loadingState, setLoadingState] = React.useState("not-loaded");
    const [qrCode, setQrCode] = React.useState("");
    const { Image } = useQRCode();
    const router = useRouter();   

    useEffect(() => {
        (async () => {
            await getCodeFromContract();
            setLoadingState("loaded");
        })();
    }, []);

    async function getCodeFromContract() {
        const qrCode = await window.contract.get_code();
        console.log(qrCode);
        if (qrCode) {
            setQrCode(qrCode);
        }
    }

    return (
        <>
            <Head>
                <title>popskl</title>
                <meta
                    name="description"
                    content="popskl - Near"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                {/* <Nav/> */}
                <div className={styles.space}>
                <button onClick={() => router.push("/Dashboard")} className={styles.connect}>
                           Dashboard
                        </button>
                        </div>
                <div className={styles.hero}>
                    <div className={styles.header}>
                        {loadingState === "loaded"
                            && qrCode != "" &&
                            <Image
                                text={qrCode}
                                options={{
                                    type: 'image/jpeg',
                                    quality: 0.3,
                                    level: 'M',
                                    margin: 3,
                                    scale: 4,
                                    width: 400,
                                    color: {
                                        dark: '#010599FF',
                                        light: '#FFBF60FF',
                                    },
                                }}
                            />
                        }
                        {loadingState === "not-loaded" &&
                            <p>Generating... Please hold</p>
                        }
                    </div>
                </div>
            </main>
        </>
    );
}

export default GenerateQR;
