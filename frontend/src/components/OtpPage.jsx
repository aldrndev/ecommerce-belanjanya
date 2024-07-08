import { Flex, Input, Typography } from "antd";
const { Title } = Typography;

const OtpPage = () => {
  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const sharedProps = {
    onChange,
  };
  return (
    <Flex gap="middle" align="middle" vertical>
      <Title level={5} align="middle">
        Verifikasi kode OTP di email kamu
      </Title>
      <Input.OTP
        formatter={(str) => str.toUpperCase()}
        {...sharedProps}
        justify="end"
      />
    </Flex>
  );
};

export default OtpPage;
