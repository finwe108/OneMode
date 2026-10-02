/* =========================================================
   OneMode — Theme Manager
   ========================================================= */

const STORAGE_KEY = "om-theme";

const VALID_THEMES = ["light", "dark", "system"];

const root = document.documentElement;


/* =========================================================
   Theme
   ========================================================= */

function getStoredTheme() {
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

    root.setAttribute("data-om-theme", theme);

    localStorage.setItem(STORAGE_KEY, theme);

    updateThemeControls(theme);
}

function updateThemeControls(theme) {
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
    const theme = getStoredTheme();

    root.setAttribute("data-om-theme", theme);

    updateThemeControls(theme);
}


/* =========================================================
   Controls
   ========================================================= */

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


/* =========================================================
   Start
   ========================================================= */

initializeTheme();