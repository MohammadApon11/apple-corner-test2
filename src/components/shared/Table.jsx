import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useUpdate from "../../hooks/update/useUpdate";
import useSelected from "../../hooks/selected/useSelected";
import useDelete from "../../hooks/useDelete/useDelete";
import Swal from "sweetalert2";

const Table = ({ data, loading, showIcon = false }) => {
  const { pathname } = useLocation();
  const [id, setId] = useState("");
  const { update, loadingBtn } = useUpdate();
  const { selectedLoading, updateSelected } = useSelected();
  const { deleteData, loadingDelete } = useDelete();
  const handleIdIndex = (id, index) => {
    setId(id);
  };

  // update item all function start from here
  const handleUpdateHero = async (e) => {
    e.preventDefault();
    const target = e.target;
    const image = target?.image?.files[0];
    const title = target?.title?.value;
    const description1 = target?.description1?.value;
    const description2 = target?.description2?.value;
    await update({
      image,
      title,
      description1,
      description2,
      subURL: `posts/updateHero/${id}`,
    });
  };
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const target = e?.target;
    const image = target?.image?.files[0];
    const icon = target?.icon?.files[0];
    const title = target?.title?.value;
    const description1 = target?.description1?.value;
    const description2 = target?.description2?.value;
    await update({
      image,
      icon,
      title,
      description1,
      description2,
      subURL: `posts/updateEvent/${id}`,
    });
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const target = e?.target;
    const image = target?.image?.files[0];
    const icon = target?.icon?.files[0];
    const title = target?.title?.value;
    const description1 = target?.description1?.value;
    const description2 = target?.description2?.value;
    await update({
      image,
      icon,
      title,
      description1,
      description2,
      subURL: `posts/updateProduct/${id}`,
    });
  };
  // update item all function end here

  // selected item function start from here
  const handleHeroSelected = async (id) => {
    await updateSelected(`posts/selectedHero/${id}`);
  };
  const handleEventSelected = async (id) => {
    await updateSelected(`posts/selectedEvent/${id}`);
  };
  const handleProductSelected = async (id) => {
    await updateSelected(`posts/selectedProduct/${id}`);
  };
  // selected item function end here
  // const MySwal = withReactContent(Swal);
  // delete item function start from here
  const handleDelete = async (url) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteData(url);
          // Show success message
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error(error);
          // Show error message
          Swal.fire("Error!", "Failed to delete the file.", "error");
        }
      }
    });
  };
  // delete item function end here
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Title</th>
          <th>Description-1</th>
          <th>Description-2</th>
          {showIcon && <th>Icon</th>}
          <th>Update</th>
          <th>Make me displayed</th>
          <th>Action</th>
        </tr>
      </thead>
      {loading ? (
        <p className="text-center py-4 text-4xl">Please wait...</p>
      ) : (
        <>
          <tbody>
            {/* row 1 */}
            {data?.map((item, index) => (
              <>
                <tr key={index}>
                  <th>
                    {item?.selected && (
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={item?.selected}
                        readOnly
                      />
                    )}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        className="w-40 rounded-2xl"
                        src={item?.image}
                        alt="item Image"
                      />
                      <div>
                        <div className="font-bold">{item?.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item?.description1}</td>
                  <td>{item?.description2}</td>
                  {showIcon && (
                    <td className="rounded-full">
                      <div className="avatar bg-white rounded-full w-16 h-16 flex items-center justify-center">
                        <div className="mask mask-squircle w-12 h-12">
                          <img className="" src={item?.icon} alt="Icon" />
                        </div>
                      </div>
                    </td>
                  )}
                  <td>
                    <label htmlFor={index} className="btn">
                      <FaRegEdit className="text-2xl cursor-pointer" />
                    </label>
                  </td>
                  <td>
                    {item?.selected ? (
                      <button
                        className="btn btn-sm btn-info btn-outline"
                        disabled
                      >
                        Displayed
                      </button>
                    ) : (
                      <button
                        onClick={
                          pathname === "/hero"
                            ? () => handleHeroSelected(item?._id)
                            : pathname === "/product"
                            ? () => handleProductSelected(item?._id)
                            : () => handleEventSelected(item?._id)
                        }
                        className="btn btn-sm btn-info btn-outline"
                      >
                        {selectedLoading ? (
                          <span className="loading loading-spinner ">
                            Loading../
                          </span>
                        ) : (
                          "Display me"
                        )}
                      </button>
                    )}
                  </td>
                  <td>
                    {item?.selected ? (
                      <FaRegTrashAlt className="text-2xl text-red-300 cursor-not-allowed" />
                    ) : (
                      <FaRegTrashAlt
                        onClick={
                          pathname === "/hero"
                            ? () =>
                                handleDelete(`posts/deleteHero/${item?._id}`)
                            : pathname === "/event"
                            ? () =>
                                handleDelete(`posts/deleteEvent/${item?._id}`)
                            : () =>
                                handleDelete(`posts/deleteProduct/${item?._id}`)
                        }
                        className="text-2xl cursor-pointer text-red-500"
                      />
                    )}
                  </td>
                </tr>
                <div>
                  <input type="checkbox" id={index} className="modal-toggle" />
                  <div className="modal " role="dialog">
                    <div className="modal-box bg-gray-200 text-gray-900 p-0">
                      <div className="bg-info flex items-center justify-between p-5">
                        <div className="bg-white w-[40%] h-1 rounded-full"></div>
                        <div className="modal-action m-0">
                          <form method="dialog">
                            <label
                              className="modal-backdrop cursor-pointer"
                              htmlFor={index}
                            >
                              <HiOutlineXMark className="text-white text-3xl" />
                            </label>
                          </form>
                        </div>
                      </div>
                      <form
                        className="p-8 flex flex-col gap-6"
                        onSubmit={
                          pathname === "/hero"
                            ? handleUpdateHero
                            : pathname === "/event"
                            ? handleUpdateEvent
                            : handleUpdateProduct
                        }
                      >
                        <div className="flex flex-col gap-2">
                          <label className="text-xl">Select Image</label>
                          <input name="image" type="file" />
                        </div>
                        {pathname === "/product" && (
                          <div className="flex flex-col gap-2">
                            <label className="text-xl">Select Icon</label>
                            <input name="icon" type="file" />
                          </div>
                        )}
                        {pathname === "/hero" ? (
                          <div className="flex flex-col gap-2">
                            <label className="text-xl">Title</label>
                            <input
                              className="bg-gray-300 text-xl outline-none border-none w-full h-12 p-4"
                              name="title"
                              defaultValue={item?.title}
                            />
                          </div>
                        ) : pathname === "/product" ? (
                          <div className="flex flex-col gap-2">
                            <label className="text-xl">Title</label>
                            <input
                              className="bg-gray-300 text-xl outline-none border-none w-full h-12 p-4"
                              name="title"
                              defaultValue={item?.title}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="flex flex-col gap-2">
                          <label className="text-xl">Description 1 </label>
                          <input
                            className="bg-gray-300 text-xl outline-none border-none w-full h-12 p-4"
                            name="description1"
                            defaultValue={item?.description1}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xl">Description 2</label>
                          <input
                            className="bg-gray-300 text-xl outline-none border-none w-full h-12 p-4"
                            name="description2"
                            defaultValue={item?.description2}
                          />
                        </div>
                        <button
                          onClick={() => handleIdIndex(item?._id, index)}
                          type="submit"
                          className="btn bg-red-500 border-none hover:bg-red-600 text-white text-base"
                        >
                          {loadingBtn ? (
                            <span className="loading loading-spinner "></span>
                          ) : (
                            "Update"
                          )}
                        </button>
                      </form>
                    </div>
                    <label className="modal-backdrop" htmlFor={index}>
                      Close
                    </label>
                  </div>
                </div>
                {/* modal */}
              </>
            ))}
          </tbody>
        </>
      )}
    </table>
  );
};

export default Table;
