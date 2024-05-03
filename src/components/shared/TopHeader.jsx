import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "./LogoutButton";
import Marque from "./Marquee";

const TopHeader = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="py-4 border-b flex items-center gap-4">
      <Marque />
      <div className="flex items-center gap-3 pr-6">
        <img className="w-20 rounded-full" src={authUser?.profilePic} alt="" />
        <p className="text-white font-semibold text-[22px]">
          {authUser?.fullName}
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default TopHeader;
