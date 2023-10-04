import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(firstName, lastName, email, password)
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label> First Name:</label>
            <input
            type="text"
            onChange={(e)=> setFirstName(e.target.value)}
            value={firstName}
            />
            <label> Last Name:</label>
            <input
            type="text"
            onChange={(e)=> setLastName(e.target.value)}
            value={ lastName }
            />
            <label> Email:</label>
            <input
            type="email"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
            <label> Password:</label>
            <input
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            />
            <button disabled={isLoading}>Signup</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup