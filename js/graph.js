
var friends = [
 {name: "Tom", friends: ["Mary", "Adam", "Brian"]},
 {name: "Mary", friends: ["Tom", "Peter", "Adam", "Jane", "Elizabeth", "Brian", "Donna"]},
 {name: "Peter", friends: ["Jane", "Mary"]},
 {name: "Adam", friends: ["Tom", "Mary", "Karen"]},
 {name: "Elizabeth", friends: ["Jennifer", "Mary"]},
 {name: "Jennifer", friends: ["Elizabeth"]},
 {name: "Linda", friends: ["Barbara"]},
 {name: "Barbara", friends: ["Linda"]},
 {name: "Jessica", friends: ["Dorothy"]},
 {name: "Dorothy", friends: ["Jessica"]},
 {name: "Sarah", friends: ["Karen"]},
 {name: "Karen", friends: ["Sarah", "Adam"]},
 {name: "Kimberly", friends: ["Jane"]},
 {name: "Jane", friends: ["Kimberly", "Laura", "Emily"]},
 {name: "Emily", friends: ["Jane"]},
 {name: "Donna", friends: ["Mary", "Timothy"]},
 {name: "Andrew", friends: ["Laura"]},
 {name: "Laura", friends: ["Andrew"]},
 {name: "Brian", friends: ["Tom", "Timothy", "Mary"]},
 {name: "Timothy", friends: ["Brian", "Donna"]}
];

var nodes = [];
var edges = [];
var dict = {};

_.each(friends, function(d,i) {
    nodes.push({name: d.name});
    dict[d.name] = i;
});

_.each(friends, function(d,i) {
    _.each(d.friends, function(d,j) {
      edges.push({source: i, target: dict[d]});
    }
)});

var VIZ = {}

VIZ.w = 700;
VIZ.h = 400;


var dataset = {
  nodes: nodes,

  edges: edges
};

var svg = d3.select("body") 
        .append("svg")
        .attr("width", VIZ.w) 
        .attr("height", VIZ.h)
        .attr("class", "forceClass");

var force = d3.layout.force()
        .nodes(dataset.nodes)
        .links(dataset.edges)
        .size([VIZ.w, VIZ.h])
        .linkDistance([20])
        .charge([-300])
        .start();

var edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line");

var nodes = svg.selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .call(force.drag);

var labels = svg.selectAll("text")
            .data(dataset.nodes)
            .enter()
            .append("text")
            .text(function(d) {return d.name;})
            .attr("font-size", "12px")
            .attr("font-family", "sans-serif")
            .attr("fill", "red");

force.on("tick", function(){

        edges.attr("x1", function(d){ return d.source.x; })
              .attr("y1", function(d){ return d.source.y; })
              .attr("x2", function(d){ return d.target.x; })
              .attr("y2", function(d){ return d.target.y; });

        nodes.attr("cx", function(d){ return d.x; })
              .attr("cy", function(d){ return d.y; });

        labels.attr("dx", function(d){ return d.x;})
              .attr("dy", function(d){ return d.y;});

});

