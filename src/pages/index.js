import React from 'react';
import indexRoutes from './routes';
import AppAppBar from '../components/AppAppBar';
import { Switch, Route, withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';

function Index({ classes, loading, ...parentProps }) {
  return (
    <div id="app">
      <AppAppBar />
      <Container style={{ marginTop: 40 }}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                exact={prop.exact}
                key={key}
                render={
                  prop.renderFunc
                    ? prop.renderFunc.bind(this, {})
                    : (props) => <prop.component {...parentProps} {...props} />
                }
              />
            );
          })}
        </Switch>
      </Container>
    </div>
  );
}

export default withRouter(Index);
