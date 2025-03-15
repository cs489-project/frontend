export interface Opportunity {
  id: string;
  title: string;
  company: string;
  datePosted: Date;
  previewDescription: string;
  detailedDescription: string;
  logo: string;
  tags: string[];
  responsibleDisclosureUrl: string;
}

// Mock data for opportunities
const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Messenger Payment Security",
    company: "Facebook",
    datePosted: new Date(Date.now() - 1 * 60 * 60 * 1000),
    previewDescription:
      "Assist Facebook's security team in identifying vulnerabilities in their payment processing system to ensure secure transactions.",
    detailedDescription: 
      `### Facebook Messenger Payment Security Program

#### Overview
Facebook is looking for skilled security researchers to help identify vulnerabilities in their Messenger payment processing system. This program focuses on ensuring all transactions are secure and that user financial data is protected from potential threats.

#### Program Details
- **Start Date**: Immediate
- **Duration**: Ongoing
- **Response Time**: 24-48 hours

#### Focus Areas
Our security team is particularly interested in:

* Authentication bypass in payment flows
* Transaction manipulation vulnerabilities
* Data exposure of financial information
* Payment session hijacking
* Cross-site scripting in payment interfaces
* SQL injection in payment processing

#### Submission Requirements
Successful submissions should include:

1. Clear, detailed reproduction steps
2. Proof of concept code (if applicable)
3. Impact assessment
4. Suggested remediation approaches

#### Out of Scope
The following are considered out of scope:
- Theoretical vulnerabilities without proof of exploitation
- Rate limiting issues that don't affect payment systems
- Previously reported vulnerabilities
- Social engineering attacks

#### Resources
Researchers are encouraged to review our [Payment API Documentation](https://developers.facebook.com/docs/payments) before beginning testing.

---

*Facebook is committed to creating a safe environment for all users. Your contributions help us maintain the integrity and security of our payment systems.*`,
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    tags: ["Payment Security", "Web Application", "Financial Data"],
    responsibleDisclosureUrl: "https://www.facebook.com/whitehat"
  },
  {
    id: "2",
    title: "iCloud API Rate Limits",
    company: "Apple",
    datePosted: new Date(Date.now() - 3 * 60 * 60 * 1000),
    previewDescription:
      "Help Apple discover potential bypasses or abuse vectors in the iCloud API rate-limiting system.",
    detailedDescription: 
      `### iCloud API Rate Limiting Security Research

#### Program Description
Apple is seeking security researchers to identify potential bypasses or abuse vectors in the iCloud API rate-limiting system. Our goal is to ensure our cloud infrastructure remains resilient against potential denial of service attacks and abuse.

#### Why This Matters
Rate limiting is a critical defense mechanism that:
- Protects our services from being overwhelmed
- Prevents abuse and automated attacks
- Ensures fair resource distribution for all users
- Safeguards user data and privacy

#### Technical Focus Areas
We are particularly interested in:

##### Primary Concerns
* Multi-account coordination to bypass limits
* Header manipulation techniques
* IP rotation and proxy bypass methods
* Request timing manipulations
* Authentication token reuse strategies
* Distributed request patterns that evade detection

##### Target Endpoints
Our priority endpoints for testing include:
1. Authentication services
2. Data sync mechanisms
3. Photo storage APIs
4. Document storage and retrieval
5. Backup services

#### Submission Guidelines
For your submission to be considered, please include:

| Requirement | Details |
|-------------|---------|
| Reproduction | Step-by-step instructions |
| Proof | Working proof of concept |
| Impact | Clear explanation of business impact |
| Mitigation | Suggested approaches to fix |

#### Testing Boundaries
> **Important**: All testing must be performed against your own iCloud accounts only. Any testing that impacts other users will be disqualified.

#### Contact
For questions regarding this program, please contact our security team at [security-research@apple.com](mailto:security-research@apple.com).

---

*Apple values the contributions of the security research community in helping us provide the most secure experience possible for our users.*`,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    tags: ["API Security", "Rate Limiting", "Cloud Services"],
    responsibleDisclosureUrl: "https://security.apple.com/bounty/"
  },
  {
    id: "3",
    title: "AWS Identity Management",
    company: "Amazon",
    datePosted: new Date(Date.now() - 24 * 60 * 60 * 1000),
    previewDescription:
      "Conduct penetration testing on AWS IAM flows to identify privilege escalation and misconfiguration issues.",
    detailedDescription: 
      `### AWS Identity and Access Management (IAM) Security Assessment

#### Challenge Overview
Amazon Web Services is looking for security experts to conduct penetration testing on AWS Identity and Access Management (IAM) flows. Help us strengthen the security backbone of the world's most comprehensive cloud platform.

#### About This Opportunity
AWS IAM is the gatekeeper for millions of cloud resources worldwide. Our security team is proactively seeking to identify potential weaknesses before malicious actors can exploit them.

![AWS Security Architecture](https://d1.awsstatic.com/security-center/security-pillar.77f5688ded84129766dea3acee11a3148144ea9a.png)

#### Technical Challenge Areas

##### Core Assessment Objectives
- **Privilege Escalation Paths**: Discover methods to gain elevated permissions through IAM configuration flaws
- **Permission Boundary Bypasses**: Identify techniques to circumvent established permission boundaries
- **Trust Policy Vulnerabilities**: Explore weaknesses in role trust relationships
- **Service-Linked Role Issues**: Assess potential misconfigurations in service-linked roles
- **Cross-Account Access**: Evaluate security of cross-account access mechanisms

##### Testing Environment
Researchers will be provided with:
* Dedicated AWS sandbox accounts
* Sample IAM configurations with intentional weaknesses
* API access to relevant AWS services
* Documentation for advanced IAM features

#### Success Criteria
High-quality submissions must include:

1. **Clear Documentation**
   - Detailed step-by-step reproduction
   - Environmental requirements
   - Screenshots or command logs

2. **Severity Assessment**
   - Potential business impact
   - Exploitation difficulty
   - Scope of affected resources

3. **Remediation Recommendations**
   - Suggested policy changes
   - Configuration hardening advice
   - Detection mechanisms

#### Program Rules
- All testing must be performed exclusively in provided sandbox environments
- No testing against production AWS infrastructure
- No exfiltration of customer data
- No disclosure of vulnerabilities prior to remediation
- No automated scanning tools without prior approval

#### Submission Process
1. Document your findings thoroughly
2. Submit through our secure portal
3. Our security team will evaluate within 5 business days
4. Engage in Q&A about your submission
5. Receive recognition for valid findings

> "At AWS, security is job zero. By engaging the security community, we can identify potential issues before they impact our customers." - AWS Security Team

#### Additional Resources
- [AWS IAM Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- [AWS Security Best Practices](https://aws.amazon.com/architecture/security-identity-compliance/)
- [Previous Vulnerability Reports](https://bugcrowd.com/amazonwebservices)

---

*Amazon Web Services appreciates your expertise in helping us maintain the highest security standards for our global cloud infrastructure.*`,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    tags: ["Identity Management", "Cloud Security", "Network Security", "Privilege Escalation"],
    responsibleDisclosureUrl: "https://aws.amazon.com/security/vulnerability-reporting/"
  },
  {
    id: "4",
    title: "User Authentication Flows",
    company: "Netflix",
    datePosted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    previewDescription:
      "Perform security assessments of Netflix's authentication and Single Sign-On processes to uncover potential credential leaks or session fixation attacks.",
    detailedDescription: 
      `### Netflix Authentication Security Assessment Program

#### Program Introduction
Netflix is seeking security researchers to perform comprehensive assessments of our authentication and Single Sign-On (SSO) processes. Help us ensure the security of over 200 million global accounts by identifying vulnerabilities in our sign-in infrastructure.

#### The Challenge
Our streaming platform serves millions of users across devices worldwide. The authentication system must be both user-friendly and highly secure, creating a complex security landscape.

#### Target Assessment Areas

##### Authentication Mechanisms
- **Traditional Email/Password Authentication**
  - Password reset flows
  - Account recovery processes
  - Brute force protections
  - 2FA implementation

##### Single Sign-On (SSO) Implementations
- **OAuth 2.0 Flows**
  - Authorization code handling
  - Token security
  - Scope validation

- **SAML Integration**
  - XML signature verification
  - Session management
  - Assertion validation

##### Mobile Authentication
- **Mobile app authentication**
  - Biometric implementation
  - Device trust mechanisms
  - PIN/pattern security

##### TV & Device Authentication
- **Device pairing flows**
  - QR code authentication
  - Device linking security
  - Persistent authentication tokens

#### Security Concerns of Interest

\`\`\`
Priority focus areas include:
- Credential leakage vectors
- Session fixation vulnerabilities
- Authentication bypass techniques
- Cross-site request forgery in auth flows
- Token manipulation attacks
- Logic flaws in multi-step processes
\`\`\`

#### Research Environment
Researchers will have access to:

* Dedicated test accounts
* Development environment access
* API documentation
* Authentication flow diagrams

#### Submission Requirements

##### Required Information
1. Detailed attack scenario
2. Step-by-step reproduction
3. Impact analysis
4. Affected user segments
5. Suggested mitigations

##### Video Evidence
For high-severity findings, we strongly encourage including screen recordings demonstrating the vulnerability.

#### Program Rules
- All testing must be conducted against test accounts only
- No automated scanning without approval
- No testing against production user accounts
- No social engineering of Netflix employees
- Responsible disclosure required

#### Researcher Recognition
- Named credit in security acknowledgments
- Exclusive Netflix security researcher merchandise
- Invitation to private security events
- Top contributors featured in case studies

> "At Netflix, we believe that collaboration with the security community is essential to protecting our members' accounts and data." - Netflix Security Team

---

*Netflix is committed to maintaining the highest standards of security for our global user base. Your expertise helps us achieve this mission.*`,
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg",
    tags: ["Authentication", "SSO", "Mobile Application", "Session Security"],
    responsibleDisclosureUrl: "https://help.netflix.com/en/node/6657"
  },
  {
    id: "5",
    title: "Workspace File Sharing",
    company: "Google",
    datePosted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    previewDescription:
      "Help Google identify access control weaknesses and potential data leakage issues within Google Workspace file sharing.",
    detailedDescription: 
      `### Google Workspace File Sharing Security Assessment

#### Program Overview
Google is looking for security researchers to identify access control weaknesses and potential data leakage issues within Google Workspace file sharing features. Help us ensure that the collaboration platform trusted by millions of businesses worldwide maintains the highest security standards.

#### Background
Google Workspace (formerly G Suite) powers collaboration for organizations around the globe. The security of shared documents, spreadsheets, presentations, and other collaborative assets is critical to maintaining user trust and data confidentiality.

![Google Workspace Collaboration](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Workspace.max-1300x1300.jpg)

#### Security Research Focus Areas

##### Access Control Mechanisms
- **Sharing Permission Models**
  - Document/folder permission inheritance
  - Link sharing restrictions
  - Domain-restricted sharing
  - Time-bounded access controls

##### Data Protection
- **Information Barriers**
  - Cross-user data isolation
  - Multi-tenant security boundaries
  - Data loss prevention controls

##### Identity & Authorization
- **Access Validation**
  - User authentication for document access
  - Group membership verification
  - Third-party integration permissions

##### Collaboration Features
- **Real-time Collaboration**
  - Comment/suggestion privacy
  - Version history access control
  - Ownership transfer mechanisms

#### Technical Assessment Guidelines

##### In-Scope Applications
* Google Docs
* Google Sheets 
* Google Slides
* Google Drive
* Google Forms
* Google Sites
* Google Keep

##### Testing Methodologies
We encourage researchers to:

1. **Explore Edge Cases** - Test boundary conditions in sharing models
2. **Examine State Transitions** - Investigate permission changes during collaboration
3. **Consider Timing Issues** - Look for race conditions in access control
4. **Test Integration Points** - Assess third-party app access to shared content

#### Submission Requirements

##### Required Information
For your submission to be considered, include:

- **Clear Reproduction Steps**
  1. Detailed environment setup
  2. Precise actions to reproduce
  3. Expected vs. actual behavior

- **Security Impact Assessment**
  * Data exposure scope
  * Affected user types
  * Business impact analysis

- **Supporting Evidence**
  * Screenshots
  * HAR files for relevant requests
  * Sample code (if applicable)

#### Program Rules

##### Do's
✅ Test with your own test accounts  
✅ Respect user privacy and data  
✅ Report issues promptly through our platform  
✅ Provide detailed reproduction information  

##### Don'ts
❌ Test against production business accounts  
❌ Attempt to access other users' data  
❌ Perform DoS testing  
❌ Disclose vulnerabilities before remediation  

#### Additional Resources
- [Google Workspace Security Whitepaper](https://workspace.google.com/learn-more/security/security-whitepaper/page-1.html)
- [Google API Documentation](https://developers.google.com/workspace)
- [Previous Google VRP Reports](https://bughunters.google.com/reportedvulnerabilities)

---

*"Security is at the core of how we design all Google products. We appreciate the contributions of security researchers in making Google Workspace more secure for everyone." - Google Security Team*`,
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    tags: ["Access Control", "Data Security", "Workspace", "Collaboration Tools"],
    responsibleDisclosureUrl: "https://www.google.com/about/appsecurity/"
  },
];

// Simulate API delay [TODO: Remove this]
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API service for opportunities
export const opportunityService = {
  // Get all opportunities
  getAll: async (): Promise<Opportunity[]> => {
    // Simulate API delay
    await delay(500);
    return [...mockOpportunities];
  },
  
  // Get opportunity by ID
  getById: async (id: string): Promise<Opportunity | undefined> => {
    // Simulate API delay
    await delay(300);
    return mockOpportunities.find(opp => opp.id === id);
  }
}; 
