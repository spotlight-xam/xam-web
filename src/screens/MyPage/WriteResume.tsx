import { useCallback, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { Post } from "./MyPostList";

import ReactFlow, {
  Background,
  Controls,
  Edge,
  Handle,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  Position,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import StarterKit from "@tiptap/starter-kit";
import { Select } from "antd";
import { Link } from "react-router-dom";

interface WriteResumeProps {
  postList: Post[];
}
export function WriteResume({ postList }: WriteResumeProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: `<- 왼쪽에서 이력서를 자동 생성해보세요.`,
  });

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "100%",
          borderRight: "2px solid #000",
        }}
      >
        <ReactFlowOfWriteResume postList={postList} />
      </div>
      <div style={{ display: "flex", flex: 1, height: "100%" }}>
        <EditorContent
          editor={editor}
          placeholder="왼쪽에서 이력서를 자동 생성해보세요."
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

function ReactFlowOfWriteResume({ postList }: WriteResumeProps) {
  const initialNodes = useMemo<Node[]>(
    () => [
      {
        id: "node-1",
        type: "postSelectUpdater",
        position: { x: 0, y: 0 },
        data: { postList: postList },
      },

      {
        id: "node-2",
        type: "postSelectUpdater",
        position: { x: 0, y: 0 },
        data: { postList: postList },
      },

      {
        id: "node-3",
        type: "output",
        position: { x: 0, y: 200 },
        data: { label: "이력서" },
      },
    ],
    [postList]
  );

  const nodeTypes = useMemo(
    () => ({
      postSelectUpdater: PostSelectUpdaterNode,
      resumeOutput: ResumeOutputNode,
    }),
    []
  );

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback<OnNodesChange>(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback<OnEdgesChange>(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback<OnConnect>(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}

function ResumeOutputNode(props: any) {
  console.log({ props });
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          backgroundColor: "#FFF",
          width: 300,
          height: 300,
        }}
      >
        이력서
      </div>
    </>
  );
}

function PostSelectUpdaterNode({
  data: { postList, onChange },
}: {
  data: WriteResumeProps & {
    onChange: (value: string) => void;
  };
}) {
  return (
    <>
      <div
        style={{
          padding: "32px",
          backgroundColor: "#fff",
          border: "#000 1px solid",
        }}
      >
        <Select
          className="nodrag"
          showSearch
          placeholder="Select a post"
          optionFilterProp="children"
          onChange={onChange}
          options={postList.map((post) => ({
            value: post.text,
            label: post.title,
          }))}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
