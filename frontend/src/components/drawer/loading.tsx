import { Box, Divider, Skeleton, Stack } from '@mui/material';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Box height={'100%'} p={2.5}>
            <Stack alignItems='center' justifyContent='center' py={4} textAlign='center'>
                <Skeleton variant='circular' width={120} height={120} sx={{ mb: 1 }} />
                <Skeleton variant='text' height={24} width={180} sx={{ mb: 0.7, borderRadius: 1.5 }} />
                <Skeleton variant='text' height={22} width={150} sx={{ mb: 0.7, borderRadius: 1.5 }} />

                <Skeleton variant='text' width={190} height={20} sx={{ borderRadius: 1.5 }} />
            </Stack>
        </Box>
    );
}
