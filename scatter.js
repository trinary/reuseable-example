/* jshint esnext: true */

var scatter = function() {
  "use strict";
  var x = d3.scale.linear(),
      y = d3.scale.linear(),
      margin = {left: 20, right: 20, top: 20, bottom: 20},
      width = 320,
      height = 200,
      xAcc = (d) => d[0],
      yAcc = (d) => d[1];

  function chart(selection) {
    selection.each(function(data) {
      data = data.map((d,i) => [xAcc(d), yAcc(d)]);
      x.domain(d3.extent(data, (d) => d[0]));
      x.range([0,width - margin.left - margin.right]);
      y.domain(d3.extent(data, (d) => d[1]));
      y.range([height - margin.top - margin.bottom, 0]);

      console.log(this, data);
      var svg = d3.select(this).selectAll("svg").data([data]);
      var enter = svg.enter()
        .append("svg")
          .attr({ width: width, height: height})
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.select("g").selectAll(".marker")
        .data(function(d) { return d;})
        .enter()
        .append("circle")
        .classed("marker", true)
        .attr({
          cx: (d,i) => x(d[0]),
          cy: (d,i) => y(d[1]),
          r: 5
        });
    });
  }

  chart.width = function(w) {
    if (!arguments.length) { return width; }
    width = w;
    return chart;
  };

  chart.height = function(h) {
    if (!arguments.length) { return height; }
    height = h;
    return chart;
  };

  chart.x = function(xFn) {
    if (!arguments.length) { return xAcc; }
    xAcc = xFn;
    return chart;
  };

  chart.y = function(yFn) {
    if (!arguments.length) { return yAcc; }
    yAcc = yFn;
    return chart;
  };

  return chart;
};
