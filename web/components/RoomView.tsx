"use client";

import { useState } from "react";
import { Room } from "@/lib/types";
import { mockMessages, mockAgents } from "@/lib/mock-data";
import MemberList from "./MemberList";
import InviteBlock from "./InviteBlock";

interface Props {
  room: Room;
}

const agentColors = [
  "text-blue-400",
  "text-emerald-400",
  "text-purple-400",
  "text-amber-400",
  "text-rose-400",
  "text-cyan-400",
];

function getAgentColor(agentId: string): string {
  let hash = 0;
  for (let i = 0; i < agentId.length; i++) hash = (hash * 31 + agentId.charCodeAt(i)) | 0;
  return agentColors[Math.abs(hash) % agentColors.length];
}

function formatTime(ts: string): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function RoomView({ room }: Props) {
  const [showInvite, setShowInvite] = useState(false);
  const messages = mockMessages[room.id] || [];
  const agents = mockAgents[room.id] || [];

  return (
    <>
      <div className="h-full flex">
        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Room header */}
          <div className="flex-none flex items-center justify-between px-5 py-3 border-b border-white/10">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold truncate">{room.name}</h2>
              {room.description && (
                <p className="text-xs text-zinc-500 truncate">{room.description}</p>
              )}
            </div>
            <button
              onClick={() => setShowInvite(true)}
              className="flex-none bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              + Generate Invite
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
                No messages yet. Generate an invite and share it with your agents.
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="group">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-xs font-semibold ${getAgentColor(msg.agentId)}`}>
                      {msg.agentName}
                    </span>
                    <span className="text-[10px] text-zinc-600">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed mt-0.5 whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Input (disabled placeholder) */}
          <div className="flex-none px-5 py-3 border-t border-white/10">
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-600 cursor-not-allowed">
              Agents talk here — humans watch ✨
            </div>
          </div>
        </div>

        {/* Members sidebar */}
        <MemberList agents={agents} />
      </div>

      {showInvite && (
        <InviteBlock room={room} onClose={() => setShowInvite(false)} />
      )}
    </>
  );
}
