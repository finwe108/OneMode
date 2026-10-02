# Confirmation / Destructive Action Pattern

## Purpose

This pattern handles actions whose consequences are significant,
irreversible, or difficult to undo.

Examples:

-   Delete
-   Cancel a transaction
-   Void a receipt
-   Archive a record
-   Remove a user from an important relationship

## Standard structure

``` text
Trigger
  ↓
Confirmation Modal
  ├── What will happen?
  ├── Consequence
  └── Cancel / Confirm
       ↓
Result Feedback
```

## When to confirm

Confirm when an action is:

-   destructive;
-   financially consequential;
-   difficult to reverse;
-   likely to cause meaningful data loss.

Do not ask for confirmation for routine, reversible actions merely
because they are available.

## Confirmation content

A confirmation should state:

1.  What action is being performed.
2.  Which record is affected.
3.  The important consequence.
4.  What the user must do to proceed.

Example:

``` text
Void Receipt

Are you sure you want to void Receipt #OR-2026-00125?

This will mark the receipt as void and remove it from active collection totals.

Cancel                 Void Receipt
```

## Buttons

Cancel is the safe secondary action.

The destructive action uses the OneMode danger button treatment.

## Processing

After confirmation:

``` text
Void Receipt
      ↓
Voiding...
      ↓
Success / Error
```

Prevent duplicate submissions.

## Feedback

Use Toast for concise confirmation after success. Keep consequential
errors visible through an Alert or relevant state as necessary.

## Accessibility

-   Modal must have an accessible name.
-   Focus moves into the dialog.
-   Escape should close when appropriate.
-   Focus returns to the trigger after close.
-   The destructive action must be clearly identified.
-   Do not communicate danger by color alone.

## Contract

Confirmation should reduce accidental actions without becoming routine
friction.
