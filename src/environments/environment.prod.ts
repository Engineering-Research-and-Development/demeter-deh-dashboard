export const environment = {
  production: true,
  
  DYMER_URL: window["env"]["DYMER_URL"] || "http:localhost:8080",
  CAPABILITY_MANAGER_URL: window["env"]["CAPABILITY_MANAGER_URL"] || "https://acs.bse.h2020-demeter-cloud.eu:3030"

};