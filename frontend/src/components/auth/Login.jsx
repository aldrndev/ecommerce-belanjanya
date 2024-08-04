import { Input, Button, Image, Link as LinkNext } from "@nextui-org/react";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { StepThree, StepTwo } from "./Register";

const Login = ({
  onOpenChange,
  isVisible,
  toggleVisibility,
  setSelected,
  stepLogin,
  handleNextLogin,
  handleNext,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.isVerified && data.isProfile) {
        toast.success(data.message);
        const user = JSON.stringify(data.data);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", user);
        localStorage.setItem("isSeller", data.isSeller);
        navigate("/home");
        onOpenChange(false);
        reset();
        return;
      }

      if (!data.isVerified && !data.isProfile) {
        toast.error(data.message);
        localStorage.setItem("tokenOtp", data.tokenOtp);
        localStorage.setItem("email", data.email);
        handleNextLogin(1);
      } else {
        toast.error(data.message);
        localStorage.setItem("access_token", data.access_token);
        handleNextLogin(2);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="w-full h-full">
        <Image src="/auth/login.jpg" width={"100%"} alt="login" />
      </div>
      <div className="w-full h-full flex flex-col">
        {stepLogin === 1 && (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              isRequired
              label="Email"
              placeholder="Masukan email kamu"
              type="email"
              endContent={
                <MdAlternateEmail className="text-default-500" size={20} />
              }
              {...register("email", {
                required: "Email harus diisi",
              })}
            />
            {errors.email && (
              <p className="text-danger text-end text-xs">
                {errors.email.message}
              </p>
            )}
            <Input
              isRequired
              label="Password"
              placeholder="Masukan password kamu"
              type={isVisible ? "text" : "password"}
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaRegEyeSlash className="text-default-500" size={20} />
                  ) : (
                    <FaRegEye className="text-default-500" size={20} />
                  )}
                </button>
              }
              {...register("password", {
                required: "Password harus diisi",
              })}
            />
            {errors.password && (
              <p className="text-danger text-end text-xs">
                {errors.password.message}
              </p>
            )}
            <p className="text-center text-small mt-3">
              Tidak punya akun?{" "}
              <LinkNext
                size="sm"
                onPress={() => setSelected("sign-up")}
                className="text-danger hover:text-red-700 cursor-pointer"
              >
                Daftar
              </LinkNext>
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                fullWidth
                color="danger"
                type="submit"
                isLoading={isPending}
              >
                Login
              </Button>
            </div>
          </form>
        )}
        {stepLogin === 2 && (
          <StepTwo handleNextLogin={handleNextLogin} handleNext={handleNext} />
        )}
        {stepLogin === 3 && (
          <StepThree navigate={navigate} onOpenChange={onOpenChange} />
        )}
      </div>
    </div>
  );
};

export default Login;
