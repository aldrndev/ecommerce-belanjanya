import React, { useState } from "react";
import CardLayout from "./CardLayout";
import { Button, Input } from "@nextui-org/react";
import { MdAlternateEmail } from "react-icons/md";
import OtpPage from "../OtpPage";

const ChangeEmail = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  return (
    <CardLayout>
      <div className="w-1/2 mx-auto flex flex-col gap-y-3 p-2">
        {!isConfirm && (
          <>
            <Input
              isRequired
              label="Email Lama"
              placeholder="Masukan email lama kamu"
              type="email"
              endContent={
                <MdAlternateEmail className="text-default-500" size={20} />
              }
            />
            <Input
              isRequired
              label="Email Baru"
              placeholder="Masukan email baru kamu"
              type="email"
              endContent={
                <MdAlternateEmail className="text-default-500" size={20} />
              }
            />
            <div className="flex justify-center items-center mt-3">
              <Button
                variant="solid"
                color="danger"
                onClick={() => setIsConfirm(true)}
              >
                Simpan
              </Button>
            </div>
          </>
        )}

        {isConfirm && (
          <>
            <div className="flex justify-center items-center">
              <OtpPage />
            </div>
            <div className="flex gap-2 justify-end mt-5">
              <Button fullWidth color="danger" className="w-1/2 mx-auto">
                Verifikasi
              </Button>
            </div>
          </>
        )}
      </div>
    </CardLayout>
  );
};

export default ChangeEmail;
