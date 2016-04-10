export default {
    apiServer: "http://api.rush-game.ramadoka.com",
    nameSpace: "/v1/web",
    resources: function(endpoint){
        return `${this.apiServer}${this.nameSpace}${endpoint}`
    }
}
