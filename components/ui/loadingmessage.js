"use client"; 
import React, { useState, useEffect } from "react";

// EXAMPLE MESSAGES:
const defaultMessages = [
  "Thinking...",
  "Generating response...",
  "Double-checking facts...",
  "Summarizing content...",
  "Almost there..."
];

export default function LoadingMessages({
  messages = defaultMessages,
  interval = 2000 // how many ms each message is displayed
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState("opacity-100"); 
  // We'll toggle between fade in / fade out

  useEffect(() => {
    // We set up an interval that cycles the currentIndex every 'interval' ms
    const timer = setInterval(() => {
      // Start fade out
      setFadeState("opacity-0");

      // After fade out finishes (~500ms), switch to the next message & fade back in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setFadeState("opacity-100");
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [messages, interval]);

  return (
    <div className="flex items-center justify-center p-4">
      {/* We wrap the message in a container that transitions opacity */}
      <div
        className={`transition-opacity duration-500 ease-in-out ${fadeState}`}
      >
        <p className="text-sm text-gray-600">{messages[currentIndex]}</p>
      </div>
    </div>
  );
}