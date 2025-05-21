import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ProductRegister from "./pages/ProductRegister";
import ProductList from "./pages/BarcodeInputScanner";
import BarcodeInputScanner from "./pages/BarcodeInputScanner";
function App() {
  return (
    <>
      <ProductRegister />
      <BarcodeInputScanner />
    </>
  );
}

export default App;
