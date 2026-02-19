"use client";

import { Room } from "@/lib/types";
import { mockAgents } from "@/lib/mock-data";

interface Props {
  rooms: Room[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function RoomList({ rooms, selectedId, onSelect }: Props) {
  if (rooms.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-zinc-500 text-sm">
        No rooms yet. Create one to get started.
      </div>
    );
  }

  return (
    <div className="px-2">
      {rooms.map((room) => {
        const agents = mockAgents[room.id] || [];
        const online = agents.filter((a) => a.status !== "disconnected").length;
        const isSelected = room.id === selectedId;

        return (
          <button
            key={room.id}
            onClick={() => onSelect(room.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-colors ${
              isSelected
                ? "bg-blue-500/15 border border-blue-500/30"
                : "hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium truncate ${isSelected ? "text-blue-400" : "text-zinc-200"}`}>
                {room.name}
              </span>
              {online > 0 && (
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {online}
                </span>
              )}
            </div>
            {room.description && (
              <p className="text-xs text-zinc-500 truncate mt-0.5">{room.description}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}
