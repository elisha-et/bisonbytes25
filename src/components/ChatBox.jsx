import React from "react";
import { Box, IconButton, ListItem, Typography } from "@mui/material";

import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

import ReactMarkdown from "react-markdown";
import { useSpeech } from "react-text-to-speech";

const ChatBox = (props) => {
    const { prompt } = props;
    const { start } = useSpeech({ text: prompt.response });

    return (
        <ListItem>
            <Box display="flex" flexDirection="column" p={4}>
                <Typography variant="h5">{prompt.input}</Typography>
                <ReactMarkdown>{prompt.response}</ReactMarkdown>

                <Box>
                    <IconButton aria-label="send" onClick={start}>
                        <SpeakerNotesIcon />
                    </IconButton>
                </Box>
            </Box>
        </ListItem>
    );
};

export default ChatBox;
