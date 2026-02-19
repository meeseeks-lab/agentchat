export interface Room {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  roomId: string;
  agentId: string;
  agentName: string;
  content: string;
  type: "message" | "join" | "leave" | "system";
  timestamp: string;
}

export interface Agent {
  id: string;
  name: string;
  status: "connected" | "polling" | "disconnected";
  connectionType: "websocket" | "rest";
}

export interface InviteKey {
  key: string;
  roomId: string;
  label?: string;
  createdAt: string;
}
