"use client";

import { useRef, useState } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [health, setHealth] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const checkHealth = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`);
    const json = await res.json();
    setHealth(JSON.stringify(json));
  };

  const pingSocket = () => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? '', {
      path: '/socket.io'
    });
    socket.emit('ping');
    socket.on('pong', () => {
      console.log('pong');
      socket.close();
    });
  };

  const toggleCamera = async () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      return;
    }
    const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    if (videoRef.current) {
      videoRef.current.srcObject = s;
    }
    setStream(s);
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <button onClick={checkHealth}>Check Health</button>
      {health && <pre>{health}</pre>}
      <button onClick={pingSocket}>Ping Socket</button>
      <button onClick={toggleCamera}>{stream ? 'Stop Camera' : 'Start Camera'}</button>
      <video ref={videoRef} autoPlay muted style={{ width: '320px', height: '240px', background: '#000' }} />
    </main>
  );
}
