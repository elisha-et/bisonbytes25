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
        browserSupportsSpeechRecognition,
        resetTranscript,
    } = useSpeechRecognition();

    /**
     * Opens the microphone if enable; otherwise opens a modal warning that the
     * microphone is not enabled
     */
    const handleStartListening = () => {
        if (!browserSupportsSpeechRecognition) {
            alert("Browser does not support speech recognition.");
        }

        SpeechRecognition.startListening({ continuous: true });
    };

    /**
     * Appends recorded speech as text in input
     * @param {*} e The event triggered
     */
    const recordTranscript = () => {
        SpeechRecognition.stopListening();
        setInput(`${input}${transcript}`);

        // Flushes buffer
        resetTranscript();
    };

    return (
        <Box display="flex" flexDirection="column">
            <Paper variant="outlined">
                <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    p={2}
                >
                    <TextField
                        fullWidth
                        label="Enter prompt"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        variant="outlined"
                        sx={{ mr: 2 }}
                    />

                    <Box mr={2}>
                        <IconButton
                            aria-label="record audio"
                            onClick={() => {
                                !listening
                                    ? handleStartListening()
                                    : recordTranscript();
                            }}
                        >
                            {listening ? (
                                <MicIcon color="secondary" />
                            ) : (
                                <MicNone />
                            )}
                        </IconButton>
                    </Box>

                    <Box>
                        <IconButton aria-label="send" onClick={sendPrompt}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatInput;
