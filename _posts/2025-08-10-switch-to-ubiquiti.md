---
title: Why We Switched to Ubiquiti
tags: [Networking, Ubiquiti]
style: border
color: success
description: From Unmanaged Chaos to a Unified Network
---

By: Cameron Golden, <br>
*IT Project Manager, Shady Brook Farm*

For a long time, our "network" was really just patchwork: unmanaged switches, consumer mesh units repurposed as access points, and cabling that had grown organically instead of intentionally.

{% include elements/figure.html image="https://raw.githubusercontent.com/cgolden15/assets/refs/heads/main/blog-images/IMG_7760.jpeg" caption="Our old server room" %}

It functioned, but not reliably enough for a medium business that depends on uninterrupted transactions and day-to-day operations. We kept running into issues that directly impacted revenue, staff productivity, and customer experience:

- Point of sale terminals dropping out mid-transaction.
- Random slowdowns during peak periods.
- No visibility into which device or link was failing.
- Constant troubleshooting guesswork: router, switch, AP, cabling, or ISP?

We were spending too much time reacting and not enough time preventing problems.

After one particularly painful day of POS interruptions during a busy event, we made the call to rebuild around Ubiquiti. The goal was not a "new toy" network. The goal was **visibility, stability, and control**.

---

## 1. Visibility Was the Biggest Win

With a **UDM Pro Max** at the core, we can see the network in real time instead of guessing.

- If a POS terminal drops, we can trace its path quickly and confirm where the failure is.
- Bandwidth can be analyzed per client, which made hidden bottlenecks obvious.
- Firmware updates are planned and controlled, not random events.

Before, troubleshooting usually meant physically tracing cables. Now, most diagnosis starts and ends in the UniFi dashboard.

---

## 2. PoE Reduced Risk and Cleanup Overhead

Our previous setup relied on too many injectors and power bricks. That made failure points multiply and made the rack harder to maintain.

Moving to **USW Enterprise 48 PoE** switches changed operations immediately:

- APs, cameras, and phones are powered centrally.
- Ports can be rebooted remotely, which speeds up support.
- PoE budgets are visible, so capacity planning is proactive.
- VLAN segmentation is straightforward, keeping POS isolated from guest traffic.

---

## 3. Wi-Fi Finally Handles Real-World Load

Consumer mesh hardware is not built for high-density business traffic. On busy days, we used to see dropped POS sessions, sluggish office connectivity, and poor guest Wi-Fi performance.

We redesigned coverage with purpose-built AP tiers:

- **U7 Pro Max** units in high-density zones.
- **U7 Lites** in offices and small spaces.
- **E7 Campus APs** for the event field.

The difference was immediate and measurable: more stable transactions, fewer help tickets, and better consistency for both staff and guests.

---

## 4. Long-Range Links Became Dependable

Outbuilding connectivity used to rely on improvised placement and luck. It worked until weather, interference, or distance exposed it.

We replaced that with dedicated point-to-point and bridge hardware:

- **LiteBeam 5ACs** for medium-distance links.
- **UBB and UBB XGS** for higher capacity, critical connections.

These links are weather-resistant, purpose-built, and far more stable under the conditions that previously caused outages.

---

## 5. POS Reliability Improved the Most

For a medium business, POS reliability is non-negotiable. Before the rebuild, outages were unpredictable and expensive.

After moving to the new stack, POS disconnects dropped dramatically. Equally important, when something does degrade, we can identify whether it is local infrastructure or an upstream provider issue in minutes.

---

## 6. Not Perfect, But Finally Manageable

The biggest outcome is not just "faster internet." It is operational control. The network is now **manageable**:

- VLANs keep POS, staff devices, and guest Wi-Fi separate.
- A single control plane handles monitoring and configuration.
- Issues are often detected before users escalate them.

There are still tradeoffs. Firmware timing matters. Topology views are not always perfect. Client identification can occasionally be noisy.

But for a medium business, this transition has been worth it. We moved from reactive firefighting to proactive operations, and that change impacts everything from checkout reliability to staff efficiency.
