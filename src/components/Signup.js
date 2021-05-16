import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { signup } = useAuth()

    const baseError = 'Failed to create an account'

    async function handleClick(e) {
        // Prevents the form from refreshing
        e.preventDefault()

        if (!passwordRef.current.value || !passwordConfirmRef.current.value) {
            return setError(`${baseError}: Passwords are not filled out`)
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError(`${baseError}: Passwords do not match`)
        }

        try {
            // ASK CONNOR
            // setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            setError('')
            setMessage('Account created successfully')
        } catch (err) {
            setError(`${baseError}: ${err.message}`)
            setMessage('')
        }

        setLoading(false)

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form>
                        <h2 className="text-center mb-5">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} />
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={handleClick}
                            disable={loading}
                        >Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}