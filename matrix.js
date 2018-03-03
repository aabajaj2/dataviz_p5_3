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

  //noLoop();
}

function draw(){
  xstart = 50;
  xend = 1900;
  ystart = 50;
  yend = 1900;
  space = (xend-xstart)/(xvertices.length); shift = 10;
  background(255);

  fill("black");
  stroke(2);
  //The square box
  line(xstart, yend, xstart, ystart);
  line(xstart, yend, xend, yend);
  line(xstart, ystart, xend, ystart );
  line(xend, ystart, xend, yend);

  //Plot squares
  for (var i = 0;  i<xaxis.length; i++) {
    fill("pink");
    for (var j = 0; j <xvertices.length; j++) {
      line(xstart+j*space,ystart,xstart+j*space,yend);
      line(xstart,ystart+j*space,xend,ystart+j*space);
        if (xaxis[i]==xvertices[j]){
          for (var k = 0; k < yvertices.length; k++) {
            if (yvertices[k]==yaxis[i]){
              posx =  xstart + ((xend-xstart)*j/xvertices.length);
              posy =  ystart + ((yend-ystart)*k/yvertices.length);
              rect(posx, posy, space, space);
              //print (xaxis[i],yaxis[i],i,j,k,posx,posy);
              if (mouseX<=posx+shift && mouseX>=posx-shift && mouseY<=posy+shift && mouseY>=posy-shift){
                fill("black");pos_string=""+xaxis[i]+","+yaxis[i];
                text(pos_string,mouseX,mouseY);fill("pink");
              }
              //exit();
            }
          }
        }
    }
  }

  //labels
  fill('black');
  textSize(12);
  labelposx = 20;

  for (var i = 0; i < xvertices.length; i++) {
    labelposy = shift + (ystart + (((yend-ystart)*i)/xvertices.length));
    text(xvertices[i], labelposx, labelposy);
  }

  labelposy = 40;
  for (var i = 0; i < yvertices.length; i++) {
    labelposx = shift+ (xstart + (((xend-xstart)*i)/yvertices.length));
    text(yvertices[i], labelposx, labelposy);
  }
}
