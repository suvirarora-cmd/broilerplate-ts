# Broilerplate Documentation

1. API Layer 
   
  UI gets coupled to backend
  Central API client
  Typed request/response

2. Runtime API Response Validator
   
   Backend bugs Happen
   APIs evolve
   TypeScript does NOT validate runtime data

3. Utility Hooks

4. Protected Routes

  Logged-in Pages
  Public pages
  Role-Based Access

5. Error Boundaries

   JS errors
   UNdefined data
   Unexpected API responses

6. Testing Setup

   Test Runner(Vitest)
   ONe exmaple test
   React Testing Library

7. CI configuration 
  
   It ensures:
    code builds
    Tests pass
    Lint rules enforced



# About API Layer

There will be a global level api layer that calls to the backend.

Then there will be feature level api that knows the endpoint, payloads, response types

We will define data contracts for all the apis


# About Api response Validator

Implemented in API LAYER

# Protected routes Implementation

A protected route ensures that only authorized users can access certain parts of the app.

