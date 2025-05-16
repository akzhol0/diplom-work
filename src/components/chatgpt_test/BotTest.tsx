"use client";

import { useState } from "react";
import { Mistral } from "@mistralai/mistralai";

const BotTest = () => {
  const [messages, setMessages] = useState<any>(["testteest"]);
  const [input, setInput] = useState("");

  const handleInputChange = async () => {
    const apiKey = "HqSAS2Vwq0aDNszaJwqGeZHkzmeDXxsQ";

    const client = new Mistral({ apiKey: apiKey });

    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: `${input}` }],
    });

    setMessages((prev: any) => [
      ...prev,
      chatResponse.choices !== undefined
        ? chatResponse.choices[0].message.content
        : "",
    ]);
  };

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-4">
      <div className="border p-4 max-h-[400px] max-w-[500px] space-y-4 overflow-y-auto">
        {messages.map((msg: any, index: any) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border"
      />
      <button onClick={handleInputChange}>Send</button>
    </div>
  );
};

export default BotTest;
