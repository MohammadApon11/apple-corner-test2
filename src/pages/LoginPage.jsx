import { useState } from "react";
import useLogin from "../hooks/auth/useLogin";
import { Toaster } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const { loginLoading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userEmail, password);
  };

  return (
    <div
      className="bg-cover h-[100vh] py-10 flex items-center justify-center "
      style={{ backgroundImage: `url('/bg.png')` }}
    >
      <div className="sm:w-[420px] w-[300px] mx-auto">
        <div className="w-full p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-info">
            Login
            <span className="text-violet-200"> VZ Admin Panel</span>
          </h1>
          <div className="border text-gray-200 mt-5 p-3 flex flex-col gap-2">
            <h4>Testing credintials</h4>
            <p>
              Email: <span className="underline">admin@volumezero.com</span>
            </p>
            <p>
              Password: <span className="underline">123456</span>
            </p>
          </div>
          <form
            className="mt-5 flex flex-col gap-3 text-white"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="label">
                <span className="text-base label-text text-white">
                  User Email
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter user email"
                className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-gray-500 border-none outline-none h-10"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base text-white label-text">
                  Password
                </span>
              </label>
              <div className="w-full relative">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full pl-4 text-[15px] bg-white rounded-[10px] text-gray-500 border-none outline-none h-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-xl absolute top-[10px] right-6 text-gray-500">
                  {show ? (
                    <FiEyeOff onClick={() => setShow(false)} />
                  ) : (
                    <FiEye onClick={() => setShow(true)} />
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                className="bg-white text-black w-full py-3 font-semibold rounded-[10px] hover:bg-gray-200 transition-all duration-300 mt-5"
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <span className="loading loading-spinner "></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
export default LoginPage;
