import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchLayout from './containers/SearchLayout'
import NotFound from './components/NotFound'

const App = () => (
    <Switch>
        <Route exact path="/" component={SearchLayout} />
        <Route component={NotFound} />
    </Switch>
)

export default App
