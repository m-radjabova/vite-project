import {  useForm } from "react-hook-form";
import apiClient from "../../apiClient/ApiClient";
import { User } from "../../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginList from "./LoginList";

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const {
    reset,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    apiClient.get<User[]>("/users?email=" + data.email).then((res) => {
      if (res.data.length > 0) {
        const user = res.data[0];
        if (user.password === data.password) {
          toast.success("Login successful");
          localStorage.setItem("token", String(user.id));
          navigateByRole(user);
          reset();
        } else {
          toast.error("Invalid credentials");
        }
      } else {
        toast.error("User not found");
      }
    });
  };

  const navigateByRole = (user: User) => {
    if (user.roles.includes("ADMIN")) {
      navigate("/admin");
    } else if (user.roles.includes("TEACHER")) {
      navigate("/teacher");
    } else {
      toast.error("Role not recognized");
    }
  };

  return (
    <LoginList onSubmit={onSubmit} />
  );
};

export default Login;
