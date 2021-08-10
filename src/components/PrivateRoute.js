import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute(theVar) {

    const { currentUser } = useAuth()

    const { component: Johnny, ...rest } = theVar

    return (
        <Route
        {...rest}
        render={routeProps => (
            currentUser
            ? <theVar.component {...routeProps} />
            : <Redirect to="/login" />
        )}
        />
    )
}