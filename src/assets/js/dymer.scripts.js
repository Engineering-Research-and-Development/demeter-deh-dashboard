let dTagFilter;
let d_uid = 0;
let d_gid = 0;

let token = localStorage.getItem('token')

if(token!=undefined){
    let userInfo = JSON.parse(atob(token));
    d_uid = userInfo.User.id
    console.log('dddddddd', d_uid)
};
// d_uid = "10198";
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



function mainDymerView() {
    setTimeout(function() {
        dTagFilter = $('#dTagFilter');
        dTagFilter.dymertagsinput({
            //indexmodelfilter:"hubcapmodel",
            indexterms: {
                "bool": {
                    "must": [{
                        "term": {
                            "_index": "dymerservicecomponent"
                        }
                    }]
                }
            },
            allowDuplicates: false,
            freeInput: false,
            itemValue: 'id', // this will be used to set id of tag
            itemText: 'label' // this will be used to set text of tag	 
        });
        dTagFilter.on('beforeItemRemove', function(event) {
            $('#d_entityfilter [filter-rel="' + event.item.id + '"').prop("checked", false);
        });
    }, 3000);
    let index = 'dymerservicecomponent';
    loadModelListToModal($('#cont-addentity'), index);

    let obj = getAllUrlParams(); //recupera i parametri presenti nell'url (passati in get)
    let elId = obj["d_eid"]; //d_eid : lo scegli tu da portlet
    if (elId != undefined)
        drawEntityByIdUrl("#cont-MyList", "d_eid"); //d_eid : lo scegli tu da portlet , "#cont-MyList": è il contenitore dove renderizzare 
    else
        drawEntities(jsonConfig); //rimane tale

    loadFilterModel(index, dTagFilter);

}