# OneMode Structural Patterns

This directory defines reusable screen-level patterns for OneMode and
EkaMod SES.

Patterns describe how existing OneMode components are composed into
complete application workflows. They are not a new CSS or JavaScript
component layer.

## Patterns

1.  [CRUD List](crud-list.md) --- browse and manage collections of
    records.
2.  [CRUD Form](crud-form.md) --- create or modify one record.
3.  [Detail / Profile](detail-profile.md) --- understand one record.
4.  [Dashboard](dashboard.md) --- summarize important information and
    provide useful entry points.
5.  [Search / Lookup](search-lookup.md) --- find a specific person,
    account, record, or reference item.
6.  [Wizard / Multi-step Form](wizard-multi-step-form.md) --- guide
    users through dependent steps.
7.  [Confirmation / Destructive
    Action](confirmation-destructive-action.md) --- confirm
    consequential actions safely.
8.  [Financial Transaction](financial-transaction.md) --- handle
    controlled monetary workflows such as cashiering.

## Pattern principles

-   Patterns compose existing components.
-   A pattern should solve a recurring screen or workflow problem.
-   Use the simplest pattern that fits the task.
-   Loading, empty, error, validation, and success behavior are part of
    the pattern.
-   Responsive and accessible behavior is part of the contract.
-   Application-specific business rules belong to the application, not
    the OneMode visual layer.
