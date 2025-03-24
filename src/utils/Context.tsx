import { JSX } from "@emotion/react/jsx-runtime";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type MeType = {
    auth_stage: string,
    email: string,
    name: string,
    role: "organization" | "researcher"
}

const DEFAULT = {
    auth_stage: "password",
    email: "",
    name: "",
    role: "researcher"
} satisfies MeType;

// Create the context
const MyContext = createContext<MeType>(DEFAULT);

// this is the context provider for the current logged in user
export const UserInfoProvider = ({ children }: { children: JSX.Element }) => {
    const [value, setValue] = useState<MeType>(DEFAULT);
    const location = useLocation(); // Get the current route info

    useEffect(() => {
        async function fetchMe() {
            const response = await axios.get("/api/users/me");
            setValue(response.data);
        }

        fetchMe();
    }, [location]);

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook to use the context
export const useUserInfoContext = () => {
    return useContext(MyContext);
};
