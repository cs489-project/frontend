import { useEffect } from "react";
import axios from "axios";
import { useUserInfoContext } from "./Context";
import { useNavigate } from "react-router-dom";

const AxiosInterceptorSetup = () => {
    const meData = useUserInfoContext();
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.request.responseURL.endsWith("/me")) {
                    return Promise.reject(error);
                }

                if (error.response?.status === 400 && error.response?.data?.error === "Invalid session") {
                    if (meData.role === "researcher") {
                        navigate("/?noSession=1");
                    } else {
                        navigate("/org?noSession=1");
                    }
                    return new Promise(() => { });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor); // Cleanup on unmount
        };
    }, [meData]);

    return null; // This component does not render anything
};

export default AxiosInterceptorSetup;