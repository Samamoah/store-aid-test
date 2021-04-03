import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    // minHeight: '100vh',
    // background: colors.alabaster,
    flex: 1,
  },
  link: {
    fontSize: 18,
  },
});

const PageNotFound = ({ classes, ...props }) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <div className={classes.content}>
        {/* <Header>Page Not Found</Header>
          <TitleAndMetaTags title="Bizway - Page Not Found" /> */}
        <div className={classes.markdown}>
          <p>Oops! Looks like you got lost.</p>

          <Link className={classes.link} to="/">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(PageNotFound);
