import Head from 'next/head';
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import dynamic from "next/dynamic";
import Nav from "../components/Nav";
import React, {useEffect} from "react";
import {toast} from "react-toastify";
const QrDecoder = dynamic(() => import("../components/QrDecoder"), {
    ssr: false,
});

const ReadQR: NextPage = () => {

    const [loadingState, setLoadingState] = React.useState("not-loaded");

    useEffect(() => {
        (async () => {
            await initGetUserMedia();
            setLoadingState("loaded");
        })();
    }, []);

    async function initGetUserMedia() {
        if (!navigator.mediaDevices) {
            toast.error("Your system does not support mediaDevices", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            return;
        }
        const constraints = {
            video: true,
        };

        // Attach the video stream to the video element and autoplay.
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
               console.dir(stream);
            })
            .catch(function (err) {
                /* handle the error */
                toast.error("Your system does not support mediaDevices", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            });
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

                {loadingState === "loaded" &&
                    <>
                        <div className={styles.qrReaderContainer}>
                            <QrDecoder/>
                        </div>
                    </>
                }
                {/* <Footer /> */}
            </main>
        </>
    );
}
export default ReadQR;
