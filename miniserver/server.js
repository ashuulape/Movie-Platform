const express = require('express');
const cors = require('cors');
const axios = require('axios');
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const {gettvdata, getmoviedata, getsimilarmovie} = require("./controller");

const app = express();

const PORT = 5000;

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"]
  }
});

const users = new Map();
// Map roomId -> { hostSocketId, streamUrl }
const roomStates = new Map();

const DEFAULT_STREAM_URL = "https://vidfast.vc/movie/969681";

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a video chat room
  socket.on("join-room", ({ roomId, userName }) => {
    console.log(`User ${userName} joining room ${roomId}`);
    socket.join(roomId);

    users.set(socket.id, { roomId, userName: userName || "Anonymous" });
    socket.userName = userName || "Anonymous";
    socket.roomId = roomId;

    if (!roomStates.has(roomId)) {
      roomStates.set(roomId, {
        hostSocketId: socket.id,
        streamUrl: DEFAULT_STREAM_URL
      });
    }

    const currentRoomState = roomStates.get(roomId);
    // Send initial room state including who the host is
    socket.emit("room-state", {
      hostSocketId: currentRoomState.hostSocketId,
      streamUrl: currentRoomState.streamUrl,
      isHost: socket.id === currentRoomState.hostSocketId
    });

    // Get list of existing users in the room (excluding joining user)
    const existingUsers = [];
    const roomSockets = io.sockets.adapter.rooms.get(roomId);

    if (roomSockets) {
      roomSockets.forEach((id) => {
        if (id !== socket.id) {
          const user = users.get(id);
          existingUsers.push({
            socketId: id,
            userName: user ? user.userName : "User"
          });
        }
      });
    }

    // Send existing users in room to the newly joined peer
    socket.emit("existing-users", existingUsers);

    // Notify others in room that a new peer joined
    socket.to(roomId).emit("user-joined", {
      socketId: socket.id,
      userName: socket.userName
    });
  });

  // Change Stream URL across room
  socket.on("change-stream-url", ({ roomId, streamUrl }) => {
    if (!roomId || !streamUrl) return;
    const roomState = roomStates.get(roomId) || { hostSocketId: socket.id, streamUrl: DEFAULT_STREAM_URL };
    roomState.streamUrl = streamUrl;
    roomStates.set(roomId, roomState);

    io.to(roomId).emit("stream-url-updated", {
      streamUrl,
      updatedBy: socket.userName || "User"
    });
  });

  // Screen Share / Iframe Stream state notifications
  socket.on("stream-state-changed", ({ roomId, isStreaming }) => {
    socket.to(roomId).emit("peer-stream-state-changed", {
      socketId: socket.id,
      isStreaming
    });
  });

  // Relay WebRTC Offer
  socket.on("offer", ({ targetSocketId, offer }) => {
    io.to(targetSocketId).emit("offer", {
      callerSocketId: socket.id,
      callerName: socket.userName,
      offer
    });
  });

  // Relay WebRTC Answer
  socket.on("answer", ({ targetSocketId, answer }) => {
    io.to(targetSocketId).emit("answer", {
      responderSocketId: socket.id,
      answer
    });
  });

  // Relay ICE Candidates
  socket.on("ice-candidate", ({ targetSocketId, candidate }) => {
    io.to(targetSocketId).emit("ice-candidate", {
      senderSocketId: socket.id,
      candidate
    });
  });

  // Toggle Media Status (Mic / Camera)
  socket.on("toggle-media-status", ({ roomId, type, enabled }) => {
    socket.to(roomId).emit("peer-media-toggled", {
      socketId: socket.id,
      type,
      enabled
    });
  });

  // Real-time Text Chat
  socket.on("send-chat-message", ({ roomId, message, userName }) => {
    const chatData = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      senderId: socket.id,
      userName: userName || socket.userName || "User",
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    io.to(roomId).emit("receive-chat-message", chatData);
  });

  // User Leave / Disconnect
  const handleUserLeave = () => {
    const userInfo = users.get(socket.id);
    if (userInfo) {
      const { roomId, userName } = userInfo;
      socket.to(roomId).emit("user-left", {
        socketId: socket.id,
        userName
      });
      users.delete(socket.id);

      // Clean up room state or reassign host if host leaves
      const roomSockets = io.sockets.adapter.rooms.get(roomId);
      if (!roomSockets || roomSockets.size === 0) {
        roomStates.delete(roomId);
      } else {
        const roomState = roomStates.get(roomId);
        if (roomState && roomState.hostSocketId === socket.id) {
          const nextHostId = roomSockets.values().next().value;
          roomState.hostSocketId = nextHostId;
          io.to(roomId).emit("host-changed", {
            newHostSocketId: nextHostId,
            newHostName: users.get(nextHostId)?.userName || "User"
          });
        }
      }
    }
  };

  socket.on("leave-room", () => {
    if (socket.roomId) {
      socket.leave(socket.roomId);
    }
    handleUserLeave();
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    handleUserLeave();
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Socket.IO Signaling Server running on http://localhost:${PORT}`);
});


app.use(cors({
  origin: true    ,          // reflects/allows ANY origin dynamically (permissive)

   credentials: true
}));

app.get('/api/movie/:id', getmoviedata);
app.get('/api/movie/similar/:id', getsimilarmovie);

app.get('/api/tv/:id',gettvdata)




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/',(req,res)=>{
  res.status(200).json({message:"server is fine"})
})