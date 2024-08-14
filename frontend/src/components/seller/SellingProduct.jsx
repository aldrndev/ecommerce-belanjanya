import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CardLayout from "../user/CardLayout";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Form, TreeSelect, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  fetchCategory,
  fetchChildrenSubCategory,
  fetchSubCategory,
} from "../../../api/seller";
import toast from "react-hot-toast";

const SellingProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const treeSelectRef = useRef(null);
  const uploadRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success(data.message);
      // treeSelectRef.current.resetTreeSelect();
      // uploadRef.current.resetUpload();
      // reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        data[key].forEach((file) => formData.append("image", file));
      } else {
        formData.append(key, data[key]);
      }
    }
    mutate(formData);
  };

  const handleSelectionChange = (e) => {
    setValue("condition", e.target.value);
  };

  const handleKeyDown = (e) => {
    if (["e", "E", "-", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <CardLayout>
      <h1 className="text-xl font-semibold text-center mb-8">
        Tambahkan Product Baru
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="p-2">
          <div className="flex justify-between gap-x-3 mb-5">
            <Input
              isRequired
              label="Judul Produk"
              placeholder="Masukan judul produk"
              labelPlacement="outside"
              {...register("title", { required: "Judul harus diisi" })}
            />
            <Input
              isRequired
              label="Harga Produk"
              placeholder="Masukan harga produk"
              startContent={
                <div className="w-8 flex justify-center items-center text-center text-sm font-semibold">
                  Rp
                </div>
              }
              labelPlacement="outside"
              type="number"
              onKeyDown={handleKeyDown}
              {...register("price", { required: "Harga harus diisi" })}
            />
          </div>
          <div className="flex justify-between gap-x-3 mb-5">
            <div className="w-full">
              <Input
                isRequired
                label="Merek Produk"
                placeholder="Masukan merek produk"
                labelPlacement="outside"
                {...register("brand", { required: "Merek harus diisi" })}
              />
            </div>
            <div className="w-full">
              <SelectCategory setValue={setValue} ref={treeSelectRef} />
            </div>
          </div>
          <div className="flex justify-between gap-x-3 mb-5">
            <Select
              isRequired
              label="Kondisi Barang"
              placeholder="Pilih kondisi barang"
              labelPlacement="outside"
              onChange={handleSelectionChange}
            >
              <SelectItem key={"baru"}>Baru</SelectItem>
              <SelectItem key={"bekas"}>Bekas</SelectItem>
            </Select>
            <Input
              isRequired
              label="Stok Produk"
              placeholder="Masukan stok produk"
              labelPlacement="outside"
              type="number"
              onKeyDown={handleKeyDown}
              {...register("stock", { required: true })}
            />
            <Input
              isRequired
              label="Berat Produk"
              placeholder="Masukan berat produk"
              labelPlacement="outside"
              type="number"
              onKeyDown={handleKeyDown}
              endContent={
                <div className="w-8 flex justify-center items-center text-center text-sm font-semibold">
                  Gram
                </div>
              }
              {...register("weight", { required: true })}
            />
          </div>
          <div className="mb-5">
            <Textarea
              isRequired
              label="Deskripsi Produk"
              placeholder="Masukan deskripsi produk"
              className="w-full"
              labelPlacement="outside"
              {...register("description", { required: true })}
            />
          </div>
          <UploadPhoto setValue={setValue} ref={uploadRef} />
          <div className="flex justify-end ">
            <Button
              type="submit"
              variant="solid"
              color="danger"
              fullWidth
              className="w-1/6"
              isLoading={isPending}
            >
              Simpan
            </Button>
          </div>
        </div>
      </form>
    </CardLayout>
  );
};

export default SellingProduct;

const SelectCategory = forwardRef(({ setValue }, ref) => {
  const [treeData, setTreeData] = useState([]);
  const [value, setValueState] = useState(undefined);

  useImperativeHandle(ref, () => ({
    resetTreeSelect() {
      setValueState(undefined);
      setValue("ChildrenSubCategoryId", undefined);
    },
  }));

  const onChange = (newValue) => {
    setValue("ChildrenSubCategoryId", newValue);
    setValueState(newValue);
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
        <p className="text-sm">
          Kategori Produk<span className="text-danger ml-1">*</span>
        </p>

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
        />
      </div>
    </>
  );
});

const UploadPhoto = forwardRef(({ setValue }, ref) => {
  const [fileList, setFileList] = useState([]);

  useImperativeHandle(ref, () => ({
    resetUpload() {
      setFileList([]);
      setValue("image", []);
    },
  }));

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const files = newFileList.map((file) => file.originFileObj);
    setValue("image", files);
  };

  const beforeUpload = (file) => {
    const isImage =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isImage) {
      message.error("Hanya boleh gambar JPG/PNG!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Gambar harus lebih kecil dari 2MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };
  return (
    <>
      <div className="flex flex-col gap-y-1">
        <p className="text-sm">
          Upload Foto Produk<span className="text-danger ml-1">*</span>
        </p>

        <Upload
          action={null}
          showUploadList={{
            showRemoveIcon: true,
            showPreviewIcon: false,
          }}
          listType="picture-card"
          fileList={fileList}
          onChange={handleUpload}
          beforeUpload={beforeUpload}
          maxCount={9}
          multiple
        >
          {fileList.length < 9 && (
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
          )}
        </Upload>

        <p className="text-xs text-gray-400 mt-2">Maksimal 9 Foto Produk</p>
      </div>
    </>
  );
});
