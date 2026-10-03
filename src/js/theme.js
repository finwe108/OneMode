/* =========================================================
   OneMode — Theme Manager
   ========================================================= */

import { isBrowser } from "./environment.js";

const STORAGE_KEY = "om-theme";

const VALID_THEMES = ["light", "dark", "system"];


/* =========================================================
   Theme
   ========================================================= */

function getStoredTheme() {
    if (!isBrowser()) {
        return "system";
    }

    const storedTheme = localStorage.getItem(STORAGE_KEY);

    if (VALID_THEMES.includes(storedTheme)) {
        return storedTheme;
    }

    return "system";
}

function applyTheme(theme) {
    if (!VALID_THEMES.includes(theme)) {
        theme = "system";
    }

    if (!isBrowser()) {
        return;
    }

    const root = document.documentElement;

    root.setAttribute("data-om-theme", theme);

    localStorage.setItem(STORAGE_KEY, theme);

    updateThemeControls(theme);
}

function updateThemeControls(theme) {
    if (!isBrowser()) {
        return;
    }

    const controls = document.querySelectorAll(
        "[data-om-theme-option]"
    );

    controls.forEach((control) => {
        const isActive =
            control.dataset.omThemeOption === theme;

        control.classList.toggle(
            "om-theme-option-active",
            isActive
        );

        if (
            control instanceof HTMLInputElement &&
            control.type === "radio"
        ) {
            control.checked = isActive;
        }

        control.setAttribute(
            "aria-pressed",
            String(isActive)
        );
    });
}


/* =========================================================
   Initialization
   ========================================================= */

function initializeTheme() {
    if (!isBrowser()) {
        return;
    }

    const theme = getStoredTheme();

    document.documentElement.setAttribute(
        "data-om-theme",
        theme
    );

    updateThemeControls(theme);
}


/* =========================================================
   Controls
   ========================================================= */

function initializeThemeControls() {
    if (!isBrowser()) {
        return;
    }

    document.addEventListener("click", (event) => {
        const control = event.target.closest(
            "[data-om-theme-option]"
        );

        if (!control) {
            return;
        }

        const theme = control.dataset.omThemeOption;

        applyTheme(theme);
    });

    document.addEventListener("change", (event) => {
        const control = event.target.closest(
            "[data-om-theme-option]"
        );

        if (!control) {
            return;
        }

        const theme = control.dataset.omThemeOption;

        applyTheme(theme);
    });
}


/* =========================================================
   Public API
   ========================================================= */

if (isBrowser()) {
    window.OneModeTheme = {
        get: getStoredTheme,
        set: applyTheme,
        refresh: initializeTheme,
    };
}


/* =========================================================
   Start
   ========================================================= */

initializeThemeControls();
initializeTheme();
