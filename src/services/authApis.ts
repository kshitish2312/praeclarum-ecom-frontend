import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "./api";
import { setTokens,setUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  return useMutation<any, any, any>({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/auth/signup", data);
      return response.data;
    },
  });
};


export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: any): Promise<any> => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: async (data) => {
      dispatch(setTokens(data));

      try {
        const profileResponse = await axiosInstance.get("/auth/profile"); // ✅ Fetch user profile
        dispatch(setUser(profileResponse.data));

        if (profileResponse.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    },
    
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"], 
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    },
  });
};
