/*
|--------------------------------------------------------------------------
| OneMode Data Table
|--------------------------------------------------------------------------
|
| Responsibilities:
| - Sorting
| - Search
| - Select filters
| - Client-side pagination
| - Result summaries
| - Empty state
|
| Pagination and filtering use table state instead of row.hidden.
| This prevents filtering and pagination from interfering with each other.
|
|--------------------------------------------------------------------------
*/

(() => {
    "use strict";


    /* ================================================================
       TABLE STATE
       ================================================================ */

    const tableStates = new WeakMap();


    function getTableState(table) {

        if (!tableStates.has(table)) {

            tableStates.set(table, {
                filteredRows: [],
                currentPage: 1,
            });
        }

        return tableStates.get(table);
    }


    /* ================================================================
       HELPERS
       ================================================================ */

    function getTableContainer(table) {

        return table.closest(".om-data-table");
    }


    function getTableRows(table) {

        return Array.from(
            table.tBodies[0]?.rows || []
        );
    }


    function getPageSize(table) {

        const container =
            getTableContainer(table);

        const configuredSize =
            Number(
                container?.dataset.omPageSize
            );

        if (
            Number.isFinite(configuredSize) &&
            configuredSize > 0
        ) {
            return Math.floor(configuredSize);
        }

        return 10;
    }


    function getPaginationElement(table) {

        const container =
            getTableContainer(table);

        if (!container) {
            return null;
        }

        return container.querySelector(
            "[data-om-table-pagination]"
        );
    }


    /* ================================================================
       SEARCH + FILTER
       ================================================================ */

    function filterTable(table) {

        const container =
            getTableContainer(table);

        if (!container) {
            return;
        }


        const state =
            getTableState(table);


        /* ------------------------------------------------------------
           Search
           ------------------------------------------------------------ */

        const searchInput =
            container.querySelector(
                "[data-om-table-search] input"
            );

        const searchTerm =
            searchInput?.value
                ?.toLowerCase()
                .trim() || "";


        /* ------------------------------------------------------------
           Select Filters
           ------------------------------------------------------------ */

        const filters =
            Array.from(
                container.querySelectorAll(
                    "[data-om-table-filter]"
                )
            );


        /* ------------------------------------------------------------
           All Rows
           ------------------------------------------------------------ */

        const rows =
            getTableRows(table);


        /* ------------------------------------------------------------
           Determine Filtered Rows
           ------------------------------------------------------------ */

        const filteredRows =
            rows.filter((row) => {

                /* Search */

                const rowText =
                    row.innerText
                        .toLowerCase()
                        .trim();

                const matchesSearch =
                    !searchTerm ||
                    rowText.includes(searchTerm);


                /* Select filters */

                const matchesFilters =
                    filters.every((filter) => {

                        const filterColumn =
                            filter.dataset
                                .omTableFilter;

                        const selectedValue =
                            filter.value
                                .toLowerCase()
                                .trim();


                        /*
                         * "all" means this filter
                         * does not restrict the table.
                         */

                        if (
                            !selectedValue ||
                            selectedValue === "all"
                        ) {
                            return true;
                        }


                        const cell =
                            row.querySelector(
                                `[data-om-table-column="${filterColumn}"]`
                            );


                        if (!cell) {
                            return false;
                        }


                        const cellValue =
                            cell.innerText
                                .toLowerCase()
                                .trim();


                        return (
                            cellValue ===
                            selectedValue
                        );
                    });


                return (
                    matchesSearch &&
                    matchesFilters
                );
            });


        /* ------------------------------------------------------------
           Save State
           ------------------------------------------------------------ */

        state.filteredRows =
            filteredRows;

        /*
         * A new search/filter always starts
         * from page 1.
         */

        state.currentPage = 1;


        /* ------------------------------------------------------------
           Render
           ------------------------------------------------------------ */

        renderTablePagination(table);


        /* ------------------------------------------------------------
           Result Summary
           ------------------------------------------------------------ */

        const summary =
            container.querySelector(
                "[data-om-table-result-summary]"
            );


        if (summary) {

            if (filteredRows.length === rows.length) {

                summary.textContent =
                    `Showing ${filteredRows.length} schedules`;

            } else {

                summary.textContent =
                    `Showing ${filteredRows.length} of ${rows.length} schedules`;
            }
        }


        /* ------------------------------------------------------------
           Empty State
           ------------------------------------------------------------ */

        let emptyState =
            container.querySelector(
                "[data-om-table-empty]"
            );


        if (
            filteredRows.length === 0 &&
            !emptyState
        ) {

            emptyState =
                document.createElement("div");

            emptyState.className =
                "om-state om-state-empty";

            emptyState.dataset.omTableEmpty = "";


            emptyState.innerHTML = `
                <div class="om-state-icon">
                    <i
                        class="bi bi-search"
                        aria-hidden="true"
                    ></i>
                </div>

                <h3 class="om-state-title">
                    No schedules found
                </h3>

                <p class="om-state-description">
                    Try changing your search or filters.
                </p>
            `;


            const wrapper =
                container.querySelector(
                    ".om-table-wrapper"
                );


            if (wrapper) {
                wrapper.appendChild(emptyState);
            }
        }


        if (emptyState) {

            emptyState.hidden =
                filteredRows.length !== 0;
        }


        /* ------------------------------------------------------------
           Event
           ------------------------------------------------------------ */

        table.dispatchEvent(
            new CustomEvent(
                "om:filterchange",
                {
                    bubbles: true,

                    detail: {
                        table,
                        searchTerm,
                        visibleCount:
                            filteredRows.length,
                        totalCount:
                            rows.length,
                    },
                }
            )
        );
    }


    /* ================================================================
       TABLE PAGINATION
       ================================================================ */

    function renderTablePagination(table) {

        const state =
            getTableState(table);


        const pagination =
            getPaginationElement(table);


        if (!pagination) {
            return;
        }


        const filteredRows =
            state.filteredRows;


        const pageSize =
            getPageSize(table);


        const totalItems =
            filteredRows.length;


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    totalItems / pageSize
                )
            );


        /* ------------------------------------------------------------
           Clamp Current Page
           ------------------------------------------------------------ */

        state.currentPage =
            Math.min(
                Math.max(
                    state.currentPage,
                    1
                ),
                totalPages
            );


        const currentPage =
            state.currentPage;


        /* ------------------------------------------------------------
           Hide All Rows First
           ------------------------------------------------------------ */

        const allRows =
            getTableRows(table);


        allRows.forEach((row) => {

            row.hidden = true;
        });


        /* ------------------------------------------------------------
           Determine Current Page
           ------------------------------------------------------------ */

        const startIndex =
            (currentPage - 1) *
            pageSize;


        const endIndex =
            startIndex +
            pageSize;


        const pageRows =
            filteredRows.slice(
                startIndex,
                endIndex
            );


        /* ------------------------------------------------------------
           Show Current Page
           ------------------------------------------------------------ */

        pageRows.forEach((row) => {

            row.hidden = false;
        });


        /* ------------------------------------------------------------
           Pagination List
           ------------------------------------------------------------ */

        const list =
            pagination.querySelector(
                "[data-om-pagination-list]"
            );


        if (list) {

            list.innerHTML = "";


            /* --------------------------------------------------------
               Previous
               -------------------------------------------------------- */

            const previousItem =
                document.createElement("li");

            previousItem.className =
                "om-pagination-item";


            const previousButton =
                document.createElement("button");

            previousButton.type =
                "button";

            previousButton.className =
                "om-pagination-link";

            previousButton.dataset.omTablePage =
                currentPage - 1;

            previousButton.disabled =
                currentPage <= 1;

            previousButton.setAttribute(
                "aria-label",
                "Previous page"
            );


            previousButton.innerHTML = `
                <i
                    class="bi bi-chevron-left"
                    aria-hidden="true"
                ></i>

                <span>Previous</span>
            `;


            previousItem.appendChild(
                previousButton
            );


            list.appendChild(
                previousItem
            );


            /* --------------------------------------------------------
               Page Numbers
               -------------------------------------------------------- */

            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {

                const item =
                    document.createElement("li");

                item.className =
                    "om-pagination-item";


                const button =
                    document.createElement("button");

                button.type =
                    "button";

                button.className =
                    "om-pagination-link";

                button.textContent =
                    page;

                button.dataset.omTablePage =
                    page;


                if (
                    page === currentPage
                ) {

                    button.classList.add(
                        "om-pagination-active"
                    );

                    button.setAttribute(
                        "aria-current",
                        "page"
                    );
                }


                item.appendChild(
                    button
                );


                list.appendChild(
                    item
                );
            }


            /* --------------------------------------------------------
               Next
               -------------------------------------------------------- */

            const nextItem =
                document.createElement("li");

            nextItem.className =
                "om-pagination-item";


            const nextButton =
                document.createElement("button");

            nextButton.type =
                "button";

            nextButton.className =
                "om-pagination-link";

            nextButton.dataset.omTablePage =
                currentPage + 1;

            nextButton.disabled =
                currentPage >= totalPages;

            nextButton.setAttribute(
                "aria-label",
                "Next page"
            );


            nextButton.innerHTML = `
                <span>Next</span>

                <i
                    class="bi bi-chevron-right"
                    aria-hidden="true"
                ></i>
            `;


            nextItem.appendChild(
                nextButton
            );


            list.appendChild(
                nextItem
            );
        }


        /* ------------------------------------------------------------
           Pagination Summary
           ------------------------------------------------------------ */

        const summary =
            pagination.querySelector(
                "[data-om-pagination-summary]"
            );


        if (summary) {

            if (totalItems === 0) {

                summary.textContent =
                    "Showing 0 schedules";

            } else {

                const firstItem =
                    startIndex + 1;


                const lastItem =
                    Math.min(
                        endIndex,
                        totalItems
                    );


                summary.textContent =
                    `Showing ${firstItem}–${lastItem} of ${totalItems} schedules`;
            }
        }
    }


    /* ================================================================
       CHANGE PAGE
       ================================================================ */

    function setTablePage(table, page) {

        const state =
            getTableState(table);


        const pageSize =
            getPageSize(table);


        const totalItems =
            state.filteredRows.length;


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    totalItems / pageSize
                )
            );


        const targetPage =
            Number(page);


        if (
            !Number.isFinite(targetPage)
        ) {
            return;
        }


        state.currentPage =
            Math.min(
                Math.max(
                    Math.floor(targetPage),
                    1
                ),
                totalPages
            );


        renderTablePagination(table);


        table.dispatchEvent(
            new CustomEvent(
                "om:pagechange",
                {
                    bubbles: true,

                    detail: {
                        table,
                        page:
                            state.currentPage,
                        totalPages,
                        totalItems,
                    },
                }
            )
        );
    }


    /* ================================================================
       PAGINATION EVENTS
       ================================================================ */

    function initializeTablePagination(table) {

        const pagination =
            getPaginationElement(table);


        if (!pagination) {
            return;
        }


        /*
         * Event delegation is used because page buttons
         * are recreated every time pagination renders.
         */

        pagination.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        "[data-om-table-page]"
                    );


                if (!button) {
                    return;
                }


                if (button.disabled) {
                    return;
                }


                const page =
                    Number(
                        button.dataset.omTablePage
                    );


                setTablePage(
                    table,
                    page
                );
            }
        );
    }


    /* ================================================================
       SEARCH EVENTS
       ================================================================ */

    function initializeSearch(table) {

        const container =
            getTableContainer(table);


        if (!container) {
            return;
        }


        const input =
            container.querySelector(
                "[data-om-table-search] input"
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "input",
            () => {

                filterTable(table);
            }
        );
    }


    /* ================================================================
       FILTER EVENTS
       ================================================================ */

    function initializeFilters(table) {

        const container =
            getTableContainer(table);


        if (!container) {
            return;
        }


        const filters =
            container.querySelectorAll(
                "[data-om-table-filter]"
            );


        filters.forEach((filter) => {

            filter.addEventListener(
                "change",
                () => {

                    filterTable(table);
                }
            );
        });
    }


    /* ================================================================
       SORTING
       ================================================================ */

    function initializeSorting(table) {

        const headers =
            table.querySelectorAll(
                "th[data-om-sort]"
            );


        headers.forEach((header) => {

            header.addEventListener(
                "click",
                () => {

                    const column =
                        header.dataset.omSort;


                    if (!column) {
                        return;
                    }


                    const currentDirection =
                        header.dataset.omSortDirection ||
                        "none";


                    const direction =
                        currentDirection === "asc"
                            ? "desc"
                            : "asc";


                    /*
                     * Reset other headers.
                     */

                    headers.forEach((otherHeader) => {

                        if (
                            otherHeader !== header
                        ) {

                            delete otherHeader.dataset
                                .omSortDirection;
                        }
                    });


                    header.dataset.omSortDirection =
                        direction;


                    const tbody =
                        table.tBodies[0];


                    if (!tbody) {
                        return;
                    }


                    const rows =
                        Array.from(
                            tbody.rows
                        );


                    const columnIndex =
                        header.cellIndex;


                    rows.sort(
                        (rowA, rowB) => {

                            const cellA =
                                rowA.cells[
                                    columnIndex
                                ];


                            const cellB =
                                rowB.cells[
                                    columnIndex
                                ];


                            const valueA =
                                cellA?.innerText
                                    ?.trim()
                                    .toLowerCase() ||
                                "";


                            const valueB =
                                cellB?.innerText
                                    ?.trim()
                                    .toLowerCase() ||
                                "";


                            const numericA =
                                parseFloat(
                                    valueA
                                        .replace(
                                            /[^\d.-]/g,
                                            ""
                                        )
                                );


                            const numericB =
                                parseFloat(
                                    valueB
                                        .replace(
                                            /[^\d.-]/g,
                                            ""
                                        )
                                );


                            let comparison;


                            /*
                             * Numeric values
                             */

                            if (
                                !Number.isNaN(numericA) &&
                                !Number.isNaN(numericB)
                            ) {

                                comparison =
                                    numericA -
                                    numericB;

                            } else {

                                comparison =
                                    valueA.localeCompare(
                                        valueB
                                    );
                            }


                            return direction === "asc"
                                ? comparison
                                : -comparison;
                        }
                    );


                    rows.forEach((row) => {

                        tbody.appendChild(
                            row
                        );
                    });


                    /*
                     * Re-run filtering/pagination
                     * after sorting.
                     */

                    filterTable(table);
                }
            );
        });
    }


    /* ================================================================
       INITIALIZE TABLE
       ================================================================ */

    function initializeTable(table) {

        const state =
            getTableState(table);


        /*
         * Start with all table rows available.
         */

        state.filteredRows =
            getTableRows(table);


        state.currentPage =
            1;


        initializeSorting(table);

        initializeSearch(table);

        initializeFilters(table);

        initializeTablePagination(table);


        /*
         * Initial filtering also renders
         * the first page.
         */

        filterTable(table);
    }


    /* ================================================================
       INITIALIZE ALL TABLES
       ================================================================ */

    function initializeAllTables() {

        const tables =
            document.querySelectorAll(
                ".om-data-table .om-table"
            );


        tables.forEach((table) => {

            initializeTable(table);
        });
    }


    /* ================================================================
       PUBLIC API
       ================================================================ */

    window.OneModeTable = {

        filter: filterTable,

        setPage: setTablePage,

        refresh: initializeAllTables,
    };


    /* ================================================================
       DOM READY
       ================================================================ */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeAllTables
        );

    } else {

        initializeAllTables();
    }

})();