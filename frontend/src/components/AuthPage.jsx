import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Tabs,
  Tab,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";

const AuthPage = ({ iconAuth, iconName }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [stepLogin, setStepLogin] = useState(1);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleNextLogin = (value) => {
    setStepLogin(stepLogin + value);
  };

  return (
    <>
      {iconAuth ? (
        <Button
          onPress={onOpen}
          isIconOnly
          // color="danger"
          variant="light"
          radius="full"
          size="lg"
        >
          {iconName}
        </Button>
      ) : (
        <Button
          onPress={onOpen}
          color="danger"
          variant="bordered"
          radius="full"
          size="lg"
        >
          Login / Daftar
        </Button>
      )}
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
                  <Login
                    onOpenChange={onOpenChange}
                    isVisible={isVisible}
                    toggleVisibility={toggleVisibility}
                    stepLogin={stepLogin}
                    handleNextLogin={handleNextLogin}
                    setSelected={setSelected}
                    handleNext={handleNext}
                  />
                </Tab>
                <Tab key="sign-up" title="Daftar">
                  <Register
                    onOpenChange={onOpenChange}
                    isVisible={isVisible}
                    toggleVisibility={toggleVisibility}
                    step={step}
                    handleNext={handleNext}
                    setSelected={setSelected}
                    handleNextLogin={handleNextLogin}
                  />
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
