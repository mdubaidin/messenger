import {
    Box,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { handleAxiosError } from '../utils/function';
import { useMessage } from './Header';
import axios from 'axios';

type Query = 'Question' | 'Comment' | 'Bug' | 'Suggestion' | '';

const queries = {
    Question: {
        name: 'Ask a question',
        value: 'Question',
        question: 'What would you like to know?',
    },
    Comment: {
        name: 'Leave a comment',
        value: 'Comment',
        question: `Let us know what's on your mind`,
    },
    Bug: {
        name: 'Report a bug',
        value: 'Bug',
        question: 'Describe the bug or issue',
    },
    Suggestion: {
        name: 'Suggest an improvement',
        value: 'Suggestion',
        question: `Let us know what you'd like to improve`,
    },
};

interface FeedbackProps {
    closeModal: () => void;
}

const Feedback = (props: FeedbackProps) => {
    const { closeModal } = props;
    const [query, setQuery] = useState<Query>('');
    const [feedback, setFeedback] = useState('');
    const { showError, showSuccess } = useMessage();
    const [loading, setLoading] = useState(false);

    const sendFeedback = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/user/feedback', {
                category: query,
                content: feedback,
            });

            const { success, message } = response.data;

            if (!success) showError(message);

            showSuccess('Your feedback successfully submitted, our team appreciate your feedback');
            closeModal();
        } catch (e) {
            handleAxiosError(e, showError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            sx={{
                boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                borderRadius: '8px',
                maxWidth: '649px',
                width: '100%',
                p: 3,
                m: 2,
                mt: 8,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' color='text.secondary'>
                    Share your thoughts
                </Typography>
                <IconButton onClick={closeModal}>
                    <Close sx={{ fontSize: '18px' }} />
                </IconButton>
            </Stack>

            <Select
                fullWidth
                size='small'
                sx={{ mt: 2, mb: 3 }}
                displayEmpty
                renderValue={(v: string) => (v ? v : 'i want to...')}
                onChange={(e: SelectChangeEvent) => {
                    const value = e.target.value;
                    const v = typeof value === 'string' ? '' : value;
                    setQuery(v);
                }}>
                {Object.keys(queries).map((query, i) => (
                    <MenuItem value={query} key={i}>
                        {query}
                    </MenuItem>
                ))}
            </Select>

            <Box display={query?.toString() ? 'block' : 'none'} mb={2}>
                <Typography variant='caption' fontWeight={300}>
                    {query !== '' && queries[query].question}{' '}
                    <span style={{ color: 'red', fontSize: 15 }}>*</span>
                </Typography>
                <TextField
                    name=''
                    size='small'
                    fullWidth
                    placeholder="Let us know what's on your mind"
                    onChange={e => setFeedback(e.target.value)}
                    multiline
                    minRows={4}
                    sx={{
                        mb: 2,
                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                            fontSize: '14px',
                            'textarea::placeholder': {
                                fontSize: '14px',
                            },
                        },
                    }}
                />
                <FormGroup>
                    <FormControlLabel
                        sx={{
                            '& .MuiTypography-root': {
                                fontSize: 14,
                                color: 'text.secondary',
                            },
                        }}
                        control={<Checkbox size='small' sx={{ p: 0, px: 1 }} />}
                        label='Clikkle may contact me about this feedback.'
                    />
                </FormGroup>
            </Box>

            <Box sx={{ float: 'right' }}>
                <Button variant='text' sx={{ mr: 2 }} onClick={closeModal}>
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    onClick={sendFeedback}
                    disabled={!(query && feedback) || loading}
                    endIcon={loading && <CircularProgress size='18px' sx={{ color: 'inherit' }} />}>
                    Send feedback
                </Button>
            </Box>
        </Card>
    );
};

export default Feedback;
