import React, { useEffect, useState } from "react";
import { TreeSelect } from "antd";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import {
  fetchCategory,
  fetchChildrenSubCategory,
  fetchSubCategory,
} from "../../../api/seller";
import { useQuery } from "@tanstack/react-query";

const Sidebar = ({
  setCategoryId,
  updateSearchParams,
  name,
  location,
  categoryParams,
  priceMin,
  priceMax,
  handleBlur,
  handleEnter,
  handleKeyDownPrice,
}) => {
  const nameHandler = (value) => {
    if (value === "") {
      updateSearchParams("name", "");
    }
  };

  const categoryHandler = (value) => {
    updateSearchParams("category", value);
  };

  const priceMinHandler = (value) => {
    if (value === "") {
      updateSearchParams("priceMin", "");
    }
  };

  const priceMaxHandler = (value) => {
    if (value === "") {
      updateSearchParams("priceMax", "");
    }
  };

  const locationHandler = (value) => {
    if (value === "") {
      updateSearchParams("location", "");
    }
  };

  return (
    <>
      <div className="w-full p-4">
        <div>
          <h1 className="font-semibold mb-3">Filter Produk Pilihanmu</h1>
        </div>
        <div className="mb-3">
          <h1 className=" mb-3 mt-5">Nama produk</h1>
          <Input
            placeholder="Nama produk"
            onValueChange={nameHandler}
            onKeyDown={(e) => handleEnter(e, "name", e.target.value)}
            onBlur={(e) => handleBlur("name", e.target.value)}
            isClearable
            defaultValue={name}
            e
          />
        </div>
        <div>
          <h1 className=" mb-3 mt-5">Kategori produk</h1>
          <SelectCategory
            categoryHandler={categoryHandler}
            setCategoryId={setCategoryId}
            categoryParams={categoryParams}
          />
        </div>
        <div>
          <h1 className=" mb-3 mt-5">Harga</h1>
          <div className="flex flex-col gap-y-3">
            <Input
              type="number"
              placeholder="Harga Minimal"
              startContent="Rp"
              isClearable
              onValueChange={priceMinHandler}
              onKeyDown={(e) =>
                handleKeyDownPrice(e, "priceMin", e.target.value)
              }
              onBlur={(e) => handleBlur("priceMin", e.target.value)}
              defaultValue={priceMin}
            />

            <Input
              type="number"
              placeholder="Harga Maksimal"
              startContent="Rp"
              isClearable
              onValueChange={priceMaxHandler}
              onKeyDown={(e) =>
                handleKeyDownPrice(e, "priceMax", e.target.value)
              }
              onBlur={(e) => handleBlur("priceMax", e.target.value)}
              defaultValue={priceMax}
            />
          </div>
        </div>
        <div>
          <h1 className=" mb-3 mt-5">Lokasi</h1>
          <div className="flex justify-between gap-3 items-center">
            <Input
              placeholder="Masukan kota kamu"
              isClearable
              startContent={<CiLocationOn />}
              onValueChange={locationHandler}
              onKeyDown={(e) => handleEnter(e, "location", e.target.value)}
              onBlur={(e) => handleBlur("location", e.target.value)}
              defaultValue={location}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

const SelectCategory = ({ categoryHandler, setCategoryId, categoryParams }) => {
  const [treeData, setTreeData] = useState([]);
  const [value, setValueState] = useState(undefined);

  const onChange = (newValue) => {
    setCategoryId(newValue);
    setValueState(newValue);
    if (newValue === undefined) {
      categoryHandler(null);
    } else {
      treeData.forEach((item) => {
        item.children.forEach((subItem) => {
          subItem.children.forEach((childrenItem) => {
            if (childrenItem.value === newValue) {
              categoryHandler(childrenItem.title.toLowerCase());
            }
          });
        });
      });
    }
  };

  const { data: categories, isPending: pendingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });

  const { data: subCategories, isPending: pendingSubCategories } = useQuery({
    queryKey: ["subCategories"],
    queryFn: fetchSubCategory,
  });

  const {
    data: childrenSubCategories,
    isPending: pendingChildrenSubCategories,
  } = useQuery({
    queryKey: ["childrenSubCategories"],
    queryFn: fetchChildrenSubCategory,
  });

  useEffect(() => {
    if (categories && subCategories && childrenSubCategories) {
      const formattedData = categories.map((category) => ({
        title: category.title,
        value: category.title,
        selectable: false,
        children: subCategories
          .filter((subCategory) => subCategory.CategoryId === category.id)
          .map((subCategory) => ({
            title: subCategory.title,
            value: subCategory.title,
            selectable: false,
            children: childrenSubCategories
              .filter(
                (childSubCategory) =>
                  childSubCategory.SubCategoryId === subCategory.id
              )
              .map((childSubCategory) => ({
                title: childSubCategory.title,
                value: childSubCategory.id,
              })),
          })),
      }));
      setTreeData(formattedData);
    }
  }, [categories, subCategories, childrenSubCategories]);

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <TreeSelect
          style={{
            width: "100%",
          }}
          dropdownStyle={{
            maxHeight: 400,
            overflow: "auto",
          }}
          treeData={treeData}
          placeholder="Pilih kategori produk"
          onChange={onChange}
          allowClear
          value={value}
          showSearch
          size="large"
          treeNodeFilterProp="title"
          treeExpandAction="click"
          defaultValue={categoryParams}
        />
      </div>
    </>
  );
};
