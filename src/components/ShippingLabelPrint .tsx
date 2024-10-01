"use client";
import React, { useRef } from "react";
import Barcode from "react-barcode";

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
}

interface ShippingLabelPrintProps {
  recipientInfo: ShippingInfo;
  to: string;
  orderNumber: string;
}

const ShippingLabelPrint: React.FC<ShippingLabelPrintProps> = ({
  recipientInfo,
  to,
  orderNumber,
}) => {
  // Reference to the shipping label that we want to print
  const labelRef = useRef<HTMLDivElement | null>(null);

  const printLabel = () => {
    if (labelRef.current) {
      const printContent = labelRef.current.innerHTML;
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f0f0f0;
              }
              .shipping-label {
                width: 98.5mm;
                height: 48mm;
                border: 2px solid #000;
                border-radius: 10px;
                background-color: white;
                padding: 10px;
                box-sizing: border-box;
                font-family: Arial, sans-serif;
                margin: 5mm;
                width: calc(100mm - 5mm);
                height: calc(50mm - 5mm);
              }
              .shipping-label p {
                margin: 3px 0;
                font-size: 16px;
              }
            </style>
          </head>
          <body>${printContent}</body>
          </html>
        `);
        doc.close();
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        document.body.removeChild(iframe); // Clean up the iframe
      }
    }
  };

  return (
    <>
      <div ref={labelRef} style={{ display: "none" }}>
        {/* The content that will be printed */}
        <div className="shipping-label">
          <p>
            <strong>To:</strong> {to}
          </p><br/>
          <p>{recipientInfo.address}</p>
          <p className="capitalize">
            {recipientInfo.city}, {recipientInfo.state}, {recipientInfo.pin_code}
          </p>
        </div>
      </div>

      <button
        onClick={printLabel}
        className="ti-btn bg-primary text-white !py-1 !px-2 !font-medium me-2"
      >
        Print Shipping Label
      </button>
    </>
  );
};

export default ShippingLabelPrint;
