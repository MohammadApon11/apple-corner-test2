import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils";
import { useUtilesContext } from "../../context/UtilesContext";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { makeRefresh } = useUtilesContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${baseURL}/posts/getProducts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error || "Something went wrong");
        setLoading(false);
      }
    };

    fetchProducts();

    // Clean-up function
    return () => {
      // Cleanup code if needed
    };
  }, [makeRefresh]); // Empty dependency array means this effect runs once after the component mounts

  return { products, productsLoading, error };
};

export default useGetProducts;
