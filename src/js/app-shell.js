/* =========================================================
   OneMode — Application Shell
   ========================================================= */

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;


/* =========================================================
   Elements
   ========================================================= */

const shell = document.querySelector(".om-app-shell");

const sidebarToggle = document.querySelector(".om-sidebar-toggle");

const pageTitle = document.querySelector("#om-page-title");

const pageDescription = document.querySelector("#om-page-description");

const breadcrumbCurrent = document.querySelector(
    "#om-breadcrumb-current"
);


/* =========================================================
   Navigation Pages
   ========================================================= */

const navigationPages = {

    dashboard: {
        title: "Dashboard",
        description: "Overview of school operations and activities."
    },

    students: {
        title: "Students",
        description: "Manage student records and student information."
    },

    enrollment: {
        title: "Student Enrollment",
        description:
            "Manage student enrollment and review enrollment information for the current school year."
    },

    "class-schedule": {
        title: "Class Schedule",
        description:
            "Manage class schedules, subjects, sections, and assigned teachers."
    },

    finance: {
        title: "Finance",
        description:
            "Manage school fees, fee schedules, and financial configuration."
    },

    cashiering: {
        title: "Cashiering",
        description:
            "Manage student payments, receipts, and daily collections."
    },

    "cashiering-dashboard": {
        title: "Cashiering",
        description:
            "Overview of cashiering activity and collection status."
    },

    "cashiering-payments": {
        title: "Payments",
        description:
            "Record and manage student and customer payments."
    },

    "cashiering-receipts": {
        title: "Receipts",
        description:
            "View and manage issued payment receipts."
    },

    "cashiering-collections": {
        title: "Daily Collections",
        description:
            "Review daily cashier collections and collection summaries."
    },

    accounting: {
        title: "Accounting",
        description:
            "Manage accounting transactions, records, and financial reports."
    },

    reports: {
        title: "Reports",
        description:
            "View and generate operational and financial reports."
    },

    administration: {
        title: "Administration",
        description:
            "Manage users, roles, permissions, and system settings."
    },

    settings: {
        title: "Settings",
        description:
            "Manage application and school configuration."
    }
};


/* =========================================================
   Sidebar State
   ========================================================= */

function setCollapsed(collapsed) {

    if (!shell) {
        return;
    }

    shell.classList.toggle(
        "om-sidebar-collapsed",
        collapsed
    );

    if (sidebarToggle) {

        sidebarToggle.setAttribute(
            "aria-expanded",
            String(!collapsed)
        );

        sidebarToggle.setAttribute(
            "aria-label",
            collapsed
                ? "Open navigation"
                : "Collapse navigation"
        );
    }
}


function openMobileSidebar() {

    if (!shell) {
        return;
    }

    shell.classList.add(
        "om-sidebar-mobile-open"
    );

    document.body.classList.add(
        "om-sidebar-scroll-lock"
    );

    if (sidebarToggle) {

        sidebarToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        sidebarToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );
    }
}


function closeMobileSidebar() {

    if (!shell) {
        return;
    }

    shell.classList.remove(
        "om-sidebar-mobile-open"
    );

    document.body.classList.remove(
        "om-sidebar-scroll-lock"
    );

    if (sidebarToggle) {

        sidebarToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        sidebarToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );
    }
}


/* =========================================================
   Navigation State
   ========================================================= */

function setActiveNavigation(navKey) {

    const links = document.querySelectorAll(
        "[data-om-nav]"
    );

    links.forEach((link) => {

        const isActive =
            link.dataset.omNav === navKey;

        link.classList.toggle(
            "om-nav-link-active",
            isActive
        );

        if (isActive) {

            link.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            link.removeAttribute(
                "aria-current"
            );
        }
    });
}


/* =========================================================
   Expand Parent Navigation
   ========================================================= */

function setNavigationExpanded(
    parent,
    expanded
) {

    if (!parent) {
        return;
    }

    const toggle = parent.querySelector(
        ":scope > [data-om-nav-toggle]"
    );

    const sublist = parent.querySelector(
        ":scope > .om-nav-sublist"
    );

    if (!toggle || !sublist) {
        return;
    }

    parent.classList.toggle(
        "om-nav-item-expanded",
        expanded
    );

    toggle.setAttribute(
        "aria-expanded",
        String(expanded)
    );
}


function initializeNavigationGroups() {

    const parents = document.querySelectorAll(
        "[data-om-nav-parent]"
    );

    parents.forEach((parent) => {

        const toggle = parent.querySelector(
            ":scope > [data-om-nav-toggle]"
        );

        if (!toggle) {
            return;
        }

        toggle.addEventListener(
            "click",
            () => {

                const expanded =
                    parent.classList.contains(
                        "om-nav-item-expanded"
                    );

                setNavigationExpanded(
                    parent,
                    !expanded
                );
            }
        );
    });
}


/* =========================================================
   Ensure Parent Is Expanded For Active Child
   ========================================================= */

function expandActiveNavigationParent(navKey) {

    const activeLink = document.querySelector(
        `[data-om-nav="${navKey}"]`
    );

    if (!activeLink) {
        return;
    }

    const parent = activeLink.closest(
        "[data-om-nav-parent]"
    );

    if (parent) {

        setNavigationExpanded(
            parent,
            true
        );
    }
}


/* =========================================================
   Page Content
   ========================================================= */

function updatePage(navKey) {

    const page =
        navigationPages[navKey];

    if (!page) {
        return;
    }

    if (pageTitle) {

        pageTitle.textContent =
            page.title;
    }

    if (pageDescription) {

        pageDescription.textContent =
            page.description;
    }

    if (breadcrumbCurrent) {

        breadcrumbCurrent.textContent =
            page.title;
    }

    document.title =
        `OneMode — ${page.title}`;
}


/* =========================================================
   Navigation
   ========================================================= */

function navigateTo(
    navKey,
    updateUrl = true
) {

    if (!navigationPages[navKey]) {
        return;
    }

    setActiveNavigation(
        navKey
    );

    updatePage(
        navKey
    );

    expandActiveNavigationParent(
        navKey
    );

    if (updateUrl) {

        const newUrl =
            `${window.location.pathname}#${navKey}`;

        window.history.pushState(
            {
                omNavigation: navKey
            },
            "",
            newUrl
        );
    }

    if (
        window.innerWidth <=
        MOBILE_BREAKPOINT
    ) {

        closeMobileSidebar();
    }
}


/* =========================================================
   Navigation Clicks
   ========================================================= */

function initializeNavigation() {

    const links = document.querySelectorAll(
        "[data-om-nav]"
    );

    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const navKey =
                    link.dataset.omNav;

                navigateTo(
                    navKey
                );
            }
        );
    });
}


/* =========================================================
   Sidebar Toggle
   ========================================================= */

function initializeSidebarToggle() {

    if (!sidebarToggle) {
        return;
    }

    sidebarToggle.addEventListener(
        "click",
        () => {

            if (
                window.innerWidth <=
                MOBILE_BREAKPOINT
            ) {

                const isOpen =
                    shell.classList.contains(
                        "om-sidebar-mobile-open"
                    );

                if (isOpen) {

                    closeMobileSidebar();

                } else {

                    openMobileSidebar();
                }

                return;
            }


            const isCollapsed =
                shell.classList.contains(
                    "om-sidebar-collapsed"
                );

            setCollapsed(
                !isCollapsed
            );
        }
    );
}


/* =========================================================
   Mobile Overlay
   ========================================================= */

function initializeMobileOverlay() {

    const overlay =
        document.querySelector(
            ".om-sidebar-overlay"
        );

    if (!overlay) {
        return;
    }

    overlay.addEventListener(
        "click",
        closeMobileSidebar
    );
}


/* =========================================================
   Escape Key
   ========================================================= */

function initializeEscapeHandler() {

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                shell.classList.contains(
                    "om-sidebar-mobile-open"
                )
            ) {

                closeMobileSidebar();
            }
        }
    );
}


/* =========================================================
   Browser Navigation
   ========================================================= */

window.addEventListener(
    "popstate",
    () => {

        const navKey =
            window.location.hash
                .replace("#", "");

        if (navigationPages[navKey]) {

            navigateTo(
                navKey,
                false
            );
        }
    }
);


/* =========================================================
   Responsive State
   ========================================================= */

function applyResponsiveState() {

    if (!shell) {
        return;
    }

    const width =
        window.innerWidth;


    /*
     * Mobile
     */
    if (width <= MOBILE_BREAKPOINT) {

        setCollapsed(false);

        closeMobileSidebar();

        return;
    }


    /*
     * Tablet
     */
    if (width <= TABLET_BREAKPOINT) {

        closeMobileSidebar();

        setCollapsed(true);

        return;
    }


    /*
     * Desktop
     */
    closeMobileSidebar();

    setCollapsed(false);
}


/* =========================================================
   Resize
   ========================================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );

        resizeTimer = setTimeout(
            applyResponsiveState,
            100
        );
    }
);


/* =========================================================
   Initialize
   ========================================================= */

initializeSidebarToggle();

initializeMobileOverlay();

initializeEscapeHandler();

initializeNavigation();

initializeNavigationGroups();


/*
 * Determine initial page from URL.
 */
const initialHash =
    window.location.hash
        .replace("#", "");


/*
 * Default to Enrollment for
 * the current OneMode example.
 */
const initialPage =
    navigationPages[initialHash]
        ? initialHash
        : "enrollment";


navigateTo(
    initialPage,
    false
);


applyResponsiveState();