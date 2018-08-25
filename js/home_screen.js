function focus_search() {
    $('#search_bar input').focus();
}

function changeSearchSite(name) {
    let sites = back.getSites().getSites();
    util.any(sites, function (site) {
        if (site.name === name) {
            back.getSites().setSelectedSite(name);
            let searchName = $(".search_item_name_top"),
                siteIcon = $(".site_icon_top"),
                icon;
            searchName.html(name);
            searchName.css("color", site.color);
            siteIcon.css("background-color", site.color);
            $("#search_input").css("border-color", site.color);
            if (site.default) {
                icon = $('<img src="../images/site_icons/' + site.name + '.svg">');
            } else {
                icon = $('<div class="site_initial_top">' + site.name.charAt(0) +'</div>');
            }
            siteIcon.empty();
            siteIcon.append(icon);
            focus_search();
            handleSVG();
            return true;
        }
    });
}

function handle_form_submit() {
    let query = $('#search_input input').val();
    query = query.trim();
    if (query === "") {
        return;
    }
    query = encodeURIComponent(query);
    query = util.replaceAll(query, '%20', '+');
    back.openNewScoutTab(back.getSites().getSelectedSite(), query, tabId);
}

function handleEdit() {
    $("#home_screen").hide();
    $("#edit_screen").show();
    renderEditScreen();
}


function renderSiteList() {
    let sites = back.getSites().getSites(),
        site_list = $("#search_site_list");
    site_list.empty();
    util.each(sites, function (site) {
        if (!site.active) return;
        let siteBox = ui.searchBox.clone();
        let site_item = siteBox.find(".search_item");
        let site_item_name = siteBox.find(".search_item_name");
        let site_icon = siteBox.find(".site_icon");
        site_item.prop("name", site.name);
        if (site.default) {
            site_icon.append($('<img class="site_img" src="../images/site_icons/' + site.name + '.svg">'));
        } else {
            site_icon.append($('<div class="site_initial">' + site.name.charAt(0) + '</div>'));
        }
        site_item.css("background-color", site.color);
        site_item.click(function (event) {
            changeSearchSite(event.currentTarget.name);
            handle_form_submit();
        });
        site_item_name.html(site.name);
        site_list.append(siteBox);
    });
}

function renderHomeScreen() {
    focus_search();
    renderSiteList();
    handleSVG();
    changeSearchSite(back.getSites().getSelectedSite());
}

function initHomeScreenHandlers() {
    $("#search_bar form")[0].onsubmit = function (evt) {
        handle_form_submit();
        return false;
    };
    let edit_button = $("#edit");
    edit_button.click(function (tar) {
        handleEdit();
    });
}
