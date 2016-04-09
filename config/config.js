export default {
    apiServer: "http://localhost:9292",
    nameSpace: "/v1/web",
    resources: function(endpoint){
        return `${this.apiServer}${this.nameSpace}${endpoint}`
    }
}
