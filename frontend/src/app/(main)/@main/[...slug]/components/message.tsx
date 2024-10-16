'use client';

// import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { DateTime } from 'luxon';
import React from 'react';
import { IconButton, Stack, Typography, Box } from '@mui/material';
import { escapeDanger } from '@/utils/function';
import { OpenMenu } from '@/hooks/useMenu';
import { MdOutlineDone, MdOutlineDoneAll, MdOutlineKeyboardArrowRight, MdStarRate } from 'react-icons/md';

type MessageProps = {
    message: {
        content: string;
        creation_time: string;
        sender: string;
        status: string;
        attachment: string[];
        media: string[];
        reaction: string;
        important: string;
        reply: {
            content: string;
        };
    };
    highlight: boolean;
    sx: any;
    openActionMenu: OpenMenu;
    selectedMessage: string;
    setSelectedMessage: (message: string) => void;
    index: number;
    variant: string;
};

type Ref = React.MutableRefObject<any>;

const Message = (props: MessageProps) => {
    const { message, highlight, sx, openActionMenu, selectedMessage, setSelectedMessage, index, variant, ...rest } = props;
    const { content, creation_time, sender, status, attachment, media } = message;
    // const dispatch = useAppDispatch();

    // const download = useCallback(async () => {
    //     showResponse('Downloading...');

    //     try {
    //         const response = await axios.get(attachment[0]?.file, {
    //             responseType: 'blob',
    //         });

    //         const type = response.data?.type.split('/')[1];

    //         const blob = new Blob([response.data]);
    //         const url = window.URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = `${Date.now()}.${type}`;
    //         document.body.appendChild(link);
    //         link.click();
    //         showResponse(`Downloaded successfully`);

    //         window.URL.revokeObjectURL(url);
    //         document.body.removeChild(link);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, [attachment, showResponse]);

    const messageBox = (
        <Box
            // ref={ref}
            {...rest}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                maxWidth: '580px',
                minWidth: { xs: '90%', sm: 'auto' },
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                padding: '8px',
                '&:hover #action': {
                    display: 'block',
                },
                backgroundColor: sender === 'assistance' ? 'primary.main' : 'background.paper',
                color: sender === 'assistance' ? 'white' : 'text.primary',
                alignSelf: sender === 'assistance' ? 'flex-end' : 'flex-start',
                mb: message.reaction ? 2 : 1,
                ...(sender === 'assistance'
                    ? {
                          '&:after': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              right: '-17px',
                              border: '20px solid transparent',
                              borderTopColor: 'primary.main',
                              borderRadius: '8px',
                          },
                      }
                    : {
                          '&:before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-17px',
                              border: '20px solid transparent',
                              borderTopColor: 'background.paper',
                              borderRadius: '8px',
                          },
                      }),
            }}>
            <IconButton
                id='action'
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    openActionMenu(e);
                    // setSelectedMessage({ ...message, index, actionMenuOpen: true });
                }}
                sx={{
                    position: 'absolute',
                    // display: selectedMessage.actionMenuOpen ? 'block' : 'none',
                    right: 0,
                    top: 0,
                    m: 0,
                    p: 0.4,
                    fontSize: '1rem',
                    bgcolor: sender === 'assistance' ? 'primary.main' : 'background.paper',
                    color: sender === 'assistance' ? 'white' : 'text.primary',
                    borderBottomLeftRadius: '160px',
                    zIndex: 10,
                    '&:hover': {
                        p: 0.4,
                        color: sender === 'assistance' ? 'white' : 'text.primary',
                        bgcolor: sender === 'assistance' ? 'primary.main' : 'background.paper',
                    },
                }}>
                <MdOutlineKeyboardArrowRight style={{ transform: 'rotate(90deg)', fontSize: '1.2rem' }} />
            </IconButton>
            {/* {attachment?.length
                ? attachment.map((file, i) => (
                      <Box
                          key={i}
                          display='flex'
                          flexDirection='column'
                          alignItems='center'
                          justifyContent='center'
                          mb={2}>
                          {isImageUrl(file.file) ? (
                              <Image src={file.file} sx={{ maxHeight: '225px' }} />
                          ) : (
                              <Stack
                                  direction='row'
                                  alignItems='center'
                                  p={0.5}
                                  minWidth='200px'
                                  width='100%'
                                  spacing={1}>
                                  <Image name='general.png' sx={{ height: '25px' }} />
                                  <Typography
                                      variant='body2'
                                      textOverflow='ellipsis'
                                      overflow='hidden'
                                      flexGrow={1}
                                      sx={{ textWrap: 'nowrap', mt: 1 }}>
                                      {media} file
                                  </Typography>
                                  {media === 'audio' ? (
                                      <IconButton
                                          sx={{ color: 'currentcolor' }}
                                          onClick={openModal}>
                                          <PlayArrowIcon fontSize='small' /> :
                                      </IconButton>
                                  ) : (
                                      <IconButton sx={{ color: 'currentcolor' }} onClick={download}>
                                          <DownloadOutlinedIcon fontSize='small' />
                                      </IconButton>
                                  )}
                              </Stack>
                          )}
                      </Box>
                  ))
                : null} */}
            {message.reply && (
                <Stack
                    direction='row'
                    spacing={2}
                    sx={{
                        minHeight: 50,
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.12)',
                        borderLeft: '3px solid',
                        borderColor: 'primary.main',
                        cursor: 'pointer',
                    }}>
                    <Box flexGrow={1} p={1}>
                        {/* <Typography variant='subtitle2' fontWeight={500} color='primary.main'>
                        {customer.first_name + ' ' + customer.last_name}
                    </Typography> */}
                        <Typography
                            variant='body2'
                            sx={{
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '3',
                            }}>
                            {message.reply.content}
                        </Typography>
                    </Box>
                </Stack>
            )}
            <Typography variant='body1' pr={{ xs: 2, sm: 8 }} dangerouslySetInnerHTML={escapeDanger(content)} />
            <Box position='absolute' display='flex' bottom={0} right='3px'>
                {message.important && <MdStarRate style={{ fontSize: 14, height: 'auto', marginTop: 0.4, marginRight: 0.3 }} />}
                <Typography variant='caption' fontSize={10} lineHeight={2.1} right={sender === 'assistance' ? '20px' : '8px'}>
                    {creation_time ? DateTime.fromISO(creation_time).toFormat('HH:mm') : null}{' '}
                </Typography>
                <Box display={sender === 'assistance' ? 'block' : 'none'}>
                    {status === 'sent' ? (
                        <MdOutlineDone style={{ fontSize: 14 }} />
                    ) : status === 'delivered' ? (
                        <MdOutlineDoneAll style={{ fontSize: 15 }} />
                    ) : (
                        <MdOutlineDoneAll style={{ fontSize: 15, color: '#5e5eea' }} />
                    )}
                </Box>
            </Box>
            {message.reaction && (
                <Box
                    position='absolute'
                    bottom={-15}
                    sx={{
                        bgcolor: sender === 'assistance' ? '#b82613' : 'white',
                        ...(sender === 'assistance' ? { right: 8 } : { left: 8 }),
                        p: 0.2,
                        borderRadius: '500px',
                        cursor: 'pointer',
                        zIndex: 20,
                    }}>
                    {message.reaction}
                </Box>
            )}
        </Box>
    );

    // if (highlight)
    //     return (
    //         <Box
    //             my={1}
    //             bgcolor='#00000026'
    //             display='flex'
    //             justifyContent={sender === 'assistance' ? 'flex-end' : 'flex-start'}
    //             borderRadius='8px'>
    //             {messageBox}
    //         </Box>
    //     );

    return messageBox;
};

export default Message;
