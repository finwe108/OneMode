# Search / Lookup Pattern

## Purpose

The Search / Lookup Pattern helps users locate a specific record that
will be used in another workflow.

It differs from a CRUD List:

-   CRUD List = manage a collection.
-   Search / Lookup = identify the right record for the next task.

This pattern is especially important in Cashiering.

## Standard structure

``` text
Lookup
├── Search Input
├── Optional Filters
├── Results
└── Selection / Next Action
```

## Search field

The search field should communicate what can be searched.

Examples:

-   Student name or ID
-   Employee ID
-   Receipt number
-   Payment reference

Do not require users to guess the supported search terms.

## Results

Results should expose enough identifying information to distinguish
similar records.

Student lookup might show:

``` text
Juan Dela Cruz
Student ID: 2026-00125
Grade 10 • Section A
```

## Selection

Once the correct record is identified, provide a clear next action:

-   Select Student
-   View Account
-   Continue Payment

Avoid making the entire result row clickable unless the interaction is
visually and semantically obvious.

## States

-   Initial: explain what to search.
-   Searching: indicate activity without losing the query.
-   Results: display matches.
-   No Results: explain that nothing matched.
-   Error: explain that the lookup could not be completed.

## Debouncing and server-side search

Applications may debounce input for remote searches. Large datasets
should generally use server-side search rather than loading all records
into the browser.

## Accessibility

-   Label the search input.
-   Announce changing result counts when appropriate.
-   Make result selection keyboard accessible.
-   Preserve focus logically.
-   Do not rely solely on highlighting to identify the selected result.

## EkaMod Cashiering example

``` text
Receive Payment

Search Student
[ Student name, ID, or account number             🔍 ]

Results

Juan Dela Cruz
2026-00125 · Grade 10 · Section A
[ Select Student ]

Maria Santos
2026-00131 · Grade 10 · Section B
[ Select Student ]
```

## Contract

Search / Lookup should minimize the distance between:

``` text
Unknown record
     ↓
Search
     ↓
Correct record identified
     ↓
Next workflow
```
