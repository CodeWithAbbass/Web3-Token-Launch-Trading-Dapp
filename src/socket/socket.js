import { io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object

const URL =
  import.meta.env.VITE_MODE === "production"
    ? import.meta.env.VITE_SOCKET_BASE_URL
    : import.meta.env.VITE_SOCKET_BASE_URL_DEV;

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"], // use WebSocket first, if available
});

export const ConnectSocket = () => {
  socket.connect();

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
    // You can handle the connection error here
  });

  // Listen for errors on data transmission
  socket.on("error", (error) => {
    console.error("Socket data transmission error:", error);
    // You can handle the data transmission error here
  });

  socket.on("disconnect", () => {
    // Retrieve user details from socket object if needed
  });
};
