import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import SingleProduct from '../SingleProduct/SingleProduct';
import CategoryProducts from '../CategoryProducts/CategoryProducts';
import Cart from '../Cart/Cart';
import SuccessfulPayment from '../Payments/SuccessfulPayment/SuccessfulPayment';
import FailedPayment from '../Payments/FailedPayment/FailedPayment';
import Login from '../User/Login/Login';
import Register from '../User/Register/Register';
import Account from '../User/Account/Account';
import Panel from '../Panel/Panel';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';

const Routes = () => {
    return(
        <Router>
            <div>
                <NavBar />
                <main className="Main">
                    <Switch>
                        <Route path="/" exact component={ Home } />
                        <Route path="/product/:id" exact component={ SingleProduct } />
                        <Route path="/category/:id" exact component={ CategoryProducts } />
                        <Route path="/cart" exact component={ Cart } />
                        <Route path="/success" exact component={ SuccessfulPayment } />
                        <Route path="/failed" exact component={ FailedPayment } />
                        <Route path="/signin" exact component={ Login } />
                        <Route path="/signup" exact component={ Register } />
                        <Route path="/account" exact component={ Account } />
                        <Route path="/panel" exact component={ Panel } />
                        <Route path="/search" exact component={ Search } />
                    </Switch>
                </main>
            </div>
            <Footer />
        </Router>
    )
}

export default Routes;