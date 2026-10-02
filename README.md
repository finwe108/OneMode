# OneMode

OneMode is a framework-neutral UI design system for MMCI applications.

It provides reusable CSS components, layouts, form controls, data-display components, utilities, and lightweight JavaScript behaviors that can be used with Laravel Blade, React, Vue, or other web application stacks.

## Features

- `.om` CSS namespace to reduce style collisions
- Theme-aware design tokens
- Light and dark mode support
- Application shell with responsive sidebar
- Responsive navigation
- Headers, breadcrumbs, and page layouts
- Buttons, cards, badges, alerts, modals, dropdowns, tabs, pagination, progress, skeletons, toasts, and tooltips
- Form controls and validation states
- Date and time form controls
- Data tables
- Utility classes
- Lightweight JavaScript behaviors
- No runtime framework dependency

## Installation

```bash
npm install @mmci/onemode
```

## CSS

Import the complete OneMode stylesheet:

```css
@import '@mmci/onemode/css';
```

## Javascript

Import the complete OneMode JavaScript entry point:

```JavaScript
import '@mmci/onemode/js';
```

The root package entry point is also available:

```JavaScript
import '@mmci/onemode';
```

## Public API

OneMode intentionally exposes three package entry points:

```text
@mmci/onemode
@mmci/onemode/css
@mmci/onemode/js
```
Internal source files are implementation details and are not part of the public package API.

## CSS Namespace

OneMode uses the `om` namespace for its classes.

Examples:

```html
<div class="om-card">
    <h2 class="om-card-title">Example</h2>
</div>
```

```html
<button class="om-btn om-btn-primary">
    Save
</button>
```

## Application Shell

The application shell provides a responsive navigation structure:

- Desktop: expanded sidebar
- Tablet: collapsed icon sidebar
- Mobile: off-canvas sidebar

Canonical structure:

```html
<div class="om-app-shell">

    <aside class="om-sidebar">
        ...
    </aside>

    <div class="om-sidebar-overlay"></div>

    <div class="om-app-shell-main">
        <header class="om-app-header">
            ...
        </header>

        <main class="om-app-shell-content">
            ...
        </main>
    </div>

</div>
```

## Theme Support

OneMode uses theme-aware CSS custom properties and supports light and dark themes.

Applications can integrate the included theme JavaScript:

```javascript
import '@mmci/onemode/js';
```

## Development

Clone the repository and install dependencies:

```bash
npm install
```

Run the development environment:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Create a package tarball for local testing:

```bash
npm pack
```

## Framework Compatibility

OneMode is intentionally framework-neutral.

It can be integrated into:

- Laravel / Blade
- React
- Vue
- Static HTML
- Other JavaScript-based web applications

OneMode does not require a specific application framework.

## License

OneMode is released under the MIT License.

