/* eslint-disable no-debugger, no-console */

import { Quill } from "vue2-editor";
Quill.register('air-bar', function (quill) {
    var toolbar = quill.modules.toolbar.container;

    // get the dimensions of the toolbar. Assuming that it doesn't change
    toolbar.style.visibility = "hidden";
    toolbar.style.position = "absolute";
    var toolbar_width = toolbar.offsetWidth, // get the width and height so we can keep it from squashing at the edge of the page
        toolbar_height = toolbar.offsetHeight;

    toolbar.style.display = "none"; // hide it if it's not hidden already.
    toolbar.style.visibility = "visible";
    toolbar.style.opacity = "0";
    toolbar.style.position = "fixed";
    toolbar.style.transition = "opacity 300ms, left 300ms, top 300ms";

    quill.on('selection-change', function (range) {
        debugger;
        if (range.start == range.end) { // no selection, fade out.
            toolbar.style.opacity = 0;
            setTimeout(function () {
                toolbar.style.display = "none"
            }, 300);
        } else {
            var selection_dimensions = window.getSelection().getRangeAt(0).getBoundingClientRect(); // see http://stackoverflow.com/a/17887684/2661831 . Probably alchemy and/or black magic.

            // if we're going to bump into the side of the window, go to the edge less 10px.
            if (toolbar_height + selection_dimensions.bottom > window.innerHeight) { 
                toolbar.style.top = window.innerHeight - (toolbar_height + 10) + "px";
            } else {
                toolbar.style.top = selection_dimensions.bottom + "px";
            }

            if (toolbar_width + selection_dimensions.right > window.innerWidth) {
                toolbar.style.left = window.innerWidth - (toolbar_width + 10) + "px";
            } else {
                toolbar.style.left = selection_dimensions.right + 10 + "px";
            }

            toolbar.style.display = "block";
            toolbar.style.opacity = 1;
        }
    });
});
