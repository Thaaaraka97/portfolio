---
title: Windows Server Active Directory Lab
summary: A reproducible Windows domain environment covering AD DS, DNS, organizational units, Group Policy and workstation administration.
date: 2026-06-15
featured: true
status: Completed
technologies:
  - Windows Server
  - Active Directory
  - DNS
  - Group Policy
  - PowerShell
repository: https://github.com/Thaaaraka97/ad-automation-homelab-setup
---
## Business Problem

A small organization needed a centralized way to manage users, computers, access permissions, and security policies. Managing each workstation separately would make onboarding, access control, software restrictions, and troubleshooting slow and inconsistent.

This lab was designed to simulate a small business environment using Active Directory, DNS, Group Policy, PowerShell automation, file sharing, and internal email services.

## Architecture

![Active Directory Lab Architecture](/public/images/projects/image.png)

The environment includes:

- **Domain Controller:** Active Directory Domain Services, DNS, authentication, and Group Policy
- **Secondary Windows Server:** File shares and hMailServer
- **Windows Clients:** Domain-joined workstations receiving centralized policies
- **Linux Client:** A non-domain endpoint used for network testing
- **Firewall and Switch:** Internal connectivity and separation from the external network

Infrastructure servers use static IP addresses, while client devices use DHCP or reserved addresses. Domain clients use the domain controller as their primary DNS server.

DNS flow:

```text
Client → Domain Controller DNS → Internal AD records → External DNS forwarder
```

Administrative boundaries are separated by department through Organizational Units:

```text
domain-name.local
├── IT
│   └── Dev Team
├── HR
├── Finance
└── Management
```

Security groups are used for access control, while OUs are used for organization, policy targeting, and administration.

## Implementation

The Windows Server was assigned a static IP address and promoted to a domain controller for `domain-name.local`. DNS was installed with Active Directory so clients could locate authentication and directory services.

PowerShell was used to automate repetitive tasks such as:

- Creating departmental OUs
- Creating users and groups
- Assigning users to department and role-based groups
- Reducing manual configuration errors

Example OU creation:

```powershell
New-ADOrganizationalUnit -Name "IT" -Path "DC=domain-name,DC=local"
New-ADOrganizationalUnit -Name "HR" -Path "DC=domain-name,DC=local"
New-ADOrganizationalUnit -Name "Finance" -Path "DC=domain-name,DC=local"
```

Test users were created in their assigned OUs and added to groups such as:

- `IT_All_Staff_Grp`
- `IT_HelpDesk_L2_Grp`
- `IT_Server_Admins_Grp`
- `Management_DL`

Windows workstations were configured to use the domain controller for DNS and then joined to the domain.

Group Policy was used to:

- Restrict unauthorized software installation
- Map departmental drives
- Apply settings based on user or computer location
- Keep administrator access separate from standard users

Departmental file shares were secured with both share permissions and NTFS permissions. hMailServer was configured for internal SMTP, IMAP, and POP3 testing.

## Validation

The lab was validated through direct testing:

- `nslookup` confirmed internal DNS resolution
- `ping` confirmed connectivity between clients and servers
- Domain users successfully signed in to joined workstations
- `gpupdate /force` and `gpresult /r` confirmed policy delivery
- Restricted users were blocked from unauthorized software installation
- Department users received the correct mapped drives
- File creation, editing, renaming, and deletion were tested
- Email communication was confirmed through hMailServer logs

These tests proved that DNS, authentication, policies, permissions, and internal services were working together.

## Troubleshooting

A genuine issue occurred with file-share permissions.

Users could create and edit files but could not rename them. Granting broader NTFS permissions did not fully solve the issue, and one attempted permission change blocked access to the share.

The problem was isolated by checking:

1. Share permissions
2. NTFS permissions
3. Permission inheritance
4. Folder-level and file-level scope
5. Effective access for the security group

The final solution used two permission scopes:

- Full control for subfolders and files
- Modify, write, and delete permissions at the root folder

This restored rename functionality without giving users unnecessary administrative control.

## Outcome

The completed lab provides centralized identity, DNS, authentication, workstation management, file access, software restrictions, and internal email testing. PowerShell automation made the environment faster to deploy and easier to rebuild.

The main limitations are that the lab uses a small number of systems, a single domain controller, and no high-availability or production security monitoring. Even with those limits, it demonstrates the core responsibilities of a Windows system administrator in a realistic small-business environment.
