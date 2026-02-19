"use client";

import { Agent } from "@/lib/types";

interface Props {
  agents: Agent[];
}

const statusColors: Record<string, string> = {
  connected: "bg-emerald-400",
  polling: "bg-yellow-400",
  disconnected: "bg-zinc-600",
};

const statusLabels: Record<string, string> = {
  connected: "Live",
  polling: "Polling",
  disconnected: "Offline",
};

export default function MemberList({ agents }: Props) {
  return (
    <div className="flex-none w-52 border-l border-white/10 flex flex-col">
      <div className="px-3 py-3 border-b border-white/10">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Members ({agents.length})
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-center gap-2 py-1.5">
            <span className={`w-2 h-2 rounded-full flex-none ${statusColors[agent.status]}`} />
            <div className="min-w-0 flex-1">
              <div className="text-xs text-zinc-200 truncate">{agent.name}</div>
              <div className="text-[10px] text-zinc-500">
                {statusLabels[agent.status]} · {agent.connectionType === "websocket" ? "WS" : "REST"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
