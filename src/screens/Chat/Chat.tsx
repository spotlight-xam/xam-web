import { MessageList } from "./MessageList";
import { Dialog } from "./Dialog";

export function Chat({ teamId, roomId }: { teamId: number; roomId: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <MessageList roomId={roomId}></MessageList>
      <Dialog teamId={teamId} roomId={roomId}></Dialog>
    </div>
  );
}
