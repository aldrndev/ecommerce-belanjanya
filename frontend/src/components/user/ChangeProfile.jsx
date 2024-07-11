import React from "react";
import CardLayout from "./CardLayout";
import UploadProfile from "../UploadProfile";
import { IoMdPerson } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { Button, Input } from "@nextui-org/react";

const ChangeProfile = () => {
  return (
    <CardLayout>
      <div className="w-1/2 mx-auto flex flex-col gap-y-3">
        <div className="flex justify-center items-center">
          <UploadProfile />
        </div>
        <div>
          <Input
            isRequired
            label="Name"
            placeholder="Masukan nama kamu"
            type="text"
            endContent={<IoMdPerson className="text-default-500" size={20} />}
          />
        </div>
        <div>
          <Input
            isRequired
            label="No Handphone"
            type="tel"
            placeholder="Masukan no handphone kamu"
            endContent={
              <BsFillTelephoneFill className="text-default-500" size={20} />
            }
          />
        </div>
        <div>
          <Input
            isRequired
            label="Alamat"
            placeholder="Masukan alamat kamu"
            type="text"
            endContent={
              <FaLocationArrow className="text-default-500" size={20} />
            }
          />
        </div>
        <div className="flex justify-center items-center mx-auto w-1/3 mt-3">
          <Button color="danger" className="w-3/4">
            Simpan
          </Button>
        </div>
      </div>
    </CardLayout>
  );
};

export default ChangeProfile;
