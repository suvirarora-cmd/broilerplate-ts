# Broilerplate Documentation

1. API Layer (DONE)
   
  UI gets coupled to backend
  Central API client
  Typed request/response

2. Runtime API Response Validator (DONE)
   
   Backend bugs Happen
   APIs evolve
   TypeScript does NOT validate runtime data

3. Error Boundaries(DONE)

   JS errors
   UNdefined data
   Unexpected API responses

4. Testing Setup(DONE)

   Test Runner(Vitest)
   ONe exmaple test
   React Testing Library

5. CI configuration (DONE)
  
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

