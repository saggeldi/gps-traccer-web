import {
  AppBar, Toolbar, Typography, IconButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navbar = ({ setOpenDrawer, title }) => (
  <AppBar position="sticky" color="inherit">
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        sx={{ mr: 2 }}
        onClick={() => setOpenDrawer(true)}
      >
        <DashboardIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
