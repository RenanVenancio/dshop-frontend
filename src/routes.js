import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Menu from './components/Menu'
import ProductList from './pages/ProductList'
import ProductCreate from './pages/ProductCreate'
import Container from '@material-ui/core/Container';

// Rotas que possuem o menu
const DefaultRoutes = () => {
    return(
        <>  
            <Menu/>
            <br/>
            <Container>
                <Route exact path="/products" component={ProductList}/>
                <Route exact path="/products/create" component={ProductCreate}/>
                <Route exact path='/products/edit/:id' component={ ProductCreate }/>
            </Container>
        </>
    )
}

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component={ DefaultRoutes }/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes