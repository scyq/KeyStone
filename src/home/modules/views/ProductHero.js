import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage = "https://images.cnblogs.com/cnblogs_com/scyq/1823238/o_201214140933back.png"

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
      <ProductHeroLayout backgroundClassName={classes.background} style={{overflow: "auto"}}>
        {/* Increase the network loading priority of the background image. */}
        <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
        <div className={classes.hi}>
          <Typography color="inherit" align="center" variant="h1" marked="center" style={{ marginTop: 180 }}>
            软件交互原型自动生成系统
        </Typography>

          <Typography color="inherit" align="center" variant="h4" style={{ marginBottom: 20, marginTop: 400 }}>
            把梦想照进现实
        </Typography>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            style={{ width: 200, marginBottom: 10}}
          >
            Try it Now!
        </Button>
          <Typography variant="body2" color="inherit" align="center">
            更多内容请通过顶部栏访问GitHub主页.
        </Typography>
        </div>
      </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
