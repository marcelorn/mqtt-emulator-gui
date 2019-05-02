import React from 'react';
//import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import HomePage from './pages/Home2';
//import FormsPage from './pages/Forms';

import { 
	AppBar, AppContent,
} from './components';

import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';

const theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: lime
	}
});

function App(props) {

/*	let onDrawerEntryClick = (entryPath) => {
		console.log('Moving to path', entryPath);
		props.history.push(entryPath);
	}
*/
  return (
	<MuiThemeProvider theme={theme}>
		<AppBar title="Emulador">
			<AppContent>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Redirect to="/" /> 
				</Switch>
			</AppContent>
		</AppBar>
	</MuiThemeProvider>
  );
}

export default withRouter(App);
