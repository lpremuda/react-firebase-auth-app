import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push("/login")
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Dashboard</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="mb-3">
                        <strong>Email:</strong> {currentUser.email}
                    </div>
                    <Link to="/update-profile" className="w-100 btn btn-primary">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Sign Out</Button>
            </div>
        </>
    )
}