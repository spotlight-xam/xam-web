import { Button } from "antd";
import { Dialog } from "../Chat/Dialog";
import { Room } from "../Rooms/Room";
import { useState } from "react";
import { Team } from "../Team/Team";

export function Home() {
  return (
    <body
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      <Team></Team>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "250px",
          height: "100%",
          backgroundColor: "#aba2a2",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            height: "50px",
            width: "100%",
          }}
        >
          멋쟁이 사자처럼
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "30px",
            margin: "0 10px",
            border: "solid 1px gray",
          }}
        >
          <div style={{ color: "white", margin: "10px" }}>채널</div>
          <button
            style={{
              width: "20px",
              height: "20px",
              padding: "0px",
              margin: "0 10px",
              backgroundColor: "none",
            }}
          >
            +
          </button>
        </div>
        <Room></Room>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <Dialog></Dialog>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "10px",
            backgroundColor: "#D9D9D9",
          }}
        ></div>
      </div>
    </body>
  );
}
