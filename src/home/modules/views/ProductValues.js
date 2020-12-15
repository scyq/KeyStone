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
                算法生成
              </Typography>
              <Typography variant="h5">
                {'基于word2vector词向量以及自然语言处理的近义词生成系统。'}
                {'帮您实现所有的需求，精确、优雅。'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <PaletteIcon className={classes.iconSize}>
              </PaletteIcon>
              <Typography variant="h6" className={classes.title}>
                缤纷色彩
              </Typography>
              <Typography variant="h5">
                {'根据您的输入的风格、喜好分析您喜欢的配色。'}
                {'乐享缤纷，生来多彩。'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <ViewCompactIcon className={classes.iconSize}>

              </ViewCompactIcon>
              <Typography variant="h6" className={classes.title}>
                智能布局
              </Typography>
              <Typography variant="h5">
                {'基于人机交互引论的智能布局推荐系统。'}
                {'帮您自动生成简洁、大方的网页布局。'}
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
