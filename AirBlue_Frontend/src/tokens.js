// module for saving tokens to local storage
const TOKEN_KEY = "stampTokens";
// tokens = { accessToken: "xyz", refreshToken: "abc" }
export function saveTokens(tokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

export function getTokens() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
}

export function deleteTokens() {
  localStorage.removeItem(TOKEN_KEY);
}