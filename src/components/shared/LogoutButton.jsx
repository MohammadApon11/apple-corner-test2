import { IoMdLogOut } from "react-icons/io";
import useLogout from "../../hooks/auth/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div>
      {!loading ? (
        <IoMdLogOut
          className="text-3xl text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};
export default LogoutButton;
