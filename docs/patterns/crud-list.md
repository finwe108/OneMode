# CRUD List Pattern

## Purpose

The CRUD List Pattern is the standard structure for browsing, searching,
filtering, and managing a collection of records.

Typical EkaMod examples include Students, Fee Schedules, Employees,
Users, Roles, Payments, Receipts, Sections, Subjects, and Class
Schedules.

## Standard structure

``` text
Page
├── Breadcrumb
├── Page Header
│   ├── Title
│   ├── Description
│   └── Page Actions
└── Page Content
    ├── Search / Filters
    ├── Result Summary
    ├── Data Table
    └── Pagination
```

## Components

Use existing OneMode components:

-   `.om-page`
-   `.om-page-header`
-   `.om-page-title`
-   `.om-page-description`
-   `.om-page-header-actions`
-   `.om-breadcrumb`
-   `.om-search`
-   `.om-form-control`
-   `.om-table-toolbar`
-   `.om-card`
-   `.om-table`
-   `.om-pagination`
-   `.om-state`
-   `.om-btn`
-   `.om-badge`

Do not create a new CRUD-specific CSS or JavaScript component unless a
genuine reusable behavior is discovered.

## Actions

Separate actions by scope:

  Scope   Examples
  ------- ------------------------------
  Page    Add, Export, Import
  Table   Search, Filter, Sort, Select
  Row     View, Edit, Delete, More

The primary page action normally appears in the page header.

## States

A CRUD List supports:

-   Loading: initial data is being fetched.
-   Populated: records are available.
-   Empty: the request succeeded but no records match.
-   Error: the request failed.
-   Filtered empty: records exist generally, but the current filters
    return none.

Use Skeleton for substantial initial content loading. Preserve existing
table content during lightweight refreshes when practical.

## Search and filters

Search and filters should work together using clear AND semantics unless
the application has a documented alternative.

Only expose meaningful filters. Avoid filling the toolbar with low-value
controls.

## Responsive behavior

On narrow screens:

-   Toolbar controls may wrap or stack.
-   Tables may scroll horizontally.
-   Primary actions remain accessible.
-   Pagination remains usable.
-   Avoid hiding essential record information solely to make the table
    appear narrower.

## Accessibility

-   Provide a meaningful table caption or accessible name where
    appropriate.
-   Use semantic table elements.
-   Keep action buttons keyboard accessible.
-   Announce dynamic result summaries with appropriate live-region
    behavior.
-   Ensure pagination has an accessible navigation label.
-   Do not rely on color alone for status.

## EkaMod example

Fee Schedules:

``` text
Fee Schedules                         + Add Fee Schedule
Configure standard school fees

Search...     School Year    Grade Level    Status

┌─────────────────────────────────────────────────────┐
│ Schedule │ School Year │ Grade │ Amount │ Status   │
├─────────────────────────────────────────────────────┤
│ Tuition  │ 2026–2027   │ 7     │ ₱35,000│ Active   │
└─────────────────────────────────────────────────────┘

Showing 1–10 of 42                         1 2 3 ...
```

## Contract

A CRUD List should answer:

1.  What records am I looking at?
2.  How can I find the record I need?
3.  What can I do with the collection?
4.  What can I do with an individual record?
5.  What is happening while data loads?
6.  What happens when there are no records or an error?
