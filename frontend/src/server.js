const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000/api/v2";
const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/";

export const server = apiUrl.replace(/\/$/, "");
export const backend_url = `${backendUrl.replace(/\/$/, "")}/`;
