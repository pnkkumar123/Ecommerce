import React from 'react'
import { styled } from '@mui/system';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = styled((theme)=>({
    root:{
        display:'flex',
        marginBottom:'20px',

    },
    drawer:{
        width:drawerWidth,
        flexShrink:0,
    },
    drawerPaper:{
        width:drawerWidth,
    },
}));



function SideBar() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
        <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{paper:classes.drawerPaper,}}
          >
            <List>
                <ListItem button  component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem button component={Link} to="/products">
                    <ListItemText primary="Products"/>
                </ListItem>
                <ListItem button component={Link} to="/uploadproducts">
                    <ListItemText primary="Upload Products"/>
                </ListItem>
            </List>
          </Drawer>
    </div>
  )
}

export default SideBar