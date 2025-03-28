import {
  useWeb3ModalAccount
} from "@web3modal/ethers5/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HowWorksModal from "./components/Modals/HowWorksModal";
import TransactionModal from "./components/Modals/TransactionModal";
import Notifications from "./components/Notifications";
import Toast from "./components/Toast";
import CreateToken from "./pages/CreateToken";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";
import Tokens from "./pages/Tokens";
import TradeNow from "./pages/TradeNow";
import {
  updateHowToModalState
} from "./store/slices/essentialSlice";

const App = () => {
  const { web3InstETH, isShowingHowToModal } = useSelector(
    (state) => state.essential
  );

  const dispatch = useDispatch();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  
  const LoadContract = () => {
  }
  useEffect(() => {
 
  }, []);

  useEffect(() => {
  }, [isConnected, chainId, address]);

  useEffect(() => {
    setTimeout(() => {
      const bool = localStorage.getItem("HowWorks");

      if (!bool || bool === "true") {
        dispatch(updateHowToModalState(true)); // Show "How it Works" modal
      } else {
        dispatch(updateHowToModalState(false)); // Show "How it Works" modal
      }
    }, 2000);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create-token" element={<CreateToken />} />
          <Route path="tokens" element={<Tokens />} />
          <Route path="profile/:address" element={<Profile />} />
          <Route path="trade/:id" element={<TradeNow />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <TransactionModal />
      {isShowingHowToModal && <HowWorksModal />}
      <Notifications />
      <Toast />
    </>
  );
};

export default App;
