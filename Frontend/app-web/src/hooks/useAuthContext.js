import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function useAuthContext(){
    return useContext(AuthContext);
}