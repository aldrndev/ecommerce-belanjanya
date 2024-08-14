const { Server } = require("socket.io");
const { Message } = require("../models");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    //join room based on conversationId
    socket.on("joinRoom", ({ conversationId }) => {
      socket.join(conversationId);
      console.log("User joined room: " + conversationId);
    });

    //send message
    socket.on("sendMessage", async ({ conversationId, senderId, content }) => {
      try {
        const message = await Message.create({
          ConversationId: conversationId,
          SenderId: senderId,
          content,
          isRead: false,
        });

        io.to(conversationId).emit("receiveMessage", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    //handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected: " + socket.id);
    });
  });

  return io;
};

module.exports = { setupSocket };
