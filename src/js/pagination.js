/* =========================================================
   OneMode — Pagination
   ========================================================= */

import { isBrowser } from "./environment.js";

(() => {
    const PAGINATION_SELECTOR = "[data-om-pagination]";

    const DEFAULT_SIBLING_COUNT = 1;


    /* -----------------------------------------------------
       Helpers
       ----------------------------------------------------- */

    function getNumber(value, fallback) {
        const number = Number(value);

        return Number.isFinite(number)
            ? number
            : fallback;
    }

    function getPaginationState(container) {
        return {
            currentPage: getNumber(
                container.dataset.omCurrentPage,
                1
            ),

            totalPages: getNumber(
                container.dataset.omTotalPages,
                1
            ),

            siblingCount: getNumber(
                container.dataset.omSiblingCount,
                DEFAULT_SIBLING_COUNT
            ),
        };
    }

    function clamp(value, min, max) {
        return Math.min(
            Math.max(value, min),
            max
        );
    }


    /* -----------------------------------------------------
       Page range
       ----------------------------------------------------- */

    function createPageRange(
        currentPage,
        totalPages,
        siblingCount
    ) {
        if (totalPages <= 1) {
            return [1];
        }

        const totalPageNumbers =
            siblingCount * 2 + 5;

        if (totalPages <= totalPageNumbers) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        const leftSibling =
            Math.max(
                currentPage - siblingCount,
                1
            );

        const rightSibling =
            Math.min(
                currentPage + siblingCount,
                totalPages
            );

        const showLeftEllipsis =
            leftSibling > 2;

        const showRightEllipsis =
            rightSibling < totalPages - 1;

        if (!showLeftEllipsis && showRightEllipsis) {
            const leftItemCount =
                3 + siblingCount * 2;

            const leftRange = Array.from(
                { length: leftItemCount },
                (_, index) => index + 1
            );

            return [
                ...leftRange,
                "ellipsis-right",
                totalPages,
            ];
        }

        if (showLeftEllipsis && !showRightEllipsis) {
            const rightItemCount =
                3 + siblingCount * 2;

            const rightRange = Array.from(
                { length: rightItemCount },
                (_, index) =>
                    totalPages -
                    rightItemCount +
                    index +
                    1
            );

            return [
                1,
                "ellipsis-left",
                ...rightRange,
            ];
        }

        return [
            1,
            "ellipsis-left",
            ...Array.from(
                {
                    length:
                        rightSibling -
                        leftSibling +
                        1,
                },
                (_, index) =>
                    leftSibling + index
            ),
            "ellipsis-right",
            totalPages,
        ];
    }


    /* -----------------------------------------------------
       Create controls
       ----------------------------------------------------- */

    function createButton({
        label,
        page,
        icon = null,
        disabled = false,
        active = false,
        ariaLabel = null,
    }) {
        const button = document.createElement("button");

        button.type = "button";

        button.className =
            "om-pagination-item";

        if (icon) {
            button.classList.add(
                "om-pagination-item-icon"
            );
        }

        if (active) {
            button.classList.add(
                "om-pagination-item-active"
            );
        }

        if (disabled) {
            button.disabled = true;
            button.classList.add(
                "om-pagination-item-disabled"
            );
        }

        if (ariaLabel) {
            button.setAttribute(
                "aria-label",
                ariaLabel
            );
        }

        if (active) {
            button.setAttribute(
                "aria-current",
                "page"
            );
        }

        button.dataset.omPage = String(page);

        if (icon) {
            const iconElement =
                document.createElement("i");

            iconElement.className =
                `bi ${icon}`;

            button.appendChild(iconElement);
        } else {
            button.textContent = label;
        }

        return button;
    }


    function createEllipsis(type) {
        const element =
            document.createElement("span");

        element.className =
            "om-pagination-ellipsis";

        element.textContent = "…";

        element.setAttribute(
            "aria-hidden",
            "true"
        );

        element.dataset.omEllipsis = type;

        return element;
    }


    /* -----------------------------------------------------
       Render
       ----------------------------------------------------- */

    function renderPagination(container) {
        const {
            currentPage: rawCurrentPage,
            totalPages: rawTotalPages,
            siblingCount,
        } = getPaginationState(container);

        const totalPages =
            Math.max(1, rawTotalPages);

        const currentPage =
            clamp(
                rawCurrentPage,
                1,
                totalPages
            );

        container.dataset.omCurrentPage =
            String(currentPage);

        container.dataset.omTotalPages =
            String(totalPages);

        const list =
            container.querySelector(
                "[data-om-pagination-list]"
            );

        if (!list) {
            return;
        }

        list.innerHTML = "";

        /* Previous */

        const previousItem =
            document.createElement("li");

        const previousButton =
            createButton({
                label: "Previous",
                page: currentPage - 1,
                icon: "bi-chevron-left",
                disabled: currentPage === 1,
                ariaLabel: "Previous page",
            });

        previousItem.appendChild(
            previousButton
        );

        list.appendChild(previousItem);


        /* Pages */

        const range = createPageRange(
            currentPage,
            totalPages,
            siblingCount
        );

        range.forEach((item) => {
            const listItem =
                document.createElement("li");

            if (typeof item === "string") {
                listItem.appendChild(
                    createEllipsis(item)
                );
            } else {
                const button =
                    createButton({
                        label: String(item),
                        page: item,
                        active:
                            item === currentPage,
                        ariaLabel:
                            `Page ${item}`,
                    });

                listItem.appendChild(button);
            }

            list.appendChild(listItem);
        });


        /* Next */

        const nextItem =
            document.createElement("li");

        const nextButton =
            createButton({
                label: "Next",
                page: currentPage + 1,
                icon: "bi-chevron-right",
                disabled:
                    currentPage === totalPages,
                ariaLabel: "Next page",
            });

        nextItem.appendChild(nextButton);

        list.appendChild(nextItem);


        updateSummary(container);
    }


    /* -----------------------------------------------------
       Summary
       ----------------------------------------------------- */

    function updateSummary(container) {
        const summary =
            container.querySelector(
                "[data-om-pagination-summary]"
            );

        if (!summary) {
            return;
        }

        const currentPage =
            Number(
                container.dataset.omCurrentPage
            );

        const totalPages =
            Number(
                container.dataset.omTotalPages
            );

        const totalItems =
            getNumber(
                container.dataset.omTotalItems,
                0
            );

        const pageSize =
            getNumber(
                container.dataset.omPageSize,
                0
            );

        if (!totalItems || !pageSize) {
            summary.textContent =
                `Page ${currentPage} of ${totalPages}`;

            return;
        }

        const start =
            (currentPage - 1) *
                pageSize +
            1;

        const end =
            Math.min(
                currentPage * pageSize,
                totalItems
            );

        summary.innerHTML =
            `Showing <strong>${start}–${end}</strong> ` +
            `of <strong>${totalItems}</strong>`;
    }


    /* -----------------------------------------------------
       Page change
       ----------------------------------------------------- */

    function goToPage(container, page) {
        const totalPages =
            Number(
                container.dataset.omTotalPages
            );

        const nextPage =
            clamp(
                Number(page),
                1,
                totalPages
            );

        const currentPage =
            Number(
                container.dataset.omCurrentPage
            );

        if (nextPage === currentPage) {
            return;
        }

        container.dataset.omCurrentPage =
            String(nextPage);

        renderPagination(container);

        const event =
            new CustomEvent(
                "om:pagechange",
                {
                    bubbles: true,
                    detail: {
                        page: nextPage,
                        totalPages,
                        pagination: container,
                    },
                }
            );

        container.dispatchEvent(event);
    }


    /* -----------------------------------------------------
       Event handling
       ----------------------------------------------------- */

    function handlePaginationClick(event) {
        const button =
            event.target.closest(
                ".om-pagination-item"
            );

        if (
            !button ||
            button.disabled
        ) {
            return;
        }

        const container =
            button.closest(
                PAGINATION_SELECTOR
            );

        if (!container) {
            return;
        }

        const page =
            Number(
                button.dataset.omPage
            );

        if (!Number.isFinite(page)) {
            return;
        }

        goToPage(
            container,
            page
        );
    }


    /* -----------------------------------------------------
       Initialization
       ----------------------------------------------------- */

    function initializePagination() {
        document
            .querySelectorAll(
                PAGINATION_SELECTOR
            )
            .forEach((container) => {
                renderPagination(container);

                container.addEventListener(
                    "click",
                    handlePaginationClick
                );
            });
    }


    /* -----------------------------------------------------
       Public API
       ----------------------------------------------------- */

    if (isBrowser()) {

        window.OneModePagination = {
            render: renderPagination,

            goToPage,

            setTotalPages(
                container,
                totalPages
            ) {
                container.dataset.omTotalPages =
                    String(
                        Math.max(
                            1,
                            Number(totalPages)
                        )
                    );

                renderPagination(container);
            },

            setCurrentPage(
                container,
                currentPage
            ) {
                goToPage(
                    container,
                    currentPage
                );
            },
        };


        /* -------------------------------------------------
           Start
           ------------------------------------------------- */

        initializePagination();
    }

})();