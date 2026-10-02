# Financial Transaction Pattern

## Purpose

The Financial Transaction Pattern defines the structure for controlled
monetary workflows.

It is intentionally separate from generic CRUD because financial
transactions usually involve validation, allocation, auditability,
confirmation, and a durable result.

EkaMod examples include:

-   Receive Payment
-   Issue Receipt
-   Void Receipt
-   Refund
-   Payment Allocation
-   Cash Count

## Core lifecycle

``` text
Identify Account
      ↓
Review Charges
      ↓
Select / Allocate
      ↓
Enter Payment
      ↓
Validate
      ↓
Review
      ↓
Confirm
      ↓
Record Transaction
      ↓
Generate Result / Receipt
```

The exact steps may vary by transaction type.

## Standard structure

``` text
Transaction Page
├── Context / Account
├── Outstanding Items
├── Transaction Entry
├── Allocation / Breakdown
├── Review
├── Confirmation
└── Result
```

## Account identification

Use the Search / Lookup Pattern to identify the correct student,
customer, or account before accepting money.

Display enough identifying information to prevent ambiguity.

## Charges and allocation

Show the charges that can be paid.

For each applicable charge, communicate:

-   description;
-   original amount;
-   amount already paid;
-   remaining balance;
-   selected payment allocation.

The transaction must make it clear where money is going.

## Payment entry

Typical fields may include:

-   payment date;
-   payment method;
-   amount received;
-   reference number;
-   notes.

Only include fields required by the business process.

## Validation

Financial validation should cover the application's business rules, such
as:

-   valid account;
-   valid charges;
-   valid amount;
-   valid payment method;
-   allocation does not exceed allowed balance;
-   required reference information;
-   cashier/session requirements.

Business validation belongs to the application domain; OneMode supplies
the visual interaction pattern.

## Review

Before committing, show a concise transaction summary:

``` text
Student
Juan Dela Cruz

Charges
Tuition              ₱35,000.00
Miscellaneous          ₱2,500.00

Payment
Cash                  ₱20,000.00

Remaining Balance     ₱17,500.00
```

## Confirmation

Use the Confirmation / Destructive Action Pattern when the transaction
is consequential and requires explicit confirmation.

## Result

After successful recording, show a durable result:

``` text
Payment Recorded

Receipt #OR-2026-00125
Amount Paid: ₱20,000.00

[ View Receipt ] [ Print Receipt ]
```

The result should not depend solely on a temporary toast because the
transaction itself is important.

## Transaction states

Support:

-   Loading account
-   Loading charges
-   Validation error
-   Submission processing
-   Successful transaction
-   Failed transaction
-   Not found / invalid account
-   Session or authorization failure where applicable

## Auditability

The application should preserve appropriate transaction identifiers and
audit information. OneMode does not define database or accounting rules,
but the UI should make important identifiers visible where users need
them.

## Cashiering example

``` text
Receive Payment

1. Student
   Search and select student

2. Charges
   Review outstanding balances

3. Payment
   Enter amount and payment method

4. Review
   Confirm allocation and totals

5. Complete
   Record payment and present receipt
```

## Design principle

A financial transaction screen should optimize for:

-   correctness;
-   clear monetary amounts;
-   prevention of accidental actions;
-   transparent allocation;
-   confirmation before consequential submission;
-   durable transaction results.

It should not optimize merely for the fewest clicks.

## Contract

A financial transaction should let the user answer:

1.  Whose account is affected?
2.  What is being paid?
3.  How much is being paid?
4.  How is it being allocated?
5.  What will happen when I confirm?
6.  What transaction identifier or receipt proves the result?
