var table;
var xaxis = [];
var yaxis = [];
var xvertices = [];
var yvertices = [];

function preload() {
  //my table is comma separated value "csv“ and has a header specifying the columns labels
  table = loadTable('3980edges.csv', 'csv');
}
function setup() {
  //count the columns
  var width = 2000, height = 2000, margin = 20,
  w = width - 2 * margin,
  h = height - 2 * margin;
  var columnforx = 22, columnfory = 20;
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

  print("Length xaxis= ", xaxis.length, yaxis.length);
  print("Length = ", xvertices.length, yvertices.length);
  xvertices.sort(function(a, b){return a-b});
  yvertices.sort(function(a, b){return a-b});

  minx = min(xaxis);
  miny = min(yaxis);
  maxx = max(xaxis);
  maxy = max(yaxis);

  print("Maxx and maxy="+maxx+" "+ maxy);
  print("Minx and miny="+minx+" "+ miny);

  noLoop();
}

function draw(){
  xstart = 50;
  xend = 1900;
  ystart = 50;
  yend = 1900;
  space = 10;
  background(255);

  fill("black");
  stroke(2);
  //The square box
  line(xstart, yend, xstart, ystart);
  line(xstart, yend, xend, yend);
  line(xstart, ystart, xend, ystart );
  line(xend, ystart, xend, yend);

  //Plot squares
  for (var i = 0;  i<xvertices.length; i++) {
    fill("pink");

    posx = xstart + ((xend-xstart)*i/xaxis.length);

    for (var j = 0; j <yvertices.length; j++) {
      if (xaxis[j] == xaxis[i] && i!=j ) {
        posy = ystart + ((yend-ystart)*j/yaxis.length);
        rect(posx, posy, space, space);
        print(posx, posy, xaxis[i], yaxis[j]);
      }
    }
  }

  //labels
  fill('black');
  textSize(12);
  labelposx = 20;
  shift = 10;
  for (var i = 0; i < xvertices.length; i++) {
    labelposy = shift + (ystart + (((yend-ystart)*i)/xvertices.length));
    text(xvertices[i], labelposx, labelposy);
  }

  labelposy = 50;
  for (var i = 0; i < yvertices.length; i++) {
    labelposx = shift + (xstart + (((xend-xstart)*i)/yvertices.length));
    text(yvertices[i], labelposx, labelposy);
  }
  
  // //Grid lines
  // gridposx1 = 50;
  // for (var i = 0; i < xvertices.length; i++) {
  //   gridposx1 = gridposx1  + i;
  //   gridposy1 = shift + (ystart + (((yend-ystart)*i)/xvertices.length));
  //   gridposy2 =
  //   line(gridposx1, gridposy1, gridposx2, gridposy2);
  // }

}
