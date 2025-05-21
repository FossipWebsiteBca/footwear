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
import BarcodeScannerComponent from "react-qr-barcode-scanner";

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

  const handleScan = (err, result) => {
    if (result) {
      setBarcode(result.text);
      setShowScanner(false);
    }
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
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          📦 Product Registration
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="block mb-1 font-medium">
              Scan or Enter Barcode
            </label>
            <input
              ref={inputRef}
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={handleExternalScanner}
              placeholder="Barcode"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setShowScanner((prev) => !prev)}
              className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {showScanner ? "Hide Scanner" : "Scan via Webcam"}
            </button>

            {showScanner && (
              <div className="mt-4 border rounded-lg overflow-hidden">
                <BarcodeScannerComponent
                  width={"100%"}
                  height={200}
                  onUpdate={handleScan}
                />
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 flex flex-col gap-3"
          >
            <label className="block font-medium">Product Name</label>
            <input
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="p-3 border rounded-lg"
              required
            />

            <label className="block font-medium">Size</label>
            <input
              value={product.size}
              onChange={(e) => setProduct({ ...product, size: e.target.value })}
              className="p-3 border rounded-lg"
              required
            />

            <label className="block font-medium">Gender</label>
            <select
              value={product.gender}
              onChange={(e) =>
                setProduct({ ...product, gender: e.target.value })
              }
              className="p-3 border rounded-lg"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>

            <label className="block font-medium">Price</label>
            <input
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="p-3 border rounded-lg"
              type="number"
              required
            />

            <button
              type="submit"
              className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
            >
              {editingId ? "Update Product" : "Register Product"}
            </button>
          </form>
        </div>

        <hr className="my-6" />

        <div>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name/barcode"
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <div className="overflow-auto max-h-[400px]">
            <table className="min-w-full table-auto border rounded-lg">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="p-2 text-left">Barcode</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Size</th>
                  <th className="p-2">Gender</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter(
                    (p) =>
                      p.name.toLowerCase().includes(filter.toLowerCase()) ||
                      p.barcode.includes(filter)
                  )
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="p-2 font-mono">{p.barcode}</td>
                      <td className="p-2">{p.name}</td>
                      <td className="p-2">{p.size}</td>
                      <td className="p-2">{p.gender}</td>
                      <td className="p-2">₹{p.price}</td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRegister;
