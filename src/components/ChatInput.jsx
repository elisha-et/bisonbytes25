import React, { useState } from "react";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = (props) => {
    const { processRequest } = props;
    const [prompt, setPrompt] = useState("");

    return (
        <Box display="flex" flexDirection="column">
            <Paper variant="outlined">
                <Box display="flex" flexDirection="row" p={2}>
                    <TextField
                        label="Enter prompt"
                        variant="outlined"
                        fullWidth
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />

                    <IconButton
                        aria-label="delete"
                        onClick={() => {
                            processRequest(prompt);
                            setPrompt("");
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatInput;
