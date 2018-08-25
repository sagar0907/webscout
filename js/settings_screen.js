function orderChangeHandler(event, ui) {
    let site_list = $("#edit_site_list");
    let list = site_list.find(".search_item");
    let new_order = [];
    util.eachDomObj(list, function (box) {
        let name = box.data("name");
        new_order.push(name);
    });
    let success = back.getSites().setOrder(new_order);
    if (!success) renderEditScreen();
}

function showAddSite() {
    let btn = $("#add_site_btn");
    btn.removeClass("add_site_closed");
    btn.addClass("add_site_open");
}

function hideAddSite() {
    let btn = $("#add_site_btn");
    btn.addClass("add_site_closed");
    btn.removeClass("add_site_open");
}

function handleSettingsBack() {
    $("#edit_screen").hide();
    $("#home_screen").show();
    renderHomeScreen();
}

function showFormError(str) {
    $("#form_info").html(str);
}

function hideFormError() {
    $("#form_info").html("");
}


function add_site_form() {
    let name = $("#new_site_name").val().trim();
    let url = $("#new_site_url").val().trim();
    let color = $("#new_site_color").val().trim();
    let nameRegex = new RegExp('[a-zA-Z0-9 ]+');
    let urlRegex = new RegExp('https?:\\/\\/.+\\/.*{{query}}.*');
    let colorRegex = new RegExp('#[0-9abcdef]{6}');
    let validName = nameRegex.test(name);
    let validUrl = urlRegex.test(url);
    let validColor = colorRegex.test(color);
    let sites = back.getSites().getSites();
    let repeat = util.any(sites, function (site) {
        if (site.name === name) {
            return true;
        }
    }) || name === "WebScout";
    if (validName && validColor && validUrl && !repeat) {
        back.getSites().addNewSite(name, url, color);
        $("#new_site_name").val('');
        $("#new_site_url").val('');
        $("#new_site_color").val('#555555');
        renderEditScreen();
    } else {
        if (!validName || repeat) {
            showFormError("The name you entered is invalid.");
        }
        else if (!validUrl) {
            showFormError("The url you entered is invalid.");
        }
        else if (!validColor) {
            showFormError("The color you entered is invalid.");
        }
    }
    return false;
}

function renderEditScreen() {
    let sites = back.getSites().getSites(),
        site_list = $("#edit_site_list");
    site_list.empty();
    util.each(sites, function (site) {
        let siteBox = ui.editSearchBox.clone();
        let site_item = siteBox.find(".search_item");
        let site_item_name = siteBox.find(".search_item_name");
        let site_icon = siteBox.find(".site_icon");
        site_item.data("name", site.name);
        if (site.default) {
            site_icon.append($('<img class="site_img" src="../images/site_icons/' + site.name + '.svg">'));
        } else {
            siteBox.addClass("custom_site");
            site_icon.append($('<div class="site_initial">' + site.name.charAt(0) + '</div>'));
        }
        site_icon.css("background-color", site.color);
        site_item_name.html(site.name);
        site_item_name.css("color", site.color);

        let checkbox = siteBox.find(".item_checkbox");
        let input = checkbox.find("input");
        let label = checkbox.find("label");
        input.prop("checked", site.active);
        input.attr("id", "toggly_" + site.name);
        label.attr("for", "toggly_" + site.name);
        label.css("color", site.color);

        input.change(function () {
            if($(this).is(":checked")) {
                back.getSites().activateSite(site.name);
            } else {
                back.getSites().deactivateSite(site.name);
            }
        });
        site_list.append(siteBox);
    });
    handleSVG();
    hideFormError();
    site_list.sortable({stop: orderChangeHandler});
}

function initSettingsScreenHandlers() {
    $("#add_site_form")[0].onsubmit = function (evt) {
        add_site_form();
        return false;
    };
    let settings_back_button = $("#settings_back_button");
    settings_back_button.click(function (tar) {
        handleSettingsBack();
    });
    $(".add_site_icon").click(function () {
        if ($("#add_site_btn").hasClass("add_site_closed")) {
            showAddSite();
        } else {
            hideAddSite();
        }
    });
    $("#new_site_color").change(function () {
        let val = $(this).val().trim();
        let regex = new RegExp('#[0-9abcdef]{6}');
        let valid = regex.test(val);
        if (valid) {
            $("#color-preview").css("background-color", val)
        }
    });
    $("#delete_options").droppable({
        accept: ".custom_site",
        activeClass: "delete_close",
        hoverClass: "delete_open",
        drop: function (event, ui) {
            let draggable = ui.draggable;
            let name = draggable.find(".search_item").data("name");
            if (name) back.getSites().deleteSite(name);
            renderEditScreen();
        }
    });
}
