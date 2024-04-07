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
  //console.log("access token- " + accessToken.token);
  const tokenPayload = getPayload(accessToken.token)
  //console.log("tokenPayLoad- " + tokenPayload);
  const loggedUser = {
    id: accessToken.user.id,
    usuario: accessToken.user.usuario,
    accessToken: accessToken.token,
    notBeforeTimestampInMillis: tokenPayload.iat * 1000,
    expirationTimestampInMillis: tokenPayload.exp * 1000
  }
  localStorage.setItem('@user', JSON.stringify(loggedUser))
}

function logout() {
  removeAuthToken()
  clearTimeout(logoutIfExpiredHandlerId)
}

export function removeAuthToken() {
  localStorage.removeItem('@user')
}

function getPayload(token) {
  //console.log("imprimir jwt_decode- "+ token);
  return jwtDecode(token)  
}

function getToken() {
  //let token
  let tokenJson = localStorage.getItem('@user')
  tokenJson = JSON.parse(tokenJson)
  //console.log('desde Auth: ' + JSON.stringify(tokenJson.accessToken));
  if (tokenJson?.accessToken) {
    let token = tokenJson.accessToken
    //console.log(token)
    return token
  }
  return null
}

function getAccessToken() {
  const token = getToken()
  console.log(token)
  if (token) {
    return token
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
    const tokenPayload = getPayload(token)
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
