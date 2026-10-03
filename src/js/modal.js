/* =========================================================
   OneMode — Modal / Dialog
   ========================================================= */

import { isBrowser } from "./environment.js";

const OPEN_CLASS = "is-open";

let activeModal = null;
let previouslyFocusedElement = null;


/* =========================================================
   Open
   ========================================================= */

function openModal(modal) {
    if (!modal) {
        return;
    }

    previouslyFocusedElement = document.activeElement;
    activeModal = modal;

    modal.classList.add(OPEN_CLASS);
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    const focusTarget =
        modal.querySelector("[data-om-modal-autofocus]") ||
        modal.querySelector(".om-modal-close") ||
        modal.querySelector(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );

    requestAnimationFrame(() => {
        focusTarget?.focus();
    });
}


/* =========================================================
   Close
   ========================================================= */

function closeModal(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove(OPEN_CLASS);
    modal.setAttribute("aria-hidden", "true");

    if (activeModal === modal) {
        activeModal = null;
        document.body.style.overflow = "";

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }

        previouslyFocusedElement = null;
    }
}


/* =========================================================
   Toggle
   ========================================================= */

function toggleModal(modal) {
    if (!modal) {
        return;
    }

    if (modal.classList.contains(OPEN_CLASS)) {
        closeModal(modal);
    } else {
        openModal(modal);
    }
}


/* =========================================================
   Focus Trap
   ========================================================= */

function trapFocus(event) {
    if (!activeModal || event.key !== "Tab") {
        return;
    }

    const focusableElements = activeModal.querySelectorAll(
        "button:not([disabled]), " +
        "[href], " +
        "input:not([disabled]), " +
        "select:not([disabled]), " +
        "textarea:not([disabled]), " +
        "[tabindex]:not([tabindex='-1'])"
    );

    const focusable = Array.from(focusableElements);

    if (focusable.length === 0) {
        event.preventDefault();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (
        !event.shiftKey &&
        document.activeElement === last
    ) {
        event.preventDefault();
        first.focus();
    }
}


/* =========================================================
   Browser Initialization
   ========================================================= */

if (isBrowser()) {

    /* =====================================================
       Global Keyboard Handling
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (!activeModal) {
            return;
        }

        if (event.key === "Escape") {
            const closeOnEscape =
                activeModal.dataset.omModalEscape !== "false";

            if (closeOnEscape) {
                closeModal(activeModal);
            }

            return;
        }

        trapFocus(event);
    });


    /* =====================================================
       Trigger Handling
       ===================================================== */

    document.addEventListener("click", (event) => {

        const openTrigger =
            event.target.closest("[data-om-modal-open]");

        if (openTrigger) {

            const modalId =
                openTrigger.getAttribute("data-om-modal-open");

            const modal =
                document.getElementById(modalId);

            openModal(modal);

            return;
        }


        const closeTrigger =
            event.target.closest("[data-om-modal-close]");

        if (closeTrigger) {

            const modal =
                closeTrigger.closest(".om-modal");

            closeModal(modal);

            return;
        }


        const backdrop =
            event.target.closest(".om-modal-backdrop");

        if (backdrop) {

            const modal =
                backdrop.closest(".om-modal");

            const closeOnBackdrop =
                modal?.dataset.omModalBackdrop !== "false";

            if (closeOnBackdrop) {
                closeModal(modal);
            }
        }
    });


    /* =====================================================
       Initial State
       ===================================================== */

    document
        .querySelectorAll(".om-modal")
        .forEach((modal) => {

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

        });
}


/* =========================================================
   Public API
   ========================================================= */

if (isBrowser()) {

    window.OneModeModal = {
        open: openModal,
        close: closeModal,
        toggle: toggleModal
    };
}