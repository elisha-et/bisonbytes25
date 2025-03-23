import "./App.css";

import React, { useEffect, useState } from "react";

import ChatInput from "./components/ChatInput";
import ChatLog from "./components/ChatLog";
import { Box } from "@mui/material";

import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
    const modifiers = {
        gamehost: "",
        therapist: "",
    };
    const [currentModifier, setModifier] = useState("gamehost");

    // Initializes model with API key
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // List of all the previous user input and machine responses
    // Each element is structured as {input: "", response: ""}
    const [chatLog, setChatLog] = useState([]);

    // Spinner to display when loading prompts
    const [showSpinner, setShowSpinner] = useState(false);

    /**
     * Retrieves response from Gemini and logs the prompt and response in the
     * chat log as {input, response}
     * @param {string} input The user prompt for Gemini
     */
    const processRequest = async (input, modifier) => {
        setShowSpinner(true);

        const result = await model.generateContent(modifier + input);
        const response = result.response.text();

        setChatLog([...chatLog, { input, response }]);
        setShowSpinner(false);
    };

    useEffect(() => {
        const modifier =
            "Pretend you're a game show host asking me computer trivia questions till I give up.";

        processRequest("", modifier);
    }, []);

    return (
        <Box
            bgcolor="navyBlue.main"
            display="flex"
            flexDirection="column"
            height="100vh"
            px="20vw"
            py="10vh"
        >
            <img
                src="BuddysBirthday.png"
                alt="BuddysBirthday"
                style={{
                    width: 300,
                    height: 300 * 1.038,
                    top: 300 * 1.038 * -0.4,
                    left: "calc(50% - 150px)",
                    position: "absolute",
                }}
            />

            <ChatLog chatLog={chatLog} showSpinner={showSpinner} />
            <ChatInput chatLog={chatLog} processRequest={processRequest} />
        </Box>
    );
};

export default App;
