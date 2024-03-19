import { useContext } from "react"
import AutorizacionContext from "../context/AutorizacionContext"

export default function useAutorizacion() {
  const context = useContext(AutorizacionContext)

  if (!context) {
    throw new Error("useAutorizacion must be used within an AuthProvider")
  }

  return context;
}