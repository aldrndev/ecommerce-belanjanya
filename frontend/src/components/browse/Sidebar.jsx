import React, { useState } from "react";
import { TreeSelect } from "antd";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
const { SHOW_PARENT } = TreeSelect;

const Sidebar = () => {
  const treeData = [
    {
      title: "Elektronik & Komputer",
      value: "0-0",
      key: "0-0",
      children: [
        {
          title: "Laptop",
          value: "0-0-0",
          key: "0-0-0",
        },
        {
          title: "Komputer",
          value: "0-0-1",
          key: "0-0-1",
        },
      ],
    },
    {
      title: "Node2",
      value: "0-1",
      key: "0-1",
      children: [
        {
          title: "Child Node3",
          value: "0-1-0",
          key: "0-1-0",
        },
        {
          title: "Child Node4",
          value: "0-1-1",
          key: "0-1-1",
        },
        {
          title: "Child Node5",
          value: "0-1-2",
          key: "0-1-2",
        },
      ],
    },
  ];

  const [value, setValue] = useState(["0-0-0"]);
  const onChange = (newValue) => {
    console.log("onChange ", newValue);
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Pilih Kategori",
    style: {
      width: "100%",
    },
    size: "large",
  };
  return (
    <>
      <div className="w-full p-4">
        <div>
          <h1 className="font-semibold mb-3">Filter Produk</h1>
        </div>
        <TreeSelect {...tProps} />
        <div>
          <h1 className="font-semibold mb-3 mt-10">Harga</h1>
          <div className="flex justify-between gap-3 items-center">
            <Input type="number" placeholder="Min" startContent="Rp" />
            {"-"}
            <Input type="number" placeholder="Maks" startContent="Rp" />
          </div>
        </div>
        <div>
          <h1 className="font-semibold mb-3 mt-10">Lokasi</h1>
          <div className="flex justify-between gap-3 items-center">
            <Autocomplete
              placeholder="Pilih lokasimu..."
              variant="bordered"
              startContent={<CiLocationOn className="text-xl" />}
              className="max-w-xs"
              label="Kota"
              isClearable
            >
              <AutocompleteItem>Indonesia</AutocompleteItem>
            </Autocomplete>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Button type="submit" color="primary" fullWidth>
            Cari
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
