# CRUD Form Showcase

## Example

**Fee Schedule — Add / Edit**

This example demonstrates the OneMode CRUD Form pattern using a finance configuration workflow.

### Structure

```text
Page
├── Breadcrumb
├── Page Header
│   ├── Title
│   └── Description
└── Form
    ├── Fee Information
    ├── Applicability
    ├── Description
    └── Actions
```

### Design rules demonstrated

- Group related fields into cards.
- Keep labels visible and directly associated with controls.
- Mark required fields explicitly.
- Use a school-year select rather than free-form text.
- Use a numeric amount control for money.
- Allow a reusable fee to apply to multiple grade levels.
- Keep Cancel secondary and Save primary.
- Keep destructive actions out of the ordinary save workflow.
- Validation should appear near the affected field.
- Submission should disable or show a loading state on the primary action.

### Create vs. Edit

For creation:

- `Add Fee Schedule`
- `Save Fee Schedule`

For editing:

- `Edit Fee Schedule`
- `Save Changes`

The field structure should remain consistent between both modes.

### Integration note

This showcase is presentation-only. Validation, persistence, authorization, and business rules belong to the EkaMod application layer.
