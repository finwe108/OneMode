/* =========================================================
   OneMode — Form Helpers
   ========================================================= */

(() => {
    /* -----------------------------------------------------
       Search clear buttons
       ----------------------------------------------------- */

    document
        .querySelectorAll(".om-search")
        .forEach((search) => {
            const input =
                search.querySelector(
                    ".om-form-control"
                );

            const clearButton =
                search.querySelector(
                    ".om-search-clear"
                );

            if (!input || !clearButton) {
                return;
            }

            function updateClearButton() {
                clearButton.hidden =
                    input.value.length === 0;
            }

            clearButton.addEventListener(
                "click",
                () => {
                    input.value = "";

                    updateClearButton();

                    input.focus();

                    input.dispatchEvent(
                        new Event("input", {
                            bubbles: true,
                        })
                    );
                }
            );

            input.addEventListener(
                "input",
                updateClearButton
            );

            updateClearButton();
        });
})();