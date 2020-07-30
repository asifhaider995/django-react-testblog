import React from 'react';
import {HomeIcon, NavigateNextIcon} from '@material-ui/icons/NavigateNext';
import {Breadcrumbs, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'


export default function NavBreadcrumb(props) {
  return (
    <div>
      <div style={{paddingTop: '.5rem', paddingBottom: '.5rem', paddingLeft: '1rem'}}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small"  />} aria-label="breadcrumb">
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'black',
              }}
            >
                Home
            </Link>
        </Breadcrumbs>
      </div>
    </div>
  )
}
