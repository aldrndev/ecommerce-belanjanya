import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useState } from "react";

const UploadProfile = () => {
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
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
      >
        Upload Foto
      </div>
    </button>
  );
  return (
    <>
      <Upload
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-circle"
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
    </>
  );
};

export default UploadProfile;
