import { useContext } from "react";
import { CurrentContext } from "../contexts/CurrentContext";

export default function useCurrentContext() {
  return useContext(CurrentContext);
}