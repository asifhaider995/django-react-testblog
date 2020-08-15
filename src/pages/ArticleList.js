import React from 'react';
import { makeStyles, Icon, Grid, Card, CardActionArea, CardActions, CardContent, Button, Typography} from '@material-ui/core';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';

const myStyles = makeStyles((theme) => ({
	root : {
		maxWidth: '100%',
	},
	media : {
		height: '10rem',
	},
	actionButtons: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionButtonIcons: {
		marginRight: '.25rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			margin: '0 .5rem'
		}
	}
}));

function ArticleList(props) {
	const classes = myStyles();
	const ItemCard = (props) => {
		return (
			<Card className={classes.root}>
				<CardActionArea onClick={props.handleClick}>
					<CardContent>
						<Typography variant='h6' align='justify' display='block'> {props.title} </Typography>
						<Typography
							variant='body1'
							align='justify'
							display='block'
							color='textSecondary'
						> {props.content.length > 25 ? props.content.slice(0,25)+"..." : props.content} </Typography>
					</CardContent>
				</CardActionArea>
				<CardActions >
					<Button fullWidth color='primary' size='medium' variant='text' className={classes.actionButtons}><Icon className={classes.actionButtonIcons}><FavoriteBorderIcon /></Icon>Like</Button>
					<Button fullWidth color='secondary' size='medium' variant='text' className={classes.actionButtons}><Icon className={classes.actionButtonIcons}><CommentIcon /></Icon>Comment</Button>
					<Button fullWidth color='inherit' size='medium' variant='text' className={classes.actionButtons}><Icon className={classes.actionButtonIcons}><ShareIcon /></Icon>Share </Button>
				</CardActions>
			</Card>
		)
	}
	return props.data.map((item, index) => {
		return (
			<Grid
				key={index}
				item
				xs={12}
				sm={12}
				md={12}
				lg={12}
				xl={12}
			>
				<ItemCard handleClick={() =>props.handleClick(item.id)} title={item.title} content={item.content} />
			</Grid>
		)
	})
}

export default ArticleList
