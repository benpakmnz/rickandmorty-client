import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | null => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default RequireAuth;
