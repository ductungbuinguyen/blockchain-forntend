import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useContractContext } from "../contexts/ContractContext";

export const ProtectedRoute = ({ children }: {
  children: JSX.Element
}) => {
  const { isAuthenticated } = useAuthContext();
  console.log("isAuthenticated", isAuthenticated)
  const { isConnectedWithRightChainAndRightAccount } = useContractContext();
  console.log("isConnectedWithRightChainAndRightAccount", isConnectedWithRightChainAndRightAccount)
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if(!isConnectedWithRightChainAndRightAccount) return <Navigate to="/connect-wallet"/>
  return children;
};
