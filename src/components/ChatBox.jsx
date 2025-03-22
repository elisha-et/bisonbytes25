import React from "react";
import { Box, ListItem, Typography } from "@mui/material";

import ReactMarkdown from "react-markdown";

const ChatBox = (props) => {
    const { prompt } = props;

    return (
        <ListItem>
            <Box display="flex" flexDirection="column" p={4}>
                <Typography variant="h5">{prompt.input}</Typography>

                <Typography>
                    <ReactMarkdown>{prompt.response}</ReactMarkdown>
                </Typography>
            </Box>
        </ListItem>
    );
};

export default ChatBox;
