import { createContext } from "react";

const CurrentUserContext = createContext({ name: "", email: "" });

export default CurrentUserContext;