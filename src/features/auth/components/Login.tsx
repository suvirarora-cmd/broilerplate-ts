import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login(){
    const {login, isLoading,error}=useAuth();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        await login({email,password});
    };

    return(
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email-input"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && (
        <p role="alert">
          {error.message}
        </p>
      )}
        </div>
    )
}