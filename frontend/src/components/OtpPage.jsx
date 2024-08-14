import { useMutation } from "@tanstack/react-query";
import { Flex, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { resendOtp } from "../../api/auth";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
const { Title } = Typography;

const OtpPage = ({ email, setValue }) => {
  const onChange = (text) => {
    setValue("otpUser", text);
  };

  const newEmail = (email) => {
    if (email) {
      const [name, domain] = email.split("@");
      const sliceEmail = name.slice(0, -4);
      return `${sliceEmail}****@${domain}`;
    }
  };

  return (
    <Flex gap="middle" align="middle" vertical>
      <Title level={5} align="middle">
        Verifikasi kode OTP di email kamu
      </Title>
      <div className="text-center">
        <p className="text-sm">
          Masukan kode OTP yang dikirimkan ke alamat email {newEmail(email)}
        </p>
      </div>
      <Input.OTP
        formatter={(str) => str.toUpperCase()}
        justify="end"
        onChange={onChange}
      />
    </Flex>
  );
};

export default OtpPage;
