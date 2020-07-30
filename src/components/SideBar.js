import React from 'react';
import {Drawer, List, ListItem, ListItemText, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root : {
    maxWidth: '100%'
  },
  listItem : {
    width: '12rem',
    justifyContent: 'center',
  }
}));

export default function SideBar(props) {
  const classes = useStyles();

  return (
      <Drawer variant='temporary' anchor='left' open={props.open} onClose={props.onClose}>
        <div>
        <List>
          <ListItem className={classes.listItem}><ListItemText> Home </ListItemText></ListItem>
          <ListItem className={classes.listItem}><ListItemText> Create </ListItemText></ListItem>
          <hr />
          <ListItem className={classes.listItem}><ListItemText> Login </ListItemText></ListItem>
        </List>
        <p> NB: This is a static drawer, please modify </p>
        </div>
      </Drawer>
  );
}
