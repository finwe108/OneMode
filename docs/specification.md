# OneMode Design System Specification

**Project:** EkaMod School Enterprise System
**Design System:** OneMode
**CSS Prefix:** `om-`
**Status:** Active Development
**Architecture:** Standalone HTML/CSS/JavaScript design system
**Primary Integration Target:** EkaMod SES

---

# 1. Overview

OneMode is the user interface design system for the EkaMod School Enterprise System (SES).

It provides a consistent visual and interaction language for:

* navigation
* application layouts
* pages
* forms
* tables
* buttons
* cards
* badges
* alerts
* dialogs
* notifications
* dropdowns
* pagination
* states
* icons
* themes
* responsive behavior
* accessibility patterns

OneMode is intentionally developed independently of Laravel.

The design system can therefore be:

1. designed independently,
2. tested independently,
3. demonstrated through static examples,
4. refined without modifying EkaMod,
5. integrated into EkaMod after the component system is stable.

---

# 2. Design Goals

OneMode exists to establish a consistent interface throughout EkaMod.

The primary goals are:

### 2.1 Consistency

The same concept should look and behave the same throughout the application.

For example:

* Add always uses the same button treatment.
* Edit uses the same icon.
* Success always uses the same semantic color.
* Tables use the same search/filter/pagination structure.
* Page headers follow the same hierarchy.

### 2.2 Reusability

Components should be reusable across modules.

A component should not be designed specifically for one page unless the behavior is genuinely page-specific.

### 2.3 Accessibility

Components should support:

* semantic HTML,
* keyboard interaction,
* visible focus states,
* accessible labels,
* appropriate ARIA attributes,
* reduced-motion preferences,
* sufficient color contrast.

### 2.4 Responsive Design

OneMode interfaces should work across:

* desktop,
* laptop,
* tablet,
* mobile.

Responsive behavior should be built into components instead of being repeatedly implemented by individual pages.

### 2.5 Theme Support

OneMode supports:

* light theme,
* dark theme,
* system preference.

Components should use semantic design tokens rather than hard-coded colors.

---

# 3. Core Naming Convention

All OneMode CSS classes use the `om-` prefix.

Examples:

```html
<div class="om-card"></div>

<button class="om-btn om-btn-primary">
    Save
</button>

<table class="om-table"></table>
```

The prefix prevents collisions with:

* Bootstrap,
* Laravel application styles,
* third-party libraries,
* existing EkaMod CSS.

---

# 4. Project Structure

The expected project structure is:

```text
OneMode/
├── docs/
│   └── specification.md
│
├── examples/
│   ├── components/
│   │   ├── icon.html
│   │   ├── modal.html
│   │   ├── toast.html
│   │   └── dropdown.html
│   │
│   ├── foundations/
│   │
│   ├── layouts/
│   │   └── app-shell.html
│   │
│   └── patterns/
│
├── index.html
│
├── package.json
│
└── src/
    ├── css/
    │   ├── base.css
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── utilities.css
    │   ├── onemode.css
    │   │
    │   ├── foundations/
    │   │   └── showcase.css
    │   │
    │   ├── layouts/
    │   │   ├── app-shell.css
    │   │   ├── sidebar.css
    │   │   ├── app-header.css
    │   │   ├── breadcrumb.css
    │   │   └── page.css
    │   │
    │   ├── components/
    │   │   ├── alert.css
    │   │   ├── badge.css
    │   │   ├── button.css
    │   │   ├── card.css
    │   │   ├── dropdown.css
    │   │   ├── header.css
    │   │   ├── hero.css
    │   │   ├── icon.css
    │   │   ├── modal.css
    │   │   ├── navigation.css
    │   │   ├── pagination.css
    │   │   ├── state.css
    │   │   ├── theme-switcher.css
    │   │   └── toast.css
    │   │
    │   ├── data/
    │   │   └── table.css
    │   │
    │   └── forms/
    │       ├── form.css
    │       └── date-time.css
    │
    └── js/
        ├── app-shell.js
        ├── dropdown.js
        ├── form.js
        ├── modal.js
        ├── pagination.js
        ├── table.js
        ├── theme.js
        └── toast.js
```

---

# 5. CSS Architecture

The main stylesheet is:

```text
src/css/onemode.css
```

It assembles the individual OneMode layers.

Current import order:

```css
@import "./tokens.css";
@import "./reset.css";
@import "./base.css";
@import "./utilities.css";

@import "./foundations/showcase.css";

@import "./forms/form.css";
@import "./forms/date-time.css";

@import "./layouts/app-shell.css";
@import "./layouts/sidebar.css";
@import "./layouts/app-header.css";
@import "./layouts/breadcrumb.css";
@import "./layouts/page.css";

@import "./components/button.css";
@import "./components/card.css";
@import "./components/badge.css";
@import "./components/alert.css";
@import "./components/theme-switcher.css";
@import "./components/hero.css";
@import "./components/icon.css";
@import "./components/header.css";
@import "./components/navigation.css";
@import "./components/modal.css";
@import "./components/toast.css";
@import "./components/dropdown.css";
@import "./components/state.css";
@import "./components/pagination.css";

@import "./data/table.css";
```

The separation is intentional.

* `tokens.css` defines design values.
* `reset.css` normalizes browser defaults.
* `base.css` establishes global behavior.
* `utilities.css` provides small reusable utilities.
* `forms/` contains form-specific styles.
* `layouts/` contains page/application structure.
* `components/` contains reusable UI components.
* `data/` contains data presentation components.

---

# 6. Design Tokens

OneMode uses CSS custom properties.

Components should consume tokens instead of hard-coding values.

For example:

```css
background: var(--om-color-surface);
color: var(--om-color-text);
border-color: var(--om-color-border);
```

rather than:

```css
background: #ffffff;
color: #111827;
border-color: #e5e7eb;
```

---

# 7. Color System

OneMode uses semantic colors.

## 7.1 Primary

```text
--om-color-primary
--om-color-primary-hover
--om-color-primary-active
--om-color-primary-soft
--om-color-primary-border
--om-color-primary-text
```

Primary is used for:

* primary actions,
* active navigation,
* selected controls,
* important interactive elements.

---

# 8. Semantic Colors

The semantic states are:

* success
* warning
* danger
* info

Each semantic color has:

```text
base
background
border
text
```

For example:

```text
--om-color-success
--om-color-success-bg
--om-color-success-border
--om-color-success-text
```

These should be used consistently.

### Success

Use for:

* completed actions,
* successful operations,
* active/healthy status.

### Warning

Use for:

* caution,
* pending conditions,
* attention-required conditions.

### Danger

Use for:

* destructive actions,
* errors,
* failed operations.

### Info

Use for:

* informational messages,
* neutral guidance,
* contextual information.

---

# 9. Surface Colors

OneMode defines:

```text
--om-color-background
--om-color-surface
--om-color-surface-muted
--om-color-surface-hover
--om-color-surface-active
--om-color-surface-disabled
```

These provide consistent layering between:

* application background,
* cards,
* panels,
* controls,
* hover states,
* disabled states.

---

# 10. Borders

Available border tokens include:

```text
--om-color-border
--om-color-border-strong
--om-color-border-subtle
```

Use the weakest appropriate border.

Avoid introducing arbitrary border colors inside individual components.

---

# 11. Text Colors

OneMode defines:

```text
--om-color-text
--om-color-text-secondary
--om-color-text-muted
--om-color-text-disabled
--om-color-text-inverse
```

General hierarchy:

```text
text
 ↓
secondary
 ↓
muted
 ↓
disabled
```

---

# 12. Overlay

Dialogs, mobile navigation, and similar components use:

```text
--om-color-overlay
```

instead of defining their own overlay color.

---

# 13. Typography

Typography is controlled through tokens.

OneMode should maintain a clear hierarchy between:

* page titles,
* section headings,
* body text,
* secondary descriptions,
* labels,
* helper text,
* metadata.

Typography should prioritize:

* readability,
* clear hierarchy,
* restrained weight usage,
* consistent line height.

---

# 14. Spacing

OneMode uses spacing tokens rather than arbitrary margins.

Spacing should be consistent between:

* page sections,
* form groups,
* card content,
* table elements,
* navigation items,
* component internals.

When adding a new component, existing spacing tokens should be preferred.

---

# 15. Radius

OneMode provides radius tokens including:

```text
--om-radius-full
```

and standard radius values for:

* controls,
* cards,
* badges,
* panels,
* dialogs.

Pill-shaped elements should use the full radius token.

---

# 16. Shadows

Shadows are tokenized.

They should be used primarily to establish hierarchy rather than decoration.

Typical examples:

* dropdown above content,
* modal above application,
* elevated card where necessary.

---

# 17. Transitions

OneMode provides transition tokens.

Transitions should be subtle and should never interfere with usability.

Components should respect:

```css
@media (prefers-reduced-motion: reduce)
```

when they contain animation or transitions.

---

# 18. Theme System

OneMode supports:

```text
light
dark
system
```

Theme is controlled using:

```html
<html data-om-theme="light">
```

or:

```html
<html data-om-theme="dark">
```

System preference is:

```html
<html data-om-theme="system">
```

The system theme uses:

```css
@media (prefers-color-scheme: dark)
```

---

# 19. Theme Persistence

`theme.js` stores the selected theme using:

```text
om-theme
```

in `localStorage`.

Valid values:

```text
light
dark
system
```

Invalid values should not be treated as valid theme selections.

---

# 20. Icons

OneMode uses **Bootstrap Icons** as its glyph library.

Bootstrap Icons provides the actual glyphs.

OneMode defines:

* sizing,
* semantic colors,
* alignment,
* containers,
* action behavior,
* vocabulary.

This separation is intentional.

Bootstrap Icons is the icon source.

OneMode is the icon usage system.

---

# 21. Icon Sizes

Standard icon classes include:

```text
om-icon-sm
om-icon
om-icon-lg
om-icon-xl
om-icon-2xl
```

The default class is:

```text
om-icon
```

---

# 22. Icon Semantic Colors

Available semantic icon classes include:

```text
om-icon-primary
om-icon-success
om-icon-warning
om-icon-danger
om-icon-info
om-icon-muted
om-icon-secondary
om-icon-disabled
om-icon-inverse
```

---

# 23. Icon Containers

OneMode supports:

```text
om-icon-circle
om-icon-square
```

and semantic container variants.

These are useful for:

* dashboard statistics,
* empty states,
* status indicators,
* navigation,
* feature cards.

---

# 24. Canonical Icon Vocabulary

The same concept should always use the same icon.

## Finance

| Concept       | Icon                   |
| ------------- | ---------------------- |
| Finance       | `bi-wallet2`           |
| Fee Schedules | `bi-calendar2-check`   |
| Fees          | `bi-receipt`           |
| Payment       | `bi-credit-card`       |
| Collections   | `bi-collection`        |
| Discount      | `bi-percent`           |
| Billing       | `bi-file-earmark-text` |

## Cashiering

| Concept          | Icon                  |
| ---------------- | --------------------- |
| Cashiering       | `bi-cash-stack`       |
| Receive Payment  | `bi-cash-coin`        |
| Payment          | `bi-credit-card`      |
| Receipt          | `bi-receipt`          |
| Cash Drawer      | `bi-safe`             |
| Cashier Session  | `bi-person-workspace` |
| Cash Count       | `bi-calculator`       |
| Daily Collection | `bi-bar-chart-line`   |

## Enrollment and Students

| Concept         | Icon              |
| --------------- | ----------------- |
| Enrollment      | `bi-person-plus`  |
| Students        | `bi-people`       |
| Student Profile | `bi-person-vcard` |
| Sections        | `bi-diagram-3`    |
| Subjects        | `bi-book`         |
| Class Schedule  | `bi-calendar3`    |

## HR

| Concept    | Icon                |
| ---------- | ------------------- |
| Employees  | `bi-person-badge`   |
| Attendance | `bi-calendar-check` |
| Leave      | `bi-calendar-minus` |
| Payroll    | `bi-wallet2`        |

## Accounting

| Concept        | Icon                  |
| -------------- | --------------------- |
| Accounting     | `bi-calculator`       |
| Transactions   | `bi-arrow-left-right` |
| Ledger         | `bi-journal-text`     |
| Reports        | `bi-bar-chart-line`   |
| Reconciliation | `bi-arrow-repeat`     |

## Administration

| Concept        | Icon              |
| -------------- | ----------------- |
| Administration | `bi-shield-lock`  |
| Users          | `bi-person-gear`  |
| Roles          | `bi-person-badge` |
| Permissions    | `bi-key`          |
| Settings       | `bi-gear`         |

---

# 25. Common Action Icons

| Action   | Icon                 |
| -------- | -------------------- |
| Add      | `bi-plus-lg`         |
| Edit     | `bi-pencil`          |
| View     | `bi-eye`             |
| Delete   | `bi-trash`           |
| Search   | `bi-search`          |
| Filter   | `bi-funnel`          |
| Download | `bi-download`        |
| Upload   | `bi-upload`          |
| Print    | `bi-printer`         |
| Refresh  | `bi-arrow-clockwise` |
| More     | `bi-three-dots`      |
| Close    | `bi-x-lg`            |
| Back     | `bi-arrow-left`      |
| Next     | `bi-arrow-right`     |

---

# 26. Buttons

Base class:

```text
om-btn
```

Variants include:

```text
om-btn-primary
om-btn-secondary
om-btn-outline
om-btn-ghost
om-btn-danger
om-btn-success
om-btn-light
```

Sizes:

```text
om-btn-sm
om-btn-lg
```

Buttons should communicate action hierarchy.

Use:

* primary for the main page action,
* secondary for supporting actions,
* outline for lower-emphasis actions,
* ghost for lightweight actions,
* danger for destructive actions.

---

# 27. Cards

Base:

```text
om-card
```

Cards provide a consistent surface for grouped information.

Cards should not become a default wrapper around every piece of content.

Use cards when visual grouping is meaningful.

---

# 28. Badges

Badges communicate compact status or classification.

Examples:

```text
om-badge
om-badge-success
om-badge-warning
om-badge-danger
om-badge-info
```

Badges should contain short values.

Examples:

```text
Active
Draft
Pending
Inactive
```

---

# 29. Alerts

Alerts communicate information requiring attention within the page.

Semantic variants correspond to:

* success,
* warning,
* danger,
* info.

Alerts should not replace toast notifications for transient feedback.

---

# 30. Toast Notifications

Toast notifications provide temporary feedback after an operation.

JavaScript API:

```js
OneModeToast.success("Payment saved successfully.");
```

```js
OneModeToast.warning("The payment is pending.");
```

```js
OneModeToast.danger("The payment could not be saved.");
```

```js
OneModeToast.info("The report is being generated.");
```

General API:

```js
OneModeToast.show({
    title: "Payment Saved",
    message: "Receipt created successfully.",
    type: "success",
    duration: 7000
});
```

Toasts are appropriate for:

* successful saves,
* successful updates,
* background operation results,
* transient errors.

They should not contain essential information that disappears before the user can reasonably read it.

---

# 31. Modal / Dialog

The modal component provides:

* open/close behavior,
* Escape handling,
* focus management,
* focus trapping,
* scroll locking,
* autofocus,
* ARIA state management.

Modal JavaScript is exposed through:

```js
window.OneModeModal
```

Modals may be used for:

* confirmation,
* short forms,
* focused workflows,
* important contextual information.

Large multi-step workflows should generally use a page instead of forcing the entire workflow into a modal.

---

# 32. Dropdown

Dropdowns support:

* opening/closing,
* keyboard interaction,
* Escape,
* outside click,
* menu item interaction,
* alignment.

Dropdowns should be used for:

* action menus,
* contextual actions,
* compact navigation choices.

They should not be used when a normal button or visible control would be clearer.

---

# 33. Forms

Form styles are contained in:

```text
src/css/forms/form.css
```

The form system covers:

* labels,
* inputs,
* textarea,
* select,
* checkbox,
* radio,
* switch,
* input groups,
* search,
* file input,
* validation,
* form grids,
* sections,
* actions,
* horizontal forms,
* inline forms,
* disabled controls.

---

# 34. Form Labels

Every user-editable control should have an accessible label.

Prefer:

```html
<label for="student-name">
    Student Name
</label>

<input
    id="student-name"
    class="om-form-control"
>
```

Placeholder text should not be treated as the primary label.

---

# 35. Search

OneMode search uses:

```text
om-search
```

with:

```text
om-search-icon
om-search-clear
```

Example:

```html
<div class="om-search">

    <i
        class="bi bi-search om-search-icon"
        aria-hidden="true"
    ></i>

    <input
        type="search"
        class="om-form-control"
        aria-label="Search"
    >

    <button
        type="button"
        class="om-search-clear"
        aria-label="Clear search"
        hidden
    >
        <i
            class="bi bi-x-lg"
            aria-hidden="true"
        ></i>
    </button>

</div>
```

`form.js` manages the clear-button behavior.

---

# 36. Date and Time

OneMode uses a hybrid strategy.

Native HTML date/time controls are the default:

```html
<input type="date">
<input type="time">
```

A custom date picker should only be introduced when actual application requirements justify it.

This avoids unnecessary complexity.

School year selection should normally use a select control rather than a date picker.

---

# 37. Application Shell

The application shell establishes the primary EkaMod application structure.

```text
om-app-shell
├── sidebar
├── overlay
└── main
    ├── header
    └── content
```

Primary classes:

```text
om-app-shell
om-app-shell-sidebar
om-app-shell-main
om-app-shell-content
```

---

# 38. Sidebar

The sidebar provides primary application navigation.

Desktop:

* persistent,
* fixed-width,
* collapsible.

Mobile:

* hidden by default,
* slides into view,
* uses an overlay.

The mobile overlay must be a sibling of the sidebar rather than a child of the sidebar.

Correct structure:

```html
<div class="om-app-shell">

    <aside class="om-app-shell-sidebar">
        ...
    </aside>

    <div class="om-sidebar-overlay"></div>

    <main class="om-app-shell-main">
        ...
    </main>

</div>
```

---

# 39. Sidebar Collapse

The collapsed desktop state uses:

```text
om-sidebar-collapsed
```

Mobile open state uses:

```text
om-sidebar-mobile-open
```

---

# 40. Navigation

Navigation supports:

* groups,
* group labels,
* links,
* icons,
* active state,
* badges,
* expandable subnavigation,
* collapsed sidebar behavior.

Navigation should reflect application information architecture rather than individual page URLs.

---

# 41. Header

The application header provides the persistent top-level context.

Typical responsibilities include:

* mobile menu trigger,
* page/application context,
* user controls,
* global actions.

Header components should remain visually lightweight.

---

# 42. Breadcrumbs

Breadcrumb classes:

```text
om-breadcrumb
om-breadcrumb-list
```

Breadcrumbs communicate page hierarchy.

Example:

```text
Finance / Fee Schedules / Grade 7 Tuition
```

The current page should be represented as the current item rather than another navigational link.

---

# 43. Page Layout

The page layout system includes:

```text
om-page
om-page-header
om-page-title
om-page-description
om-page-header-actions
om-page-content
om-page-section
om-page-section-title
om-page-grid
om-page-stack
om-page-actions
om-page-divider
om-page-loading
```

Standard page structure:

```html
<section class="om-page">

    <div class="om-page-header">

        <div class="om-page-header-content">

            <h1 class="om-page-title">
                Fee Schedules
            </h1>

            <p class="om-page-description">
                Manage fee schedules.
            </p>

        </div>

        <div class="om-page-header-actions">
            ...
        </div>

    </div>

    <div class="om-page-content">
        ...
    </div>

</section>
```

---

# 44. Page Grid

The page grid uses a 12-column structure.

It should be used for:

* dashboards,
* form layouts,
* multi-column content,
* responsive page sections.

Avoid using the grid merely to force visual complexity.

---

# 45. States

OneMode defines explicit UI states:

```text
om-state
om-state-empty
om-state-loading
om-state-error
```

The meanings are distinct.

### Empty

The request succeeded, but there are no records.

### Loading

Data is currently being fetched or processed.

### Error

The operation failed.

This distinction is important because the user needs different information in each situation.

---

# 46. Pagination

OneMode provides a reusable pagination component.

Classes include:

```text
om-pagination
om-pagination-summary
om-pagination-list
om-pagination-item
om-pagination-link
om-pagination-active
```

Pagination is used when a dataset is divided into pages.

Generic pagination uses:

```html
data-om-pagination
```

Table-integrated pagination uses:

```html
data-om-table-pagination
```

These are deliberately different.

---

# 47. Data Tables

The OneMode data table is a major reusable pattern.

Basic structure:

```text
om-data-table
├── toolbar
│   ├── search
│   ├── result summary
│   └── filters
│
└── card
    ├── table wrapper
    │   └── table
    │
    └── table pagination
```

---

# 48. Data Table Search

Table search uses:

```html
<div
    class="om-search"
    data-om-table-search
>
```

The input is:

```html
<input
    type="search"
    class="om-form-control"
>
```

`table.js` reads the input and filters table rows.

---

# 49. Data Table Filters

Select filters use:

```html
data-om-table-filter="column-name"
```

Example:

```html
<select
    data-om-table-filter="grade-level"
>
```

The corresponding table cell must use:

```html
<td data-om-table-column="grade-level">
```

The filter compares the selected value against that column.

---

# 50. Combined Data Table Filtering

Search and filters are combined using logical AND.

For example:

```text
Search = "Tuition"
School Year = "2026–2027"
Grade Level = "Grade 7"
Status = "Active"
```

A row must satisfy all active conditions.

If a filter is:

```html
<option value="all">
    All Grade Levels
</option>
```

then that filter does not restrict the results.

---

# 51. Data Table Pagination

Table pagination is configured through:

```html
data-om-page-size="10"
```

Example:

```html
<div
    class="om-data-table"
    data-om-page-size="2"
>
```

The pagination operates on the **filtered result set**, not on the original unfiltered row count.

Therefore:

```text
All rows
   ↓
Search/filter
   ↓
Filtered rows
   ↓
Pagination
   ↓
Current page
```

This order is fundamental.

---

# 52. Data Table State

Table state is maintained independently from DOM visibility.

Conceptually:

```js
{
    filteredRows: [],
    currentPage: 1
}
```

`row.hidden` is only the final rendering state.

It must not be treated as the source of truth for filtering.

This prevents filtering and pagination from interfering with each other.

---

# 53. Table Pagination Attribute Separation

Generic pagination:

```html
data-om-pagination
```

Table pagination:

```html
data-om-table-pagination
```

This prevents:

```text
pagination.js
```

from competing with:

```text
table.js
```

over the same pagination element.

---

# 54. Data Table Columns

Table cells that participate in filtering should identify themselves:

```html
<td data-om-table-column="school-year">
    2026–2027
</td>
```

Common examples:

```text
schedule-name
school-year
grade-level
amount
status
```

The attribute name should describe the data concept, not the visual presentation.

---

# 55. Data Table Sorting

Sortable headers use:

```text
om-sortable
data-om-sort
data-om-sort-type
```

Example:

```html
<th
    class="om-sortable"
    data-om-sort="amount"
    data-om-sort-type="number"
>
```

Supported conceptual types include:

```text
text
number
```

Sorting should be followed by re-filtering/re-pagination so the current table state remains coherent.

---

# 56. Data Table Result Summary

The toolbar summary uses:

```html
<span
    class="om-table-result-summary"
    data-om-table-result-summary
></span>
```

The pagination summary uses:

```html
<div
    class="om-pagination-summary"
    data-om-pagination-summary
></div>
```

These serve different purposes.

The toolbar communicates the overall filtered result count.

The pagination summary communicates the current range.

Example:

```text
Showing 3 of 15 schedules
```

and:

```text
Showing 1–10 of 15 schedules
```

---

# 57. Data Table Empty State

When filtering produces no results, the table should communicate:

```text
No schedules found
Try changing your search or filters.
```

An empty result is not an error.

It is a successful query with zero matching records.

---

# 58. JavaScript Architecture

OneMode JavaScript follows a component-oriented approach.

Each major interactive component owns its behavior.

Examples:

```text
theme.js
app-shell.js
form.js
modal.js
toast.js
dropdown.js
pagination.js
table.js
```

JavaScript should avoid introducing global variables unnecessarily.

Where a public API is useful, it is exposed through a namespace.

---

# 59. Public JavaScript APIs

## Theme

Theme behavior is provided through:

```text
theme.js
```

and controls using:

```text
data-om-theme-option
```

---

## Modal

Public object:

```js
window.OneModeModal
```

---

## Toast

Public object:

```js
window.OneModeToast
```

---

## Table

Public object:

```js
window.OneModeTable
```

The table API includes operations for:

```text
filter
setPage
refresh
```

---

# 60. JavaScript Events

Components should communicate through DOM events when appropriate.

The table component provides:

```text
om:filterchange
om:pagechange
```

These events allow other application code to react without modifying the internal implementation of `table.js`.

---

# 61. Data Attributes

OneMode uses `data-om-*` attributes for JavaScript behavior.

Examples:

```text
data-om-theme
data-om-theme-option

data-om-table-search
data-om-table-filter
data-om-table-column
data-om-page-size

data-om-table-pagination
data-om-pagination-summary
data-om-pagination-list

data-om-sort
data-om-sort-type
```

Data attributes should identify behavior or component state.

They should not replace semantic HTML.

---

# 62. Accessibility Rules

Every new OneMode component should consider:

### Keyboard

Can the component be used without a mouse?

### Focus

Is keyboard focus visible?

### Labels

Can assistive technology identify the control?

### State

Are expanded, selected, disabled, and current states exposed appropriately?

### Dialogs

Does the dialog manage focus correctly?

### Icons

Decorative icons should use:

```html
aria-hidden="true"
```

Icons that communicate unique information require an accessible text alternative.

---

# 63. Responsive Rules

OneMode uses responsive breakpoints to adapt layouts.

The application shell changes behavior around the tablet/mobile boundary.

Desktop:

```text
sidebar + main content
```

Mobile:

```text
main content
+
off-canvas sidebar
```

Components should not assume a fixed viewport width.

Tables should support horizontal overflow where necessary.

Forms should collapse from multi-column layouts to single-column layouts when space becomes constrained.

---

# 64. Mobile Navigation

On mobile:

```text
om-sidebar-mobile-open
```

opens the sidebar.

The overlay becomes interactive.

The overlay must:

* appear above the application content,
* remain below the sidebar,
* prevent accidental interaction with the page,
* disappear when the sidebar closes.

---

# 65. Showcase Pages

The `examples/` directory is the visual documentation of OneMode.

Examples should demonstrate:

* normal usage,
* variants,
* states,
* responsive behavior,
* interaction.

An example should not become a second implementation of the component.

The component source remains authoritative.

---

# 66. Component Example Convention

A component example should generally contain:

1. component introduction,
2. basic example,
3. variants,
4. interactive behavior where applicable,
5. implementation notes.

Example pages should use the same OneMode components they document.

---

# 67. Naming Rules for New Components

When creating a new component:

### CSS

Use:

```text
om-component-name
```

### JavaScript

Use:

```text
component-name.js
```

### Data attributes

Use:

```text
data-om-component-name
```

### Public API

Use:

```text
window.OneModeComponent
```

only when external application code genuinely needs access.

---

# 68. Component Design Rules

New components should:

* use semantic tokens,
* support dark mode where applicable,
* support responsive behavior,
* consider keyboard access,
* provide focus states,
* avoid unnecessary dependencies,
* avoid hard-coded application-specific values,
* use existing OneMode components where possible.

Do not create a new component merely because an existing component needs a small variant.

---

# 69. Avoiding CSS Duplication

Before adding CSS:

1. search for an existing token,
2. search for an existing utility,
3. search for an existing component,
4. determine whether a variant is sufficient.

For example, do not create:

```text
om-finance-button
```

if:

```text
om-btn om-btn-primary
```

already provides the required behavior.

---

# 70. Semantic Tokens over Literal Values

Prefer:

```css
color: var(--om-color-text-secondary);
```

over:

```css
color: #64748b;
```

Prefer:

```css
border: 1px solid var(--om-color-border);
```

over:

```css
border: 1px solid #e2e8f0;
```

This is essential for theme support.

---

# 71. Component Independence

OneMode should remain independent from Laravel.

A OneMode component should not assume:

* Blade,
* Laravel routes,
* Eloquent,
* controllers,
* middleware,
* authentication,
* database structure.

EkaMod provides the application context.

OneMode provides the interface system.

---

# 72. EkaMod Integration Philosophy

Integration should occur after the OneMode components are sufficiently stable.

The initial integration should minimize changes to existing EkaMod styles.

The goal is not to rewrite the entire application at once.

Instead:

```text
OneMode
   ↓
component integration
   ↓
module-by-module adoption
   ↓
legacy style reduction
```

---

# 73. EkaMod Integration Priority

Recommended integration order:

1. global tokens/theme,
2. application shell,
3. navigation,
4. page layout,
5. buttons,
6. forms,
7. tables,
8. feedback components,
9. dialogs/dropdowns,
10. module-specific patterns.

This establishes the foundation before replacing individual pages.

---

# 74. Module Consistency

The following modules should use the same OneMode language:

* Dashboard
* Students
* Enrollment
* Class Schedule
* Finance
* Cashiering
* Accounting
* HR
* Reports
* Administration

A module may have unique workflows, but its basic interface language should remain OneMode.

---

# 75. Finance and Cashiering Terminology

OneMode's visual vocabulary should preserve clear distinctions between:

### Finance

Configuration and financial setup:

* fees,
* fee schedules,
* billing,
* discounts,
* financial records.

### Cashiering

Operational collection:

* receive payment,
* receipts,
* cash drawer,
* cashier session,
* cash count,
* daily collections.

### Accounting

Accounting records:

* transactions,
* ledger,
* reconciliation,
* accounting reports.

The interface should not use these concepts interchangeably.

---

# 76. Status Vocabulary

Status labels should be standardized.

Common examples:

```text
Active
Inactive
Draft
Pending
Completed
Cancelled
Failed
```

A status should use both:

* text,
* semantic visual treatment.

Do not rely on color alone.

---

# 77. Destructive Actions

Destructive actions should use the danger semantic.

Examples:

```text
Delete
Deactivate
Cancel
Remove
```

Confirmation should be used when the operation is consequential or irreversible.

---

# 78. Loading Behavior

Loading states should clearly communicate that the system is working.

Avoid unnecessary full-page loading indicators when only one component is loading.

Prefer localized states when possible.

For example:

```text
table loading
form submission loading
report generation loading
```

---

# 79. Error Behavior

Errors should explain:

1. what happened,
2. what the user can do next.

Avoid technical messages such as raw exceptions or database errors in the interface.

---

# 80. Empty States

Empty states should be contextual.

For example:

```text
No fee schedules found.
Try changing your search or filters.
```

is better than:

```text
No data.
```

---

# 81. Tables: Recommended Structure

A standard data table should generally follow:

```html
<div
    class="om-data-table"
    data-om-page-size="10"
>

    <div class="om-table-toolbar">
        ...
    </div>

    <div class="om-card">

        <div class="om-table-wrapper">

            <table class="om-table">
                ...
            </table>

        </div>

        <div
            class="om-pagination"
            data-om-table-pagination
        >
            ...
        </div>

    </div>

</div>
```

---

# 82. Table Page Size

Page size should be configurable through:

```html
data-om-page-size
```

Example:

```html
data-om-page-size="25"
```

If no valid positive page size is provided, the table JavaScript uses its default page size.

---

# 83. Table Filtering Lifecycle

The table filtering lifecycle is:

```text
User changes search/filter
            ↓
filterTable()
            ↓
Read complete table dataset
            ↓
Apply search
            ↓
Apply select filters
            ↓
Store filteredRows
            ↓
Reset currentPage = 1
            ↓
Render pagination
            ↓
Display current page
            ↓
Update summaries/state
            ↓
Dispatch om:filterchange
```

---

# 84. Table Pagination Lifecycle

The pagination lifecycle is:

```text
User selects page
        ↓
setTablePage()
        ↓
Read filteredRows
        ↓
Calculate total pages
        ↓
Clamp requested page
        ↓
Update currentPage
        ↓
Render current page
        ↓
Dispatch om:pagechange
```

---

# 85. Table Sorting Lifecycle

Sorting should:

```text
Sort rows
    ↓
Reapply filtering
    ↓
Reset pagination
    ↓
Render current page
```

This ensures sorting does not leave the table in an inconsistent state.

---

# 86. Generic Pagination vs Table Pagination

These are separate concepts.

### Generic pagination

Used when pagination is an independent component.

```text
data-om-pagination
pagination.js
```

### Table pagination

Used as part of the data-table component.

```text
data-om-table-pagination
table.js
```

Both can share the same CSS.

They should not share the same JavaScript initialization attribute.

---

# 87. Performance Principles

OneMode should favor simple client-side behavior for small datasets.

For large datasets, EkaMod should eventually use server-side pagination/filtering.

The visual API should remain similar regardless of whether the underlying data is:

* client-side,
* server-side,
* AJAX,
* Laravel-rendered.

---

# 88. Server-Side Integration Consideration

OneMode's table UI should not assume that all tables will remain client-side.

EkaMod may eventually provide:

```text
server-side search
server-side filters
server-side sorting
server-side pagination
```

The OneMode visual conventions should remain unchanged.

---

# 89. Dependency Philosophy

OneMode should minimize dependencies.

Current major external UI dependency:

```text
Bootstrap Icons
```

The component behavior itself is implemented using native JavaScript.

This keeps OneMode:

* lightweight,
* portable,
* framework-independent.

---

# 90. Browser Compatibility

Components should use broadly supported modern browser APIs.

Avoid unnecessary browser-specific behavior.

Progressive enhancement is preferred where practical.

---

# 91. Documentation Rules

Every significant new component should have:

1. CSS implementation,
2. JavaScript implementation if interactive,
3. example page,
4. documentation,
5. accessibility considerations.

Documentation should explain both:

* how to use the component,
* when to use the component.

---

# 92. Change Management

When modifying a component:

1. inspect the existing implementation,
2. preserve established conventions,
3. identify dependencies,
4. update the component,
5. update the example,
6. test interactions,
7. test responsive behavior,
8. test dark mode,
9. update this specification when behavior or API changes.

---

# 93. Regression Testing

Before considering a component stable, test:

### Visual

* light mode,
* dark mode,
* desktop,
* mobile.

### Interaction

* mouse,
* keyboard,
* focus,
* Escape where applicable,
* outside click where applicable.

### State

* normal,
* loading,
* empty,
* error,
* disabled,
* active.

### Data

For tables:

* search,
* filters,
* combined filtering,
* pagination,
* sorting,
* empty results,
* changing filters while paginated,
* clearing filters.

---

# 94. Current Stable Components

The current OneMode foundation includes:

## Foundations

* design tokens,
* reset,
* base styles,
* utilities,
* showcase styles.

## Layouts

* application shell,
* sidebar,
* application header,
* breadcrumb,
* page layout.

## Components

* button,
* card,
* badge,
* alert,
* icon,
* header,
* navigation,
* hero,
* modal,
* toast,
* dropdown,
* state,
* pagination,
* theme switcher.

## Forms

* form controls,
* validation,
* search,
* date/time controls.

## Data

* data table,
* sorting,
* search,
* filtering,
* pagination.

---

# 95. Planned / Extendable Areas

Potential future components include:

* tabs,
* tooltip,
* popover,
* advanced date picker,
* command/search palette,
* file upload,
* progress indicators,
* skeleton loading,
* statistics cards,
* timeline,
* stepper,
* accordion,
* confirmation patterns,
* notification center,
* dashboard widgets.

New components should only be added when an actual application requirement exists.

---

# 96. Design System Vocabulary

OneMode terminology should remain consistent.

Use:

```text
Page
Section
Card
Panel
Toolbar
Table
Filter
Search
Pagination
Modal
Dialog
Toast
Alert
Badge
State
Navigation
Sidebar
Header
Breadcrumb
```

Avoid creating multiple names for the same concept.

---

# 97. General Development Rule

When solving a UI problem in EkaMod:

> Prefer extending an existing OneMode pattern over creating a new visual pattern.

The goal is not to make every page visually unique.

The goal is to make the entire system feel like one application.

---

# 98. OneMode Principle

OneMode should make the correct interface decision easy.

A developer working on EkaMod should be able to answer:

* Which button should I use?
* Which icon represents this action?
* Which status color should I use?
* How should this table behave?
* How should this form be structured?
* How should this page be laid out?
* How should this work on mobile?

by referring to OneMode rather than inventing a new solution.

---

# 99. Definition of Done

A OneMode component is considered ready when:

* its CSS follows OneMode naming,
* it uses semantic tokens,
* it supports the required theme states,
* it has responsive behavior where necessary,
* keyboard behavior has been considered,
* accessibility has been considered,
* interactive JavaScript is isolated,
* public APIs are documented,
* examples exist,
* edge cases have been tested,
* no unnecessary duplication exists.

---

# 100. Final Architecture

OneMode can be viewed as four layers:

```text
┌──────────────────────────────────────┐
│           Application UI             │
│      EkaMod modules and pages        │
├──────────────────────────────────────┤
│             Patterns                 │
│ dashboards · tables · forms · flows  │
├──────────────────────────────────────┤
│            Components                │
│ buttons · cards · modals · states   │
├──────────────────────────────────────┤
│           Foundations                │
│ tokens · typography · spacing       │
│ colors · icons · responsive rules   │
└──────────────────────────────────────┘
```

The dependency direction should remain:

```text
Foundations
    ↓
Components
    ↓
Patterns
    ↓
EkaMod Application
```

Higher layers may use lower layers.

Lower layers should not depend on EkaMod-specific application behavior.

---

# 101. Design System Contract

OneMode is the UI contract between the design system and EkaMod.

OneMode defines:

* visual language,
* component vocabulary,
* interaction conventions,
* accessibility conventions,
* responsive behavior,
* semantic states,
* reusable JavaScript behavior.

EkaMod defines:

* business rules,
* permissions,
* authentication,
* database data,
* workflows,
* server-side behavior,
* module-specific requirements.

This separation allows OneMode to evolve independently while remaining a stable interface foundation for EkaMod.

---

# 102. Summary

OneMode is not merely a CSS collection.

It is a complete interface system consisting of:

```text
Design Tokens
      +
Typography
      +
Color System
      +
Icons
      +
Components
      +
Layouts
      +
Interaction Patterns
      +
JavaScript Behavior
      +
Accessibility
      +
Responsive Rules
      +
Documentation
```

Its purpose is to ensure that EkaMod SES can grow into a large multi-module school enterprise system without every module developing its own visual language.

The guiding principle is:

> **Build once, reuse consistently, and keep the interface language unified.**
