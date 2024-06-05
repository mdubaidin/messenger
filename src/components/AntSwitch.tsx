import { Switch, SwitchProps, styled } from '@mui/material';

const CustomSwitch = styled(props => <Switch {...props} />)(({ theme }) => ({
    width: 48,
    height: 22,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 18,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(26px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,

        '&.Mui-checked': {
            transform: 'translateX(26px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 16.5,
        height: 16.5,
        borderRadius: 18,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 34 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

export default function AntSwitch(props: SwitchProps) {
    return <CustomSwitch {...props} />;
}
