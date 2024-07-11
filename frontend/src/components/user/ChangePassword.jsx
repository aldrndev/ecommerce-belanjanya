import React, { useState } from "react";
import CardLayout from "./CardLayout";
import { Button, Input } from "@nextui-org/react";
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <CardLayout>
      <div className="w-1/2 mx-auto flex gap-y-3 flex-col p-2">
        <Input
          isRequired
          label="Password Lama"
          placeholder="Masukan password lama kamu"
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
        />
        <Input
          isRequired
          label="Password Baru"
          placeholder="Masukan password baru kamu"
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
        />
        <Input
          isRequired
          label="Konfirmasi Password"
          placeholder="Konfirmasi password kamu"
          type="password"
          endContent={<FaLock size={20} className="text-default-500" />}
        />

        <Button className="mt-5 w-1/2 mx-auto" color="danger">
          Simpan
        </Button>
      </div>
    </CardLayout>
  );
};

export default ChangePassword;
