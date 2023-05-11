//Display of the new header when we scroll the page
$(document).ready(function() {
    function sticky_header() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#header_fixed').addClass("sticky_header");
            } else {
                $('#header_fixed').removeClass("sticky_header");
            }
        });
    }
    sticky_header();
});