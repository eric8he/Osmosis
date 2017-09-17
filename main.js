var sketchProc = function(processingInstance) {
    with (processingInstance) {
        size(1300,800);
        var GLUCOSE_COLOR = color(57,252,68);
        var WATER_COLOR = color(250,50,55);
        frameRate(5);
        var Entity = function(p, v, m, t) {
            this.position=p;
            this.velocity=v;
            this.mass = m;
            this.acceleration=new PVector(0,0);
            this.force=new PVector(0,0);
            this.text=t;
            this.comp=true;
        };

        Entity.prototype.update=function(){
            this.position.add(this.velocity);
            this.velocity.add(this.acceleration);
        };

        Entity.prototype.applyForce=function(f){
            this.force.add(f);
            this.acceleration.add(new PVector(f.x/this.mass,f.y/this.mass));
        };

        Entity.prototype.draw=function(col) {
            fill(col);
            ellipse(this.position.x,this.position.y,this.mass,this.mass);
            var v = 255-(( col.r + col.g + col.b ) / 3);
            fill( v, v, v );
            text(this.text,this.position.x-2,this.position.y+5);
            colorMode(RGB);
        };

        var drawKey=function() {
            fill(220,220,220);
            stroke(180,180,180);
            rect(0,0,120,240,5);
            stroke(0,0,0);
            fill(0, 9, 255);
            textSize(24);
            text("Key",35,20);
            fill(WATER_COLOR);
            ellipse(10,40,10,10);
            fill(0, 0, 0);
            textSize(12);
            text("Water Molecule",17,44);
            fill(GLUCOSE_COLOR);
            ellipse(10,60,10,10);
            fill(0, 0, 0);
            textSize(12);
            text("Glucose Molecule",17,64);
        };

        var Cell = function(p,ah){
            this.pos=p;
            this.ah=ah;
        };

        Cell.prototype.draw= function(s) {
            pushMatrix();
            scale(0.8);
            fill(0/*196*1/(s*10)*/, 200*1/(s*10), 255*1/(s*10));
            rect(this.pos.x,this.pos.y,100,160,10);
            fill(WATER_COLOR);
            for(var i=0;i<10;i++){
                ellipse(random(this.pos.x+10,this.pos.x+90),random(this.pos.y+10,this.pos.y+150),10,10);
            }
            fill(95, 230, 110);
            /*bezier(this.pos.x+5, this.pos.y+2, 
            this.pos.x+50, this.pos.y+this.ah, 
            this.pos.x+50, this.pos.y+this.ah, 
            this.pos.x+100-5, this.pos.y+2);*/

            bezier(this.pos.x+2, this.pos.y+5, 
            this.pos.x+this.ah*s, this.pos.y+80, 
            this.pos.x+this.ah*s, this.pos.y+80, 
            this.pos.x+2, this.pos.y-5+160);

            bezier(this.pos.x+100, this.pos.y+5, 
            this.pos.x-this.ah*s+100, this.pos.y+80, 
            this.pos.x-this.ah*s+100, this.pos.y+80, 
            this.pos.x+100, this.pos.y-5+160);

            /*bezier(this.pos.x+5, this.pos.y+160, 
            this.pos.x+50, this.pos.y-this.ah+160, 
            this.pos.x+50, this.pos.y-this.ah+160, 
            this.pos.x+100-5, this.pos.y+160);*/
            popMatrix();
        };

        var drawMembrane=function(x,y,h,w,n) {
            for(var i=0;i<n;i++){
                rect(x,y+2*i*h,w,h);
            }
        };

        var cells=[new Cell(new PVector(200,530),130/*10-90*/),
                   new Cell(new PVector(200,370),130),
                   new Cell(new PVector(200,210),130),
                   new Cell(new PVector(200,50),130)];
        var x_y = [
             //molecule 1
             409,264,
             369,281,
             372,259,
             //molecule 2
             509,364,
             505,389,
             //molecule 3
             555,449,
             519,441,
             524,419,
             //others
             545,334,
             392,371,
             454,376,
             574,437,
             576,448,
             527,487,

             //other side molecule 1
             809,264,
             805,289,
             769,281,
             772,259,
             //other side floating
             705,334,
             752,371,
             814,376,
             834,437,
             736,448,
             787,487,
             834,487,
             736,498,
             797,537,
             1305,334,
             1252,371,
             1314,376,
             1134,437,
             1336,448,
             1487,487,
             1334,487,
             1236,498,
             1497,537
        ];
        var water_molecules = [];
        for(var i=0; i<x_y.length/2;i++){
            water_molecules.push(new Entity(new PVector(x_y[i*2], x_y[i*2+1]), new PVector(0, 0), 10));
        }
        var glucose_molecules=[new Entity(new PVector(389,273),new PVector(0,0),30,""),
                               new Entity(new PVector(489,373),new PVector(0,0),30,""),
                               new Entity(new PVector(539,433),new PVector(0,0),30,""),
                               new Entity(new PVector(789,273),new PVector(0,0),30,"")];
        var CLOSED = 0.48;
        var MEDIUM = 0.25;
        var OPENED = 0.05;
        var states = [[CLOSED,CLOSED,CLOSED,CLOSED],
                      [MEDIUM,CLOSED,CLOSED,CLOSED],
                      [OPENED,MEDIUM,CLOSED,CLOSED],
                      [MEDIUM,OPENED,MEDIUM,CLOSED],
                      [CLOSED,MEDIUM,OPENED,MEDIUM],
                      [CLOSED,CLOSED,MEDIUM,OPENED],
                      [CLOSED,CLOSED,CLOSED,MEDIUM],
                      [CLOSED,CLOSED,CLOSED,CLOSED]];
        var state=0;
        var Rand22 = random(0,10);
        var doneMillis = millis();
        var draw = function() {
            background(255, 255, 255);
            drawMembrane(600,200,10,2,20);
            drawKey();
            line(601,201,590,190);
            line(590,190,300,190);
            line(601,590,590,600);
            line(590,600,300,600);
            //particle1.update();
            //fill(255, 0, 0);
            //particle1.draw();
            for(var i=0;i<cells.length;i++){
                cells[i].draw(states[state][i]);
            }
            var rotAngle=362;
            //rotate(rotAngle);
            var allDone=true;
            for(var i=0;i<water_molecules.length;i++){
                water_molecules[i].draw(WATER_COLOR);
                if(i>18&&water_molecules[i].comp){
                    water_molecules[i].velocity=new PVector(-(Rand22*i/19),random(-5,5));
                    water_molecules[i].update();
                    if(i<22){
                        allDone=false;
                    }
                }
                if(water_molecules[i].position.x<random(375,525)) {
                    water_molecules[i].velocity=new PVector(0,0);
                    water_molecules[i].comp=false;
                }
            }
            if(allDone) {
                for(var i=0; i< water_molecules.length; i++){
                    water_molecules[i].comp=true;
                    water_molecules[i].position.x = x_y[2*i];
                    water_molecules[i].position.y = x_y[2*i+1];
                }
            }
            for(var i=0;i<glucose_molecules.length;i++){
                glucose_molecules[i].draw(GLUCOSE_COLOR);
            }
            //rotate(-rotAngle);
            state++;
            //if(state===7) {
            //    water_molecules[22].velocity=new PVector(0,0);
            //}
            if(state===7){
                Rand22=random(0,10);
                state=0;
            }
        };

     }
};
var canvas = document.getElementById("mycanvas"); 
var processingInstance = new Processing(canvas, sketchProc); 