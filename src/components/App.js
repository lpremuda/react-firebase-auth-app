import Dashboard  from './Dashboard'
import UpdateProfile from './UpdateProfile'
import ForgotPassword from './ForgotPassword'
import Signup from './Signup'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthProvider from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{minHeight: "100vh"}}
    >
      <div className="w-100" style={{maxWidth: "400px"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/signup" component={Signup} />
              <Route path="/login"  component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
