import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Steps } from "antd";
import React from "react";
import { formatDateOrder } from "../../../../utils/formatDate";

const TrackingOrder = ({ currentStep, data }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex flex-col gap-2">
      <Button variant="bordered" color="danger" onClick={onOpen}>
        Lacak
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="2xl"
        className="p-2"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Lacak Pengiriman
          </ModalHeader>
          <ModalBody>
            <Steps
              progressDot
              current={currentStep}
              direction="vertical"
              size="small"
            >
              {currentStep === 5 && (
                <Steps.Step
                  title="Transaksi selesai"
                  status={currentStep !== 5 ? "wait" : "process"}
                  subTitle={
                    <>
                      <div className="text-xs mb-2">
                        {formatDateOrder(new Date(data?.completedAt))} WIB
                      </div>
                    </>
                  }
                  description="Pemesanan selesai, Dana akan diteruskan ke penjual"
                />
              )}
              {(currentStep === 4 || currentStep === 5) && (
                <Steps.Step
                  title="Pesanan telah tiba di tujuan"
                  status={currentStep !== 4 ? "wait" : "process"}
                  subTitle={
                    <>
                      <div className="text-xs mb-2">
                        {formatDateOrder(new Date(data?.deliveredAt))} WIB
                      </div>
                    </>
                  }
                  description="Received by Aldrin Mursidi"
                />
              )}
              {(currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5) && (
                <Steps.Step
                  title="Pesanan telah dikirim"
                  status={currentStep !== 3 ? "wait" : "process"}
                  subTitle={
                    <>
                      <div className="text-xs mb-2">
                        {formatDateOrder(new Date(data?.prossessedAt))} WIB
                      </div>
                    </>
                  }
                  description="Pesanan Anda dalam proses pengiriman oleh kurir"
                />
              )}
              {(currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5) && (
                <Steps.Step
                  title="Diproses penjual"
                  status={currentStep !== 2 ? "wait" : "process"}
                  subTitle={
                    <>
                      <div className="text-xs mb-2">
                        {formatDateOrder(new Date(data?.confirmedAt))} WIB
                      </div>
                    </>
                  }
                  description="Pesanan sedang diproses oleh penjual"
                />
              )}
              {(currentStep === 1 ||
                currentStep === 2 ||
                currentStep === 3 ||
                currentStep === 4 ||
                currentStep === 5) && (
                <Steps.Step
                  title="Pembayaran sudah diverifikasi"
                  status={currentStep !== 1 ? "wait" : "process"}
                  subTitle={
                    <>
                      <div className="text-xs mb-2">
                        {formatDateOrder(new Date(data?.orderDate))} WIB
                      </div>
                    </>
                  }
                  description="Pembayaran telah diterima dan pesanan kamu sudah diteruskan ke penjual"
                />
              )}
            </Steps>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TrackingOrder;
