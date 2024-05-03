import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils";
import { useUtilesContext } from "../../context/UtilesContext";

const useGetHero = () => {
  const [heroes, setHeroes] = useState([]);
  const [herosLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { makeRefresh } = useUtilesContext();

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${baseURL}/posts/getHero`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHeroes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error || "Something went wrong");
        setLoading(false);
      }
    };

    fetchHeroes();

    // Clean-up function
    return () => {
      // Cleanup code if needed
    };
  }, [makeRefresh]); // Empty dependency array means this effect runs once after the component mounts

  return { heroes, herosLoading, error };
};

export default useGetHero;
