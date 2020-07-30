import React from 'react';
import {CssBaseline, Container} from '@material-ui/core';

export default function Layout (props){
    return (
        <React.Fragment>
          <CssBaseline />
          <Container
            fixed
            maxWidth="md"
            style={{
              backgroundColor: '#d2e1e7',
              boxShadow: '5px black',
              padding: '0.5rem',
            }}>
              {props.children}
          </Container>
        </React.Fragment>
    )
}
