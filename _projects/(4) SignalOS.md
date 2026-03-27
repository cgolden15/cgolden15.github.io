---
name: SignalOS (In Development)
tools: [TypeScript, React, Fastify, WebSockets, SQLite, Python, Raspberry Pi]
image: https://opengraph.githubassets.com/1/cgolden15/Signal-OS
description: Open-source digital signage side project inspired by Screenly/Anthias, built as an active learning platform.
---

# Project Spotlight: SignalOS
**Role: Creator & Developer**

## Status
SignalOS is an active side project and is still in development (beta).

## Why I Built It
SignalOS is inspired by the ideas behind Screenly/Anthias, but built as my own self-hosted platform to experiment, learn, and iterate quickly. This project is helping me deepen my understanding of real-world system design, full-stack architecture, and device orchestration.

## Open Source
SignalOS is totally open source, and the code is developed in public:
- https://github.com/cgolden15/Signal-OS

## Project Overview
SignalOS is a locally hosted digital signage platform with a server/dashboard/player architecture:
- **Server**: API, WebSocket communication, scheduling, and persistence.
- **Dashboard**: Browser-based admin UI for screens, zones, assets, playlists, schedules, and users.
- **Pi Agent**: Raspberry Pi display client that connects to the server and plays assigned media.

## Current Development Snapshot
### Completed in beta
- Core REST API and realtime messaging
- Asset upload and storage flow
- Playlist and schedule management
- Screen registration and approval flow
- Role-based user handling

### Still in development
- Advanced scheduling features
- Enhanced transitions/effects
- Improved health monitoring and reporting
- Bulk operations and stronger permission controls

## Technical Notes
```typescript
// Dashboard refreshes live data on an interval
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: 5000 } },
});
```

```python
# Pi agent keeps live state and communicates with the player layer
current_status  = "idle"
is_paused       = False
playlist_task   = None
player_clients  = set()
```

```ts
// Server tracks display heartbeat + status for operational visibility
export interface HeartbeatMessage {
  type: "heartbeat";
  screen_id: string;
  status: "idle" | "playing" | "error";
  asset_id?: string;
}
```

## What I am Learning Through This Project
- Designing reliable communication between UI, API, and edge clients
- Managing mixed-language services (TypeScript + Python)
- Building maintainable scheduling and state-management patterns
- Shipping features in an iterative open-source workflow

<br>
{% include elements/button.html link="https://github.com/cgolden15/Signal-OS" text="View SignalOS on GitHub" block=true %}
