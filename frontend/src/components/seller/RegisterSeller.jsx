import React, { createContext, useContext, useState } from "react";
import CardLayout from "../user/CardLayout";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import UploadProfile from "../UploadProfile";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  indonesiaCity,
  indonesiaDistrict,
  indonesiaProvince,
  indonesiasubDistrict,
  registerSeller,
} from "../../../api/auth";
import toast from "react-hot-toast";

const RegisterSeller = () => {
  const navigate = useNavigate();
  const { setIsSeller } = useSeller();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: registerSeller,
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.removeItem("isSeller");
      localStorage.removeItem("seller");
      setIsSeller(data.isSeller); // update context
      localStorage.setItem("isSeller", data.isSeller);
      localStorage.setItem("seller", JSON.stringify(data.data));
      navigate("/seller/add-product");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const { data: province } = useQuery({
    queryKey: ["province"],
    queryFn: indonesiaProvince,
  });

  const { data: cityData, refetch: refetchCity } = useQuery({
    queryKey: ["city", selectedProvince],
    queryFn: () => indonesiaCity(selectedProvince),
    enabled: !!selectedProvince,
  });

  const { data: districtData, refetch: refetchDistrict } = useQuery({
    queryKey: ["district", selectedCity],
    queryFn: () => indonesiaDistrict(selectedCity),
    enabled: !!selectedCity,
  });

  const { data: subDistrictData, refetch: refetchSubDistrict } = useQuery({
    queryKey: ["subDistrict", selectedDistrict],
    queryFn: () => indonesiasubDistrict(selectedDistrict),
    enabled: !!selectedDistrict,
  });

  const handleProvince = (value) => {
    const selected = province?.find((province) => province.id === value);
    setSelectedProvince(selected?.id);
    setValue("province", selected?.name);
    if (selectedProvince) refetchCity();
  };

  const handleCity = (value) => {
    const selected = cityData?.find((city) => city.id === value);
    setSelectedCity(selected?.id);
    setValue("city", selected?.name);
    if (selectedCity) refetchDistrict();
  };

  const handleDistrict = (value) => {
    const selected = districtData?.find((district) => district.id === value);
    setSelectedDistrict(selected?.id);
    setValue("district", selected?.name);
    if (selectedDistrict) refetchSubDistrict();
  };

  const handleSubDistrict = (value) => {
    const selected = subDistrictData?.find(
      (subDistrict) => subDistrict.id === value
    );
    setValue("subDistrict", selected?.name);
  };

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div>
      <CardLayout>
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-2">
            <div className="flex justify-between gap-x-5 mb-5">
              <Input
                isRequired
                label="Nama Toko"
                placeholder="Masukan nama toko"
                labelPlacement="outside"
                {...register("name", { required: "Nama toko harus diisi" })}
              />
              <Input
                labelPlacement="outside"
                isRequired
                label="Alamat Toko"
                placeholder="Masukan alamat toko"
                {...register("address", {
                  required: "Alamat toko harus diisi",
                })}
              />
            </div>
            <div className="flex justify-between gap-x-5 mb-5">
              <Autocomplete
                label="Provinsi"
                labelPlacement="outside"
                placeholder="Provinsi"
                onSelectionChange={handleProvince}
              >
                {province?.map((item) => (
                  <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
                ))}
              </Autocomplete>
              <Autocomplete
                label="Kota"
                labelPlacement="outside"
                placeholder="Kota"
                onSelectionChange={handleCity}
              >
                {cityData?.map((item) => (
                  <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
            <div className="flex justify-between gap-x-5 mb-5">
              <Autocomplete
                label="Kecamatan"
                labelPlacement="outside"
                placeholder="Kecamatan"
                onSelectionChange={handleDistrict}
              >
                {districtData?.map((item) => (
                  <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
                ))}
              </Autocomplete>
              <Autocomplete
                label="Kelurahan"
                labelPlacement="outside"
                placeholder="Kelurahan"
                onSelectionChange={handleSubDistrict}
              >
                {subDistrictData?.map((item) => (
                  <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
            <div className="flex justify-between gap-x-5 mb-5">
              <Input
                labelPlacement="outside"
                isRequired
                label="RT"
                placeholder="RT"
                className="w-1/2"
                {...register("rt", {
                  required: "RT harus diisi",
                  maxLength: {
                    value: 3,
                    message: "RT maximal 3 digit",
                  },
                })}
              />
              <Input
                labelPlacement="outside"
                isRequired
                label="RW"
                placeholder="RW"
                className="w-1/2"
                {...register("rw", {
                  required: "RW harus diisi",
                  maxLength: {
                    value: 3,
                    message: "RT maximal 3 digit",
                  },
                })}
              />
              <Input
                labelPlacement="outside"
                isRequired
                label="Kode Pos"
                placeholder="Kode Pos"
                className="w-1/2"
                {...register("postalCode", {
                  required: "Kode pos harus diisi",
                  maxLength: {
                    value: 10,
                    message: "Kode pos maximal 10 digit",
                  },
                })}
              />
              <div className="w-full">
                <p className="text-sm mb-2">
                  Upload Foto Toko<span className="text-danger ml-1">*</span>
                </p>
                <UploadProfile setValue={setValue} />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <Button
                variant="solid"
                color="danger"
                fullWidth
                className="w-1/6"
                isLoading={isPending}
                type="submit"
              >
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </CardLayout>
    </div>
  );
};

export default RegisterSeller;

const SellerContext = createContext();
export const SellerProvider = ({ children }) => {
  const [isSeller, setIsSeller] = useState(
    localStorage.getItem("isSeller") === "true"
  );

  return (
    <SellerContext.Provider value={{ isSeller, setIsSeller }}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => useContext(SellerContext);
