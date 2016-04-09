export default {
    apiServer: "http://veritrans.darkparser.com",
    nameSpace: "/v1/web",
    resources: function(endpoint){
        return `${this.apiServer}${this.nameSpace}${endpoint}`
    }
}
