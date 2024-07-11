import React, { useState } from "react";
import CardLayout from "../user/CardLayout";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Form, TreeSelect, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const SellingProduct = () => {
  return (
    <CardLayout>
      <div className="p-2">
        <div className="flex justify-between gap-x-3 mb-5">
          <Input
            isRequired
            label="Judul Produk"
            placeholder="Masukan judul produk"
            labelPlacement="outside"
          />
          <Input
            isRequired
            label="Harga Produk"
            placeholder="Masukan harga produk"
            startContent={
              <div className="font-semibold w-8 flex justify-center items-center text-center">
                Rp
              </div>
            }
            labelPlacement="outside"
            type="number"
          />
        </div>
        <div className="flex justify-between gap-x-3 mb-5">
          <div className="w-full">
            <Input
              isRequired
              label="Merek Produk"
              placeholder="Masukan merek produk"
              labelPlacement="outside"
            />
          </div>
          <div className="w-full">
            <SelectCategory />
          </div>
        </div>
        <div className="flex justify-between gap-x-3 mb-5">
          <Select
            isRequired
            labelPlacement="outside"
            label="Kondisi Produk"
            placeholder="Pilih kondisi produk"
          >
            <SelectItem>test</SelectItem>
          </Select>
          <Input
            isRequired
            label="Stok Produk"
            placeholder="Masukan stok produk"
            labelPlacement="outside"
            type="number"
          />
        </div>
        <div className="mb-5">
          <Textarea
            isRequired
            label="Deskripsi Produk"
            placeholder="Masukan deskripsi produk"
            className="w-full"
            labelPlacement="outside"
          />
        </div>
        <UploadPhoto />
        <div className="flex justify-end ">
          <Button variant="solid" color="danger" fullWidth className="w-1/6">
            Simpan
          </Button>
        </div>
      </div>
    </CardLayout>
  );
};

export default SellingProduct;

const SelectCategory = () => {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const treeData = [
    {
      title: "Elektronik & Komputer",
      value: "0-0",
      children: [
        {
          title: "Handphone",
          value: "0-0-1",
        },
        {
          title: "Laptop",
          value: "0-0-2",
        },
      ],
    },
    {
      title: "Node2",
      value: "0-1",
      children: [
        {
          title: "test",
          value: "0-1-1",
        },
      ],
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-y-1">
        <p className="text-sm">
          Kategori Produk<span className="text-danger ml-1">*</span>
        </p>
        <TreeSelect
          style={{
            width: "100%",
          }}
          value={value}
          dropdownStyle={{
            maxHeight: 400,
            overflow: "auto",
          }}
          treeData={treeData}
          placeholder="Pilih kategori produk"
          treeDefaultExpandAll
          onChange={onChange}
          size="large"
        />
      </div>
    </>
  );
};

const UploadPhoto = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <div className="flex flex-col gap-y-1">
        <p className="text-sm">
          Upload Foto Produk<span className="text-danger ml-1">*</span>
        </p>
        <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
                className="text-sm"
              >
                Upload
              </div>
            </button>
          </Upload>
          <p className="text-xs text-gray-400 mt-2">Maksimal 8 Foto Produk</p>
        </Form.Item>
      </div>
    </>
  );
};
