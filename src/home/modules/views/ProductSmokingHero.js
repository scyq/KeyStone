import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9),
  },
  button: {
    border: '4px solid currentColor',
    borderRadius: 0,
    height: 'auto',
    padding: theme.spacing(2, 5),
  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    width: 60,
  },
});

function ProductSmokingHero(props) {
  const { classes } = props;

  return (
    <Container className={classes.root} component="section">
      <Button className={classes.button} onClick={() => {
        const w = window.open('about:blank');
        w.location.href = 'https://github.com/scyq/Software-Interface-Prototype-Automatic-Generator/issues';
      }}>
        <Typography variant="h4" component="span">
          碰到麻烦了？需要帮助？
        </Typography>
      </Button>
      <Typography variant="subtitle1" className={classes.link} >
        我们为您持续提供帮助，欢迎在GitHub上发布您碰到的issue
      </Typography>
      <IconButton color="inherit" onClick={() => {
        const w = window.open('about:blank');
        w.location.href = 'https://github.com/scyq/Software-Interface-Prototype-Automatic-Generator';
      }}>
        <GitHubIcon />
      </IconButton>
    </Container>
  );
}

ProductSmokingHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductSmokingHero);
