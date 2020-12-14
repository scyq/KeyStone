import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
// eslint-disable-next-line
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div/>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="https://github.com/scyq/Software-Interface-Prototype-Automatic-Generator"
          >
            {'SIPAG'}
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
