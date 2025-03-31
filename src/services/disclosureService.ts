// Mock data for disclosures
export type ThreadMessage = {
  senderName: string;
  senderAvatar: string | null;
  content: string;  // Markdown string
  timestamp: Date;
};

export type Disclosure = {
  id: number;
  unread: boolean; // Indicates if disclosure has unread messages
  resolved: boolean; // Indicates if disclosure is resolved
  messages: ThreadMessage[];
  organization: string;
  logo: string | null;
};

// Simulated delay for API calls
const apiDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const mockDisclosures: Disclosure[] = [
  {
    id: 1,
    unread: true,
    resolved: false,
    organization: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png',
    messages: [
      {
        senderName: 'Security Researcher',
        senderAvatar: null,
        content: `# Authentication Bypass in Instagram API

## Vulnerability Details
* Severity: High
* Component: Instagram OAuth Flow
* Status: Unpatched
* CVSSv3.1 Score: 8.8

## Description
Discovered a potential authentication bypass in the Instagram OAuth implementation that could allow attackers to gain unauthorized access to user accounts.

### Technical Details
The vulnerability exists in the token validation process:
1. The API accepts expired JWTs without proper verification
2. Signature validation can be bypassed by manipulating the header
3. No rate limiting on token endpoint

## Proof of Concept
\`\`\`http
POST /oauth/token HTTP/1.1
Host: api.instagram.com
Content-Type: application/json

{
  "token": "[REDACTED]",
  "alg": "none"
}
\`\`\`

## Impact
An attacker could potentially:
- Access user accounts without authentication
- Obtain sensitive user data
- Perform actions on behalf of users

Responsible disclosure timeline will be followed.`,
        timestamp: new Date('2025-03-15T10:00:00')
      }
    ]
  },
  {
    id: 2,
    unread: false,
    resolved: true,
    organization: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    messages: [
      {
        senderName: 'Security Team Alpha',
        senderAvatar: null,
        content: `# Chrome Browser RCE Vulnerability

## Vulnerability Details
* Type: Remote Code Execution
* Component: V8 JavaScript Engine
* CVE ID: Pending
* Severity: Critical

## Technical Description
Buffer overflow vulnerability in V8's array handling could lead to remote code execution:

1. Integer overflow in array length calculation
2. Heap corruption possible through specially crafted JavaScript
3. Successful exploitation leads to arbitrary code execution

### Proof of Concept
\`\`\`javascript
// Proof of concept code redacted for security
// Full details provided in private submission
\`\`\`

## Impact Assessment
- Remote code execution with renderer process privileges
- Potential sandbox escape
- Affects Chrome versions 120.0.0 - 122.0.0`,
        timestamp: new Date('2025-02-20T15:30:00')
      },
      {
        senderName: 'Google Security Team',
        senderAvatar: null,
        content: 'Thank you for your report. We have verified the vulnerability and are working on a fix. A bounty of $31,337 has been awarded.',
        timestamp: new Date('2025-02-21T09:15:00')
      }
    ]
  },
  {
    id: 3,
    unread: true,
    resolved: false,
    organization: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    messages: [
      {
        senderName: 'Ethical Hacker',
        senderAvatar: null,
        content: `# AWS S3 Pre-Signed URL Vulnerability

## Issue Details
* Service: Amazon S3
* Component: Pre-signed URL Generation
* Severity: High
* Status: Under Investigation

## Vulnerability Description
Identified a security flaw in S3 pre-signed URL implementation that could allow unauthorized access to private buckets.

### Technical Details
1. Race condition in signature verification
2. Timestamp validation bypass possible
3. Affects all regions

\`\`\`python
# PoC code redacted
# Full exploitation details provided privately
\`\`\`

## Impact
- Unauthorized access to private S3 buckets
- Potential data exfiltration risk
- Affects organizations using pre-signed URLs`,
        timestamp: new Date('2025-03-18T14:20:00')
      }
    ]
  },
  {
    id: 4,
    unread: false,
    resolved: false,
    organization: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    messages: [
      {
        senderName: 'iOS Security Researcher',
        senderAvatar: null,
        content: `# iMessage Zero-Click Exploit Chain

## Vulnerability Summary
* Impact: Remote Code Execution
* Affected: iOS 17.0 - 17.3
* Attack Vector: iMessage
* Severity: Critical

## Technical Details
Chain of vulnerabilities in iMessage image processing:

1. Integer overflow in CoreGraphics
2. Memory corruption in ImageIO
3. Sandbox escape via IOKit

### Proof of Concept
\`\`\`
[REDACTED FOR RESPONSIBLE DISCLOSURE]
Full technical details and exploitation chain provided securely to Apple Security Team
\`\`\`

## Impact
- Zero-click remote code execution
- Full device compromise possible
- No user interaction required`,
        timestamp: new Date('2025-03-10T11:45:00')
      }
    ]
  },
  {
    id: 5,
    unread: false,
    resolved: true,
    organization: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    messages: [
      {
        senderName: 'Security Engineer',
        senderAvatar: null,
        content: `# Netflix API SSRF Vulnerability

## Vulnerability Details
* Type: Server-Side Request Forgery
* Component: Content Delivery API
* Risk Level: Medium
* Status: Fixed

## Technical Description
The content delivery API endpoint is vulnerable to SSRF attacks:

1. URL validation bypass possible
2. Internal network scanning potential
3. Cloud metadata access risk

### Reproduction Steps
\`\`\`http
POST /api/v1/content/fetch HTTP/1.1
Host: api.netflix.com
Content-Type: application/json

{
  "url": "http://169.254.169.254/latest/meta-data/"
}
\`\`\`

## Mitigation
Implement strict URL validation and disable access to internal metadata endpoints.`,
        timestamp: new Date('2025-03-01T16:00:00')
      },
      {
        senderName: 'Netflix Security',
        senderAvatar: null,
        content: 'Confirmed and patched. Bounty awarded: $5,000. Thank you for helping make Netflix more secure.',
        timestamp: new Date('2025-03-02T09:00:00')
      }
    ]
  }
];

// Service implementation
export const disclosureService = {
  // Get all disclosures
  getAll: async (): Promise<Disclosure[]> => {
    await apiDelay();
    return mockDisclosures;
  },

  // Get a single disclosure by ID
  getById: async (id: number): Promise<Disclosure | null> => {
    await apiDelay();
    return mockDisclosures.find(d => d.id === id) || null;
  },

  // Send a new message to a disclosure thread
  sendMessage: async (disclosureId: number, messageData: { content: string }): Promise<boolean> => {
    await apiDelay();
    const disclosure = mockDisclosures.find(d => d.id === disclosureId);
    if (!disclosure) return false;
    // In a real implementation, this would add the message to the database
    // For mock purposes, we just validate the parameters were provided
    return Boolean(messageData.content);
  },

  // Mark a disclosure as read
  markAsRead: async (id: number): Promise<boolean> => {
    await apiDelay();
    const disclosure = mockDisclosures.find(d => d.id === id);
    if (!disclosure) return false;
    // In a real implementation, this would update the database
    // For mock purposes, we just validate the id was found
    return true;
  }
};
