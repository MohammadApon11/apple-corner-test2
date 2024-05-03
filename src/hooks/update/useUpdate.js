import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUtilesContext } from "../../context/UtilesContext";
import { baseURL } from "../../utils";

const useUpdate = () => {
  const [loadingBtn, setLoading] = useState(false);
  const { updateFlag } = useUtilesContext();
  const update = async ({
    image,
    icon,
    title,
    description1,
    description2,
    subURL,
  }) => {
    try {
      const token = localStorage.getItem("token");

      // Update image to Cloudinary
      const formData1 = new FormData();
      const formData2 = new FormData();
      formData1.append("file", image);
      formData2.append("file", icon);
      formData1.append("upload_preset", "volumezero");
      formData2.append("upload_preset", "volumezero");
      setLoading(true);

      const cloudinaryResponse1 = await fetch(
        "https://api.cloudinary.com/v1_1/dy1lyaog7/image/upload",
        {
          method: "POST",
          body: formData1,
        }
      );
      const cloudinaryResponse2 = await fetch(
        "https://api.cloudinary.com/v1_1/dy1lyaog7/image/upload",
        {
          method: "POST",
          body: formData2,
        }
      );

      if (!cloudinaryResponse1.ok && image) {
        return toast.error("Failed to update image to Cloudinary");
      }
      if (!cloudinaryResponse2.ok && icon) {
        return toast.error("Failed to update icon to Cloudinary");
      }

      const cloudinaryData1 = await cloudinaryResponse1.json();
      const cloudinaryData2 = await cloudinaryResponse2.json();
      const imageUrl = cloudinaryData1.secure_url;
      const iconUrl = cloudinaryData2.secure_url;

      // Send Update request to createHero endpoint with image URL
      const createHeroResponse = await axios.put(
        `${baseURL}/${subURL}`,
        {
          title,
          description1,
          description2,
          image: imageUrl,
          icon: iconUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include JWT token in headers
          },
        }
      );

      console.log("Update response:", createHeroResponse.data);
      // Add your logic to handle the response as needed

      updateFlag();
      toast.success("updated successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error creating hero:", error);
      toast.error("Failed to create hero");
      setLoading(false);
    }
  };
  return { update, loadingBtn };
};

export default useUpdate;
