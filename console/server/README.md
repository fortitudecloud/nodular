# Console Server

This package offers a framework for implementers to run their own stack underneath the console nodular system.

The framework will handle communication to and from the console applications, as well as orchestrate user authentication/authorisation flow and responses.

Implements will be exposed to an API from this package to fill in the services needed to boot and run the server software.

## Auth providers

Rather than hold a identity system on the server, this package will rely on identity providers either on the client (Gmail, Facebook, etc oAuth2 browser) or implemented on the server.