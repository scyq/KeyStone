import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import png from '../../../logo/back.png';

const backgroundImage = png;

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
    maxWidth: 200,
    marginBottom: 3
  },
  hi: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background} style={{ overflow: "auto" }}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <div className={classes.hi}>
        <Typography color="inherit" align="center" variant="h1" marked="center" style={{ marginTop: 180 }}>
          Software Interface Prototype Automatic Generator
        </Typography>

        <Typography color="inherit" align="center" variant="h4" style={{ marginBottom: 20, marginTop: 400 }}>
          Bringing dreams into reality
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          style={{ width: 200, marginBottom: 10 }}
          onClick={() => {
            props.setStatus(0);
          }}
        >
          Try it Now!
        </Button>
        <Typography variant="body2" color="inherit" align="center">
          For more, please visit the GitHub homepage via the top bar.
        </Typography>
      </div>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
