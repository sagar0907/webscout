let back = chrome.extension.getBackgroundPage();
let tabId;
let ui = {
    searchBox: $('<div class="search_item_box col-lg-3 col-md-4 col-sm-6">' +
        '       <button class="search_item row">' +
        '           <div class="site_icon"></div>' +
        '            <div class="search_item_name">' +
        '            </div>' +
        '        </button>' +
        '</div>'),
    editSearchBox: $('<li class="edit_search_item_box col-lg-3 col-md-4 col-sm-6">' +
        '       <div class="search_item row">' +
        '           <div class="site_icon"></div>' +
        '           <div class="search_item_name"></div>' +
        '           <div class="item_checkbox">' +
        '               <input type="checkbox"/>' +
        '               <label></label>' +
        '           </div>' +
        '        </div>' +
        '</li>')
};

$(document).ready(function () {
    renderHomeScreen();
    initHomeScreenHandlers();
    initSettingsScreenHandlers();
});

function handleSVG() {
    $('img[src$=".svg"]').each(function () {
        let $img = $(this);
        let imgURL = $img.attr('src');
        let attributes = $img.prop("attributes");

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            let $svg = $(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function () {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
}

chrome.extension.sendMessage({type: "tabId"}, function(response) {
    tabId = response;
});




