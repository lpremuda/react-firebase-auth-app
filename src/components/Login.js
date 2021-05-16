import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const baseError = 'Failed to log in'

    async function handleClick(e) {
        // Prevents the form from refreshing
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (err) {
            setError(`${baseError}: ${err.message}`)
        }

        setLoading(false)

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form>
                        <h2 className="text-center mb-5">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} />
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={handleClick}
                            disable={loading}
                        >Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}