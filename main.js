var sketchProc = function(processingInstance) {
    with (processingInstance) {
        size(600,600);
        var Entity = function(p, v, m) {
            this.position=p;
            this.velocity=v;
            this.mass = m;
            this.acceleration=new PVector(0,0);
            this.force=new PVector(0,0);
        };

        Entity.prototype.update=function(){
            this.position.add(this.velocity);
            this.velocity.add(this.acceleration);
        };

        Entity.prototype.applyForce=function(f){
            this.force.add(f);
            this.acceleration.add(new PVector(f.x/this.mass,f.y/this.mass));
        };

        Entity.prototype.draw=function() {
            ellipse(this.position.x,this.position.y,this.mass,this.mass);
        };

        var drawKey=function() {
            fill(250,250,250);
            stroke(230,230,230);
            rect(0,0,120,240,5);
            stroke(0,0,0);
            fill(0, 9, 255);
            textSize(24);
            text("Key",35,20);
            fill(255, 0, 0);
            ellipse(10,40,10,10);
            fill(0, 0, 0);
            textSize(12);
            text("Water Molecule",17,44);
            fill(50, 255, 50);
            ellipse(10,60,10,10);
            fill(0, 0, 0);
            textSize(12);
            text("Glucose Molecule",17,64);
        };

        var Cell = function(p,ah){
            this.pos=p;
            this.ah=ah;
        };

        Cell.prototype.draw= function() {
            fill(255, 255, 255);
            rect(this.pos.x,this.pos.y,100/1.6,160/1.6,10);

            noFill();
            bezier(this.pos.x+5, this.pos.y+2, this.pos.x+50/1.6, this.pos.y+this.ah, this.pos.x+50/1.6, this.pos.y+this.ah, this.pos.x+100/1.6-5, this.pos.y+2);

        };
        var cell = new Cell(new PVector(200,200),50);

        var gravity=new PVector(0,6.67408/4);
        var particle1=new Entity(new PVector(100,100),new PVector(0,0),10);
        particle1.applyForce(gravity);
        var draw = function() {
            background(255, 255, 255);
            drawKey();
            particle1.update();
            fill(255, 0, 0);
            particle1.draw();
            cell.draw();
        };
     }
};
var canvas = document.getElementById("mycanvas"); 
var processingInstance = new Processing(canvas, sketchProc); 