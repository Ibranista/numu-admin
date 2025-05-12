import { useState } from "react";
import Login from "../components/Login";
import RegisterUser from "../components/RegisterUser";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="hidden lg:flex w-1/2 bg-purple-700 items-center justify-center">
        <img
          src="/loginPageDisplay.gif"
          alt="Welcome"
          className="max-w-full h-auto rounded-md"
        />
      </div>
      <div className="flex flex-col w-full lg:w-1/2 items-center justify-center bg-gray-800 text-white p-6">
        <div className="flex space-x-4 mb-6">
          <button
            className={`cursor-pointer px-4 py-2 rounded ${
              isLogin ? "bg-purple-500" : "bg-gray-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Already Registered
          </button>
          <button
            className={`cursor-pointer px-4 py-2 rounded ${
              !isLogin ? "bg-purple-500" : "bg-gray-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Create User
          </button>
        </div>
        {isLogin ? <Login /> : <RegisterUser />}
      </div>
    </div>
  );
};

export default Auth;
