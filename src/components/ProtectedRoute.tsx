import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { autoLogin } from "../services/apiAuth";
import Loader from "./loader/Loader";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const {
    data: loggedUser,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => autoLogin(),
    staleTime: 10000,
  });

  if (isLoading) return <Loader />;

  if (!loggedUser || isError) {
    navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
