import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SendIcon from "@mui/icons-material/Send";
import GroupIcon from '@mui/icons-material/Group';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import RequestPageIcon from '@mui/icons-material/RequestPage';

export const menu = [
  {
    href: "/home",
    icon: <HomeIcon fontSize="small" />,
    title: "Home",
    access:"user"
  },
  {
    href: "/home/accounts",
    icon: <AccountBalanceIcon fontSize="small" />,
    title: "Accounts",
    access:"user"
  },
  {
    href: "/home/transfer",
    icon: <CurrencyExchangeIcon fontSize="small" />,
    title: "Transfer money",
    access:"user"
  },
  {
    href: "/home/checkRequest",
    icon: <SendIcon fontSize="small" />,
    title: "Cheque book requests",
    access:"user"
  },
  {
    href: "/home/users",
    icon: <GroupIcon fontSize="small" />,
    title: "Manage users",
    access:"admin"

  },
  {
    href: "/home/manageCheckRequest",
    icon: <MoveToInboxIcon fontSize="small" />,
    title: "Manage Cheque requests",
    access:"admin"
  },
  {
    href: "/home/manageTransactions",
    icon: <RequestPageIcon fontSize="small" />,
    title: "Manage Transactions",
    access:"admin"
  },
  {
    href: "/home/profile",
    icon: <PersonIcon fontSize="small" />,
    title: "Profile",
    access:"user"
  },
  {
    href: "/logout",
    icon: <LogoutIcon fontSize="small" />,
    title: "Logout",
    access:"user,admin"
  }
];
