import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function UpdateProfile() {

    const [loading, setLoading] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [messageEmail, setMessageEmail] = useState('')
    const [messagePassword, setMessagePassword] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { currentUser, updateEmail, updatePassword } = useAuth()

    async function handleClick(e) {
        // Prevents the form from refreshing
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value)  {
            setMessagePassword('Passwords do not match')
            setErrorPassword(true)
            return
        }

        setLoading(true)

        setErrorEmail(false)
        setMessageEmail('')
        if (emailRef.current.value) {
            if (emailRef.current.value !== currentUser.email) {
                try {
                    setErrorEmail(false)
                    await updateEmail(emailRef.current.value)
                    setMessageEmail('Email updated successfully')
                } catch {
                    setMessageEmail('Failed to update email')
                    setErrorEmail(true)
                }
                 
            }
        }

        // Password
        setMessagePassword('')
        setErrorPassword(false)

        if (passwordRef.current.value && passwordConfirmRef.current.value) {
            try {
                await updatePassword(passwordRef.current.value)
                setMessagePassword('Password updated successfully')
            } catch {
                setMessagePassword('Failed to update password')
                setErrorPassword(true)
            }
        }

        setLoading(false)

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form>
                        <h2 className="text-center mb-5">Update Profile</h2>
                        {messageEmail && <Alert variant={errorEmail ? "danger" : "success"}>{messageEmail}</Alert>}
                        {messagePassword && <Alert variant={errorPassword ? "danger" : "success"}>{messagePassword}</Alert>}
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={handleClick}
                            disable={loading}
                        >Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="text-center mt-2">
                <Link to="/">Back to Dashboard</Link>
            </div>
        </>
    )
}