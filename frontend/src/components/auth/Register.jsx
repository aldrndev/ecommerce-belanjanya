import { Input, Button, Image, Link as LinkNext } from "@nextui-org/react";
import { MdAlternateEmail } from "react-icons/md";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaLocationArrow,
  FaLock,
} from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";

import OtpPage from "../OtpPage";
import UploadProfile from "../UploadProfile";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createProfile, registerUser, verifyUser } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

const Register = ({
  onOpenChange,
  isVisible,
  toggleVisibility,
  step,
  handleNext,
  setSelected,
  handleNextLogin,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="w-full h-full">
        <Image src="/auth/register.jpg" width={"100%"} alt="register" />
      </div>
      <div className="w-full h-full">
        {step === 1 && (
          <StepOne
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
            handleNext={handleNext}
            setSelected={setSelected}
          />
        )}
        {step === 2 && (
          <StepTwo handleNext={handleNext} handleNextLogin={handleNextLogin} />
        )}
        {step === 3 && (
          <StepThree navigate={navigate} onOpenChange={onOpenChange} />
        )}
      </div>
    </div>
  );
};

export default Register;

const StepOne = ({ isVisible, toggleVisibility, handleNext, setSelected }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isPending, mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.setItem("tokenOtp", data.tokenOtp);
      localStorage.setItem("email", data.email);
      handleNext();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Konfirmasi password tidak sesuai");
      return;
    }
    mutate(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        isRequired
        label="Email"
        placeholder="Masukan email kamu"
        type="email"
        endContent={<MdAlternateEmail className="text-default-500" size={20} />}
        {...register("email", {
          required: "Email harus diisi",
        })}
      />
      {errors.email && (
        <p className="text-danger text-end text-xs">{errors.email.message}</p>
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
      <Input
        isRequired
        label="Konfirmasi Password"
        placeholder="Konfirmasi password kamu"
        type="password"
        endContent={<FaLock size={20} className="text-default-500" />}
        {...register("confirmPassword", {
          required: "Konfirmasi password harus diisi",
        })}
      />
      {errors.confirmPassword && (
        <p className="text-danger text-end text-xs">
          {errors.confirmPassword.message}
        </p>
      )}

      <Button
        fullWidth
        className="mt-5"
        color="danger"
        type="submit"
        isLoading={isPending}
      >
        Daftar
      </Button>
      <p className="text-center text-small">
        Sudah punya akun?{" "}
        <LinkNext
          size="sm"
          onPress={() => setSelected("login")}
          className="text-danger hover:text-red-700 cursor-pointer"
        >
          Login
        </LinkNext>
      </p>
    </form>
  );
};

export const StepTwo = ({ handleNext, handleNextLogin }) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const tokenOtp = localStorage.getItem("tokenOtp");
  const email = localStorage.getItem("email");

  const { mutate, isPending } = useMutation({
    mutationFn: verifyUser,
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.removeItem("tokenOtp");
      localStorage.removeItem("email");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("isSeller", data.isSeller);
      handleNext();
      handleNextLogin(1);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, tokenOtp });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <>
        <div className="flex justify-center items-center">
          <OtpPage setValue={setValue} email={email} />
          {errors.otpUser && (
            <p className="text-danger text-end text-xs">
              {errors.otpUser.message}
            </p>
          )}
        </div>
        <div className="flex gap-2 justify-end mt-5">
          <Button fullWidth color="danger" isLoading={isPending} type="submit">
            Verifikasi
          </Button>
        </div>
      </>
    </form>
  );
};

export const StepThree = ({ navigate, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: createProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      const user = JSON.stringify(data.data);
      localStorage.setItem("user", user);
      localStorage.setItem("isLogin", "true");
      navigate("/home");
      onOpenChange(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="flex items-center justify-center">
          <UploadProfile setValue={setValue} />
          {errors.image && (
            <p className="text-danger text-end text-xs">
              {errors.image.message}
            </p>
          )}
        </div>
        <Input
          isRequired
          label="Name"
          placeholder="Masukan nama kamu"
          type="text"
          endContent={<IoMdPerson className="text-default-500" size={20} />}
          {...register("name", { required: "Nama harus diisi" })}
        />
        {errors.name && (
          <p className="text-danger text-end text-xs">{errors.name.message}</p>
        )}
        <Input
          isRequired
          label="No Handphone"
          type="tel"
          placeholder="Masukan no handphone kamu"
          endContent={
            <BsFillTelephoneFill className="text-default-500" size={20} />
          }
          {...register("phone", { required: "No Handphone harus diisi" })}
        />
        {errors.phone && (
          <p className="text-danger text-end text-xs">{errors.phone.message}</p>
        )}
        <Input
          isRequired
          label="Alamat Lengkap"
          placeholder="Masukan alamat lengkap kamu"
          type="text"
          endContent={
            <FaLocationArrow className="text-default-500" size={20} />
          }
          {...register("address", { required: "Alamat harus diisi" })}
        />
        {errors.address && (
          <p className="text-danger text-end text-xs">
            {errors.address.message}
          </p>
        )}
        <Button
          fullWidth
          color="danger"
          className=" mt-5"
          type="submit"
          isLoading={isPending}
        >
          Simpan
        </Button>
      </form>
    </>
  );
};
