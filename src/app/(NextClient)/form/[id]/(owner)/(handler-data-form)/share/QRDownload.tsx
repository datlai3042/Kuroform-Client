import { FormCore } from "@/type";
import { Button, QRCode } from "antd";
import { QrCode } from "lucide-react";
import React from "react";

type TProps = {
      formCore: FormCore.Form;
};

const QRDownload = (props: TProps) => {
      const { formCore } = props;

      function doDownload(url: string, fileName: string) {
            const a = document.createElement("a");
            a.download = fileName;
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
      }
      const downloadCanvasQRCode = () => {
            const canvas = document.getElementById("myqrcode")?.querySelector<HTMLCanvasElement>("canvas");
            if (!canvas) return;

            const newCanvas = document.createElement("canvas");
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height;
            const ctx = newCanvas.getContext("2d");

            if (!ctx) return;

            // Vẽ nền trắng trước
            ctx.fillStyle = "#FFFFFF"; // Màu trắng
            ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

            // Vẽ mã QR lên nền trắng
            ctx.drawImage(canvas, 0, 0);

            // Xuất file PNG
            const url = newCanvas.toDataURL("image/png");
            doDownload(url, "QRCode.png");
      };

      return (
            <div className="flex flex-col gap-[1.8rem]">
                  <div className="w-[10rem] h-[10rem] bg-[#fff]" id="myqrcode">
                        <QRCode
                              type="canvas"
                              size={256}
                              style={{ height: "auto", maxWidth: "100%", width: "100%", padding: ".6rem" }}
                              value={`${window.location.origin}/form/${formCore._id}`}
                        />
                  </div>
                  <Button type="primary" onClick={downloadCanvasQRCode} className=" text-[1.4rem] p-[.4rem_.8rem] h-[2.8rem] rounded-[.4rem] bg-color-main">
                     <QrCode />
                     
                        Tải mã QR của Form
                  </Button>
            </div>
      );
};
export default QRDownload;
