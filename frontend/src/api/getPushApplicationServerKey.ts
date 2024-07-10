import {api} from "./api.ts";

export default async function getPushApplicationServerKey() {
  return await api.get("/push/key")
}