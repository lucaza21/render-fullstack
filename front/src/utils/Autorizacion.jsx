import { jwtDecode } from "jwt-decode";
import { tokenKey } from "../constant/config"

class WrongCredentialsException extends Error {}

let logoutIfExpiredHandlerId

export function setLogoutIfExpiredHandler(setUser) {
  if (!isTokenActive()) {
    return
  }
  const token = getToken()
  if (!token) {
    return
  }

  // TODO: change dynamically in next session
  logoutIfExpiredHandlerId = setTimeout(() => setUser(undefined), 1800000)
}

export function setAuthToken(accessToken) {
  console.log("access token- "+accessToken);
  const tokenPayload = getPayload(accessToken)
  console.log("tokenPayLoad- "+tokenPayload);
  const token = {
    accessToken: accessToken,
    notBeforeTimestampInMillis: tokenPayload.iat * 1000,
    expirationTimestampInMillis: tokenPayload.exp * 1000
  }
  localStorage.setItem(tokenKey, JSON.stringify(token))
}

function logout() {
  removeAuthToken()
  clearTimeout(logoutIfExpiredHandlerId)
}

export function removeAuthToken() {
  localStorage.removeItem(tokenKey)
}

function getPayload(token) {
  console.log("imprimir jwt_decode- "+token);
  return jwtDecode(token)  
}

function getToken() {
  let token
  const tokenJson = localStorage.getItem(tokenKey)
  if (tokenJson) {
    token = JSON.parse(tokenJson)
    return token
  }
  return null
}

function getAccessToken() {
  const token = getToken()
  if (token) {
    return token.accessToken
  }
  return ""
}

export function getCurrentUser() {
  const token = getToken()
  if (token) {
    if (!isTokenActive()) {
      logout()
      return undefined
    }
    const tokenPayload = getPayload(token.accessToken)
    return {
      _id: tokenPayload._id,
      active: true,
      user: tokenPayload.user
    }
  } else {
    return undefined
  }
}

function isTokenActive() {
  const token = getToken()
  // TODO: change in next session

  return !!token
}

export { WrongCredentialsException, logout, getAccessToken, isTokenActive }
