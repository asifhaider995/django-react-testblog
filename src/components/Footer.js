import React from 'react';
import {Grid} from '@material-ui/core';

export default function Footer () {
  return (
    <Grid
      style={{
        backgroundColor: 'grey',
        color:'white',
        textAlign: 'center',
        paddingTop: '.75rem',
        paddingBottom: '.75rem',
        marginTop: '1rem'
      }}
    >
      <p>Test Blog &copy; Asif Haider 2020 </p>
    </Grid>
  )
}
