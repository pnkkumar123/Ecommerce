import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{color: "rgb(255 255 255)"}}>
      <Toolbar className="flex justify-between">
        <div>
          {/* Logo */}
          <NavLink to="/dashboard" className="text-white">
            <Typography variant="h6" component="div">
              Ecommerce Dashboard
            </Typography>
          </NavLink>
        </div>
        <div className="navlinks">
          {/* Navigation Links */}
          <NavLink to="/uploadproducts" className="text-white">
            <Button color="inherit">Upload Products</Button>
          </NavLink>
          <NavLink to="/products" className="text-white">
            <Button color="inherit">Products</Button>
          </NavLink>
          <NavLink to="/signin" className="text-white">
            <Button color="inherit">Sign-IN</Button>
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
