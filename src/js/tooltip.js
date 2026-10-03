/* =========================================================
   OneMode — Tooltip / Popover
   ========================================================= */

import { isBrowser } from "./environment.js";

(() => {
    const TOOLTIP_TRIGGER_SELECTOR = "[data-om-tooltip]";
    const POPOVER_TRIGGER_SELECTOR = "[data-om-popover]";

    let activeTooltip = null;
    let activePopover = null;

    let tooltipTimer = null;

    const TOOLTIP_GAP = 8;
    const POPOVER_GAP = 8;


    /* -----------------------------------------------------
       Helpers
       ----------------------------------------------------- */

    function getPlacement(trigger, fallback = "top") {
        return trigger.dataset.omTooltipPlacement ||
            trigger.dataset.omPopoverPlacement ||
            fallback;
    }

    function getText(trigger) {
        return trigger.dataset.omTooltip || "";
    }

    function getPopover(trigger) {
        const selector = trigger.dataset.omPopover;

        if (!selector) {
            return null;
        }

        try {
            return document.querySelector(selector);
        } catch {
            return null;
        }
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }


    /* -----------------------------------------------------
       Tooltip positioning
       ----------------------------------------------------- */

    function positionTooltip(trigger, tooltip, placement = "top") {
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top;
        let left;

        switch (placement) {
            case "bottom":
                top = triggerRect.bottom + TOOLTIP_GAP;
                left =
                    triggerRect.left +
                    (triggerRect.width - tooltipRect.width) / 2;
                break;

            case "start":
                top =
                    triggerRect.top +
                    (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - TOOLTIP_GAP;
                break;

            case "end":
                top =
                    triggerRect.top +
                    (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + TOOLTIP_GAP;
                break;

            case "top":
            default:
                top = triggerRect.top - tooltipRect.height - TOOLTIP_GAP;
                left =
                    triggerRect.left +
                    (triggerRect.width - tooltipRect.width) / 2;
                break;
        }

        const margin = 8;

        left = clamp(
            left,
            margin,
            window.innerWidth - tooltipRect.width - margin
        );

        top = clamp(
            top,
            margin,
            window.innerHeight - tooltipRect.height - margin
        );

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }


    /* -----------------------------------------------------
       Tooltip
       ----------------------------------------------------- */

    function createTooltip(trigger) {
        const text = getText(trigger);

        if (!text) {
            return null;
        }

        const tooltip = document.createElement("div");

        tooltip.className = "om-tooltip";
        tooltip.textContent = text;
        tooltip.setAttribute("role", "tooltip");

        document.body.appendChild(tooltip);

        const id =
            trigger.getAttribute("aria-describedby") ||
            `om-tooltip-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`;

        tooltip.id = id;

        trigger.setAttribute("aria-describedby", id);

        return tooltip;
    }

    function showTooltip(trigger) {
        clearTimeout(tooltipTimer);

        if (activeTooltip?.trigger === trigger) {
            return;
        }

        hideTooltip();

        const tooltip = createTooltip(trigger);

        if (!tooltip) {
            return;
        }

        const placement = getPlacement(trigger, "top");

        tooltip.classList.add(`om-tooltip-${placement}`);

        activeTooltip = {
            trigger,
            tooltip,
            placement,
        };

        requestAnimationFrame(() => {
            if (!activeTooltip || activeTooltip.tooltip !== tooltip) {
                return;
            }

            positionTooltip(trigger, tooltip, placement);
            tooltip.classList.add("is-visible");
        });
    }

    function hideTooltip() {
        clearTimeout(tooltipTimer);

        if (!activeTooltip) {
            return;
        }

        const {
            trigger,
            tooltip,
        } = activeTooltip;

        if (trigger && tooltip) {
            const describedBy =
                trigger.getAttribute("aria-describedby");

            if (describedBy === tooltip.id) {
                trigger.removeAttribute("aria-describedby");
            }

            tooltip.remove();
        }

        activeTooltip = null;
    }


    /* -----------------------------------------------------
       Popover positioning
       ----------------------------------------------------- */

    function positionPopover(trigger, popover, placement = "bottom") {
        const triggerRect = trigger.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();

        let top;
        let left;

        switch (placement) {
            case "top":
                top =
                    triggerRect.top -
                    popoverRect.height -
                    POPOVER_GAP;
                left =
                    triggerRect.left +
                    (triggerRect.width - popoverRect.width) / 2;
                break;

            case "start":
                top =
                    triggerRect.top +
                    (triggerRect.height - popoverRect.height) / 2;
                left =
                    triggerRect.left -
                    popoverRect.width -
                    POPOVER_GAP;
                break;

            case "end":
                top =
                    triggerRect.top +
                    (triggerRect.height - popoverRect.height) / 2;
                left = triggerRect.right + POPOVER_GAP;
                break;

            case "bottom":
            default:
                top = triggerRect.bottom + POPOVER_GAP;
                left =
                    triggerRect.left +
                    (triggerRect.width - popoverRect.width) / 2;
                break;
        }

        const margin = 8;

        left = clamp(
            left,
            margin,
            window.innerWidth - popoverRect.width - margin
        );

        top = clamp(
            top,
            margin,
            window.innerHeight - popoverRect.height - margin
        );

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
    }


    /* -----------------------------------------------------
       Popover
       ----------------------------------------------------- */

    function openPopover(trigger) {
        const popover = getPopover(trigger);

        if (!popover) {
            return;
        }

        if (activePopover?.popover === popover) {
            closePopover(trigger);
            return;
        }

        closePopover();
        hideTooltip();

        const placement = getPlacement(trigger, "bottom");

        popover.setAttribute("aria-hidden", "false");
        popover.classList.add("is-visible");

        trigger.setAttribute("aria-expanded", "true");

        activePopover = {
            trigger,
            popover,
            placement,
        };

        requestAnimationFrame(() => {
            if (!activePopover || activePopover.popover !== popover) {
                return;
            }

            positionPopover(trigger, popover, placement);
        });
    }

    function closePopover(trigger = null) {
        if (!activePopover) {
            return;
        }

        if (
            trigger &&
            activePopover.trigger !== trigger
        ) {
            return;
        }

        const {
            trigger: activeTrigger,
            popover,
        } = activePopover;

        popover.classList.remove("is-visible");
        popover.setAttribute("aria-hidden", "true");

        activeTrigger?.setAttribute("aria-expanded", "false");

        activePopover = null;
    }

    function togglePopover(trigger) {
        if (activePopover?.trigger === trigger) {
            closePopover(trigger);
            return;
        }

        openPopover(trigger);
    }


    /* -----------------------------------------------------
       Initialization
       ----------------------------------------------------- */

    function initializeTooltips() {
        document
            .querySelectorAll(TOOLTIP_TRIGGER_SELECTOR)
            .forEach((trigger) => {
                trigger.addEventListener("mouseenter", () => {
                    tooltipTimer = setTimeout(() => {
                        showTooltip(trigger);
                    }, 300);
                });

                trigger.addEventListener("mouseleave", hideTooltip);

                trigger.addEventListener("focus", () => {
                    showTooltip(trigger);
                });

                trigger.addEventListener("blur", hideTooltip);
            });
    }

    function initializePopovers() {
        document
            .querySelectorAll(POPOVER_TRIGGER_SELECTOR)
            .forEach((trigger) => {
                trigger.setAttribute("aria-expanded", "false");

                const popover = getPopover(trigger);

                if (popover) {
                    popover.setAttribute("aria-hidden", "true");
                }

                trigger.addEventListener("click", (event) => {
                    event.preventDefault();
                    togglePopover(trigger);
                });
            });
    }


    if (isBrowser()) {

        /* -----------------------------------------------------
           Global events
           ----------------------------------------------------- */

        document.addEventListener("click", (event) => {
            if (!activePopover) {
                return;
            }

            const {
                trigger,
                popover,
            } = activePopover;

            if (
                trigger.contains(event.target) ||
                popover.contains(event.target)
            ) {
                return;
            }

            closePopover();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                hideTooltip();
                closePopover();

                if (activePopover?.trigger) {
                    activePopover.trigger.focus();
                }
            }
        });

        window.addEventListener("resize", () => {
            if (activeTooltip) {
                positionTooltip(
                    activeTooltip.trigger,
                    activeTooltip.tooltip,
                    activeTooltip.placement
                );
            }

            if (activePopover) {
                positionPopover(
                    activePopover.trigger,
                    activePopover.popover,
                    activePopover.placement
                );
            }
        });

        window.addEventListener("scroll", () => {
            if (activeTooltip) {
                positionTooltip(
                    activeTooltip.trigger,
                    activeTooltip.tooltip,
                    activeTooltip.placement
                );
            }

            if (activePopover) {
                positionPopover(
                    activePopover.trigger,
                    activePopover.popover,
                    activePopover.placement
                );
            }
        }, true);

        document.addEventListener("click", (event) => {
            const closeButton = event.target.closest(
                "[data-om-popover-close]"
            );

            if (!closeButton) {
                return;
            }

            closePopover();
        });


        /* -----------------------------------------------------
           Public API
           ----------------------------------------------------- */

        window.OneModeTooltip = {
            show: showTooltip,
            hide: hideTooltip,
        };

        window.OneModePopover = {
            open: openPopover,
            close: closePopover,
            toggle: togglePopover,
        };


        /* -----------------------------------------------------
           Start
           ----------------------------------------------------- */

        initializeTooltips();
        initializePopovers();
    }

})();