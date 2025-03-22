import React, { useState, useEffect } from "react";
import { Box, IconButton, Paper, TextField } from "@mui/material";

import MicIcon from "@mui/icons-material/Mic";
import { MicNone } from "@mui/icons-material";
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
        if (input.trim()) {
            processRequest(input.trim());
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

    // Binds all keyboard inputs
    useEffect(() => {
        document.addEventListener("keydown", handleEnterKey, false);

        return () => {
            document.removeEventListener("keydown", handleEnterKey, false);
        };
    });

    const {
        transcript,
        listening,
        resetTranscript,
    } = useSpeechRecognition();

    

    /**
     * Opens the microphone if enable; otherwise opens a modal warning that the
     * microphone is not enabled
     */
    const openMic = () => {
        console.log("Mic opened");
        SpeechRecognition.startListening();
    };

    /**
     * Appends recorded speech as text in input
     * @param {*} e The event triggered
     */
    const recordTranscript = () => {
        console.log("Mic closed");
        
        SpeechRecognition.stopListening();

        setInput(`${input} ${transcript}`);
        resetTranscript();
    };

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

                    <IconButton
                        aria-label="record audio"
                        onClick={() => {
                            !listening ? openMic() : recordTranscript();
                        }}
                    >
                        {listening ? (
                            <MicIcon color="secondary" />
                        ) : (
                            <MicNone onClick={openMic} />
                        )}
                    </IconButton>

                    <IconButton aria-label="send" onClick={sendPrompt}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatInput;
