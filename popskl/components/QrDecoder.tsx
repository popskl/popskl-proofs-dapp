import { useRef, useState } from "react";
import QrReader from "../assets/js/react-qr-reader/lib/index.js";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { nearConfig } from "../services/initContract.js";
import Spinner from "./Spinner";

const StyledQRReader = styled(QrReader)`
  width: 100%;
  section {
    border-radius: 16px;
    div {
      border-radius: 16px !important;
      border: 15px solid rgba(0, 0, 0, 0.3) !important;
      box-shadow: unset !important;
    }
    video {
      border-radius: 16px !important;
    }
  }
`;

const DecoderLayout = styled.div`
  z-index: 2;
  max-width: 450px;
  max-height: 450px;
`;
const StyledInput = styled.input`
  display: flex;
  justify-content: center;
  border: none;
  align-items: center;
  width: 100%;
  background: #276ee7;
  border-radius: 100px;
  height: 50px;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 10px 80px;
  color: #ffffff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  :focus {
    outline: none;
  }
`;
const InputBox = styled.div`
  margin-top: 80px;
`;
const ScannedLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  width: 100%;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    #79abff;
`;
const StyledLink = styled.a`
  z-index: 2;
  display: flex;
  justify-content: center;
  border: none;
  align-items: center;
  text-align: center;
  width: 100%;
  background: #276ee7;
  border-radius: 100px;
  height: auto;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  padding: 10px 20px;
  color: #ffffff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-decoration: none;
  :focus {
    outline: none;
  }
`;

export default function Page() {
  const [error, setError] = useState<string | undefined>();
  const handleError = (e: any) => setError(e);
  const [transactionUrl, setTransactionUrl] = useState("");
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [legacyMode, setLegacyMode] = useState(false);

  const qrReaderRef = useRef(null);

  async function handleScan(data: any) {
    if (data) {
      setLoading(true);
      window.walletConnection.account().functionCall(
        {
          contractId: nearConfig.contractName!,
          methodName: "confirm_code",
          args: { code: data },
        }
      ).then((outcome) => {
        setScanned(true);
        sessionStorage.setItem("currentstate", "readqr");
        setTransactionUrl(`${nearConfig.explorerUrl!}/transactions/${outcome.transaction.hash}`)
        toast.success(
          "QR code is validated on chain. Click on Transaction log to verify!",
          {
            position: toast.POSITION.BOTTOM_CENTER,
          }
        );
      }).catch((err) => {
        console.error(err)
        toast.error(mapError(err), {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }).finally(() => {
        setLoading(false);
      });
    }
  }

  function openImageDialog() {
    setLegacyMode(true);
    try {
      // @ts-ignore
      qrReaderRef.current.openImageDialog();
    } catch (e) {
      setTimeout(function () {
        // @ts-ignore
        qrReaderRef.current.openImageDialog();
      }, 1000);
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <DecoderLayout>
      {!scanned && (
        <>
          <StyledQRReader
            ref={qrReaderRef}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            legacyMode={!!legacyMode}
          />
          <InputBox>
            <StyledInput
              type="button"
              value="Upload from gallery"
              onClick={openImageDialog}
            />
          </InputBox>
        </>
      )}
      {scanned && (
        <ScannedLayout>
          <StyledLink
            target="_blank"
            href={transactionUrl}
            rel="noopener noreferrer"
          >
            Check the transaction on blockchain explorer
          </StyledLink>
        </ScannedLayout>
      )}
    </DecoderLayout>
  );
}

function mapError(err: Error): string {
  if (err.message.includes("no longer active")) {
    return "This code is no longer active!";
  }
  return "Some error happened during QR confirmation!";
}
