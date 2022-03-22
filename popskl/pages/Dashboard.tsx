import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import type { NextPage } from 'next';
import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import Nav from "../components/Nav";
import { toast } from "react-toastify";
import logo_dash from '../assets/logo_dash.jpeg'

const Dashboard: NextPage = () => {
    const router = useRouter();

    function generateQR() {
        router.push("/GenerateQR");
    }

    function readQR() {
        router.push("/ReadQR");
    }

    const [loadingState, setLoadingState] = React.useState("not-loaded");


    useEffect(() => {
        (async () => {
            await initUserLocation();
            setLoadingState("loaded");
        })();
    }, []);


    async function initUserLocation() {
        if (!navigator.geolocation) {
            toast.error("Your system does not support Geolocation", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            return;
        }
        navigator.geolocation.getCurrentPosition(
            locationResolveSuccessfully,
            locationResolveError
        );
    }

    function locationResolveError(error: any) {
        let errorType = "";
        if (error.code === 1) {
            errorType = "Permission Denied";
        } else if (error.code === 2) {
            errorType = "Position Unavailable";
        } else if (error.cde === 3) {
            errorType = "Timeout";
        }
        toast.error(errorType + " " + error.message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    }

    async function locationResolveSuccessfully(data: any) {
        const latitude = data.coords.latitude;
        const longitude = data.coords.longitude;
        console.log(JSON.stringify(data));
        toast.success("Location fetched successfully!", {
            position: toast.POSITION.BOTTOM_CENTER,
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
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/* <Nav></Nav> */}
                <div className={styles.container}>

                    {loadingState === "loaded" &&
                        <>
                            <div className={styles.header1}>
                                <div className={styles.img} >
                                    <Image src={logo_dash} />
                                </div>
                                <button onClick={generateQR} className={styles.sub_btn}>
                                    Generate QR Claim
                                </button>
                            </div>
                            <div className={styles.header1}>
                                <button onClick={readQR} className={styles.sub_btn}>
                                    Scan Presence Claim
                                </button>
                            </div>
                        </>
                    }
                </div>
                {/* <Footer /> */}
            </main>
        </>
    );
}
export default Dashboard;
