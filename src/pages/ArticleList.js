import React from 'react';
import { makeStyles, Card, CardActionArea, CardActions, CardContent, Button, Typography} from '@material-ui/core';


const myStyles = makeStyles({
	root : {
		maxWidth: '100%',
	},
	media : {
		height: '10rem',
	}
});

function ArticleList(props) {
	const myClasses = myStyles();
	let newText = props.content.length > 25 ? props.content.slice(0,25)+"..." : props.content;
	return (
		<Card className={myClasses.root}>
			<CardActionArea onClick={() => props.onClick()}>
				{/* <CardMedia
					className= {myClasses.media}
					image=""
					title=""
				/> */}
				<CardContent>
					<Typography variant='h6' align='justify' display='block'> {props.title} </Typography>
					<Typography
						variant='body1'
						align='justify'
						display='block'
						color='textSecondary'
					> {newText} </Typography>
				</CardContent>
			</CardActionArea>
			<CardActions >
				<Button fullWidth color='primary' size='medium' variant='text'>Like</Button>
				<Button fullWidth color='secondary' size='medium' variant='text'>Comment</Button>
				<Button fullWidth color='inherit' size='medium' variant='text'> Share </Button>
			</CardActions>
		</Card>
	)
}

export default ArticleList
