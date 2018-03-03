var table;
var xaxis = [];
var yaxis = [];
var vertices = [];
var xvertices = [];
var yvertices = [];
var edges = [];
place_nodes_x = [];
place_nodes_y = [];
var V;
var k;
var t = -1;

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
  var myVertex2 = new vertex(10, 10, 10, 10);
  var myEdge = new edge(myVertex, myVertex2);
  var ans = delta(myVertex, myVertex2);
  var check = new vector(3, 4);
  console.log(absolute_value(check));
  console.log(ans);

  //Graph Algorithm Setup
  k = Math.sqrt(area/V);
  print(k);
  for (var i = 0; i < V; i++) {
    vertices.push(new vertex(0, 0, place_nodes_x[i], place_nodes_y[i], xvertices[i]));
  }

  for (var i = 0; i < xaxis.length; i++) {
    v1 = xlookup(xaxis[i]);
    v2 = xlookup(yaxis[i]);
    edges.push(new edge(v1, v2));
  }
  // console.log(edges);
  // noLoop();
}

function draw(){

  background(255);
  shift = 10;
  //randomly disperse nodes
  for (var i = 0; i < vertices.length; i++) {
    fill('aqua');
    ellipse(vertices[i].pos.x, vertices[i].pos.y, 10, 10);

    if (mouseX<=place_nodes_x[i]+shift && mouseX>=place_nodes_x[i]-shift
      && mouseY<=place_nodes_y[i]+shift && mouseY>=place_nodes_y[i]-shift){
      fill("black");
      pos_string=""+vertices[i].value;
      text(pos_string,mouseX,mouseY);fill("pink");
    }
  }

  for (var i = 0; i < edges.length; i++) {
    stroke('grey');
    line(edges[i].v1.pos.x, edges[i].v1.pos.y, edges[i].v2.pos.x, edges[i].v2.pos.y);
  }
  stroke('black');
  for (var i = 0; i < 10; i++) {
    graph_algorithm();
    // t = cool(t);
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
  constructor(dispx, dispy, posx, posy, value) {
    this.disp = new vector(dispx, dispy);
    this.pos = new vector(posx, posy);
    this.value = value;
  }
}

class edge{
  constructor(v1, v2) {
    this.v1 = v1;
    this.v2 = v2;
  }
}

class vector{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

function calculate_attractive_force(x, k) {
  return (Math.pow(x,3)/k);
}

function calculate_repulsive_force(x, k) {
  return (Math.pow(k,2)/x);
}

function delta(v, u) {
  return new vector(v.pos.x - u.pos.x, v.pos.y - u.pos.y);
}

function absolute_value(v) {
  return (Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2)));
}

function xlookup(v) {
  for (var i = 0; i < vertices.length; i++) {
    if(vertices[i].value == v){
      return vertices[i];
    }
  }
}

function cool(t){
  return (t*0.5);
}

function graph_algorithm() {

  // Vertices v and u calculate_repulsive_force
  for (var i = 0; i < vertices.length; i++) {
      vertices[i].disp.x = 0;
      vertices[i].disp.y = 0;
      for (var j = 0; j < vertices.length; j++) {
        if(vertices[j] != vertices[i]){
          d = delta(vertices[i], vertices[j]);
          deltamagnitude = absolute_value(d);
          if(deltamagnitude==0){
            deltamagnitude = 0.000000001;
          }
          vertices[i].disp.x = vertices[i].disp.x + (d.x/deltamagnitude)*calculate_repulsive_force(absolute_value(d), k);
          vertices[i].disp.y = vertices[i].disp.y + (d.y/deltamagnitude)*calculate_repulsive_force(absolute_value(d), k);
        }
      }
    }

    //For edges calculate_attractive_force
    for (var e = 0; e < edges.length; e++) {
      d = delta(edges[e].v1, edges[e].v2);
      deltamag = absolute_value(d);
      if(deltamag==0){
        deltamag = 0.000000001;
      }
      edges[e].v1.disp.x = edges[e].v1.disp.x - (d.x/deltamag)*calculate_attractive_force(absolute_value(d), k);
      edges[e].v1.disp.y = edges[e].v1.disp.y - (d.y/deltamag)*calculate_attractive_force(absolute_value(d), k);
      edges[e].v2.disp.x = edges[e].v2.disp.x + (d.x/deltamag)*calculate_attractive_force(absolute_value(d), k);
      edges[e].v2.disp.y = edges[e].v2.disp.y + (d.y/deltamag)*calculate_attractive_force(absolute_value(d), k);
      // console.log("Displacement before= ", edges[e].v1);
      // console.log("Displacement after= ", edges[e].v1.disp);

      // if(edges[i].v1.disp.x > t)edges[i].v1.disp.x = t;
      // if(edges[i].v1.disp.y > t)edges[i].v1.disp.y = t;
      // if(edges[i].v2.disp.x > t)edges[i].v2.disp.x = t;
      // if(edges[i].v2.disp.y > t)edges[i].v2.disp.y = t;
    }

    w=1500; l=1500;
    for (var v = 0; v < vertices.length; v++) {
        dispmag = absolute_value(vertices[v].disp);
        if(dispmag==0){
          dispmag = 0.000000001;
        }
        vertices[v].pos.x = (vertices[v].pos.x + (vertices[v].disp.x/dispmag));
        // * min(vertices[v].disp.x, t));
        vertices[v].pos.y = (vertices[v].pos.y + (vertices[v].disp.y/dispmag));
        // * min(vertices[v].disp.y, t));
        if (vertices[v].pos.x < 50 ) {
          vertices[v].pos.x = 50;
        }
        if (vertices[v].pos.y < 50 ) {
          vertices[v].pos.y = 50;
        }
        vertices[v].pos.x = min (w/2 , max((-w/2), vertices[v].pos.x));
        vertices[v].pos.y = min (l/2 , max((-l/2), vertices[v].pos.y));
    }
  return true;
}
