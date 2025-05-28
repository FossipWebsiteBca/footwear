import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebaseConfig"; // Adjust your path
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import ZXingBarcodeScanner from "./ZXingBarcodeScanner"; // adjust path

const ProductRegister = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState({
    name: "",
    size: "",
    gender: "",
    price: "",
  });
  const [products, setProducts] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("");
  const inputRef = useRef(null);

  const handleScan = (scannedText) => {
    setBarcode(scannedText);
    setShowScanner(false);
  };

  const handleExternalScanner = (e) => {
    if (e.key === "Enter" && barcode.trim()) {
      inputRef.current?.blur();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!barcode) return alert("Barcode is required");
    const productRef = collection(db, "RegisteredProducts");

    if (editingId) {
      await updateDoc(doc(productRef, editingId), { ...product, barcode });
      setEditingId(null);
    } else {
      await addDoc(productRef, { ...product, barcode });
    }

    setProduct({ name: "", size: "", gender: "", price: "" });
    setBarcode("");
    fetchProducts();
  };

  const fetchProducts = async () => {
    const q = query(collection(db, "RegisteredProducts"));
    const snap = await getDocs(q);
    setProducts(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleEdit = (p) => {
    setProduct({
      name: p.name,
      size: p.size,
      gender: p.gender,
      price: p.price,
    });
    setBarcode(p.barcode);
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "RegisteredProducts", id));
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white/90 p-8 rounded-2xl shadow-xl animate-fade-in relative transition-all duration-500 border border-slate-200">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8 tracking-tight drop-shadow animate-fade-in-up flex items-center justify-center gap-2">
          <span className="inline-block align-middle text-2xl">📦</span>
          <span>Product Registration</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <label className="block mb-2 font-semibold text-slate-700 tracking-wide text-base">
              Scan or Enter Barcode
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={handleExternalScanner}
                placeholder="Barcode"
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-all duration-200 text-base bg-slate-50 placeholder-slate-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h2a2 2 0 012 2v6a2 2 0 01-2 2H3m0-10v10m0-10a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
              </span>
            </div>
            <button
              onClick={() => setShowScanner((prev) => !prev)}
              className={`mt-4 w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200 ${
                showScanner ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A2 2 0 0021 6.382V5a2 2 0 00-2-2H5a2 2 0 00-2 2v1.382a2 2 0 001.447 1.342L9 10m6 0v4m0 0l-4.553 2.276A2 2 0 013 17.618V19a2 2 0 002 2h14a2 2 0 002-2v-1.382a2 2 0 00-1.447-1.342L15 14z"
                />
              </svg>
              {showScanner ? "Hide Scanner" : "Scan via Camera"}
            </button>

            {showScanner && (
              <div className="mt-6 border border-blue-200 rounded-xl overflow-hidden shadow-lg animate-fade-in-up bg-white/90 backdrop-blur transition-all duration-500">
                <ZXingBarcodeScanner
                  onResult={handleScan}
                  onClose={() => setShowScanner(false)}
                  width="100%"
                  height={220}
                />
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 flex flex-col gap-4 animate-fade-in-up"
          >
            <label className="block font-semibold text-slate-700 text-base">
              Product Name
            </label>
            <input
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="p-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-slate-50 placeholder-slate-400"
              required
            />

            <label className="block font-semibold text-slate-700 text-base">
              Size
            </label>
            <input
              value={product.size}
              onChange={(e) => setProduct({ ...product, size: e.target.value })}
              className="p-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-slate-50 placeholder-slate-400"
              required
            />

            <label className="block font-semibold text-slate-700 text-base">
              Gender
            </label>
            <select
              value={product.gender}
              onChange={(e) =>
                setProduct({ ...product, gender: e.target.value })
              }
              className="p-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-slate-50"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Children</option>
            </select>

            <label className="block font-semibold text-slate-700 text-base">
              Price
            </label>
            <input
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="p-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-slate-50 placeholder-slate-400"
              type="number"
              required
            />

            <button
              type="submit"
              className="mt-3 bg-gradient-to-r from-blue-600 to-slate-800 hover:from-blue-700 hover:to-slate-900 text-white font-semibold py-2 rounded-lg shadow transition duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {editingId ? (
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Update Product
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Register Product
                </span>
              )}
            </button>
          </form>
        </div>

        <hr className="my-8 border-slate-200" />

        <div>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name/barcode"
            className="w-full p-3 mb-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-slate-50 placeholder-slate-400"
          />

          <div className="overflow-auto max-h-[400px] animate-fade-in-up">
            <table className="min-w-full table-auto border-separate border-spacing-y-2 rounded-xl">
              <thead className="bg-slate-100 rounded-xl">
                <tr>
                  <th className="p-3 text-left rounded-l-xl font-semibold text-slate-600">
                    Barcode
                  </th>
                  <th className="p-3 font-semibold text-slate-600">Name</th>
                  <th className="p-3 font-semibold text-slate-600">Size</th>
                  <th className="p-3 font-semibold text-slate-600">Gender</th>
                  <th className="p-3 font-semibold text-slate-600">Price</th>
                  <th className="p-3 rounded-r-xl font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter(
                    (p) =>
                      p.name.toLowerCase().includes(filter.toLowerCase()) ||
                      p.barcode.includes(filter)
                  )
                  .map((p, idx) => (
                    <tr
                      key={p.id}
                      className={`transition-all duration-200 ${
                        idx % 2 === 0 ? "bg-slate-50" : "bg-white"
                      } hover:bg-blue-50 shadow rounded-xl animate-fade-in-up`}
                    >
                      <td className="p-3 font-mono text-blue-700 rounded-l-xl">
                        {p.barcode}
                      </td>
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.size}</td>
                      <td className="p-3">{p.gender}</td>
                      <td className="p-3">₹{p.price}</td>
                      <td className="p-3 space-x-2 rounded-r-xl">
                        <button
                          onClick={() => handleEdit(p)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-white font-semibold px-2 py-1 rounded-lg transition-colors duration-150 bg-blue-50 hover:bg-blue-600 shadow-sm"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-white font-semibold px-2 py-1 rounded-lg transition-all duration-150 bg-red-50 hover:bg-red-600 shadow-sm"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Animations */}
        <style>{`
        .animate-fade-in { animation: fadeIn 0.7s ease; }
        .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      </div>
    </div>
  );
};

export default ProductRegister;
