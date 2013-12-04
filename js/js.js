

var VIZ = {}

VIZ.w = 700;
VIZ.h = 400;


var dataset = { 
  nodes: [
  { node: 1 },
  { node: 3 },
  { node: 4 },
  { node: 5 },
  { node: 7 },
  { node: 25 },
  { node: 35 },
  { node: 43 },
  { node: 63 },
  { node: 74 },
  { node: 353 },
  { node: 1234 }

  ], 

  edges: [
    { source: 1, target: 0 },
    { source: 1, target: 2 },
    { source: 3, target: 1 },
    { source: 6, target: 5 },
    { source: 7, target: 6 },
    { source: 11, target: 10 },
    { source: 9, target: 11 },
    { source: 8, target: 9 },
    { source: 7, target: 8 },
    { source: 4, target: 7 },
    { source: 3, target: 4 }
  ]
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

force.on("tick", function(){

        edges.attr("x1", function(d){ return d.source.x; })
              .attr("y1", function(d){ return d.source.y; })
              .attr("x2", function(d){ return d.target.x; })
              .attr("y2", function(d){ return d.target.y; });

        nodes.attr("cx", function(d){ return d.x; })
              .attr("cy", function(d){ return d.y; });

});

