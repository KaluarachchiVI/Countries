import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Avatar, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { Login, Logout, AccountCircle } from '@mui/icons-material';

export const UserAuth = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        login({
            name: 'Demo User',
            email: 'demo@example.com',
            avatar: 'https://i.pravatar.cc/150?img=3',
        });
        handleClose();
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <div>
            {user ? (
                <>
                    <Button
                        onClick={handleMenu}
                        color="inherit"
                        startIcon={<Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />}
                        sx={{ textTransform: 'none' }}
                    >
                        <Typography variant="body1" sx={{ ml: 1 }}>
                            {user.name}
                        </Typography>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <AccountCircle sx={{ mr: 1 }} /> Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <Logout sx={{ mr: 1 }} /> Logout
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Button
                    color="inherit"
                    startIcon={<Login />}
                    onClick={handleLogin}
                    sx={{
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    Login
                </Button>
            )}
        </div>
    );
};