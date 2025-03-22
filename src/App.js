import "./App.css";

import React, { useEffect, useState } from "react";

import ChatInput from "./components/ChatInput";
import ChatLog from "./components/ChatLog";
import { Box } from "@mui/material";

import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
    // Initializes model with API key
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // List of all the previous user prompts and machine responses
    // Each element is structured as {prompt: "", response: ""}
    const [chatLog, setChatLog] = useState([]);

    /**
     * Retrieves response from Gemini and logs the prompt and response in the
     * chat log as {prompt, response}
     * @param {string} prompt The user prompt for Gemini
     */
    const processRequest = async (prompt) => {
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        console.log({ prompt, response })
        setChatLog([...chatLog, { prompt, response }]);
    };

    return (
        <Box
            bgcolor="navyBlue.main"
            display="flex"
            flexDirection="column"
            height="100vh"
            px="20vw"
            py="10vh"
        >
            <ChatLog chatLog={chatLog} />
            <ChatInput processRequest={processRequest} />
        </Box>
    );
};

export default App;
