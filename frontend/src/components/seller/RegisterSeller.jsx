import React from "react";
import CardLayout from "../user/CardLayout";
import { Button, Input } from "@nextui-org/react";
import UploadProfile from "../UploadProfile";

const RegisterSeller = () => {
  return (
    <div>
      <CardLayout>
        <div className="p-2">
          <div className="flex justify-between gap-x-5 mb-5">
            <Input
              isRequired
              label="Nama Toko"
              placeholder="Masukan nama toko"
              labelPlacement="outside"
            />
            <Input
              labelPlacement="outside"
              isRequired
              label="Alamat Toko"
              placeholder="Masukan alamat toko"
            />
          </div>
          <div className="flex justify-between gap-x-5 mb-5">
            <Input
              labelPlacement="outside"
              isRequired
              label="Provinsi"
              placeholder="Provinsi"
            />
            <Input
              labelPlacement="outside"
              isRequired
              label="Kota"
              placeholder="Kota"
            />
          </div>
          <div className="flex justify-between gap-x-5 mb-5">
            <Input
              labelPlacement="outside"
              isRequired
              label="Kecamatan"
              placeholder="Kecamatan"
            />
            <Input
              labelPlacement="outside"
              isRequired
              label="Kelurahan"
              placeholder="Kelurahan"
            />
          </div>
          <div className="flex justify-between gap-x-5 mb-5">
            <Input
              labelPlacement="outside"
              isRequired
              label="RT"
              placeholder="RT"
            />
            <Input
              labelPlacement="outside"
              isRequired
              label="RW"
              placeholder="RW"
            />
            <Input
              labelPlacement="outside"
              isRequired
              label="Kode Pos"
              placeholder="Kode Pos"
            />
          </div>
          <p className="text-sm mb-1">
            Upload Foto Toko<span className="text-danger ml-1">*</span>
          </p>
          <UploadProfile />
          <div className="flex justify-end mt-5">
            <Button variant="solid" color="danger" fullWidth className="w-1/6">
              Simpan
            </Button>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default RegisterSeller;
