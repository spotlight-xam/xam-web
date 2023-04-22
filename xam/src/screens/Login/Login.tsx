import { Button, Form, Input } from "antd";
import { useState } from "react";

export function Login() {
  const [id, onId] = useState("");
  const [password, onPassword] = useState("");

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{}}>
      <div
        style={{
          paddingTop: 200,
          alignItems: "center",
          borderColor: "#616161",
          borderRadius: 10,
        }}
      >
        <div
          color={"white"}
          style={{
            margin: 50,
            backgroundColor: "#EF933A",
            borderRadius: 10,
          }}
        >
          Xam!
        </div>
        <div style={{ flexDirection: "column" }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                style={{ backgroundColor: "#EF933A" }}
                type="primary"
                htmlType="submit"
              >
                로그인
              </Button>
            </Form.Item>
          </Form>
          <div>
            <div>아직 회원이 아닌가요?</div>
          </div>
        </div>
      </div>
    </div>
  );
}
