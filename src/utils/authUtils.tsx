import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number; // expiration time in seconds
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const now = Date.now() / 1000; // current time in seconds
    return decoded.exp < now;
  } catch (e) {
    return true; // treat as expired if decode fails
  }
};

export const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};