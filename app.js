/* jshint esnext: true */

(function() {
  console.log(d3, scatter);

  var myScatter = scatter()
    .x((d) => d.a)
    .y((d) => d.b);

  var data = [
    [
      { a: 1, b: 2},
      { a: 9, b: 7}
    ],
    [
      { a: 4, b: 4},
      { a: 1, b: 7}
    ]
  ];

  var container = d3.select("body").selectAll("div");
  container.data(data)
    .enter()
    .append("div")
    .call(myScatter);
}());
