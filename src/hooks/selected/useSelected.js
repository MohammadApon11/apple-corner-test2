import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "../../utils";
import { useUtilesContext } from "../../context/UtilesContext";
import { useState } from "react";

const useSelected = () => {
  const { updateFlag } = useUtilesContext();
  const [selectedLoading, setLoading] = useState(false);
  const updateSelected = async (subURL) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/${subURL}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateFlag();
      
      setLoading(false);

      await Swal.fire({
        title: "Good job!",
        text: "Displayed successfully",
        icon: "success",
      });
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Permission to Visit Lading page how look like!",
        text: "Do you want to visit Lading page now?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, visit page",
        cancelButtonText: "No, thanks",
      });

      if (result.isConfirmed) {
        // Open GitHub URL in a new tab
        window.open("https://apple-corner-lading-page.vercel.app/", "_blank");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating selected item:", error);
      toast.error("Failed to update selected item");
    }
  };

  return { updateSelected, selectedLoading };
};

export default useSelected;
