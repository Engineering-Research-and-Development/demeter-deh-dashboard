let dTagFilter;
let d_uid = 0;
let d_gid = 0;
let userInfo;
let demeterProvider = false;
let pageSize = 'setVariable "d_pagination_size" 3';
d_gid = "10154";

dymerOauthConfig = {
    logintype: 'dymer'
};

let jsonConfig = {

    query: {
        "query": {
            "query": {
                "bool": {
                    "must": [{
                        "term": {
                            "_index": "dymerservicecomponent"
                        }
                    }]
                }
            }
        }
    },

    endpoint: 'entity.search',
    viewtype: 'teaserlist',
    target: {
        teaserlist: {
            id: "#cont-MyList",
            action: "html",
            reload: false
        },
        fullcontent: {
            id: "#cont-MyList",
            action: "html"
        }
    }
};

let jsonfilter = {
    "bool": {
        "must": [{
            "match": {
                "_index": "dymerservicecomponent"
            }
        }]
    }
};

let script = document.createElement('script');
script.src = window["env"]["DYMER_URL"] + "/public/cdn/js/dymer.viewer.js";
script.id = "dymerurl";
document.getElementsByTagName('head')[0].appendChild(script);

function checkRoles() {
    if (userInfo) {
        userInfo.User.roles.forEach((item) => {
            if (item == "DEMETER Provider") {
                demeterProvider = true;
            }
        });
    }

    return demeterProvider;
}

var dymerconf = {
    notImport: ["bootstrap", "jquery", "popper"]
};

function mainDymerView() {

    let token = localStorage.getItem('DYM')
    if (token != undefined) {
        userInfo = JSON.parse(atob(token));
        setTimeout(function () {
            dsearch = new dymerSearch({
                "objname": "dsearch", //same object name -> Mandatory
                "formid": "myfilter", //id of your form -> Mandatory
                "filterModel": "dymerservicecomponent", // index model to load searchables elements -> Not Mandatory
                "innerContainerid": "contform", // id div element indise form -> Mandatory
                "groupfilterclass": "col-12", // class to add on filters -> Not Mandatory , default value = "span12 col-12"
                "conditionQuery": "AND", // AND or OR  -> Not Mandatory, default value = "AND"
                "addfreesearch": true, // will add global search input, true/false -> Not Mandatory, default value = false
                "showFilterBtn": true, // will add button for advanced filter, true/false -> Not Mandatory, default value = false
                "query": { // base query for search
                    "bool": {
                        "must": [{
                            "terms": { "_index": ["dymerservicecomponent"] }
                        }]
                    }
                }
            });
        }, 100);

        let index = 'dymerservicecomponent';
        if (checkRoles()) {
            setTimeout(function () { loadModelListToModal($('#cont-addentity'), index); }, 10);
        }

        let obj = getAllUrlParams(); //recupera i parametri presenti nell'url (passati in get)
        let elId = obj["d_eid"]; //d_eid : lo scegli tu da portlet
        if (elId != undefined)
            drawEntityByIdUrl("#cont-MyList", "d_eid"); //d_eid : lo scegli tu da portlet , "#cont-MyList": è il contenitore dove renderizzare 
        else
            drawEntities(jsonConfig); //rimane tale
        loadFilterModel(index, dTagFilter);
    }
}

function getResourcesRefresh(config) {

    console.log("Function called")

    dsearch = new dymerSearch({
        "objname": "dsearch", //same object name -> Mandatory
        "formid": "myfilter", //id of your form -> Mandatory
        "filterModel": "dymerservicecomponent", // index model to load searchables elements -> Not Mandatory
        "innerContainerid": "contform", // id div element indise form -> Mandatory
        "groupfilterclass": "col-12", // class to add on filters -> Not Mandatory , default value = "span12 col-12"
        "conditionQuery": "AND", // AND or OR  -> Not Mandatory, default value = "AND"
        "addfreesearch": true, // will add global search input, true/false -> Not Mandatory, default value = false
        "showFilterBtn": true, // will add button for advanced filter, true/false -> Not Mandatory, default value = false
        "query": { // base query for search
            "bool": {
                "must": [{
                    "terms": { "_index": ["dymerservicecomponent"] }
                }]
            }
        }
    });
    resetDymerStart();
    drawEntities(config); //rimane tale

}