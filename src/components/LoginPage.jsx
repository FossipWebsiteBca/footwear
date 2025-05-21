import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-white">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-10 relative">
        {/* Logo */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col items-start">
          <span className="text-sm font-semibold tracking-wider">
            <img
              src="/image1.jpg"
              alt=""
              className="w-[120px] md:w-[160px] h-auto"
            />
          </span>
        </div>

        <span className="text-sm font-medium p-5 md:ml-[5rem]">LOGIN</span>

        <div className="w-full max-w-sm mx-auto">
          <div className="mb-6">
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaEnvelope className="text-black mr-3" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaLock className="text-black mr-3" />
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <button className="text-white bg-blue-800 w-full h-10 mt-5 outline-none rounded-md font-bold">
            Login
          </button>
        </div>
      </div>

      {/* Right Side - Sneaker Image */}
      <div className="w-full md:w-1/2 relative flex items-center justify-center overflow-hidden bg-white mt-10 md:mt-0">
        {/* Light Blue Curved Background */}
        <div className="absolute right-0 top-0 h-full w-[300px] md:w-[400px] bg-blue-100  "></div>

        {/* Sneaker Image */}
        <img
          src="./sneakers.jpg"
          alt="Sneakers"
          className="w-[250px] md:w-[400px] object-contain relative z-10"
        />
      </div>
    </div>
  );
}
