---
title: Multi-Site Enterprise Routing Lab
summary: A routed multi-site network demonstrating OSPF, EIGRP, redistribution, segmentation and structured troubleshooting.
date: 2026-05-20
featured: true
status: Completed
technologies:
  - Cisco IOS
  - OSPF
  - EIGRP
  - Route Redistribution
  - VLANs
repository: https://github.com/your-username/multisite-network-lab
---
## Scenario

Two enterprise sites use separate internal routing domains and must exchange routes through both a direct inter-site link and an ISP-facing path.

The lab was built to test VLAN routing, DHCP, OSPF, EIGRP, and route redistribution without creating routing loops, unreachable return paths, or unstable route feedback.

## Design

![Multi-Site Network Topology](/public/images/projects/multi-site-network-topology.png)

The topology contains:

- **Site A:** Two routers, one Layer 3 core switch, two access switches, and client systems
- **Site B:** One router, one Layer 3 switch, and client systems
- **ISP Router:** Connects both sites through the external routing domain
- **Direct Inter-Site Link:** Provides an additional path between the sites

### Addressing Plan

| VLAN | Department | Site A | Site B |
|---|---|---|---|
| 10 | HR | `10.10.10.0/24` | `10.20.10.0/24` |
| 20 | IT | `10.10.20.0/24` | `10.20.20.0/24` |
| 30 | Sales | `10.10.30.0/24` | `10.20.30.0/24` |
| 99 | Management | `10.10.99.0/24` | `10.20.99.0/24` |

### Routing Boundaries

- **OSPF:** Used inside the enterprise
- **EIGRP:** Used on the ISP-facing segment
- **OSPF Area 0:** Used for the inter-site backbone
- **Separate OSPF Areas:** Used for Site A and Site B internal networks
- **Redistribution Points:** Edge routers connecting OSPF and EIGRP

Layer 3 switches provide inter-VLAN routing. DHCP supplies client addressing, while Rapid-PVST+ and EtherChannel support resilient Layer 2 connectivity.

## Configuration Approach

Redistribution occurs only on the routers that participate in both OSPF and EIGRP.

Example:

```text
router ospf 1
 redistribute eigrp 100 subnets

router eigrp 100
 redistribute ospf 1 metric 10000 100 255 1 1500
```

The main controls used to reduce routing instability were:

- Limiting redistribution to the boundary routers
- Defining an explicit EIGRP metric for redistributed OSPF routes
- Keeping the inter-site backbone in OSPF area 0
- Separating each site's internal networks into different OSPF areas
- Checking routing tables for unexpected next hops
- Validating both forward and return paths

The design avoided enabling redistribution everywhere. That would have been sloppy and could have caused duplicated advertisements, route feedback, and unpredictable path selection.

## Testing

The following commands were used to verify the design:

```text
show ip route
show ip ospf neighbor
show ip eigrp neighbors
show ip protocols
show ip interface brief
ping
traceroute
```

Testing confirmed that:

- Clients received the correct DHCP address, mask, and default gateway
- VLANs could communicate through the Layer 3 switches
- Site A could reach Site B
- Site B could return traffic to Site A
- OSPF and EIGRP routes appeared in the routing table
- The ISP loopback was reachable from internal networks
- Traffic used valid next hops across both routing domains

Failure testing also included removing or misconfiguring links to observe whether traffic failed cleanly or selected an alternate path.

## Troubleshooting

A major failure occurred when traffic from Site A reached Site B, but return traffic looped between two routers.

`traceroute` showed the same two next hops repeating until the request timed out. The issue was isolated using:

```text
show ip route
show ip ospf database
show ip ospf neighbor
show ip protocols
traceroute
```

The investigation showed that the inter-site network and both site networks were not separated correctly by OSPF area. Routers were receiving conflicting path information and sending traffic back toward each other.

The correction was:

```text
Site A internal networks → OSPF area 1
Inter-site backbone      → OSPF area 0
Site B internal networks → OSPF area 2
```

A separate reachability failure was caused by an incorrect ISP-side address: `172.16.2.2` was entered instead of `172.16.1.2`. `show ip route` exposed the unexpected next hop, and correcting the address restored redistribution.

## Result

The final lab provides verified inter-VLAN and inter-site connectivity across OSPF and EIGRP routing domains.

Route redistribution works at controlled boundary points, DHCP provides correct gateway information, and OSPF area separation prevents the routing loop seen during testing.

The design is still limited to Cisco Packet Tracer and does not include route tagging, prefix filtering, BGP, IPsec VPNs, production monitoring, or high-availability edge devices.
