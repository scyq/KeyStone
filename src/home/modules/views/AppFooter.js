import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item>
                <Typography variant="h6" marked="left" >
                  Acknowledgement
                </Typography>
                <ul className={classes.list}>
                  <li className={classes.listItem}>
                    Supervisor: Tong Li
                  </li>
                  <li className={classes.listItem}>
                    <Link href="https://github.com/lokesh/color-thief">ColorThief</Link>
                  </li>
                  <li className={classes.listItem}>
                    <Link href="https://github.com/fxsjy/jieba">jiebaNLP</Link>
                  </li>
                  <li className={classes.listItem}>
                    <Link href="https://material-ui.com/zh/">Material-UI</Link>
                  </li>
                </ul>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
