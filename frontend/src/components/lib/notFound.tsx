import Link from 'next/link';
import { Button, Container, Stack, Typography } from '@mui/material';
import Logo from '/public/images/logo.png';
import Image from 'next/image';

export type NotFoundProps = {
    title?: string;
    code?: number;
    description?: string;
    hideExtras?: boolean;
    hideCode?: boolean;
    hideLogo?: boolean;
};

export function NotFound(props: NotFoundProps) {
    return (
        <Container maxWidth='lg' sx={{ minHeight: '100vh' }}>
            <Stack justifyContent='center' alignItems='center' minHeight='calc(100vh - 80px)' textAlign='center'>
                {!props.hideCode ? (
                    <Typography variant='h4' color='text.secondary'>
                        {props.code || '404'}
                    </Typography>
                ) : null}

                {!props.hideLogo ? <Image src={Logo} style={{ width: 75, height: 'auto', marginBottom: 16 }} alt='logo' /> : null}
                <Typography variant='h4' mb={1}>
                    {props.title ? props.title : `This Page isn't available`}
                </Typography>
                <Typography variant='subtitle1'>
                    {props.description ? props.description : `Sorry, we couldn’t find the page you’re looking for`}
                </Typography>
                {!props.hideExtras ? (
                    <Button variant='contained' LinkComponent={Link} href='/chats' sx={{ my: 2, py: 1, borderRadius: '10px' }}>
                        Return to messenger
                    </Button>
                ) : null}
            </Stack>
        </Container>
    );
}

export function PageNotFound() {
    return (
        <NotFound
            title="This Page isn't available"
            description="The link that you followed may be broken or the Page may have been removed. That's all we know"
            hideCode
        />
    );
}

export function FailedToLoad(props: NotFoundProps) {
    return (
        <NotFound
            title='Failed to Load'
            description='An error occurred while trying to load the page. Please try again later.'
            hideCode
            hideExtras
            hideLogo
            {...props}
        />
    );
}
