# Security policy

## Supported versions

Only the latest default-branch static site is supported. Older deployments and forks are unsupported.

## Private vulnerability reporting

Use GitHub private vulnerability reporting from the repository's **Security** tab, or contact the owner privately through the owner's GitHub profile if unavailable. Do not use public issues for undisclosed vulnerabilities.

## Security expectations

- Serve the site over HTTPS with appropriate CSP and browser security headers.
- Keep dependencies and deployment workflows reviewed and updated.
- If analytics or a contact backend is added, document collection, consent, retention, deletion, and third-party sharing before deployment.

# Security & Privacy Remediation Backlog

The standard scan found no validated vulnerabilities in the reviewed scope. The site is static, has no data-submission backend, and uses text-safe DOM updates for language switching.
