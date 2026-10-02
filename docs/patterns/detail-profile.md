# Detail / Profile Pattern

## Purpose

The Detail / Profile Pattern presents one record for understanding
rather than direct editing.

Examples include Student Profile, Employee Profile, Payment Details,
Receipt Details, Fee Schedule Details, and User Profile.

A detail page is not simply a disabled form.

## Standard structure

``` text
Page
├── Breadcrumb
├── Page Header
│   ├── Title
│   ├── Identifier / Description
│   └── Actions
└── Content
    ├── Summary
    ├── Information Sections
    ├── Related Data
    └── History / Activity
```

## Summary

The summary should make the record recognizable immediately.

For a student:

``` text
Student Profile
Juan Dela Cruz
Student ID: 2026-00125
Grade 10 • Section A
```

Use badges for meaningful statuses such as Active, Inactive, Pending, or
Archived.

## Information sections

Use cards or page sections to group related information.

Do not turn every small group into a separate visual container. Group
information according to user tasks.

## Actions

The primary action is often Edit.

Other actions depend on the record:

-   Print
-   Export
-   Archive
-   View receipt
-   View payment history

Destructive actions should use the Confirmation / Destructive Action
Pattern.

## Related data

Related records can use existing Data Tables, lists, cards, or tabs.

Examples:

``` text
Student
├── Enrollment History
├── Payment History
└── Documents
```

## Tabs

Use tabs only when sections represent substantial, distinct areas.

Example:

``` text
Overview | Enrollment | Payments | Documents
```

Avoid tabs for a handful of short fields that can comfortably appear on
one page.

## Loading and error states

A detail page supports:

-   Loading
-   Populated
-   Not Found
-   Error

Do not confuse Not Found with an empty related-data section.

## Responsive behavior

Summary information may stack on small screens. Related tables should
use the established responsive table behavior.

## Accessibility

-   Maintain a logical heading hierarchy.
-   Mark the current breadcrumb page.
-   Ensure tabs have proper keyboard and ARIA behavior when used.
-   Do not communicate status using color alone.

## EkaMod example

``` text
Student Profile                              Edit Student

Juan Dela Cruz
Student ID: 2026-00125
Active · Grade 10 · Section A

Personal Information
Date of Birth       ...
Contact             ...
Address             ...

Enrollment History
School Year    Grade    Section    Status
...
```

## Contract

A Detail / Profile page should answer:

1.  Which record am I viewing?
2.  What is its current status?
3.  What are its important attributes?
4.  What related information matters?
5.  What actions are available?
