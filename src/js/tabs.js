/* =========================================================
   OneMode — Tabs / Segmented Navigation
   ========================================================= */

(() => {
    const TAB_CONTAINER_SELECTOR = "[data-om-tabs]";
    const TAB_SELECTOR = '[role="tab"]';


    /* -----------------------------------------------------
       Helpers
       ----------------------------------------------------- */

    function getTabs(container) {
        return Array.from(
            container.querySelectorAll(TAB_SELECTOR)
        ).filter((tab) => !tab.disabled);
    }

    function getPanel(tab) {
        const panelId = tab.getAttribute("aria-controls");

        if (!panelId) {
            return null;
        }

        return document.getElementById(panelId);
    }

    function getActiveTab(container) {
        return container.querySelector(
            '[role="tab"][aria-selected="true"]'
        );
    }

    function setTabState(tab, active) {
        tab.setAttribute(
            "aria-selected",
            active ? "true" : "false"
        );

        tab.tabIndex = active ? 0 : -1;

        tab.classList.toggle(
            "om-tab-active",
            active
        );

        const panel = getPanel(tab);

        if (!panel) {
            return;
        }

        panel.hidden = !active;

        panel.setAttribute(
            "aria-hidden",
            active ? "false" : "true"
        );
    }


    /* -----------------------------------------------------
       Activation
       ----------------------------------------------------- */

    function activateTab(tab, focus = true) {
        const container = tab.closest(TAB_CONTAINER_SELECTOR);

        if (!container) {
            return;
        }

        const tabs = getTabs(container);

        tabs.forEach((currentTab) => {
            setTabState(
                currentTab,
                currentTab === tab
            );
        });

        if (focus) {
            tab.focus();
        }

        const event = new CustomEvent(
            "om:tabchange",
            {
                bubbles: true,
                detail: {
                    tab,
                    panel: getPanel(tab),
                },
            }
        );

        container.dispatchEvent(event);
    }


    /* -----------------------------------------------------
       Keyboard navigation
       ----------------------------------------------------- */

    function handleTabKeydown(event) {
        const tab = event.currentTarget;
        const container = tab.closest(TAB_CONTAINER_SELECTOR);

        if (!container) {
            return;
        }

        const tabs = getTabs(container);
        const currentIndex = tabs.indexOf(tab);

        if (currentIndex === -1) {
            return;
        }

        let nextIndex = currentIndex;

        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                nextIndex = (currentIndex + 1) % tabs.length;
                break;

            case "ArrowLeft":
            case "ArrowUp":
                nextIndex =
                    (currentIndex - 1 + tabs.length) %
                    tabs.length;
                break;

            case "Home":
                nextIndex = 0;
                break;

            case "End":
                nextIndex = tabs.length - 1;
                break;

            case "Enter":
            case " ":
                event.preventDefault();
                activateTab(tab);
                return;

            default:
                return;
        }

        event.preventDefault();

        const nextTab = tabs[nextIndex];

        if (!nextTab) {
            return;
        }

        nextTab.focus();

        /*
         * Automatic activation:
         *
         * Moving with the arrow keys immediately switches
         * the selected tab, matching the expected behavior
         * for standard application tabs.
         */
        activateTab(nextTab, false);
    }


    /* -----------------------------------------------------
       Initialization
       ----------------------------------------------------- */

    function initializeTabs() {
        document
            .querySelectorAll(TAB_CONTAINER_SELECTOR)
            .forEach((container) => {
                const tabs = getTabs(container);

                if (!tabs.length) {
                    return;
                }

                let activeTab = tabs.find(
                    (tab) =>
                        tab.getAttribute("aria-selected") === "true"
                );

                if (!activeTab) {
                    activeTab = tabs[0];
                }

                tabs.forEach((tab) => {
                    const active = tab === activeTab;

                    setTabState(tab, active);

                    tab.addEventListener(
                        "keydown",
                        handleTabKeydown
                    );

                    tab.addEventListener(
                        "click",
                        () => activateTab(tab, false)
                    );
                });
            });
    }


    /* -----------------------------------------------------
       Public API
       ----------------------------------------------------- */

    window.OneModeTabs = {
        activate: activateTab,

        getActive(container) {
            return getActiveTab(container);
        },
    };


    /* -----------------------------------------------------
       Start
       ----------------------------------------------------- */

    initializeTabs();
})();