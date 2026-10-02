/* =========================================================
   OneMode — Dropdown / Menu
   ========================================================= */

const DROPDOWN_SELECTOR = ".om-dropdown";
const TRIGGER_SELECTOR = "[data-om-dropdown-toggle]";
const ITEM_SELECTOR =
    ".om-dropdown-item:not(.om-dropdown-item-disabled):not(:disabled)";


/* =========================================================
   Helpers
   ========================================================= */

function getTrigger(dropdown) {
    return dropdown.querySelector(TRIGGER_SELECTOR);
}

function getMenu(dropdown) {
    return dropdown.querySelector(".om-dropdown-menu");
}

function getItems(dropdown) {
    return Array.from(
        dropdown.querySelectorAll(ITEM_SELECTOR)
    );
}


/* =========================================================
   Open
   ========================================================= */

function openDropdown(dropdown) {

    if (!dropdown) {
        return;
    }

    closeAllDropdowns(dropdown);

    const trigger = getTrigger(dropdown);

    dropdown.classList.add("is-open");

    trigger?.setAttribute(
        "aria-expanded",
        "true"
    );
}


/* =========================================================
   Close
   ========================================================= */

function closeDropdown(dropdown) {

    if (!dropdown) {
        return;
    }

    const trigger = getTrigger(dropdown);

    dropdown.classList.remove("is-open");

    trigger?.setAttribute(
        "aria-expanded",
        "false"
    );
}


/* =========================================================
   Toggle
   ========================================================= */

function toggleDropdown(dropdown) {

    if (!dropdown) {
        return;
    }

    if (dropdown.classList.contains("is-open")) {
        closeDropdown(dropdown);
    } else {
        openDropdown(dropdown);
    }
}


/* =========================================================
   Close All
   ========================================================= */

function closeAllDropdowns(except = null) {

    document
        .querySelectorAll(
            `${DROPDOWN_SELECTOR}.is-open`
        )
        .forEach((dropdown) => {

            if (dropdown !== except) {
                closeDropdown(dropdown);
            }

        });
}


/* =========================================================
   Keyboard Navigation
   ========================================================= */

function focusItem(dropdown, index) {

    const items = getItems(dropdown);

    if (!items.length) {
        return;
    }

    const normalizedIndex =
        (index + items.length) % items.length;

    items[normalizedIndex].focus();
}


function handleKeyboard(event, dropdown) {

    const key = event.key;

    const items = getItems(dropdown);

    if (!items.length) {
        return;
    }


    if (key === "ArrowDown") {

        event.preventDefault();

        const currentIndex =
            items.indexOf(
                document.activeElement
            );

        focusItem(
            dropdown,
            currentIndex + 1
        );

        return;
    }


    if (key === "ArrowUp") {

        event.preventDefault();

        const currentIndex =
            items.indexOf(
                document.activeElement
            );

        focusItem(
            dropdown,
            currentIndex <= 0
                ? items.length - 1
                : currentIndex - 1
        );

        return;
    }


    if (key === "Home") {

        event.preventDefault();

        focusItem(dropdown, 0);

        return;
    }


    if (key === "End") {

        event.preventDefault();

        focusItem(
            dropdown,
            items.length - 1
        );

        return;
    }


    if (key === "Enter" || key === " ") {

        if (
            document.activeElement.classList
                .contains("om-dropdown-item")
        ) {

            event.preventDefault();

            document.activeElement.click();
        }

        return;
    }


    if (key === "Escape") {

        event.preventDefault();

        closeDropdown(dropdown);

        const trigger =
            getTrigger(dropdown);

        trigger?.focus();

        return;
    }
}


/* =========================================================
   Click Handling
   ========================================================= */

document.addEventListener("click", (event) => {

    const trigger =
        event.target.closest(
            TRIGGER_SELECTOR
        );


    /* -----------------------------------------------------
       Trigger
       ----------------------------------------------------- */

    if (trigger) {

        const dropdown =
            trigger.closest(DROPDOWN_SELECTOR);

        toggleDropdown(dropdown);

        return;
    }


    /* -----------------------------------------------------
       Outside Click
       ----------------------------------------------------- */

    if (
        !event.target.closest(
            DROPDOWN_SELECTOR
        )
    ) {

        closeAllDropdowns();

        return;
    }


    /* -----------------------------------------------------
       Menu Item
       ----------------------------------------------------- */

    const item =
        event.target.closest(
            ".om-dropdown-item"
        );

    if (item) {

        const dropdown =
            item.closest(DROPDOWN_SELECTOR);

        closeDropdown(dropdown);
    }

});


/* =========================================================
   Keyboard Handling
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        const dropdown =
            event.target.closest(
                DROPDOWN_SELECTOR
            );

        if (!dropdown) {
            return;
        }

        if (
            dropdown.classList.contains(
                "is-open"
            )
        ) {

            handleKeyboard(
                event,
                dropdown
            );
        }

    }
);


/* =========================================================
   Escape / Global Close
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }

        closeAllDropdowns();

    }
);


/* =========================================================
   Initial State
   ========================================================= */

document
    .querySelectorAll(DROPDOWN_SELECTOR)
    .forEach((dropdown) => {

        const trigger =
            getTrigger(dropdown);

        trigger?.setAttribute(
            "aria-expanded",
            "false"
        );

    });


/* =========================================================
   Public API
   ========================================================= */

window.OneModeDropdown = {
    open: openDropdown,
    close: closeDropdown,
    toggle: toggleDropdown,
    closeAll: closeAllDropdowns
};