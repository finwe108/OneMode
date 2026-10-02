# Wizard / Multi-step Form Pattern

## Purpose

The Wizard Pattern guides users through a process that has multiple
meaningful stages or dependencies.

Use it when the workflow genuinely benefits from sequential progression.
Do not split a simple form into multiple steps merely to make it look
shorter.

## Standard structure

``` text
Page
├── Page Header
├── Step Indicator
├── Current Step
│   ├── Step Content
│   └── Step Actions
└── Optional Summary
```

## Steps

Each step should have:

-   a clear name;
-   a defined purpose;
-   understandable completion criteria.

Example:

``` text
1. Student
2. Charges
3. Payment
4. Review
5. Complete
```

## Navigation

Typical actions:

``` text
Back                    Next
```

Final step:

``` text
Back             Confirm / Submit
```

Do not let users accidentally lose entered information when moving
between steps.

## Validation

Validate fields when appropriate for the current step, and perform final
validation before submission.

If a later step depends on earlier data, prevent progression until the
required prerequisite is satisfied.

## Progress

Use a step indicator for position in the workflow. Use Progress when
there is a measurable completion quantity.

These are not interchangeable.

## States

A wizard may need:

-   Step loading
-   Step validation errors
-   Submission processing
-   Submission success
-   Submission failure

## Accessibility

-   Identify the current step.
-   Provide accessible names for navigation controls.
-   Preserve keyboard focus as steps change.
-   Do not rely only on visual styling to indicate the active step.
-   Ensure users can understand which information remains incomplete.

## Responsive behavior

Step indicators may simplify on mobile, but the current step and overall
progress should remain understandable.

## EkaMod example

Cashiering payment workflow:

``` text
Student → Charges → Payment → Review → Complete
```

Each step should preserve the transaction context.

## Contract

A wizard should make the workflow easier to understand, not merely
distribute fields across several screens.
