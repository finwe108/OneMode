# Dashboard Pattern

## Purpose

The Dashboard Pattern provides a concise operational overview of a
module or application and directs users toward important tasks.

A dashboard is not a collection of decorative cards. Every element
should support a decision, monitoring task, or next action.

## Standard structure

``` text
Page
├── Page Header
└── Dashboard Content
    ├── Summary / KPI Area
    ├── Primary Operational Area
    ├── Secondary Information
    └── Quick Actions
```

## Information hierarchy

Prioritize:

1.  Important current metrics
2.  Items requiring attention
3.  Recent or operational information
4.  Useful entry points

Do not give every metric equal visual emphasis.

## KPI cards

Use existing Card components.

A useful KPI should have:

-   clear label;
-   current value;
-   optional contextual comparison;
-   optional supporting information.

Avoid charts or trend indicators that do not provide actionable meaning.

## Operational content

Examples:

-   Pending payments
-   Recent collections
-   Enrollment counts
-   Outstanding approvals
-   Upcoming deadlines

## States

Dashboards may have independent loading states for sections.

A failed chart should not necessarily prevent the rest of the dashboard
from rendering.

## Responsive behavior

Use the existing page grid. KPI cards should wrap naturally and remain
readable on mobile.

## Accessibility

Charts and visual summaries need text alternatives. Do not make
important information available only through color or graphics.

## EkaMod examples

Cashiering Dashboard:

``` text
Today's Collections
[ Total Collected ] [ Transactions ] [ Average Payment ]

Collections by Payment Method

Recent Payments

Cashier Session
[ Open Session ]
```

## Contract

Every dashboard element should have a clear purpose. Prefer fewer useful
sections over a crowded dashboard.
