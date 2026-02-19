import { Room, InviteKey } from "./types";

const ROOMS_KEY = "agentchat_rooms";
const KEYS_KEY = "agentchat_keys";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getRooms(): Room[] {
  if (!isBrowser()) return [];
  const raw = localStorage.getItem(ROOMS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveRoom(room: Room) {
  const rooms = getRooms();
  rooms.push(room);
  localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
}

export function deleteRoom(id: string) {
  const rooms = getRooms().filter((r) => r.id !== id);
  localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
  // Also clean up keys
  const keys = getKeys().filter((k) => k.roomId !== id);
  localStorage.setItem(KEYS_KEY, JSON.stringify(keys));
}

export function getKeys(): InviteKey[] {
  if (!isBrowser()) return [];
  const raw = localStorage.getItem(KEYS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getKeysForRoom(roomId: string): InviteKey[] {
  return getKeys().filter((k) => k.roomId === roomId);
}

export function saveKey(key: InviteKey) {
  const keys = getKeys();
  keys.push(key);
  localStorage.setItem(KEYS_KEY, JSON.stringify(keys));
}

export function generateId(prefix: string): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = prefix + "_";
  for (let i = 0; i < 12; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function generateKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "ak_";
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
