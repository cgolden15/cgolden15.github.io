---
title: Why We Switched to Ubiquiti
tags: [Networking, Ubiquiti]
style: border
color: success
description: From Unmanaged Chaos to a Unified Network
---

By: Cameron Golden, <br>
*IT Project Manager, Shady Brook Farm*

Before this year, our “network” was really just a pile of unmanaged switches, a few TP-Link Deco routers acting as access points, and a tangle of Ethernet cables that nobody wanted to touch. 

{% include elements/figure.html image="https://raw.githubusercontent.com/cgolden15/assets/refs/heads/main/blog-images/IMG_7760.jpeg" caption="Our old server room" %}

It worked... in the loosest possible sense that is. But we constantly ran into problems that ate into productivity, lowered profits and annoyed customers:

- Point of sale terminals dropping out mid-transaction.
- Random slowdowns during peak hours.
- No way to see which devices were causing trouble.
- Constant guesswork when troubleshooting, was it the router? the switch? a bad cable?

We’d patch one thing, and another issue would pop up.  

Finally, after one particularly bad day of POS downtime during a busy event, we decided enough was enough. We ripped out the patchwork and replaced it with a full Ubiquiti setup, not for the brand name, but because we needed **visibility, stability, and control**.

---

## 1. Visibility Changed Everything

With the **UDM Pro Max** at the core, I can now see exactly what’s happening on the network, live.

- If a point of sale terminal drops, I can see which switch port it’s on, whether it’s reaching the internet, and exactly when the issue occured.
- I can track bandwidth usage by device, which quickly exposed that a few clients were eating more bandwidth than we thought.
- Firmware updates are scheduled and controlled, not something that randomly happens(or doesn't happen) unexpectedly.

Before, troubleshooting meant physically chasing cables around the building. Now it’s a few clicks in the UniFi dashboard.

---

## 2. The PoE Upgrade Was More Than Convenience

Our old unmanaged, cheap switches couldn’t power everything, nearly every phone and AP had its own adapter or injector! The server room was a mess, and a single power strip going out could take down several devices.

The **USW Enterprise 48 PoE** switches changed that:

- All APs, cameras, and VoIP phones get power directly from the switch.
- If a device goes offline, I can reboot its port remotely. No more crawling around to unplug things.
- PoE usage is monitored, so we know when we're at capacity!
- The switches also let me segment the network, so POS traffic isn’t competing with guest Wi-Fi.

---

## 3. Wi-Fi That Actually Handles Peak Loads

The Deco mesh system is fine for home use, but it wasn’t built for hundreds of simultaneous clients. Our large event days used to crush the network. POS terminals would drop, desktops would slow down, and guests would complain about lag.

We replaced them with a mix of:

- **U7 Pro Maxs** in high-density areas.
- **U7 Lites** in offices and small spaces.
- **E7 Campus APs** for the event field.

The difference was immediate: POS terminals stayed connected all day, office staff could keep working and guests could still get a stable signal.

---

## 4. Stable Long-Range Links

Our old solution for connecting outbuildings was… also Decos, just placed in windows, near doors and on ceilings in hopes of getting a good signal. Predictably, they’d lose connection with the sligtest interference.

Now we use:

- **LiteBeam 5ACs** for medium-distance links.
- **UBB and UBB XGS** for higher capacity, critical connections.

They’re weather-resistant, stable, and have held up in conditions that used to break our connections completely.

---

## 5. Impact on the Point of Sale System

Before Ubiquiti, our POS downtime was unpredictable, sometimes it would happen twice in an hour, sometimes not at all. Now, it’s been months since we’ve had a single POS disconnect.  

Even better, when there’s an issue (like the ISP hiccuping), we can confirm it instantly instead of guessing whether it’s a switch, cable, or AP.

---

## 6. It’s Not Magic, But It’s Manageable

The biggest change isn’t just better hardware — it’s that the network is now **something we can actually manage**:

- VLANs keep POS, staff devices, and guest Wi-Fi separate.
- One interface controls everything.
- We know when something’s wrong before users report it.

There are still trade-offs — firmware updates need to be timed carefully, the UniFi controller can struggle with topology mapping and client identification, but compared to where we started, it’s night and day.
