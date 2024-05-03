import { useForm } from "react-hook-form";
import { HiOutlineXMark } from "react-icons/hi2";
import { baseURL } from "../../../utils";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useUtilesContext } from "../../../context/UtilesContext";

const ProductModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { updateFlag } = useUtilesContext();

  const onSubmit = async (data) => {
    const { title, description1, description2 } = data;
    let image = data.image[0];
    let icon = data.icon[0];

    try {
      const token = localStorage.getItem("token");

      // Upload image to Cloudinary
      const formData1 = new FormData();
      const formData2 = new FormData();
      formData1.append("file", image);
      formData1.append("upload_preset", "volumezero");
      formData2.append("file", icon);
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

      if (!cloudinaryResponse1.ok) {
        return toast.error("Failed to upload image to Cloudinary");
      }
      if (!cloudinaryResponse2.ok) {
        return toast.error("Failed to upload icon to Cloudinary");
      }

      const cloudinaryData1 = await cloudinaryResponse1.json();
      const cloudinaryData2 = await cloudinaryResponse2.json();
      console.log("Uploaded image data:", cloudinaryData1);
      console.log("Uploaded icon data:", cloudinaryData2);
      const imageUrl1 = cloudinaryData1.secure_url;
      const iconUrl = cloudinaryData2.secure_url;

      // Send POST request to createHero endpoint with image URL
      const createHeroResponse = await axios.post(
        `${baseURL}/posts/createProduct`,
        {
          title,
          description1,
          description2,
          image: imageUrl1, // Use the image URL obtained from Cloudinary
          icon: iconUrl, // Use the icon URL obtained from Cloudinary
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include JWT token in headers
          },
        }
      );

      console.log("Create Product response:", createHeroResponse.data);
      // Add your logic to handle the response as needed

      updateFlag();
      toast.success("Product created successfully");
      setLoading(false);
      reset();
      document.getElementById("my_modal_5").close();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-gray-200 text-gray-900 p-0">
        <div className="bg-info flex items-center justify-between p-5">
          <div className="bg-white w-[40%] h-1 rounded-full"></div>
          <div className="modal-action m-0">
            <form method="dialog">
              <button className="">
                <HiOutlineXMark className="text-white text-3xl" />
              </button>
            </form>
          </div>
        </div>

        <form
          className="p-8 flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label className="text-xl">
              Select Product Image <span className="text-red-500">*</span>
            </label>
            <input
              {...register("image", { required: "Image field is required" })}
              // onChange={(e) => setImage(e.target.files[0])}
              type="file"
            />
            {errors.image && (
              <span className="text-red-500 text-[14px]">
                {errors.image.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">
              Select Icon{" "}
              <span className="text-red-500 text-[12px]">*</span>
            </label>
            <input
              {...register("icon", { required: "Icon field is required" })}
              //   onChange={(e) => setIcon(e.target.files[0])}
              id="icon"
              type="file"
            />
            {errors.icon && (
              <span className="text-red-500 text-[14px]">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              className="bg-gray-300 text-xl outline-none border-none w-full h-12 p-4"
              {...register("title", { required: "Title field is required" })}
            />
            {errors.title && (
              <span className="text-red-500 text-[14px]">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">
              Description 1 <span className="text-red-500">*</span>
            </label>
            <input
              id="description1"
              className="bg-gray-300 text-xl outline-none border-none w-full h-12 p-4"
              {...register("description1", {
                required: "Description 1 field is required",
              })}
            />
            {errors.description1 && (
              <span className="text-red-500 text-[14px]">
                {errors.description1.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl">
              Description 2
              <span className="text-red-500 text-[12px]">Optional</span>
            </label>
            <input
              id="description2"
              className="bg-gray-300 text-xl outline-none border-none w-full h-12 p-4"
              {...register("description2")}
            />
          </div>
          <button className="btn bg-red-500 border-none hover:bg-red-600 text-white text-base">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
      <Toaster />
    </dialog>
  );
};

export default ProductModal;
