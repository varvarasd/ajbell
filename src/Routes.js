import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home, Coin} from './pages';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/:id' component={Coin} />
            </Switch>
        </Router>
    );
}

export default Routes;
