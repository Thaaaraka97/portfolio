---
title: Azure and Microsoft 365 Enterprise Lab
summary: A small-enterprise identity and endpoint environment built around Entra ID, Intune, Conditional Access and device lifecycle management.
date: 2026-07-01
featured: true
status: In progress
technologies:
  - Microsoft Azure
  - Entra ID
  - Microsoft Intune
  - Conditional Access
  - PowerShell
repository: https://github.com/Thaaaraka97/mini-enterprise-lab
---
## Business problem

A growing company needs centralized identity, secure access policies, and consistent Windows endpoint management without relying on a large on-premises platform.

## Requirements

- Centralize users and groups
- Enforce MFA and Conditional Access
- Enrol and configure Windows devices
- Separate standard and administrative accounts
- Make the environment reproducible

## Architecture

![Hybrid Identity and Endpoint Management Architecture](/public/images/projects/hybrid-identity-endpoint-lab.png)

The lab combines Microsoft Entra ID, Conditional Access, Intune, Autopilot, and an Azure-hosted Active Directory environment. PowerShell, Microsoft Graph, and Bicep are used to automate deployment and configuration.

## Implementation

The project is being built in phases:

1. Create test users, groups, and limited admin roles in Entra ID.
2. Deploy Conditional Access policies in Report-only mode.
3. Enrol a Windows device into Intune and apply compliance and configuration policies.
4. Configure Autopilot for standardized deployment.
5. Build an Azure-hosted domain controller with AD DS, DNS, OUs, users, groups, and Group Policy.
6. Document and automate each phase.

## Security decisions

Standard user accounts are separated from administrative accounts. Roles follow least privilege, and emergency access accounts are excluded from policies that could cause tenant lockout.

Conditional Access policies are tested in Report-only mode before enforcement.

## Problems and troubleshooting

A Microsoft 365 admin login failed because a personal Microsoft account was used instead of the tenant's `onmicrosoft.com` administrator account.

Licensing and feature availability are also being verified before risk-based access and Intune capabilities are marked complete.

Automation scripts are being designed to check for existing objects before creating users, groups, or policies.

## Outcome

This project is still in progress.

The architecture, security model, repository structure, and implementation plan are defined. The target outcome is a reproducible cloud and AD DS lab with centralized identity, secure access, managed endpoints, and documented validation.

Hybrid synchronization, high availability, monitoring, and disaster recovery remain outside the current scope.

## Lessons learned

For production, I would use multiple domain controllers, Privileged Identity Management, secure secret storage, phased policy deployment, centralized monitoring, and a routable AD domain.
