import { useEffect, useRef, type ReactNode } from "react";
import { toaster } from "../components/ui/toaster-instance";
import { setNetworkStatus } from "../app/features/network/networkSlice";
import { useDispatch } from "react-redux";

interface IProps {
  children: ReactNode;
}

const NetworkConnectionProviders = ({ children }: IProps) => {
  const toastId = useRef<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const setOnline = () => {
      dispatch(setNetworkStatus(true));
      if (toastId.current) {
        toaster.dismiss(toastId.current);
        toastId.current = null;
      }

      toaster.create({
        title: "You are back online!",
        type: "success",
        duration: 2000,
      });
    };
    const setOffline = () => {
      dispatch(setNetworkStatus(false));

      toastId.current = toaster.create({
        title: "You are offline!",
        type: "info",
        duration: 2000000000,
      });
    };
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, [dispatch]);

  return children;
};

export default NetworkConnectionProviders;
