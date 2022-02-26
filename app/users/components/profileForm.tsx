import {
  Paper,
  Button,
  TextField,
  Grid,
  CardActions,
  Divider,
  CardContent,
  makeStyles,
  Avatar,
} from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import AddressTable from "app/addresses/components/addressTable"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  sizeAvatar: {
    height: theme.spacing(16),
    width: theme.spacing(16),
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

type UserProfileFormProps = {
  onSuccess?: () => void
}

export const UserProfileForm = (props: UserProfileFormProps) => {
  const classes = useStyles()

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <CardContent>
          <Grid container spacing={3} justify="center" padding={3}>
            <Avatar
              className={classes.sizeAvatar}
              alt="Bob Ding"
              src="https://media-exp3.licdn.com/dms/image/C4E03AQE6361v7gbizg/profile-displayphoto-shrink_800_800/0/1519702447729?e=1629936000&v=beta&t=zO0_cmuQZ2Afetzgp3DdFikDoBwb6Vq6McyZUjZ72KE"
            />
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs>
              <h3>Identity</h3>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <TextField variant="filled" label="Your Name (Alias)" color="primary" fullWidth />
            </Grid>
            <Grid item xs>
              <TextField variant="filled" label="Phone Number" color="primary" fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <TextField
                variant="filled"
                label="Email Address (Cannot Change Due to Login Need)"
                color="primary"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
          <br />

          <Grid container spacing={0}>
            <Grid item xs>
              <h3>Address Details</h3>
            </Grid>
          </Grid>
          <AddressTable />
        </CardContent>
        <Divider />
        <CardActions>
          <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />}>
            Save
          </Button>
        </CardActions>
      </Paper>
    </main>
  )
}
