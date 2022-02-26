import { Suspense } from "react"
import { BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Grid, Button } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    body: {
      height: "100%",
      margin: 0,
    },

    content: {
      backgroundImage:
        "url(https://www.genekor.com/media/1301/3d-background-with-rotating-dna-string-4k-ultra-hd-alpha-channel-dna-technology-helix-strands-science-technology-animated-background_eyppyv1-g__f0000.png)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: "absolute",
      display: "flex",
      flexGrow: 1,
      padding: theme.spacing(3),
    },

    button: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 2,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 40,
      width: 120,
      outlined: true,
      padding: "0 30px",
    },
  })
)

const UserInfo = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs>
            <Button href={"./manageOrder"} className={classes.button} variant="outlined">
              LAUNCH
            </Button>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={async () => {
                await logoutMutation()
              }}
            >
              LOGOUT
            </Button>
          </Grid>
        </Grid>
      </>
    )
  } else {
    return (
      <>
        <Button href={"./signup"} className={classes.button}>
          SIGN UP
        </Button>
        <Button href={"./login"} className={classes.button}>
          LOGIN
        </Button>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.content}>
      <div>
        <Grid container item xs={4}>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <div>
              <img src="/logo.png" alt="blitz.js" />
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <Suspense fallback="Loading...">
                <UserInfo />
              </Suspense>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
