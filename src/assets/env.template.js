(function(window) {
    window.env = window.env || {};

    // Environment variables
    window["env"]["DYMER_URL"] = "${DYMER_URL}";
    CAPABILITY_MANAGER_URL: window["env"]["CAPABILITY_MANAGER_URL"] || "https://acs.bse.h2020-demeter-cloud.eu:3030";

})(this);