var table;
var xaxis = [];
var yaxis = [];
var xvertices = [];
var yvertices = [];
place_nodes_x = [];
place_nodes_y = [];
var V;

function preload() {
  //my table is comma separated value "csv“ and has a header specifying the columns labels
  table = loadTable('3980edges.csv', 'csv');
}
function setup() {

  //count the columns
  var width = 2000, height = 2000, margin = 20,
  w = width - 2 * margin,
  h = height - 2 * margin;
  createCanvas(width, height);

  for (var i = 0; i < table.getRowCount(); i++) {
    yaxis[i] = table.getNum(i, 2);
    xaxis[i] = table.getNum(i, 1);

    if(!xvertices.includes(table.getNum(i, 1))){
      xvertices.push(table.getNum(i, 1));
    }
    if(!yvertices.includes(table.getNum(i, 2))){
      yvertices.push(table.getNum(i, 2));
    }
  }

  // print("Length xaxis= ", xaxis.length, yaxis.length);
  // print("Length = ", xvertices.length, yvertices.length);
  xvertices.sort(function(a, b){return a-b});
  yvertices.sort(function(a, b){return a-b});

  minx = min(xaxis);
  miny = min(yaxis);
  maxx = max(xaxis);
  maxy = max(yaxis);
  V = xvertices.length;
  place_nodes_x = create_random_array(V, 50, 700);
  place_nodes_y = create_random_array(V, 50, 700);
  area = w*h;
  print(area, V);


  var myVertex = new vertex(2, 3, 4, 5);
  var myVertex2 = new vertex(2, 3, 4, 5);
  // var myEdge = new edge(myVertex, myVertex2);

  //Graph Algorithm
  k = Math.sqrt(area/V);
  print(k);

  // print("Maxx and maxy="+maxx+" "+ maxy);
  // print("Minx and miny="+minx+" "+ miny);

  // noLoop();
}

function draw(){

  background(255);

  //randomly disperse nodes
  for (var i = 0; i < place_nodes_x.length; i++) {
    // print(place_nodes_x[i], place_nodes_y[i]);
    fill('aqua');
    ellipse(place_nodes_x[i], place_nodes_y[i], 10, 10);
  }
}

function create_random_array(num_elements,min,max) {
    var nums = new Array;
    for (var element=0; element<num_elements; element++) {
        nums[element] = random_number(min,max);
    }
    return (nums);
}

function random_number(min,max) {
    return (Math.round((max-min) * Math.random() + min));
}

function random_number(min,max) {
    return (Math.round((max-min) * Math.random() + min));
}

class vertex {
  constructor(dispx, dispy, posx, posy) {
    this.disp = {
    'x': dispx,
    'y' : dispy
    };
    this.pos = {
    'x': posx,
    'y' : posy
    };
    // print(this.disp.x, this.pos.y);
  }
}

function calculate_attractive_force(x, k) {
  return ((x*x)/k);
}

function calculate_repulsive_force(x, k) {
  return ((k*k)/x);
}

//
// Rectangle.prototype.area = function() {
//   return this.width * this.height;
// };
//
// var shape = new Rectangle( 3, 4 );
