import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { useState } from "react";

const UploadProfile = ({ setValue }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setValue("image", newFileList[0].originFileObj);
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
      <Upload
        action=""
        showUploadList={{
          showRemoveIcon: true,
          showPreviewIcon: false,
        }}
        listType="picture-card"
        fileList={fileList}
        onChange={handleUpload}
        beforeUpload={beforeUpload}
        maxCount={1}
      >
        {fileList.length < 1 && "Pilih Foto"}
      </Upload>
    </>
  );
};

export default UploadProfile;
