import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useCallback, useEffect, useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FaCircle, FaWallet } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopMarquee from "./TopMarquee";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  const ToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (e) => {
    const sidebarElement = document.querySelector(".Sidebar-Child");
    const isClickInsideSidebar = sidebarElement.contains(e.target);
    const isTargetSidebar = e.target.classList.contains("Sidebar");

    if (!isClickInsideSidebar && isTargetSidebar && isOpen) {
      ToggleSidebar();
      return;
    }
  };
  const connectWallet = useCallback(() => {
    open();
  }, [open]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isConnected) {
        connectWallet();
      }
    }, 3000);

    // Cleanup the timeout if the component unmounts or if `isConnected` changes
    return () => clearTimeout(timeout);
  }, [isConnected, connectWallet]);

  return (
    <header className="w-full HEADER px-4 py-4 flex items-stretch justify-between gap-4 font-semibold">
      <Link
        to={"/"}
        className="text-sm md:text-[20px] leading-none text-black w-[160px] sm:min-w-[240px] border-2 border-black bgShadow bg_1 rounded-full xl:hidden flex gap-1 items-center justify-end p-2 pr-6 sm:w-full max-w-[200px] relative"
      >
        <img
          src="/images/FPLogo1.png"
          alt=""
          className="absolute base:-top-2  sm:-top-3 left-0 w-[160px] sm:w-[140px]"
        />
        <p className="hidden sm:block ms-auto font-extrabold">
          Fomo <br /> Party
        </p>
      </Link>
      <div className="flex-1 text-center overflow-hidden hidden lg:block py-0 pb-2 p-2">
        <div className="border-2 border-black bgShadow  bg_1 rounded-full flex items-center gap-3 p-3 h-full">
          <div className="flex items-center gap-2">
            <FaCircle size={8} color="red" /> Live <FaArrowRightLong />
          </div>
          <TopMarquee />
        </div>
      </div>
      <div className="xl:min-w-[180px] h-full flex items-center justify-end gap-3 w-full lg:w-auto">
        <button
          className="hidden h-full border-2 border-black btnAnimation bgShadow bg_2 rounded-full xl:block p-3 text-gray-200 max-w-[150px] w-[150px] truncate px-2 font-semibold "
          onClick={() => connectWallet()}
        >
          {address || "Connect Wallet"}
        </button>
        <button
          className="xl:hidden text-sm md:text-[20px] btnAnimation h-full border-2 border-black bgShadow1 bg_2 rounded-full flex items-center justify-center gap-3 p-4 pt-5 text-gray-200"
          onClick={() => connectWallet()}
        >
          <FaWallet />
        </button>
        <button
          className="xl:hidden text-sm md:text-[20px] btnAnimation h-full border-2 border-black bgShadow1 bg_2 rounded-full flex items-center justify-center gap-3 p-4 pt-5 text-gray-200"
          onClick={() => ToggleSidebar()}
        >
          <CgMenu />
        </button>
      </div>
      <div
        className={`Sidebar xl:hidden z-10 fixed top-0 right-0 h-screen transition-[width] ease-in-out duration-300 ${
          isOpen ? "w-full" : "w-0"
        } `}
        onClick={(e) => handleClickOutside(e)}
      >
        <Sidebar isOpen={isOpen} ToggleSidebar={ToggleSidebar} />
      </div>
    </header>
  );
};

export default Header;
