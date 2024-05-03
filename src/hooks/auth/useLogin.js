import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { baseURL } from "../../utils";

const useLogin = () => {
  const [loginLoading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (userEmail, password) => {
    const success = handleInputErrors(userEmail, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("current-user", JSON.stringify(data));
      // Store the JWT token in localStorage
      localStorage.setItem("token", data.token);

      // Set the authenticated user
      setAuthUser(data);

      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loginLoading, login };
};

export default useLogin;

function handleInputErrors(userEmail, password) {
  if (!userEmail || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
