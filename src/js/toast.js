/* =========================================================
   OneMode — Toast / Notification
   ========================================================= */

import { isBrowser } from "./environment.js";

const DEFAULT_DURATION = 5000;

const TOAST_ICONS = {
    success: "bi-check-circle-fill",
    warning: "bi-exclamation-triangle-fill",
    danger: "bi-x-circle-fill",
    info: "bi-info-circle-fill"
};

const containers = new Map();


/* =========================================================
   Container
   ========================================================= */

function getContainer(position = "top-right") {

    if (containers.has(position)) {
        return containers.get(position);
    }

    const container = document.createElement("div");

    container.className =
        `om-toast-container om-toast-container-${position}`;

    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");

    document.body.appendChild(container);

    containers.set(position, container);

    return container;
}


/* =========================================================
   Create Toast
   ========================================================= */

function createToast({
    title = "",
    message = "",
    type = "info",
    duration = DEFAULT_DURATION,
    position = "top-right",
    closeable = true,
    action = null
} = {}) {

    const container = getContainer(position);

    const toast = document.createElement("div");

    toast.className =
        `om-toast om-toast-${type}`;

    toast.setAttribute("role", "status");

    const iconName =
        TOAST_ICONS[type] || TOAST_ICONS.info;


    /* -----------------------------------------------------
       Icon
       ----------------------------------------------------- */

    const icon = document.createElement("span");

    icon.className = "om-toast-icon";

    icon.innerHTML =
        `<i class="bi ${iconName}"></i>`;


    /* -----------------------------------------------------
       Content
       ----------------------------------------------------- */

    const content = document.createElement("div");

    content.className = "om-toast-content";


    if (title) {

        const titleElement =
            document.createElement("div");

        titleElement.className =
            "om-toast-title";

        titleElement.textContent = title;

        content.appendChild(titleElement);
    }


    if (message) {

        const messageElement =
            document.createElement("p");

        messageElement.className =
            "om-toast-message";

        messageElement.textContent = message;

        content.appendChild(messageElement);
    }


    /* -----------------------------------------------------
       Action
       ----------------------------------------------------- */

    if (action && action.label && action.onClick) {

        const actions =
            document.createElement("div");

        actions.className =
            "om-toast-actions";

        const actionButton =
            document.createElement("button");

        actionButton.type = "button";

        actionButton.className =
            "om-toast-action";

        actionButton.textContent =
            action.label;

        actionButton.addEventListener("click", () => {
            action.onClick();
            dismiss();
        });

        actions.appendChild(actionButton);

        content.appendChild(actions);
    }


    /* -----------------------------------------------------
       Close
       ----------------------------------------------------- */

    if (closeable) {

        const closeButton =
            document.createElement("button");

        closeButton.type = "button";

        closeButton.className =
            "om-toast-close";

        closeButton.setAttribute(
            "aria-label",
            "Close notification"
        );

        closeButton.innerHTML =
            '<i class="bi bi-x-lg"></i>';

        closeButton.addEventListener(
            "click",
            dismiss
        );

        toast.appendChild(closeButton);
    }


    toast.prepend(icon);
    toast.appendChild(content);


    /* -----------------------------------------------------
       Progress
       ----------------------------------------------------- */

    let progressBar = null;

    if (duration > 0) {

        const progress =
            document.createElement("div");

        progress.className =
            "om-toast-progress";

        progressBar =
            document.createElement("div");

        progressBar.className =
            "om-toast-progress-bar";

        progress.appendChild(progressBar);
        toast.appendChild(progress);
    }


    container.appendChild(toast);


    /* -----------------------------------------------------
       Show
       ----------------------------------------------------- */

    requestAnimationFrame(() => {
        toast.classList.add("is-visible");
    });


    /* -----------------------------------------------------
       Progress Animation
       ----------------------------------------------------- */

    let timer = null;

    if (duration > 0) {

        progressBar.style.transition =
            `transform ${duration}ms linear`;

        requestAnimationFrame(() => {
            progressBar.style.transform =
                "scaleX(0)";
        });

        timer = setTimeout(
            dismiss,
            duration
        );
    }


    /* -----------------------------------------------------
       Dismiss
       ----------------------------------------------------- */

    let dismissed = false;

    function dismiss() {

        if (dismissed) {
            return;
        }

        dismissed = true;

        if (timer) {
            clearTimeout(timer);
        }

        toast.classList.remove("is-visible");

        const removeToast = () => {

            toast.removeEventListener(
                "transitionend",
                removeToast
            );

            toast.remove();

            if (container.children.length === 0) {
                container.remove();
                containers.delete(position);
            }
        };

        toast.addEventListener(
            "transitionend",
            removeToast
        );

        setTimeout(removeToast, 300);
    }


    return {
        element: toast,
        dismiss
    };
}


/* =========================================================
   Convenience Methods
   ========================================================= */

function success(message, options = {}) {
    return createToast({
        ...options,
        message,
        type: "success"
    });
}

function warning(message, options = {}) {
    return createToast({
        ...options,
        message,
        type: "warning"
    });
}

function danger(message, options = {}) {
    return createToast({
        ...options,
        message,
        type: "danger"
    });
}

function info(message, options = {}) {
    return createToast({
        ...options,
        message,
        type: "info"
    });
}


/* =========================================================
   Public API
   ========================================================= */

if (isBrowser()) {

    window.OneModeToast = {
        show: createToast,
        success,
        warning,
        danger,
        info
    };
}