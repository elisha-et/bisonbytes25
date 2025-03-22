import React, { useState, useEffect } from "react";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = (props) => {
    const { processRequest } = props;
    const [input, setInput] = useState("");

    /**
     * Clears user input and prompts Gemini
     */
    const sendPrompt = () => {
        processRequest(input);
        setInput("");
    };

    /**
     * Binds the enter key to sendPrompt
     * @param {*} e The event triggered
     */
    const handleEnterKey = (e) => {
        console.log("Enter");
        if (e.key === "Enter" && input) {
            sendPrompt();
        }
    };

    // Binds the enter key to sendPrompt
    useEffect(() => {
        document.addEventListener("keydown", handleEnterKey, false);
        return () => {
            document.removeEventListener("keydown", handleEnterKey, false);
        };
    });

    return (
        <Box display="flex" flexDirection="column">
            <Paper variant="outlined">
                <Box display="flex" flexDirection="row" p={2}>
                    <TextField
                        label="Enter prompt"
                        variant="outlined"
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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
