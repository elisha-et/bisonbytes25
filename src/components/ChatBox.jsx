import React from "react";
import { Box, ListItem, Paper, Typography } from "@mui/material";

const ChatBox = (props) => {
    const { prompt, index } = props;

    return (
        <ListItem mb={4}>
            <Box display="flex" flexDirection="column" p={4}>
                <Typography variant="h5">{prompt.input}</Typography>
                <Typography>{prompt.response}</Typography>
            </Box>
        </ ListItem>
    );
};

export default ChatBox;
