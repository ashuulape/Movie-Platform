import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const MicIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const MicOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const VideoIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const VideoOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M21 21l-4.35-4.35M23 7l-7 5 7 5V7z" />
    <path d="M3.6 3.6A2 2 0 0 0 2 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.4-3.6" />
  </svg>
);

const MonitorIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MessageIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PhoneOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.33a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
    <line x1="23" y1="1" x2="1" y2="23" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TvIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </svg>
);

const MaximizeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// ─── Constants ─────────────────────────────────────────────────────────────────
const PRESET_STREAMS = [
  { name: "VidFast Movie Embed", url: "https://vidfast.vc/movie/969681" },
  {
    name: "Big Buck Bunny",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    name: "Sintel Short Film",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    name: "Tears of Steel",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
];

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

// ─── VideoPlayer sub-component ────────────────────────────────────────────────
const VideoPlayer = ({
  stream,
  isLocal = false,
  userName,
  micEnabled = true,
  videoEnabled = true,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      const p = videoRef.current.play();
      if (p !== undefined) p.catch((e) => console.warn("VideoPlayer play:", e));
    }
  }, [stream]);

  return (
    <div className="relative flex-shrink-0 w-40 sm:w-44 aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg group">
      {videoEnabled && stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className={`w-full h-full object-cover ${isLocal ? "[transform:scaleX(-1)]" : ""}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-neutral-800 to-neutral-900">
          <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
            {(userName || "U").charAt(0).toUpperCase()}
          </div>
          <p className="text-[10px] text-neutral-500">Camera Off</p>
        </div>
      )}
      {/* Name label */}
      <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] text-white font-medium truncate">
        <span className="truncate">{userName || "User"}</span>
        {isLocal && (
          <span className="text-neutral-400 font-normal shrink-0">(You)</span>
        )}
      </div>
      {/* Muted badge */}
      {!micEnabled && (
        <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600/90 text-white shadow">
          <MicOffIcon />
        </div>
      )}
    </div>
  );
};

// ─── LiveBroadcastViewer ──────────────────────────────────────────────────────
const LiveBroadcastViewer = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      const p = videoRef.current.play();
      if (p !== undefined) {
        p.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current
              .play()
              .catch((e) => console.error("Video play failed:", e));
          }
        });
      }
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      controls
      className="w-full h-full object-contain bg-black"
    />
  );
};

// ─── Main Theater Component ───────────────────────────────────────────────────
export default function Theater() {
  // Route params — id is the movie TMDB id, roomId is the watch-party room code
  const { name: movieTitle, id: movieId, roomId: routeRoomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Build the default stream URL from the movie id coming from the route
  const defaultStreamUrl = movieId
    ? `${import.meta.env.VITE_SERVER_1 || "https://vidsrc.to/embed/movie/"}${movieId}`
    : "https://vidfast.vc/movie/969681";

  const initialRoomId = routeRoomId || location.state?.roomId || "";
  const initialTitle = movieTitle
    ? decodeURIComponent(movieTitle)
    : location.state?.title || "";

  // ── State ──
  const [inCall, setInCall] = useState(false);
  const [roomId, setRoomId] = useState(initialRoomId);
  const [userName, setUserName] = useState("");
  const [localStream, setLocalStream] = useState(null);

  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const [remotePeers, setRemotePeers] = useState([]);
  const peersRef = useRef(new Map());
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenTrackRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const chatBottomRef = useRef(null);

  const [streamUrl, setStreamUrl] = useState(defaultStreamUrl);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showWebcams, setShowWebcams] = useState(true);

  const [isHost, setIsHost] = useState(false);
  const [hostSocketId, setHostSocketId] = useState(null);
  const [isBroadcastingMovie, setIsBroadcastingMovie] = useState(false);
  const [hostBroadcastStream, setHostBroadcastStream] = useState(null);

  // ── Init local media ──
  useEffect(() => {
    const initLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        localStreamRef.current = stream;
      } catch (err) {
        console.warn("Could not acquire full media stream:", err);
        try {
          // Fallback to audio only if video unavailable
          const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setLocalStream(audioOnlyStream);
          localStreamRef.current = audioOnlyStream;
          setVideoEnabled(false);
        } catch (e) {
          console.error("Failed to get any media device:", e);
        }
      }
    };
    initLocalMedia();
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // ── Full cleanup on unmount ──
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leave-room");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      peersRef.current.forEach((p) => {
        if (p.pc) p.pc.close();
      });
      peersRef.current.clear();
    };
  }, []);

  // ── Scroll chat ──
  useEffect(() => {
    if (chatBottomRef.current)
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  // ── Helpers ──
  const updateRemotePeersState = () => {
    const list = [];
    let hostBroadcast = null;
    peersRef.current.forEach((d, socketId) => {
      list.push({
        socketId,
        userName: d.userName,
        stream: d.stream,
        screenStream: d.screenStream,
        micEnabled: d.micEnabled ?? true,
        videoEnabled: d.videoEnabled ?? true,
      });
      if (d.screenStream) hostBroadcast = d.screenStream;
    });
    setRemotePeers(list);
    setHostBroadcastStream(hostBroadcast);
  };

  const createPeerConnection = (
    targetSocketId,
    targetUserName,
    isInitiator,
  ) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    const peerObj = {
      pc,
      userName: targetUserName,
      stream: null,
      webcamStream: null,
      screenStream: null,
      micEnabled: true,
      videoEnabled: true,
    };
    peersRef.current.set(targetSocketId, peerObj);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        const sender = pc.addTrack(track, localStreamRef.current);
        if (
          track.kind === "video" &&
          screenTrackRef.current &&
          isBroadcastingMovie
        )
          sender.replaceTrack(screenTrackRef.current);
      });
    }

    pc.onicecandidate = (e) => {
      if (e.candidate && socketRef.current)
        socketRef.current.emit("ice-candidate", {
          targetSocketId,
          candidate: e.candidate,
        });
    };

    // Handle incoming remote media tracks (Webcam vs Screen Stream)
    pc.ontrack = (event) => {
      console.log(
        `Received remote track from ${targetSocketId}:`,
        event.track.kind,
        event.streams[0],
      );
      if (event.streams && event.streams[0]) {
        // Create a new MediaStream reference to trigger React re-renders reliably
        peerObj.stream = new MediaStream(event.streams[0].getTracks());
        updateRemotePeersState();
      }
    };

    pc.onconnectionstatechange = () => {
      console.log(
        `Peer ${targetSocketId} connection state:`,
        pc.connectionState,
      );
      if (["disconnected", "failed", "closed"].includes(pc.connectionState))
        removePeer(targetSocketId);
    };

    if (isInitiator) {
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() =>
          socketRef.current.emit("offer", {
            targetSocketId,
            offer: pc.localDescription,
          }),
        )
        .catch((err) => console.error("Error creating offer:", err));
    }
    return pc;
  };

  const removePeer = (socketId) => {
    const d = peersRef.current.get(socketId);
    if (d) {
      if (d.pc) d.pc.close();
      peersRef.current.delete(socketId);
      updateRemotePeersState();
    }
  };

  // ── Join call ──
  const handleJoinCall = (e) => {
    if (e) e.preventDefault();
    if (!roomId.trim()) {
      alert("Please enter or generate a Room Code!");
      return;
    }

    const finalName =
      userName.trim() || "Guest_" + Math.floor(1000 + Math.random() * 9000);
    setUserName(finalName);
    setInCall(true);

    // Default to host immediately — ensures movie player loads even without a server.
    // If a signaling server is running, the "room-state" or "existing-users" event
    // will override this for non-host users.
    setIsHost(true);

    // Initialize Socket.IO connection
    // Server running on port 5000
    const socket = io("https://movie-platform-90ll.onrender.com");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to signaling server with socket ID:", socket.id);
      socket.emit("join-room", { roomId: roomId.trim(), userName: finalName });
    });

    // Server sends list of existing peers in room
    socket.on("existing-users", (usersInRoom) => {
      console.log("Existing users in room:", usersInRoom);
      if (usersInRoom.length === 0) {
        // First in the room — we are the host
        setIsHost(true);
        setHostSocketId(socket.id);
        console.log("No existing users — assigning self as HOST");
      } else {
        // Room already has people — we are NOT the host
        setIsHost(false);
        console.log("Room has existing users — joining as VIEWER");
      }
      usersInRoom.forEach(({ socketId, userName: peerName }) =>
        createPeerConnection(socketId, peerName, true),
      );
    });

    // A new user joined after us
    socket.on("user-joined", ({ socketId, userName: newUserName }) => {
      console.log("New user joined room:", newUserName, socketId);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "system",
          message: `${newUserName} joined the room.`,
        },
      ]);
    });

    // Received WebRTC Offer
    socket.on("offer", async ({ callerSocketId, callerName, offer }) => {
      console.log("Received offer from:", callerName, callerSocketId);
      let peerObj = peersRef.current.get(callerSocketId);
      const pc = peerObj
        ? peerObj.pc
        : createPeerConnection(callerSocketId, callerName, false);
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { targetSocketId: callerSocketId, answer });
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    });

    // Received WebRTC Answer
    socket.on("answer", async ({ responderSocketId, answer }) => {
      console.log("Received answer from:", responderSocketId);
      const d = peersRef.current.get(responderSocketId);
      if (d?.pc) {
        try {
          await d.pc.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (err) {
          console.error("Error setting remote description from answer:", err);
        }
      }
    });

    // Received ICE Candidate
    socket.on("ice-candidate", async ({ senderSocketId, candidate }) => {
      const d = peersRef.current.get(senderSocketId);
      if (d?.pc) {
        try {
          await d.pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding ICE candidate:", err);
        }
      }
    });

    // Peer toggled media status
    socket.on("peer-media-toggled", ({ socketId, type, enabled }) => {
      const d = peersRef.current.get(socketId);
      if (d) {
        if (type === "audio") d.micEnabled = enabled;
        if (type === "video") d.videoEnabled = enabled;
        updateRemotePeersState();
      }
    });

    // Real-time Chat
    socket.on("receive-chat-message", (data) => {
      setMessages((prev) => [
        ...prev,
        { ...data, type: data.senderId === socket.id ? "own" : "peer" },
      ]);
      if (!isChatOpen && data.senderId !== socket.id)
        setUnreadCount((prev) => prev + 1);
    });

    // Initial room state & Host info (server can override client-side host assignment)
    socket.on(
      "room-state",
      ({
        hostSocketId: serverHostId,
        streamUrl: initialUrl,
        isHost: serverIsHost,
      }) => {
        console.log(
          "Received room initial state, hostSocketId:",
          serverHostId,
          "isHost:",
          serverIsHost,
        );
        if (serverHostId) setHostSocketId(serverHostId);
        // Only override if server explicitly provides isHost; otherwise keep client-side value
        if (serverIsHost !== undefined) setIsHost(serverIsHost);
        else setIsHost(socket.id === serverHostId);
        if (initialUrl) setStreamUrl(initialUrl);
      },
    );

    socket.on("host-changed", ({ newHostSocketId, newHostName }) => {
      console.log("Host changed to:", newHostSocketId, newHostName);
      setHostSocketId(newHostSocketId);
      setIsHost(socket.id === newHostSocketId);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "system",
          message: `${newHostName} is now the room host.`,
        },
      ]);
    });

    socket.on("stream-url-updated", ({ streamUrl: newUrl, updatedBy }) => {
      console.log("Stream URL updated to:", newUrl, "by:", updatedBy);
      setStreamUrl(newUrl);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "system",
          message: `${updatedBy} updated the shared movie stream.`,
        },
      ]);
    });

    // Peer stream state changed
    socket.on("peer-stream-state-changed", ({ socketId, isStreaming }) => {
      console.log("Peer stream state changed:", socketId, isStreaming);
      updateRemotePeersState();
    });

    // User Left Room
    socket.on("user-left", ({ socketId, userName: leftUserName }) => {
      console.log("User left room:", leftUserName, socketId);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "system",
          message: `${leftUserName || "A user"} left the room.`,
        },
      ]);
      removePeer(socketId);
    });
  };

  // ── Movie Broadcast ──
  // Host Movie Broadcast (Share Screen/Tab of player)
  const toggleMovieBroadcast = async () => {
    if (!isBroadcastingMovie) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface: "browser",
            cursor: "always",
          },
          audio: true,
        });
        const screenVideoTrack = screenStream.getVideoTracks()[0];
        const screenAudioTrack = screenStream.getAudioTracks()[0];
        screenTrackRef.current = screenVideoTrack;

        // Replace video and audio tracks in all active peer connections for instant, seamless stream
        peersRef.current.forEach((d) => {
          const senders = d.pc.getSenders();
          const vSender = senders.find((s) => s.track?.kind === "video");
          if (vSender && screenVideoTrack)
            vSender.replaceTrack(screenVideoTrack);
          if (screenAudioTrack) {
            const aSender = senders.find((s) => s.track?.kind === "audio");
            if (aSender) aSender.replaceTrack(screenAudioTrack);
          }
        });
        setIsBroadcastingMovie(true);
        if (socketRef.current)
          socketRef.current.emit("stream-state-changed", {
            roomId,
            isStreaming: true,
          });
        // Handle stop event from native browser share bar
        screenVideoTrack.onended = () => stopMovieBroadcast();
      } catch (err) {
        console.error("Error starting movie broadcast:", err);
      }
    } else {
      stopMovieBroadcast();
    }
  };

  const stopMovieBroadcast = () => {
    if (screenTrackRef.current) {
      screenTrackRef.current.stop();
      screenTrackRef.current = null;
    }
    // Revert WebRTC senders back to local camera & mic
    if (localStreamRef.current) {
      const cameraTrack = localStreamRef.current.getVideoTracks()[0];
      const micTrack = localStreamRef.current.getAudioTracks()[0];
      peersRef.current.forEach((d) => {
        const senders = d.pc.getSenders();
        const vSender = senders.find((s) => s.track?.kind === "video");
        if (vSender && cameraTrack) vSender.replaceTrack(cameraTrack);
        const aSender = senders.find((s) => s.track?.kind === "audio");
        if (aSender && micTrack) aSender.replaceTrack(micTrack);
      });
    }
    setIsBroadcastingMovie(false);
    if (socketRef.current)
      socketRef.current.emit("stream-state-changed", {
        roomId,
        isStreaming: false,
      });
  };

  // ── Stream URL ──
  // Update shared stream URL across room
  const handleUpdateStreamUrl = (urlToApply) => {
    const targetUrl = urlToApply || customUrlInput.trim();
    if (!targetUrl) return;
    setStreamUrl(targetUrl);
    if (socketRef.current)
      socketRef.current.emit("change-stream-url", {
        roomId,
        streamUrl: targetUrl,
      });
    setCustomUrlInput("");
    setIsUrlModalOpen(false);
  };

  // ── Leave call ──
  const handleLeaveCall = () => {
    if (socketRef.current) {
      socketRef.current.emit("leave-room");
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    // Close all peer connections
    peersRef.current.forEach((d) => {
      if (d.pc) d.pc.close();
    });
    peersRef.current.clear();
    setRemotePeers([]);
    setMessages([]);
    setInCall(false);
    setIsScreenSharing(false);
  };

  // ── Media toggles ──
  const toggleMic = () => {
    if (!localStreamRef.current) return;
    const audioTracks = localStreamRef.current.getAudioTracks();
    if (audioTracks.length > 0) {
      const next = !micEnabled;
      audioTracks.forEach((t) => {
        t.enabled = next;
      });
      setMicEnabled(next);
      if (socketRef.current)
        socketRef.current.emit("toggle-media-status", {
          roomId,
          type: "audio",
          enabled: next,
        });
    }
  };

  const toggleVideo = () => {
    if (!localStreamRef.current) return;
    const videoTracks = localStreamRef.current.getVideoTracks();
    if (videoTracks.length > 0) {
      const next = !videoEnabled;
      videoTracks.forEach((t) => {
        t.enabled = next;
      });
      setVideoEnabled(next);
      if (socketRef.current)
        socketRef.current.emit("toggle-media-status", {
          roomId,
          type: "video",
          enabled: next,
        });
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        const screenTrack = screenStream.getVideoTracks()[0];
        screenTrackRef.current = screenTrack;
        // Replace video track in all active peer connections
        peersRef.current.forEach((d) => {
          const vSender = d.pc
            .getSenders()
            .find((s) => s.track?.kind === "video");
          if (vSender) vSender.replaceTrack(screenTrack);
        });
        setIsScreenSharing(true);
        // Listen for screen share stop event from browser UI bar
        screenTrack.onended = () => stopScreenShare();
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    if (screenTrackRef.current) {
      screenTrackRef.current.stop();
      screenTrackRef.current = null;
    }
    // Revert back to camera track
    if (localStreamRef.current) {
      const cameraTrack = localStreamRef.current.getVideoTracks()[0];
      peersRef.current.forEach((d) => {
        const vSender = d.pc
          .getSenders()
          .find((s) => s.track?.kind === "video");
        if (vSender && cameraTrack) vSender.replaceTrack(cameraTrack);
      });
    }
    setIsScreenSharing(false);
  };

  // ── Chat ──
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !socketRef.current) return;
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    socketRef.current.emit("send-chat-message", {
      roomId,
      message: chatInput.trim(),
      userName,
      timestamp: timeStr,
    });
    setChatInput("");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleChatDrawer = () => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) setUnreadCount(0);
  };

  // ─── Shared control button style ─────────────────────────────────────────────
  const ctrlBtn = (active = false, danger = false) =>
    `w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer ${
      danger
        ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/40"
        : active
          ? "bg-red-600/30 text-red-400 border border-red-500/50"
          : "bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/50"
    }`;

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white font-sans overflow-hidden flex flex-col">
      {!inCall ? (
        /* ═══════════════ LOBBY SCREEN ═══════════════ */
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {/* ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-700/10 blur-[140px] rounded-full pointer-events-none" />

          {/* back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all text-sm backdrop-blur-md shadow-lg cursor-pointer"
          >
            <ArrowLeftIcon />
            Back to Movie
          </button>

          <div className="relative z-10 w-full max-w-md bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black">
            {/* brand */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-3 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500 mb-3">
                <SparklesIcon />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-roboto mb-1">
                Watch Together
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400">
                Real-time WebRTC Watch Party
              </p>
            </div>

            {/* movie context pill */}
            {initialTitle && (
              <div className="mb-5 px-3 py-2 rounded-xl bg-red-950/40 border border-red-500/20 text-xs text-red-300 text-center">
                🎬 Watch Party for:{" "}
                <span className="font-semibold text-white">{initialTitle}</span>
              </div>
            )}

            {/* camera preview */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-neutral-800 mb-6 shadow-inner flex items-center justify-center">
              {videoEnabled && localStream ? (
                <video
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover [transform:scaleX(-1)]"
                  ref={(el) => {
                    if (el && localStream) el.srcObject = localStream;
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-neutral-500">
                  <div className="p-4 rounded-full bg-neutral-800 border border-neutral-700">
                    <VideoOffIcon />
                  </div>
                  <p className="text-xs text-neutral-400">Camera Off</p>
                </div>
              )}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Preview
              </div>
            </div>

            {/* form */}
            <form onSubmit={handleJoinCall} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-neutral-500 text-sm pointer-events-none">
                    👤
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your name…"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-neutral-800/70 border border-neutral-700 focus:border-red-500 rounded-xl pl-10 pr-4 py-3 text-white placeholder-neutral-500 outline-none transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Room Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1 flex items-center">
                    <span className="absolute left-3.5 text-neutral-500 text-sm pointer-events-none">
                      🔑
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. room-9a3b"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full bg-neutral-800/70 border border-neutral-700 focus:border-red-500 rounded-xl pl-10 pr-4 py-3 text-white placeholder-neutral-500 outline-none transition text-sm font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setRoomId(
                        "room-" + Math.random().toString(36).substring(2, 8),
                      )
                    }
                    className="px-3.5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap cursor-pointer"
                  >
                    <SparklesIcon /> Create
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg shadow-red-600/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <VideoIcon />
                Join Watch Party
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* ═══════════════ IN-CALL ROOM ═══════════════ */
        <div className="flex flex-col h-screen overflow-hidden">
          {/* ── HEADER ── */}
          <header className="flex-shrink-0 w-full bg-neutral-900/95 backdrop-blur-xl border-b border-white/10 px-3 py-2 flex flex-wrap items-center justify-between gap-2 z-30">
            {/* left */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition border border-neutral-700/50 cursor-pointer"
              >
                <ArrowLeftIcon />
                <span className="hidden sm:inline">Back</span>
              </button>

              {/* host / live badge */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${isHost ? "bg-amber-500/15 border-amber-500/30 text-amber-400" : "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHost ? "bg-amber-400" : "bg-emerald-400"}`}
                />
                {isHost ? "👑 HOST" : "LIVE THEATER"}
              </div>

              {/* room code */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700/60 text-xs font-mono text-neutral-300">
                Room:&nbsp;<strong className="text-white">{roomId}</strong>
                <button
                  onClick={handleCopyCode}
                  className="text-neutral-400 hover:text-white transition cursor-pointer"
                  title="Copy Room Code"
                >
                  {copiedCode ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>

            {/* right */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {isHost && (
                <button
                  onClick={toggleMovieBroadcast}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${isBroadcastingMovie ? "bg-red-600 text-white animate-pulse shadow-md shadow-red-600/40" : "bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700/50"}`}
                >
                  <TvIcon />
                  <span className="hidden sm:inline">
                    {isBroadcastingMovie
                      ? "🔴 Stop Broadcast"
                      : "Start Movie Broadcast"}
                  </span>
                </button>
              )}
              <button
                onClick={() => setIsUrlModalOpen((p) => !p)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${isUrlModalOpen ? "bg-red-600/20 border-red-500 text-red-400" : "bg-neutral-800/80 border-neutral-700 text-neutral-200 hover:bg-neutral-700"}`}
              >
                <TvIcon />
                <span className="hidden sm:inline">Change Stream</span>
              </button>
              <button
                onClick={() => setIsTheaterMode((p) => !p)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${isTheaterMode ? "bg-red-600/20 border-red-500 text-red-400" : "bg-neutral-800/80 border-neutral-700 text-neutral-200 hover:bg-neutral-700"}`}
              >
                <MaximizeIcon />
                <span className="hidden sm:inline">
                  {isTheaterMode ? "Exit Theater" : "Theater Mode"}
                </span>
              </button>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-800/80 border border-neutral-700 text-xs text-neutral-300 font-medium">
                <UsersIcon />
                {remotePeers.length + 1}
              </div>
            </div>
          </header>

          {/* ── URL CHANGE BANNER ── */}
          {isUrlModalOpen && (
            <div className="flex-shrink-0 bg-neutral-900/95 border-b border-neutral-800 p-4 shadow-2xl backdrop-blur-2xl z-20">
              <div className="max-w-4xl mx-auto space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <TvIcon /> Change Shared Stream Source
                  </div>
                  <button
                    onClick={() => setIsUrlModalOpen(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                  >
                    <XIcon />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateStreamUrl();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="url"
                    placeholder="Paste iframe embed link or video URL…"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-red-500 transition"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-red-600/30 transition cursor-pointer"
                  >
                    <SparklesIcon /> Load
                  </button>
                </form>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-neutral-500 font-medium">
                    Presets:
                  </span>
                  {PRESET_STREAMS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleUpdateStreamUrl(preset.url)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/80 text-xs text-neutral-300 hover:text-white transition cursor-pointer"
                    >
                      🎬 {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MAIN WORKSPACE ── */}
          <div className="flex-1 relative flex overflow-hidden">
            {/* Big screen */}
            <div
              className={`flex-1 flex flex-col p-3 sm:p-4 overflow-hidden items-center justify-center bg-[#0a0a0a] ${isChatOpen ? "hidden xl:flex" : "flex"}`}
            >
              <div
                className={`relative w-full bg-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex items-center justify-center ${isTheaterMode ? "h-full" : "max-w-5xl aspect-video max-h-[80vh]"}`}
              >
                {isHost ? (
                  <>
                    {/* HOST VIEW: Interactive Player + Controls — iframe uses movieId from useParams */}
                    <iframe
                      src={streamUrl}
                      title="Host Interactive Movie Player"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-medium text-amber-400 shadow-lg">
                      <span>👑 Host Player</span>
                      {!isBroadcastingMovie && (
                        <button
                          onClick={toggleMovieBroadcast}
                          className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white text-[11px] font-semibold transition cursor-pointer"
                        >
                          Broadcast Window to Viewers
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  (() => {
                    // VIEWER VIEW: Host's Live Broadcast Video Stream or Waiting Screen
                    const hostPeer =
                      remotePeers.find((p) => p.socketId === hostSocketId) ||
                      remotePeers[0];
                    if (hostPeer?.stream) {
                      return (
                        <div className="w-full h-full relative">
                          <LiveBroadcastViewer stream={hostPeer.stream} />
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-medium text-emerald-400 shadow-lg">
                            📡 {hostPeer.userName || "Host"}'s Live Stream
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="flex flex-col items-center justify-center text-center p-8 text-neutral-400 gap-4">
                        <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-red-500 animate-pulse">
                          <TvIcon />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Waiting for Host Movie Broadcast
                        </h3>
                        <p className="text-xs text-neutral-400 max-w-xs">
                          The room host is setting up the movie player. Stream
                          will start automatically!
                        </p>
                      </div>
                    );
                  })()
                )}
              </div>
            </div>

            {/* ── Chat Drawer ── */}
            {isChatOpen && (
              <aside className="w-full xl:w-80 h-full flex-shrink-0 bg-neutral-900/95 backdrop-blur-2xl border-l border-neutral-800 flex flex-col shadow-2xl z-20">
                <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MessageIcon /> Watch Party Chat
                  </h3>
                  <button
                    onClick={toggleChatDrawer}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white transition cursor-pointer"
                  >
                    <XIcon />
                  </button>
                </div>
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                  {messages.map((msg) => {
                    if (msg.type === "system")
                      return (
                        <div
                          key={msg.id}
                          className="text-center text-[11px] text-neutral-500 bg-neutral-800/50 border border-neutral-700/40 py-1 px-3 rounded-full w-fit mx-auto"
                        >
                          {msg.message}
                        </div>
                      );
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.type === "own" ? "items-end" : "items-start"}`}
                      >
                        {msg.type === "peer" && (
                          <span className="text-[10px] font-semibold text-neutral-400 mb-0.5 px-1">
                            {msg.userName}
                          </span>
                        )}
                        <div
                          className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs break-words ${msg.type === "own" ? "bg-red-600 text-white rounded-tr-none shadow-md" : "bg-neutral-800 border border-neutral-700 text-neutral-100 rounded-tl-none"}`}
                        >
                          {msg.message}
                        </div>
                        {msg.timestamp && (
                          <span className="text-[9px] text-neutral-500 mt-0.5 px-1">
                            {msg.timestamp}
                          </span>
                        )}
                      </div>
                    );
                  })}
                  <div ref={chatBottomRef} />
                </div>
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 border-t border-neutral-800 flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Type a message…"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-red-500 transition"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-md transition cursor-pointer"
                  >
                    <SendIcon />
                  </button>
                </form>
              </aside>
            )}
          </div>

          {/* ── Floating webcam dock ── */}
          {showWebcams && inCall && (
            <div className="fixed bottom-20 right-4 z-30 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-2 max-w-xs sm:max-w-sm">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-xs font-bold text-neutral-300">
                  Participants ({remotePeers.length + 1})
                </span>
                <button
                  onClick={() => setShowWebcams(false)}
                  className="p-1 text-neutral-400 hover:text-white rounded-lg transition cursor-pointer"
                >
                  <XIcon />
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <VideoPlayer
                  stream={localStream}
                  isLocal
                  userName={userName}
                  micEnabled={micEnabled}
                  videoEnabled={videoEnabled}
                />
                {remotePeers.map((peer) => (
                  <VideoPlayer
                    key={peer.socketId}
                    stream={peer.stream}
                    isLocal={false}
                    userName={peer.userName}
                    micEnabled={peer.micEnabled}
                    videoEnabled={peer.videoEnabled}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Floating controls dock ── */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-2.5 px-4 py-2.5 rounded-full bg-neutral-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black">
            <button
              onClick={toggleMic}
              className={ctrlBtn(!micEnabled)}
              title={micEnabled ? "Mute Microphone" : "Unmute Microphone"}
            >
              {micEnabled ? <MicIcon /> : <MicOffIcon />}
            </button>
            <button
              onClick={toggleVideo}
              className={ctrlBtn(!videoEnabled)}
              title={videoEnabled ? "Turn Off Camera" : "Turn On Camera"}
            >
              {videoEnabled ? <VideoIcon /> : <VideoOffIcon />}
            </button>
            {isHost && (
              <button
                onClick={toggleMovieBroadcast}
                className={ctrlBtn(isBroadcastingMovie)}
                title={
                  isBroadcastingMovie
                    ? "Stop Movie Broadcast"
                    : "Broadcast Movie Player to Room"
                }
              >
                <TvIcon />
              </button>
            )}
            <button
              onClick={toggleScreenShare}
              className={ctrlBtn(isScreenSharing)}
              title={isScreenSharing ? "Stop Screen Share" : "Share Screen"}
            >
              <MonitorIcon />
            </button>
            <button
              onClick={() => setIsUrlModalOpen((p) => !p)}
              className={ctrlBtn(isUrlModalOpen)}
              title="Change Stream Source"
            >
              <SparklesIcon />
            </button>
            {!showWebcams && (
              <button
                onClick={() => setShowWebcams(true)}
                className={ctrlBtn(false)}
                title="Show Participant Webcams"
              >
                <VideoIcon />
              </button>
            )}
            <button
              onClick={toggleChatDrawer}
              className={`${ctrlBtn(isChatOpen)} relative`}
              title="Toggle Meeting Chat"
            >
              <MessageIcon />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLeaveCall}
              className={ctrlBtn(false, true)}
              title="Leave Watch Party"
            >
              <PhoneOffIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
