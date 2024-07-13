import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Tabs,
  Tab,
  Input,
  Button,
  Image,
} from "@nextui-org/react";
import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaLocationArrow,
  FaLock,
} from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import UploadProfile from "./UploadProfile";
import OtpPage from "./OtpPage";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        variant="bordered"
        radius="full"
        size="lg"
      >
        Login / Daftar
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="4xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          <ModalBody>
            <div className="flex flex-col w-full mt-5 p-5">
              <Tabs
                size="lg"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
                variant="solid"
                className="mb-3 mx-auto max-w-lg"
                radius="full"
                fullWidth
              >
                <Tab key="login" title="Login">
                  <div className="flex justify-between gap-4 items-center">
                    <div className="w-full h-full">
                      <Image src="/auth/login.jpg" width={"100%"} alt="login" />
                    </div>
                    <div className="w-full h-full flex flex-col">
                      <form className="flex flex-col gap-4">
                        <Input
                          isRequired
                          label="Email"
                          placeholder="Masukan email kamu"
                          type="email"
                          endContent={
                            <MdAlternateEmail
                              className="text-default-500"
                              size={20}
                            />
                          }
                        />
                        <Input
                          isRequired
                          label="Password"
                          placeholder="Masukan password kamu"
                          type={isVisible ? "text" : "password"}
                          endContent={
                            <button type="button" onClick={toggleVisibility}>
                              {isVisible ? (
                                <FaRegEyeSlash
                                  className="text-default-500"
                                  size={20}
                                />
                              ) : (
                                <FaRegEye
                                  className="text-default-500"
                                  size={20}
                                />
                              )}
                            </button>
                          }
                        />

                        <p className="text-center text-small mt-3">
                          Tidak punya akun?{" "}
                          <Link
                            size="sm"
                            onPress={() => setSelected("sign-up")}
                            className="text-danger hover:text-red-700"
                          >
                            Daftar
                          </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                          <Button
                            fullWidth
                            color="danger"
                            className="w-1/2 mx-auto"
                          >
                            Login
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Tab>
                <Tab key="sign-up" title="Daftar">
                  <div className="flex justify-between gap-4 items-center">
                    <div className="w-full h-full">
                      <Image
                        src="/auth/register.jpg"
                        width={"100%"}
                        alt="register"
                      />
                    </div>
                    <div className="w-full h-full">
                      <form className="flex flex-col gap-4">
                        {step === 1 && (
                          <>
                            <Input
                              isRequired
                              label="Email"
                              placeholder="Masukan email kamu"
                              type="email"
                              endContent={
                                <MdAlternateEmail
                                  className="text-default-500"
                                  size={20}
                                />
                              }
                            />
                            <Input
                              isRequired
                              label="Password"
                              placeholder="Masukan password kamu"
                              type={isVisible ? "text" : "password"}
                              endContent={
                                <button
                                  type="button"
                                  onClick={toggleVisibility}
                                >
                                  {isVisible ? (
                                    <FaRegEyeSlash
                                      className="text-default-500"
                                      size={20}
                                    />
                                  ) : (
                                    <FaRegEye
                                      className="text-default-500"
                                      size={20}
                                    />
                                  )}
                                </button>
                              }
                            />
                            <Input
                              isRequired
                              label="Konfirmasi Password"
                              placeholder="Konfirmasi password kamu"
                              type="password"
                              endContent={
                                <FaLock
                                  size={20}
                                  className="text-default-500"
                                />
                              }
                            />

                            <Button
                              onClick={handleNext}
                              className="mt-5 w-1/2 mx-auto"
                              color="danger"
                            >
                              Daftar
                            </Button>
                            <p className="text-center text-small">
                              Sudah punya akun?{" "}
                              <Link
                                size="sm"
                                onPress={() => setSelected("login")}
                                className="text-danger hover:text-red-700"
                              >
                                Login
                              </Link>
                            </p>
                          </>
                        )}
                        {step === 3 && (
                          <>
                            <div className="flex items-center justify-center">
                              <UploadProfile />
                            </div>
                            <Input
                              isRequired
                              label="Name"
                              placeholder="Masukan nama kamu"
                              type="text"
                              endContent={
                                <IoMdPerson
                                  className="text-default-500"
                                  size={20}
                                />
                              }
                            />
                            <Input
                              isRequired
                              label="No Handphone"
                              type="tel"
                              placeholder="Masukan no handphone kamu"
                              endContent={
                                <BsFillTelephoneFill
                                  className="text-default-500"
                                  size={20}
                                />
                              }
                            />
                            <Input
                              isRequired
                              label="Alamat"
                              placeholder="Masukan alamat kamu"
                              type="text"
                              endContent={
                                <FaLocationArrow
                                  className="text-default-500"
                                  size={20}
                                />
                              }
                            />
                            <Button
                              fullWidth
                              color="danger"
                              className="w-1/2 mx-auto mt-5"
                            >
                              Simpan
                            </Button>
                          </>
                        )}
                        {step === 2 && (
                          <>
                            <div className="flex justify-center items-center">
                              <OtpPage />
                            </div>
                            <div className="flex gap-2 justify-end mt-5">
                              <Button
                                fullWidth
                                color="danger"
                                className="w-1/2 mx-auto"
                                onClick={handleNext}
                              >
                                Verifikasi
                              </Button>
                            </div>
                          </>
                        )}
                      </form>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthPage;
