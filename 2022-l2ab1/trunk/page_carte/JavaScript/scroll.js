/* AFFICHAGE DU NOUVEAU HEADER QUAND ON SCROLL LA PAGE */
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