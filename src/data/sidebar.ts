import KeyIcon from '@mui/icons-material/KeyOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCardOutlined';
import WorkspacesIcon from '@mui/icons-material/WorkspacesOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import DataUsageIcon from '@mui/icons-material/DataUsageOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import LayersIcon from '@mui/icons-material/LayersOutlined';
import DeviceHubIcon from '@mui/icons-material/DeviceHubOutlined';
import DiamondIcon from '@mui/icons-material/DiamondOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { SvgIconComponent } from '@mui/icons-material';

interface Structure {
    name: string;
    icon: SvgIconComponent;
    to: string;
}

const Dashboard: Structure[] = [
    {
        name: 'Overview',
        icon: DataUsageIcon,
        to: '/',
    },
    {
        name: 'Secret Keys',
        icon: KeyIcon,
        to: '/secret-keys',
    },
    {
        name: 'Cards',
        icon: CreditCardIcon,
        to: '/cards',
    },
    {
        name: 'Marketplace',
        icon: WorkspacesIcon,
        to: '/marketplace',
    },
];

const Account: Structure[] = [
    {
        name: 'History',
        icon: PeopleIcon,
        to: '/history',
    },
    {
        name: 'Messeges',
        icon: PersonIcon,
        to: '/messeges',
    },
];

const Links: Structure[] = [
    {
        name: 'Marked',
        icon: LayersIcon,
        to: '/history',
    },
    {
        name: 'New',
        icon: DeviceHubIcon,
        to: '/messeges',
    },
    {
        name: 'Trends',
        icon: DiamondIcon,
        to: '/messeges',
    },
    {
        name: 'Favorite',
        icon: FavoriteIcon,
        to: '/messeges',
    },
    {
        name: 'Settings',
        icon: SettingsIcon,
        to: '/settings',
    },
];

export { Dashboard, Account, Links };
