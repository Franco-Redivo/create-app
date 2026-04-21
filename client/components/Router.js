import React from 'react'
import { Route, Switch } from 'react-router-dom'

import FrontPage from 'Components/FrontPage'
import MessageView from 'Components/MessageView'

const Router = () => (
	<Switch>
		<Route exact path="/" component={FrontPage} />
		<Route exact path="/messages" component={MessageView} />
	</Switch>
)

export default Router

