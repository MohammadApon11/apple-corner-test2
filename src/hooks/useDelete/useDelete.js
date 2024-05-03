import { useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils";
import { useUtilesContext } from "../../context/UtilesContext";

const useDelete = () => {
  const [loadingDelete, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateFlag } = useUtilesContext();

  const deleteData = async (subURL) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${baseURL}/${subURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      updateFlag();
      setLoading(false);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error deleting data:", error);
      setError("Failed to delete data");
      setLoading(false);
    }
  };

  return { deleteData, loadingDelete, error };
};

export default useDelete;
