import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import curve from '../../../logo/curve.png';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import PaletteIcon from '@material-ui/icons/Palette';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
  iconSize: {
    width: 60,
    height: 60
  }
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src={curve}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <SelectAllIcon className={classes.iconSize} >
              </SelectAllIcon>
              <Typography variant="h6" className={classes.title}>
                Algorithm Generation
              </Typography>
              <Typography variant="h5">
                {'A near-sense word generation system based on word2vector word vectors and natural language processing.'}
                {'Helping you achieve all your needs with precision and elegance.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <PaletteIcon className={classes.iconSize}>
              </PaletteIcon>
              <Typography variant="h6" className={classes.title}>
                Colorful
              </Typography>
              <Typography variant="h5">
                {'Analyze your preferred color scheme based on the style and preference of your input.'}
                {'Enjoy the colorful, born to be colorful.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <ViewCompactIcon className={classes.iconSize}>

              </ViewCompactIcon>
              <Typography variant="h6" className={classes.title}>
                Smart Layout
              </Typography>
              <Typography variant="h5">
                {'A smart layout recommendation system based on human-computer interaction theory.'}
                {'Help you automatically generate clean and generous web layouts.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
