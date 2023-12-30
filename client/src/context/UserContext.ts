import { useContext, createContext } from "react";

const userContext = createContext({
    // cfUsername: "",
    // email: "",
    // setCfUsername: (val : String) => {},
    // setEmail: (val : String) => {}
})

export const UserContextProvider = userContext.Provider

export default function getUserContext() {
    return useContext(userContext)
}
