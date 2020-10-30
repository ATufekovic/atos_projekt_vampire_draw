/* var ws = new WebSocket("ws://127.0.0.1:15674/ws");
var client = Stomp.over(ws);

var on_connect = function() {
    id = client.subscribe("/topic/test", function(m) {
        console.log("Message is");
        console.log(m.body);
    });
    client.send("/topic/test", {"content-type":"text/plain"}, "hi");
};

var on_error = function(d) {
    console.log("error");
    console.log(d);
};

client.connect("ChatAppHost", "ChatAppHost", on_connect, on_error, "cah"); */
