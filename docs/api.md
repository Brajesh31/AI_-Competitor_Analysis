# API

API routes live under the Next.js `app/api` tree. Treat request and response shapes as versioned contracts.

Routes should validate target and competitor inputs, enforce reasonable limits, return structured errors, and avoid exposing provider credentials. Document any route-specific fields, provider selection, confidence score semantics, and CSV column changes when the API evolves.
