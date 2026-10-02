# CRUD Form Pattern

## Purpose

The CRUD Form Pattern is the standard structure for creating or editing
one record.

Examples include Add/Edit Fee Schedule, Add/Edit Student, Add/Edit User,
and Add/Edit Employee.

## Standard structure

``` text
Page
├── Breadcrumb
├── Page Header
│   ├── Title
│   └── Description
└── Form
    ├── Form Section
    │   └── Fields
    ├── Form Section
    │   └── Fields
    └── Form Actions
        ├── Cancel
        └── Save
```

## Form organization

Group related fields into meaningful sections.

Example:

``` text
Student Information
Contact Information
Enrollment Information
```

Avoid one large undifferentiated field list.

## Create versus edit

Use clear titles:

-   Add Fee Schedule
-   Edit Fee Schedule

For edit screens, preserve the record's identity and avoid making users
wonder whether they are creating a duplicate.

## Validation

Validation belongs close to the affected field.

A validation message should:

-   identify the problem;
-   remain associated with the field;
-   not rely on color alone;
-   preserve entered data where possible.

Submission-level failures may use an Alert near the form or another
persistent contextual treatment.

## Actions

Default order:

``` text
Cancel    Save
```

Save is the primary action and is normally the rightmost action.

For destructive workflows, use the Confirmation / Destructive Action
Pattern instead of embedding an irreversible action casually in the
form.

## Submission state

When saving:

``` text
Save
  ↓
Saving...
  ↓
Success or Error
```

Prevent duplicate submissions and communicate the in-progress state.

A successful save may use Toast for short-lived confirmation. Important
errors should remain visible through appropriate form or alert feedback.

## Loading

When an edit form requires remote data, use Skeleton or a loading state
rather than displaying misleading empty fields.

## Responsive behavior

-   Use the existing OneMode form grid.
-   Collapse multi-column layouts on small screens.
-   Keep labels visible.
-   Keep actions reachable without excessive horizontal scrolling.
-   Preserve logical field order.

## Accessibility

-   Every control needs an accessible label.
-   Required fields should be programmatically identifiable.
-   Validation errors should be associated with their controls.
-   Focus should move appropriately after submission failures.
-   Do not disable the entire form merely because one operation is
    processing unless necessary.

## EkaMod example

Fee Schedule:

``` text
Edit Fee Schedule

Basic Information
Schedule Name     School Year
Grade Level       Fee Type
Amount

Additional Information
Description
Status

                         Cancel    Save Fee Schedule
```

## Contract

A CRUD Form should answer:

1.  What record am I creating or editing?
2.  What information is required?
3.  Which fields belong together?
4.  What is invalid?
5.  Is the submission currently processing?
6.  What happened after submission?
