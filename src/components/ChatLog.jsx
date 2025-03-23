import React from "react";
import { Box, CircularProgress, List, Paper } from "@mui/material";

import ChatBox from "./ChatBox";

const ChatLog = (props) => {
    const { chatLog, showSpinner } = props;

    return (
        <Box
            alignContent="center"
            display="flex"
            flexDirection="column"
            flexGrow={1}
            overflow="auto"
        >
            <List>
                {chatLog.length > 0 && (
                    <Paper variant="outlined">
                        {chatLog.map((prompt) => (
                            <ChatBox prompt={prompt} />
                        ))}
                    </Paper>
                )}
            </List>
            
            {showSpinner && (
                <Box p={4}>
                    <CircularProgress
                        id="prompt spinner"
                        size="3rem"
                    />
                </Box>
            )}
        </Box>
    );
};

export default ChatLog;
