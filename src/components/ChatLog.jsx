import React from "react";
import { Box, List, Paper, Typography } from "@mui/material";

import ChatBox from "./ChatBox";

const ChatLog = (props) => {
    const { chatLog } = props;

    return (
        <Box display="flex" flexDirection="column" flexGrow={1} overflow="auto">
            <List>
                {chatLog.length > 0 && (
                    <Paper variant="outlined">
                        {chatLog.map((prompt, index) => (
                            <ChatBox prompt={prompt} index={index} />
                        ))}
                    </Paper>
                )}
            </List>
        </Box>
    );
};

export default ChatLog;
