import {
  Button,
  Checkbox,
  Divider,
  Image,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CheckboxGroup,
} from "@nextui-org/react";
import {
  EditOutlined,
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import CustomInputNumber from "../../CustomInputNumber";
import { CiDiscount1 } from "react-icons/ci";
import { Empty } from "antd";
import {
  addCheckout,
  addWishlist,
  bulkRemoveCart,
  fetchCart,
  fetchWishlist,
  removeCart,
  removeWishlist,
  updateCart,
} from "../../../../api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatRupiah } from "../../../../utils/formatCurrency";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [allSelected, setAllSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState([]);
  const [selectedCart, setSelectedCart] = useState([]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      const allProductIds = data.flatMap((item) =>
        item.products.map((product) => product.ProductId)
      );
      const allSellerNames = data.map((item) => item.sellerName);
      const allCart = data.flatMap((item) =>
        item.products.map((product) => product.id)
      );
      setSelectedItem(allProductIds);
      setSelectedSeller(allSellerNames);
      setSelectedCart(allCart);
      setAllSelected(true);
    } else {
      setSelectedItem([]);
      setSelectedSeller([]);
      setSelectedCart([]);
      setAllSelected(false);
    }
  };

  const totalPrice = selectedItem.reduce((acc, itemId) => {
    const item = data
      ?.flatMap((group) => group.products)
      .find((product) => product.ProductId === itemId);
    return (
      acc +
      (item
        ? item.Product.discount
          ? item.quantity * (item.Product.price - item.Product.discount)
          : item.quantity * item.Product.price
        : 0)
    );
  }, 0);

  useEffect(() => {
    if (data) {
      const allProductIds = data.flatMap((item) =>
        item.products.map((product) => product.ProductId)
      );

      const allSellerNames = data.map((item) => item.sellerName);

      const allItemsSelected =
        selectedItem.length === allProductIds.length &&
        selectedSeller.length === allSellerNames.length;

      setAllSelected(allItemsSelected);
    }
  }, [selectedItem, selectedSeller, data]);

  const { mutate: mutateBulkRemoveCart, isPending: pendingBulkRemoveCart } =
    useMutation({
      mutationFn: bulkRemoveCart,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        setSelectedItem([]);
        setSelectedSeller([]);
        setSelectedCart([]);
        setAllSelected(false);
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const bulkRemoveCartHandler = (cartId) => {
    mutateBulkRemoveCart(cartId);
  };

  const { mutate: mutateAddCheckout, isPending: pendingMutateAddCheckout } =
    useMutation({
      mutationFn: addCheckout,
      onSuccess: (data) => {
        toast.success(data.message);
        navigate("/shipment");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleAddCheckout = (cartId) => {
    mutateAddCheckout(cartId);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Keranjang</h1>
      </div>
      {data?.length === 0 ? (
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <Empty />
          <p>Keranjang kamu masih kosong</p>
        </div>
      ) : (
        <div className="flex justify-between gap-x-5 mt-3">
          <div className="w-full">
            <div className="flex justify-between p-5 shadow-small rounded-xl">
              <div>
                <Checkbox
                  isSelected={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                >
                  <p className="ml-1">Pilih Semua ({selectedItem.length})</p>
                </Checkbox>
              </div>
              {selectedItem.length > 0 && (
                <div
                  className="text-danger hover:text-red-700 cursor-pointer"
                  onClick={() => {
                    bulkRemoveCartHandler(selectedCart);
                  }}
                >
                  Hapus Keranjang
                </div>
              )}
            </div>
            {data?.map((item, index) => (
              <div className="p-5 shadow-small mt-3 rounded-xl" key={index}>
                <CartList
                  seller={item?.sellerName}
                  data={item.products}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectedSeller={selectedSeller}
                  setSelectedSeller={setSelectedSeller}
                  selectedCart={selectedCart}
                  setSelectedCart={setSelectedCart}
                />
              </div>
            ))}
          </div>
          <div className="shadow-small rounded-xl p-5 w-1/3 h-full sticky top-40">
            <h1 className="text-lg font-semibold">Ringkasan Belanja</h1>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-500">Total</p>
              <p className="font-semibold">{formatRupiah(totalPrice)}</p>
            </div>
            <Divider className="my-4" />
            <div>
              <PromoModal />
            </div>
            <Divider className="my-4" />
            <div>
              <Button
                color="danger"
                fullWidth
                onClick={() => handleAddCheckout(selectedCart)}
              >
                Beli
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;

const CartList = ({
  seller,
  data,
  selectedItem,
  setSelectedItem,
  selectedSeller,
  setSelectedSeller,
  setSelectedCart,
}) => {
  const [isOpen, setIsOpen] = useState(null);
  const [quantities, setQuantities] = useState(
    data?.map((item) => item.quantity)
  );
  const [notes, setNotes] = useState(data?.map((item) => item.note));
  const [productId, setProductId] = useState(null);

  const { handleSubmit, setValue: setValueForm, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleQuantityChange = (index, newQuantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
    setValueForm("quantity", newQuantity);
  };

  const handleInputChange = (index, value) => {
    if (value === "") {
      handleQuantityChange(index, "");
    } else if (value > 0) {
      handleQuantityChange(index, +value);
    }
  };

  const handleBlur = (index) => {
    if (quantities[index] === "" || quantities[index] <= 0) {
      handleQuantityChange(index, 1);
    }
  };

  const handleNoteChange = (index, newNote) => {
    const newNotes = [...notes];
    newNotes[index] = newNote;
    setNotes(newNotes);
    setValueForm("note", newNote);
  };

  const onSubmit = (data) => {
    mutate({
      ...data,
      productId,
    });
    setIsOpen(null);
  };

  const handleSellerCheck = (checked) => {
    const sellerProductIds = data?.map((item) => item.ProductId);
    const cartId = data?.map((item) => item.id);

    if (checked) {
      setSelectedItem((prev) => {
        const newSelectedItem = prev.filter(
          (id) => !sellerProductIds.includes(id)
        );
        return [...newSelectedItem, ...sellerProductIds];
      });
      if (!selectedSeller.includes(seller)) {
        setSelectedSeller((prev) => [...prev, seller]);
      }
      setSelectedCart((prev) => {
        const newSelectedCart = prev.filter((id) => !cartId.includes(id));
        return [...newSelectedCart, ...cartId];
      });
    } else {
      setSelectedItem((prev) =>
        prev.filter((id) => !sellerProductIds.includes(id))
      );
      setSelectedSeller((prev) => prev.filter((sel) => sel !== seller));
      setSelectedCart((prev) => prev.filter((id) => !cartId.includes(id)));
    }
  };

  useEffect(() => {
    if (productId !== null) {
      const index = data?.findIndex((item) => item.ProductId === productId);

      if (index !== -1) {
        mutate({
          productId,
          quantity: quantities[index] || 1,
        });
      }
    }
  }, [quantities, productId]);

  useEffect(() => {
    const sellerProductIds = data.map((item) => item.ProductId);

    if (sellerProductIds.every((id) => selectedItem.includes(id))) {
      if (!selectedSeller.includes(seller)) {
        setSelectedSeller((prev) => [...prev, seller]);
      }
    } else {
      if (selectedSeller.includes(seller)) {
        setSelectedSeller((prev) => prev.filter((sel) => sel !== seller));
      }
    }
  }, [selectedItem, data]);

  const { mutate: mutateAddWishlist, isPending: pendingAddWishlist } =
    useMutation({
      mutationFn: addWishlist,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { data: wishlistData, isPending: pendingGetWishlist } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });

  const handleWishlist = (id) => {
    mutateAddWishlist(id);
  };

  const { mutate: removeWishlistMutate, isPending: pendingRemoveWishlist } =
    useMutation({
      mutationFn: removeWishlist,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleRemoveWishlist = (id) => {
    removeWishlistMutate(id);
  };

  const { mutate: mutateRemoveCart, isPending: pendingRemoveCart } =
    useMutation({
      mutationFn: removeCart,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleRemoveCart = (id) => {
    mutateRemoveCart(id);
  };

  const handleCheckBox = (productIds) => {
    setSelectedItem((prevSelectedItems) => {
      const unCheckedIds = prevSelectedItems.filter(
        (id) => !productIds.includes(id)
      );
      const newCheckedIds = productIds.filter(
        (id) => !prevSelectedItems.includes(id)
      );

      const cartItemsToRemove = data.filter((item) =>
        unCheckedIds.includes(item.ProductId)
      );
      const cartItemsToAdd = data.filter((item) =>
        newCheckedIds.includes(item.ProductId)
      );

      const cartIdsToRemove = cartItemsToRemove.map((item) => item.id);
      const cartIdsToAdd = cartItemsToAdd.map((item) => item.id);

      setSelectedCart((prevSelectedCarts) => {
        const newSelectedCart = prevSelectedCarts.filter(
          (id) => !cartIdsToRemove.includes(id)
        );
        return [...newSelectedCart, ...cartIdsToAdd];
      });

      return productIds;
    });
  };

  return (
    <div>
      <div className="capitalize">
        <div className="flex justify-between items-center">
          <div className="flex w-full">
            <Checkbox
              isSelected={data
                ?.map((item) => item.ProductId)
                .every((id) => selectedItem.includes(id))}
              onChange={(e) => handleSellerCheck(e.target.checked)}
            >
              <div className="flex gap-x-2 items-center ml-1">
                <MdVerified className="text-danger" size={20} />
                <p className="font-semibold">{seller}</p>
              </div>
            </Checkbox>
          </div>
          <div className="flex justify-end w-1/5">
            <p>Total {data?.length} Produk</p>
          </div>
        </div>
      </div>

      <CheckboxGroup value={selectedItem} onValueChange={handleCheckBox}>
        {data?.map((item, index) => (
          <div className="mt-3" key={index}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Divider className="mb-4" />
              <div className="flex justify-between items-center gap-x-2">
                <div className="flex w-full">
                  <Checkbox value={item?.ProductId}>
                    <div className="flex gap-x-3 items-center">
                      <div className="w-20 h-20 flex justify-center items-center">
                        <Image
                          src={`http://localhost:3000/${
                            item?.Product?.Images?.at(0)?.image
                          }`}
                          width={80}
                          height={80}
                          className="object-contain"
                          alt={item?.Product?.title}
                        />
                      </div>
                      <div className="flex flex-col gap-y-1 flex-1">
                        <p className="text-warning text-xs">
                          Sisa {item?.Product?.stock}
                        </p>
                        <p>{item?.Product?.title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Catatan: {item.note || "Tidak ada catatan"}
                        </p>
                      </div>
                    </div>
                  </Checkbox>
                </div>
                <div className="flex flex-col gap-y-1 justify-end items-end ">
                  <div className="font-semibold">
                    {formatRupiah(
                      item?.Product?.discount
                        ? item?.quantity *
                            (item?.Product?.price - item?.Product?.discount)
                        : item?.quantity * item?.Product?.price
                    )}
                  </div>
                  {item.Product.discount !== 0 && (
                    <div className="line-through text-gray-400">
                      {formatRupiah(item?.Product?.price)}
                    </div>
                  )}

                  <div className="flex items-center gap-x-3">
                    <Popover
                      placement="bottom"
                      isOpen={isOpen === index}
                      onOpenChange={(open) => {
                        setIsOpen(open ? index : null);
                        setProductId(item?.ProductId);
                      }}
                    >
                      <PopoverTrigger>
                        <Button isIconOnly size="md" variant="light">
                          <EditOutlined className="text-xl text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="p-2 w-[300px]">
                          <Input
                            placeholder="Masukan catatan"
                            label="Catatan"
                            value={notes[index]}
                            onChange={(e) =>
                              handleNoteChange(index, e.target.value)
                            }
                          />
                          <div className="mt-3 flex gap-x-3">
                            <Button size="sm" onClick={() => setIsOpen(null)}>
                              Batal
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              type="submit"
                              onClick={handleSubmit(onSubmit)}
                            >
                              Simpan
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div
                      className="flex justify-end cursor-pointer"
                      onClick={
                        wishlistData?.find(
                          (wishlist) => wishlist.ProductId === item.ProductId
                        )
                          ? () => handleRemoveWishlist(item.ProductId)
                          : () => handleWishlist(item.ProductId)
                      }
                    >
                      {wishlistData?.find(
                        (wishlist) => wishlist.ProductId === item.ProductId
                      ) ? (
                        <HeartFilled className="text-danger text-xl" />
                      ) : (
                        <HeartOutlined className="text-xl" />
                      )}
                    </div>
                    <DeleteOutlined
                      className="text-xl text-gray-500 cursor-pointer"
                      onClick={() => handleRemoveCart(item.id)}
                    />
                    <CustomInputNumber
                      width={"w-16"}
                      value={quantities[index]}
                      onChange={(e) => {
                        handleInputChange(index, e.target.value);
                        setProductId(item?.ProductId);
                      }}
                      handleBlur={() => handleBlur(index)}
                      startContent={
                        <button
                          type="button"
                          disabled={quantities[index] === 1}
                          onClick={(e) => {
                            e.preventDefault();
                            const newQuantity =
                              quantities[index] > 1 ? quantities[index] - 1 : 1;
                            handleQuantityChange(index, newQuantity);
                            setProductId(item?.ProductId);
                          }}
                        >
                          -
                        </button>
                      }
                      endContent={
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            const newQuantity = quantities[index] + 1;
                            handleQuantityChange(index, newQuantity);
                            setProductId(item?.ProductId);
                          }}
                        >
                          +
                        </button>
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        ))}
      </CheckboxGroup>
    </div>
  );
};

const PromoModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        fullWidth
        variant="flat"
        color="success"
        size="lg"
      >
        <CiDiscount1 size={28} />
        Makin hemat pakai promo <RightOutlined />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pakai Promo
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    placeholder="Masukan kode promo"
                    isClearable
                    size="lg"
                  />
                </div>
                <div>
                  <Empty>Kamu belum memiliki kupon</Empty>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Pakai Promo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
