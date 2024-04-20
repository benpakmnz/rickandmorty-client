import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { autoLogin } from "../services/apiAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const {
    data: loggedUser,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => autoLogin(),
  });

  if (isLoading) return <h1>loading...</h1>;

  if (isError) {
    <h1>there is an error</h1>;
  }

  console.log(loggedUser);

  if (!loggedUser) {
    navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
