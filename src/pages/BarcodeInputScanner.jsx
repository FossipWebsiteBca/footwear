import React, { useState, useRef } from "react";

const BarcodeInputScanner = ({ onScan }) => {
  const [barcode, setBarcode] = useState("");
  const [showWebcamScanner, setShowWebcamScanner] = useState(false);
  const inputRef = useRef(null);

  const handleExternalScan = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = barcode.trim();
      if (trimmed !== "") {
        onScan(trimmed);
        setBarcode("");
        inputRef.current?.focus();
      }
    }
  };

  const handleWebcamScan = (err, result) => {
    if (result) {
      const scanned = result.text || result;
      onScan(scanned);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Product Barcode Scanner
        </h2>

        {/* External Scanner Input */}
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Scan using External Device
        </label>
        <input
          ref={inputRef}
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyPress={handleExternalScan}
          placeholder="Scan or enter barcode here"
          autoFocus
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Webcam Toggle */}
        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          onClick={() => setShowWebcamScanner(!showWebcamScanner)}
        >
          {showWebcamScanner ? "Hide Webcam Scanner" : "Scan via Webcam"}
        </button>

        {/* Webcam Barcode Scanner */}
        {showWebcamScanner && (
          <div className="mt-4 rounded-lg overflow-hidden border-2 border-blue-200 shadow-inner">
            <BarcodeScannerComponent
              width={"100%"}
              height={250}
              onUpdate={handleWebcamScan}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeInputScanner;
