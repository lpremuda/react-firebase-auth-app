import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

//{ component: ComponentLucas, ...rest }
export default function PrivateRoute(theVar) {

    const { currentUser } = useAuth()

    // ASK CONNOR - Ask Connor about function definitions ("variable : string", etc...)
    // ASK CONNOR - Ask Connor about "Closure (PrivateRoute)" vs. "Closure" vs. "Closure (./src/components/PrivateRoute.js)"
    // ASK CONNOR - Can only see "Johnny" and "rest" when break-pointed in the PrivateRoute function, but not in the "return" statement
    const { component: Johnny, ...rest } = theVar

    console.log("Another line of code for break-pointing")

    return (
        <Route
        {...rest}
        // ASK CONNOR
        // ASK CONNOR
        // ASK CONNOR - Where does the variable props come from? Ok, I found out its part of the react-router-dom API
        render={props => {
            return currentUser ? <theVar.component {...props} /> : <Redirect to="/login" />
        }}
        ></Route>
    )
}