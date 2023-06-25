import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

interface postCreateTeamReq {
  teamName: string;
  profileImage?: String;
}

interface postCreateTeamRes {
  teamId: number;
  teamName: string;
  profileImage: string;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export function CreateTeam() {
  const [authToken, setAuthToken] = useState("");
  const [team, setTeam] = useState("");
  const navigate = useNavigate();
  const mainColor = "#F4900C";

  const onTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(event.target.value);
  };

  //유저 정보 불러오기
  const getToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      setAuthToken(token);
    }
  };

  //팀 생성하기
  const onApply = async () => {
    const newTeam: postCreateTeamReq = {
      teamName: team,
      profileImage: imageUrl,
    };

    try {
      const req = await axios.post<postCreateTeamRes>(
        "localhost:8080/team/create",
        {
          headers: {
            Authorization: authToken,
          },
          body: {
            newTeam,
          },
        }
      );

      navigate(`/home`);
    } catch (error) {
      alert("팀 생성에 실패하였습니다.");
      navigate("/home");
    }
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "180px",
        }}
      >
        <img
          style={{ height: "150px", width: "150px", margin: "20px" }}
          alt="Xam_IMG"
          src="img/xam.PNG"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          <div>
            Create your <span style={{ color: mainColor }}>team</span> and
          </div>
          <div>
            add <span style={{ color: mainColor }}>members</span> to
          </div>
          <div>collaborate effectively</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "100px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "150px" }}
        >
          <div style={{ fontWeight: "bold", margin: "20px 25px" }}>
            Team Profile
          </div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontWeight: "bold", margin: "5px" }}>Team Name</div>
          <input
            style={{
              backgroundColor: "#FFE8B6",
              borderRadius: "5px",
              border: "none",
              width: "300px",
              height: "30px",
              margin: "20px",
              padding: "5px",
            }}
            placeholder="Team Name"
            onChange={onTeam}
            value={team}
          />
        </div>

        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: mainColor,
            width: "400px",
            height: "40px",
            color: "white",
            margin: "50px 0 0 10px",
          }}
          onClick={onApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
