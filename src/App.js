import {React,useEffect} from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './Container/Home';
import Signin from './Container/Signin';
import Signup from './Container/Signup';
import PrivateRoute from './Components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import {isUserLoggedIn} from './actions';
import Products from './Container/Products';
import Orders from './Container/Orders';
import Category from './Container/Category';
import { getInitialData } from './actions/initialDataAction';
import NewPage from './Container/NewPage';
function App() {
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth);
  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  },[auth.authenticate]);
  return (
    <>
      <div className="App">
          <Switch>
          <PrivateRoute path="/" exact component={Home}></PrivateRoute>
          <PrivateRoute path="/page" exact component={NewPage}></PrivateRoute>
          <PrivateRoute path="/category" exact component={Category}></PrivateRoute>
          <PrivateRoute path="/products" component={Products}/>
          <PrivateRoute path="/orders" component={Orders}/>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
          </Switch>
      </div>
    </>);
}

export default App;
