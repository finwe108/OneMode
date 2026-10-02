# OneMode Detail / Profile Pattern — Fee Schedule

## Purpose

The Detail / Profile pattern presents a saved record for **understanding and review**, not direct editing.

This showcase uses a Finance **Fee Schedule** so it follows naturally from the Fee Schedule CRUD List and CRUD Form showcases.

## Structure

```text
Page
├── Breadcrumb
├── Page Header
│   ├── Record title
│   ├── Description
│   ├── Status
│   └── Actions
└── Page Content
    ├── Summary
    ├── Applicability
    ├── Description
    ├── Record Information
    └── Next Action
```

## Design rules

### 1. Do not make the detail page a disabled form

The user should read values directly. Inputs are reserved for the CRUD Form pattern.

### 2. Make record identity obvious

The page title, breadcrumb, description, and status establish exactly which record is being viewed.

### 3. Put important values first

The Summary section surfaces Fee Type, Amount, School Year, and Status before secondary information.

### 4. Separate business information from metadata

Applicability and Description explain the fee's meaning. Schedule ID and timestamps belong in Record Information.

### 5. Keep actions contextual

The primary action is Edit. Secondary actions can live behind More Actions. Destructive or financially consequential actions must use the Confirmation / Destructive Action pattern.

## States

A production detail page should define four states:

- **Loading:** skeleton representation of the detail structure.
- **Populated:** complete record information.
- **Not found:** record does not exist or is no longer available.
- **Error:** record could not be retrieved; provide retry/back navigation where appropriate.

## Accessibility

- Breadcrumb uses `aria-current="page"`.
- Status is expressed with text, not color alone.
- Decorative icons use `aria-hidden="true"`.
- Icon-only controls have accessible labels.
- Heading hierarchy remains logical.
- Content does not depend on hover to reveal essential information.

## Responsive behavior

- Summary cards collapse as available width decreases.
- Header actions can wrap.
- Metadata remains readable without horizontal scrolling.
- Touch targets remain usable on smaller screens.

## EkaMod application contract

OneMode provides presentation only. EkaMod owns record lookup, authorization, business rules, status transitions, audit data, financial calculations, and persistence.

## Pattern relationship

```text
CRUD List
    ↓ select record
Detail / Profile
    ↓ edit
CRUD Form
    ↓ save
Detail / Profile
```

For consequential actions:

```text
Detail / Profile
    ↓ action
Confirmation / Destructive Action
    ↓ confirm
Updated Detail / Result
```

## Implementation checklist

- [ ] Record identity is obvious.
- [ ] Status is visible.
- [ ] Important values are readable without editing.
- [ ] Applicability/relationships are clear.
- [ ] Metadata is separated from business information.
- [ ] Primary next action is obvious.
- [ ] Destructive actions require confirmation.
- [ ] Loading, not-found, and error states are defined.
- [ ] Responsive behavior is defined.
- [ ] Keyboard and screen-reader access is supported.
