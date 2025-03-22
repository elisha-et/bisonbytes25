import React, { useState, useEffect } from "react";
import { Box, IconButton, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

const ChatInput = (props) => {
    const { processRequest } = props;
    const [input, setInput] = useState("");

    /**
     * Clears user input and prompts Gemini
     */
    const sendPrompt = () => {
        if (input) {
            processRequest(input);
            setInput("");
        }
    };

    /**
     * Binds the enter key to sendPrompt
     * @param {*} e The event triggered
     */
    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            if (listening) {
                SpeechRecognition.stopListening();
                setInput(transcript);
            }

            sendPrompt();
        }
    };

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    /**
     * Binds the space key as a microphone toggle to receive speech-to-text
     * @param {*} e The event triggered
     */
    const handleSpaceKeyDown = (e) => {
        if (e.key === " " && !listening) {
            // resetTranscript();
            SpeechRecognition.startListening();
        }
    };

    // Binds all keyboard inputs
    useEffect(() => {
        document.addEventListener("keydown", handleEnterKey, false);
        document.addEventListener("keydown", handleSpaceKeyDown, false);

        return () => {
            document.removeEventListener("keydown", handleEnterKey, false);
            document.addEventListener("keydown", handleSpaceKeyDown, false);
        };
    });

    return (
        <Box display="flex" flexDirection="column">
            <Paper variant="outlined">
                <Box display="flex" flexDirection="row" p={2}>
                    <TextField
                        fullWidth
                        label="Enter prompt"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        variant="outlined"
                    />

                    <IconButton aria-label="delete" onClick={sendPrompt}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatInput;
