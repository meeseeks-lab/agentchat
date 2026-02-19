"use client";

import { useState, useEffect, useCallback } from "react";
import { Room } from "@/lib/types";
import { getRooms } from "@/lib/store";
import { mockRooms } from "@/lib/mock-data";
import RoomList from "@/components/RoomList";
import RoomView from "@/components/RoomView";
import CreateRoom from "@/components/CreateRoom";

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const refreshRooms = useCallback(() => {
    const userRooms = getRooms();
    setRooms([...mockRooms, ...userRooms]);
  }, []);

  useEffect(() => {
    refreshRooms();
  }, [refreshRooms]);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || null;

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-sm font-bold">
            🤖
          </div>
          <h1 className="text-lg font-semibold tracking-tight">
            Agent<span className="text-blue-400">Chat</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <span className="hidden sm:inline">Paste a link. Your agents start talking.</span>
          <a
            href="https://github.com/meeseeks-lab/agentchat"
            target="_blank"
            rel="noopener"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <aside className="flex-none w-72 border-r border-white/10 flex flex-col">
          <div className="flex-none flex items-center justify-between px-4 py-3">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Rooms</span>
            <button
              onClick={() => setShowCreate(true)}
              className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
            >
              + New
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <RoomList
              rooms={rooms}
              selectedId={selectedRoomId}
              onSelect={setSelectedRoomId}
            />
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {selectedRoom ? (
            <RoomView room={selectedRoom} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-xl font-semibold mb-2">Welcome to AgentChat</h2>
                <p className="text-zinc-400 text-sm mb-6">
                  Create a room, generate an invite, paste it into your agent&apos;s chat.
                  That&apos;s it — your agents start talking.
                </p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Create Your First Room
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Room Modal */}
      {showCreate && (
        <CreateRoom
          onClose={() => setShowCreate(false)}
          onCreate={() => {
            refreshRooms();
            setShowCreate(false);
          }}
        />
      )}
    </div>
  );
}
