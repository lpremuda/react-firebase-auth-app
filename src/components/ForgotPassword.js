import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleClick(e) {
        // Prevents the form from refreshing
        e.preventDefault()

        if (!emailRef.current.value) {
            return setError('Email not entered')
        }

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage(`Password reset email sent to ${emailRef.current.value}`)
        } catch {
            setError('Failed to reset password')
        }

        setLoading(false)

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form>
                        <h2 className="text-center mb-4">Password Reset</h2>
                        <h6 className="mb-5">Please enter in email to reset password</h6>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} />
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={handleClick}
                            disable={loading}
                        >Reset Password</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}