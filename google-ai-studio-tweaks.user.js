// ==UserScript==
// @name         Google AI Studio Tweaks
// @version      1.0
// @description  Press Enter to run prompts (instead of Ctrl+Enter) and removes the redundant 'Ctrl' key hint from the UI in Google AI Studio.
// @author       EZER
// @updateURL    https://raw.githubusercontent.com/Ezer015/google-ai-studio-tweaks/master/google-ai-studio-tweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/Ezer015/google-ai-studio-tweaks/master/google-ai-studio-tweaks.user.js
// @match        https://aistudio.google.com/prompts/*
// @icon         https://www.gstatic.com/aistudio/ai_studio_favicon_2_128x128.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // --- Configuration: Define all selectors as constants ---
    const TEXTAREA_SELECTOR = 'textarea.textarea.v3-font-body';
    const RUN_BUTTON_SELECTOR = 'button.run-button';
    const HINT_SELECTOR = 'span.secondary-key';

    // --- Feature 1: Press "Enter" to click the run button ---
    document.addEventListener('keydown', function (event) {
        // Check if the target is the correct textarea and Enter is pressed (without Shift)
        if (event.key === 'Enter' && !event.shiftKey && event.target.matches(TEXTAREA_SELECTOR)) {
            event.preventDefault(); // Stop the default new-line behavior
            document.querySelector(RUN_BUTTON_SELECTOR)?.click(); // Find and click the button
        }
    }, true);


    // --- Feature 2: Find and remove the "Ctrl" hint ---

    // A function that finds and removes the hint element
    function removeCtrlHint() {
        const hintElement = document.querySelector(HINT_SELECTOR);
        // If the element exists and its text is "Ctrl", remove it
        if (hintElement && hintElement.innerText.trim() === 'Ctrl') {
            hintElement.remove();
        }
    }

    // Create an observer to watch for page changes (like new elements being added)
    const observer = new MutationObserver(removeCtrlHint);

    // Tell the observer to watch the entire page for any changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Run the function once at the start in case the element is already on the page
    removeCtrlHint();

})();