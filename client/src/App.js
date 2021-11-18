import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CharacterCreate from './components/CharacterCreate';
import Details from './components/Details';
import { NotFound } from './components/NotFound';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Home} />
					<Route path="/character" component={CharacterCreate} />
					<Route path="/home/:id" component={Details} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
