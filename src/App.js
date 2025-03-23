import "./App.css";

import React, { useEffect, useState } from "react";

import ChatInput from "./components/ChatInput";
import ChatLog from "./components/ChatLog";
import { Box } from "@mui/material";

import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
    // List of all the previous user input and machine responses
    // Each element is structured as {input: "", response: ""}
    const [chatLog, setChatLog] = useState([]);

    // Spinner to display when loading prompts
    const [showSpinner, setShowSpinner] = useState(false);

    // Initializes model with API key
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

    const modifiers = {
        gamehost:
            "you're a gameshow host asking me computer trivia questions;" +
            "if I answer correctly, describe more about the correct answer;" +
            "if I answer incorrectly, tell me the correct answer;" +
            "at the end, ask me another computer trivia question;" +
            "no details describing yourself;",
        therapist:
            "you're a therapist that asks me if I am doing alright" +
            "give me encouragement after I respond to help me feel better" +
            "no details describing yourself",
    };

    const [currentModifier, setModifier] = useState("gamehost");

    /**
     * Prompts Gemini to respond after switching personalities
     * @param {string} modifier
     */
    const handleModifierChange = (modifier) => {
        setModifier(modifier);
        processRequest("", modifiers[modifier]);
    };

    // Defaults to the "gamehost" personality
    useEffect(() => {
        handleModifierChange("gamehost");
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
            <ChatInput
                chatLog={chatLog}
                processRequest={processRequest}
                currentModifier={currentModifier}
                modifiers={modifiers}
                handleModifierChange={handleModifierChange}
            />
        </Box>
    );
};

/**
 * Capitalizes the first character and any characters proceding a non-character
 * in the specified string.
 * @param {string} string The specified string
 * @returns A string with words capitalized
 */
const toTitleCase = (string) => {
    return string
        .toLowerCase()
        .replace(/(^.)|(\W.)/g, (char) => char.toUpperCase());
};

export default App;
export { toTitleCase };
