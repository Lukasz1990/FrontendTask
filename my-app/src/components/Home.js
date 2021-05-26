import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import {
  Button,
  Grid,
  Typography,
  Chip,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
} from '@material-ui/core'
import Wallpaper from '../images/background.jpg'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'
import { userAPI } from '../redux/actions/userAPI'

const useStyles = makeStyles(() => ({
  card: {},
  btn: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
    width: '200px',
    borderRadius: '7px',
    padding: '10px 50px',
    fontSize: '11px',
    cursor: 'pointer',
    fontFamily: 'system-ui',
    textTransform: 'inherit',
    backgroundImage: `url(${Wallpaper})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    fontWeight: 600,
    color: 'white',
  },
  wrapper: {
    padding: '30px',
  },
}))

const Home = ({}) => {
  const dispatch = useDispatch()
  const [showUrl, changeShowUrl] = useState(
    'https://breakingbadapi.com/api/episodes'
  )
  const classes = useStyles()
  const movieCharacters = useSelector((state) => state.defaultReducer.data)
  const filteredCharackters = movieCharacters.slice(0, 10)
  console.log(movieCharacters, 'data')

  useEffect(() => {
    const fetchApis = async () => {
      const response = await axios(showUrl)
      const data = await response.data
      dispatch(userAPI(data))
    }
    fetchApis()
  }, [showUrl])

  const onChangeHandler = () => {
    changeShowUrl('https://breakingbadapi.com/api/episodes')
    if (showUrl === 'https://breakingbadapi.com/api/episodes') {
      changeShowUrl('https://breakingbadapi.com/api/characters')
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='center'
        alignContent='center'
        className={classes.wrapper}
        spacing={3}
      >
        {movieCharacters ? (
          filteredCharackters.map((item) => (
            <Grid container item md={6} justify='center' alignContent='center'>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='/static/images/cards/contemplative-reptile.jpg'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Chip
                      avatar={<Avatar>M</Avatar>}
                      label={item.name || item.title}
                      clickable
                      color='primary'
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )) &&
          filteredCharackters.map((item) => (
            <Grid container item md={6} justify='center' alignContent='center'>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image='/static/images/cards/contemplative-reptile.jpg'
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Chip
                      avatar={<Avatar>BB</Avatar>}
                      label={item.name || item.title}
                      clickable
                      color={item.name ? 'primary' : 'secondary'}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Grid>
      <Button
        fullWidth
        className={classes.btn}
        variant='contained'
        onClick={onChangeHandler}
      >
        {showUrl === 'https://breakingbadapi.com/api/episodes'
          ? 'Show charackters'
          : 'Show episodes'}
      </Button>
    </div>
  )
}
export default connect(null)(Home)
