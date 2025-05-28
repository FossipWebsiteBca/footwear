import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../scripts/firebase.Config.js";
import { useNavigate } from "react-router-dom";

import negativeImage from "../assets/Negetive2.png";
import shoesImage from "../assets/Asset 1.png";


<img src={negativeImage} alt="Shoes" className="w-96" />;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const domain = email.split("@")[1];

      // Redirect logic
      if (domain === "admin.com") {
        navigate("/dashboard");
      } else if (domain === "employee.com") {
        navigate("/billing");
      } else {
        setError("Unauthorized domain");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div classname="w-1/2 relative flex flex-col justify-center items-center">
        <img
          src={negativeImage}
          alt="logo"
          classname="absolute top-40 left-40 w-32"
          style={{ width: "160px", height: "85px" }}
        />
          <div className="absolute top-[200px] left-[190px]">
        <h2 className="text-[24px] text-[#111827] font-bold leading-normal font-[poppins] mb-4">
          LOGIN
        </h2>
         <form className="w-80 space-y-4" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email Address"
        className="w-full border p-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">
        Login
      </button>
            {error && <p className="text-red-500">{error}</p>}
    </form>
  </div>
  </div>

  <div className="w-[700px] bg-gray flex-shrink-0">
    <img
      src={shoesImage}
      alt="Shoes"
      className="absolute top-[100px]  right-0"
    style={{ width: "651px", height: "517px" }}
    />
        
      </div>
      <div className="w-1/2 bg-gray-100 flex-1 flex flex-col justify-center items-center"></div>
    </div>
  );
};

export default Login;
