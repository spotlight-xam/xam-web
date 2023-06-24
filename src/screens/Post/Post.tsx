import Card from "antd/es/card";

export function Post() {
  return (
    <div style={{ display: "flex", justifyItems: "center" }}>
      <div style={{ backgroundColor: "blue", height: "400px" }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
        }}
      >
        <Card
          title="Card title"
          bordered={false}
          style={{ width: 300, margin: "15px" }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
  );
}
