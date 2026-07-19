"use client"
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import AIChatWindow from "./AIChatWindow";

const AIChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="x-99 fixed bottom-6 right-6  button-primary !rounded-sm shadow-lg hover:scale-105 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={18} />
        <span className="font-semibold text-sm">AI Chat</span>
      </button>

      {isOpen && <AIChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default AIChatButton;
