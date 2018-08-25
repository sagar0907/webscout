let sites = function () {
    let selected_site = "Google";
    let siteOrder = ["Google", "Bing", "Yahoo", "Amazon", "IMDb", "Quora", "Facebook", "YouTube", "Wolfram Alpha", "LinkedIn", "Stack Overflow", "Wikipedia", "GoodReads", "Foursquare", "Gmail", "Twitter", "Google Drive"];
    let siteData = {
        "Google": {
            name: "Google",
            homepage: "https://www.google.co.in/",
            search: "https://www.google.co.in/search?q={{query}}",
            color: "#4285F4",
            default: true,
            active: true
        },
        "Bing": {
            name: "Bing",
            homepage: "https://www.bing.com/",
            search: "https://www.bing.com/search?q={{query}}",
            color: "#008373",
            default: true,
            active: true
        },
        "Yahoo": {
            name: "Yahoo",
            homepage: "https://yahoo.com/",
            search: "https://search.yahoo.com/search?p={{query}}",
            color: "#440099",
            default: true,
            active: true
        },
        "Amazon": {
            name: "Amazon",
            homepage: "https://www.amazon.com/",
            search: "https://www.amazon.com/s/?field-keywords={{query}}",
            color: "#FF9900",
            default: true,
            active: true
        },
        "IMDb": {
            name: "IMDb",
            homepage: "https://www.imdb.com/",
            search: "https://www.imdb.com/find?s=all&q={{query}}",
            color: "#E6B91E",
            default: true,
            active: true
        },
        "Quora": {
            name: "Quora",
            homepage: "https://www.quora.com/",
            search: "https://www.quora.com/search?q={{query}}",
            color: "#B92B27",
            default: true,
            active: true
        },
        "Facebook": {
            name: "Facebook",
            homepage: "https://www.facebook.com/",
            search: "https://www.facebook.com/search/top/?q={{query}}",
            color: "#3B5998",
            default: true,
            active: true
        },
        "YouTube": {
            name: "YouTube",
            homepage: "https://www.youtube.com/",
            search: "https://www.youtube.com/results?search_query={{query}}",
            color: "#FF0000",
            default: true,
            active: true
        },
        "Wolfram Alpha": {
            name: "Wolfram Alpha",
            homepage: "https://www.wolframalpha.com/",
            search: "https://www.wolframalpha.com/input/?i={{query}}",
            color: "#DD1100",
            default: true,
            active: true
        },
        "LinkedIn": {
            name: "LinkedIn",
            homepage: "https://www.linkedin.com/",
            search: "https://www.linkedin.com/search/results/index/?keywords={{query}}",
            color: "#0077B5",
            default: true,
            active: true
        },
        "Stack Overflow": {
            name: "Stack Overflow",
            homepage: "https://stackoverflow.com/",
            search: "https://stackoverflow.com/search?q={{query}}",
            color: "#FE7A16",
            default: true,
            active: true
        },
        "Wikipedia": {
            name: "Wikipedia",
            homepage: "https://wikipedia.org/",
            search: "https://en.wikipedia.org/w/index.php?title=Special:Search&search={{query}}",
            color: "#000000",
            default: true,
            active: true
        },
        "GoodReads": {
            name: "GoodReads",
            homepage: "https://www.goodreads.com/",
            search: "https://www.goodreads.com/search?q={{query}}",
            color: "#663300",
            default: true,
            active: false
        },
        "Foursquare": {
            name: "Foursquare",
            homepage: "https://foursquare.com/",
            search: "https://foursquare.com/explore?q={{query}}",
            color: "#F94877",
            default: true,
            active: false
        },
        "Gmail": {
            name: "Gmail",
            homepage: "https://mail.google.com/",
            search: "https://mail.google.com/#search/{{query}}",
            color: "#D14836",
            default: true,
            active: false
        },
        "Twitter": {
            name: "Twitter",
            homepage: "https://twitter.com/",
            search: "https://twitter.com/search?q={{query}}",
            color: "#1DA1F2",
            default: true,
            active: false
        },
        "Google Drive": {
            name: "Google Drive",
            homepage: "https://drive.google.com/",
            search: "https://drive.google.com/drive/search?q={{query}}",
            color: "#4386FC",
            default: true,
            active: false
        },
    };

    function setOrder(new_order) {
        let sameElements = (new_order.length === siteOrder.length) &&
            !util.any(new_order, function (name) {
                if (siteOrder.indexOf(name) < 0) {
                    return true;
                }
            });
        if (sameElements) {
            siteOrder = new_order;
            return true;
        }
        return false;
    }

    function activateSite(name) {
        if(siteData[name]) {
            siteData[name].active = true;
        }
    }

    function deactivateSite(name) {
        if(siteData[name]) {
            siteData[name].active = false;
        }
    }

    function addNewSite(name, url, color) {
        let site = {
            name: name,
            search: url,
            color: color,
            default: false,
            active: true
        };
        siteOrder.push(name);
        siteData[name] = site;
    }

    function deleteSite(name) {
        if (siteData[name]) {
            delete siteData[name];
        }
        let index = siteOrder.indexOf(name);
        if (index > -1) {
            siteOrder.splice(index, 1);
        }
    }

    function getSites() {
        let sites = [];
        util.each(siteOrder, function (name) {
            if (siteData[name]) {
                sites.push(siteData[name]);
            }
        });
        return sites;
    }

    function getSelectedSite() {
        if (siteData[selected_site] && siteData[selected_site].active) {
            return selected_site;
        }
        util.any(siteOrder, function (name) {
            if (siteData[name] && siteData[name].active) {
                selected_site = name;
                return true;
            }
        });
        if (siteData[selected_site] && siteData[selected_site].active) {
            return selected_site;
        }
        selected_site = siteOrder[0];
        return selected_site;
    }

    function setSelectedSite(name) {
        selected_site = name;
    }

    return {
        getSites: getSites,
        setOrder: setOrder,
        activateSite: activateSite,
        deactivateSite: deactivateSite,
        addNewSite: addNewSite,
        deleteSite: deleteSite,
        getSelectedSite: getSelectedSite,
        setSelectedSite: setSelectedSite
    }
}();

function getSites() {
    return sites;
}


function contextMenuClicked(info, tab) {
    console.log(info, tab);
    if (info && info.selectionText) {
        openNewScoutTab(info.menuItemId, info.selectionText);
    }
}

function openNewScoutTab(siteId, searchText, tabId) {
    let siteList = sites.getSites();
    let search = util.any(siteList, function (item) {
        if (item.name === siteId) {
            return item.search;
        }
    });
    let searchUrl = search.replace('{{query}}', searchText);
    if (!tabId) {
        chrome.tabs.create({url: searchUrl}, function (tab) {
            tabId = tab.id;
        });
    } else {
        chrome.tabs.update(tabId, {url: searchUrl});
    }
}


function createContextMenus(list) {
    util.each(list, function (item) {
        if (item.active) {
            chrome.contextMenus.create({
                id: item.name,
                title: item.name,
                contexts: ['selection'],
                parentId: 'WebScout',
                onclick: contextMenuClicked
            }, function () {
            });
        }
    });
}

chrome.contextMenus.create({
    id: 'WebScout',
    title: 'Web Scout',
    contexts: ['selection'],
    onclick: contextMenuClicked
}, function () {
});

createContextMenus(sites.getSites());

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "tabId") {
        sendResponse(sender.tab && sender.tab.id);
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({});
});
