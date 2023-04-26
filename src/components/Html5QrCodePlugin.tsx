import { Html5QrcodeScanner, QrcodeSuccessCallback } from 'html5-qrcode';
import { useEffect } from 'react';

interface Html5QrCodePluginProps {
  onScanningSuccess: QrcodeSuccessCallback
}

const qrcodeRegionId = "html5qr-code-full-region";

const Html5QrCodePlugin = ({
  onScanningSuccess,
}: Html5QrCodePluginProps) => {

  useEffect(() => {
      const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, {
        fps: 10,
        qrbox: 250,
        disableFlip: false,
      }, false);
      html5QrcodeScanner.render(onScanningSuccess, () => {
        // console.log("errorMessage", errorMessage);
      });

      return () => {
        html5QrcodeScanner.clear()
      };
  }, []);

  return (
      <div id={qrcodeRegionId} />
  );
};

export default Html5QrCodePlugin;