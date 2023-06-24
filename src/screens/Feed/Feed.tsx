import Card from "antd/es/card";
import axios from "axios";
import { useEffect, useState } from "react";

interface Image {
  imageUrl: string;
  id: number;
}

interface Feed {
  title: String;
  writer: String;
  images: Image[];
  content: String;
}

interface getFeedReq {
  [index: number]: Feed;
}

export function Feed() {
  const [feed, setFeed] = useState([]);
  const [state, setState] = useState(false);
  
  useEffect(()=>{
    if(state) 
    setState(false);
  }, [state]);

  const onFeed = () => {
    const feeds = axios.get<getFeedReq>("localhost:8080/feed/all");
    return feeds;
  };

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
          <p></p>
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
