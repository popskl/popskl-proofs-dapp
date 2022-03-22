import { useEffect, useRef, useState } from "react";
import QrReader from "../assets/js/react-qr-reader/lib/index.js";
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
import Big from "big.js";
import { toast } from "react-toastify";
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router'
declare global {
    interface Window {
        contract: any;
    }
}

export default function Page() {
    const router = useRouter();   
    const [error, setError] = useState<string | undefined>();
    const handleError = (e: any) => setError(e);
    const [transactionUrl, setTransactionUrl] = useState("");
    const [scanned, setScanned] = useState("not-scanned");
    const [legacyMode, setLegacyMode] = useState(false);

    const qrReader1 = useRef(null);
    const qrReader2 = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let transactionHashes = params.get('transactionHashes');
        if (transactionHashes) {
            setTransactionUrl("https://explorer.testnet.near.org/transactions/" + transactionHashes);
            toast.success("QR code Successfully confirmed", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            setScanned("scanned");
        } else {
            setScanned("not-scanned");
        }
    }, [])

    async function handleScan(data: any) {
        if (data && scanned == "not-scanned") {
            setScanned("scanned");
            sessionStorage.setItem('currentstate', 'readqr');
            const status = await window.contract.confirm_code(
                { code: data },
                BOATLOAD_OF_GAS,
                Big('0').times(10 ** 24).toFixed()
            );
            if (status)
                toast.success("QR code is validated on chain. Click on Transaction log to verify!", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
            else
                toast.error("Duplicate entry of QR code", {
                    position: toast.POSITION.BOTTOM_CENTER,
                });
        }
    }

    function openImageDialog() {
        setLegacyMode(true);
        try {
            // @ts-ignore
            qrReader2.current.openImageDialog()
        } catch (e) {
            setTimeout(function () {
                // @ts-ignore
                qrReader2.current.openImageDialog()
            }, 2000);
        }
    }

    // @ts-ignore
    return (
        <>
            <div >
                <div >
                    <div className={styles.space}>
                <button onClick={() => router.push("/Dashboard")} className={styles.connect}>
                           Dashboard
                        </button>
                        </div>
                    {scanned == "not-scanned" && !legacyMode && (
                        <>
                            <QrReader ref={qrReader1}
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                className="QrReader"
                                legacyMode={false}
                            />
                        </>
                    )}
                    {scanned == "not-scanned" && legacyMode && (
                        <>
                            <QrReader ref={qrReader2}
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                className="QrReader"
                                legacyMode={true}

                            />
                        </>
                    )}
                    {scanned == "not-scanned" && (
                                 <div className={styles.space}>
                            <div className={styles.imp_txt}>
                                If you have issue with QR Reader click below to access the camera. If Camera access not available upload an image from QR code.
                            </div>
                            <input className={styles.sub_btn} type="button" value="Access Camera/Upload QR" onClick={openImageDialog} />
                        </div>
                    )}
                    {transactionUrl == "" && scanned == "scanned" && (
                                  <div className={styles.space}>
                             <div className={styles.imp_txt}>
                            <a className={styles.imp_txt} target="_blank"
                                href="https://explorer.testnet.near.org/accounts/dev-1646808675719-36510749528369"
                                rel="noopener noreferrer">
                                Click to check the transaction for all the contract
                            </a>
                        </div>
                        </div>
                    )}
                </div>
                {transactionUrl == "" && (
                              <div className={styles.space}>
                    <div className={styles.imp_txt}>
                        <a href="#" className={styles.imp_txt}>
                            Enjoy Being Present
                        </a>{" "}
                        | <a href="#" className={styles.imp_txt}>Issued by Sponsor</a>
                    </div>
                    </div>
                )}
                {transactionUrl && (
                              <div className={styles.space}>
                      <div className={styles.imp_txt}>
                        <a className={styles.imp_txt} target="_blank" href={transactionUrl} rel="noopener noreferrer">
                            Click to check the transaction
                        </a>{" "}
                        | <a className={styles.imp_txt} href="#">Thank you</a>
                    </div>
                    </div>
                )}
            </div>
        </>
    );
}
