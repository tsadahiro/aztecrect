var a = 7;
var b = a-2;
var w = 1000;
var h = 500;
var mar = 100;

var svg = d3.select("#aztrect")
    .attr("width", w)
    .attr("height",h);

var xScale = d3.scale.linear()
    .domain([0,2*(a+b)]).range([0+mar,2*h-mar]);
var yScale = d3.scale.linear()
    .domain([0,a+b]).range([h-mar/2,0+mar/2]);
yunit =yScale(0)-yScale(1);
xunit = xScale(1)-xScale(0);


var lindex = d3.range(1, a+b+1);
svg.selectAll("line.neLine")
    .data(lindex)
    .enter()
    .append("line")
    .attr("class","neLine")
    .attr("x1",function(d){return xScale(2*d);})
    .attr("y1",yScale(0))
    .attr("x2",function(d){return xScale(2*d+(a+b)-d);})
    .attr("y2",function(d){return yScale((a+b)-d);})
    .attr("stroke","green")
    .attr("stroke-width",0.5);

svg.selectAll("line.nwLine")
    .data(lindex)
    .enter()
    .append("line")
    .attr("class","neLine")
    .attr("x1",function(d){return xScale(2*d);})
    .attr("y1",yScale(0))
    .attr("x2",function(d){return xScale(2*d+(-d+1));})
    .attr("y2",function(d){return yScale(d-1);})
    .attr("stroke","green")
    .attr("stroke-width",0.5);

svg.selectAll("line.hLine")
    .data(lindex)
    .enter()
    .append("line")
    .attr("class","neLine")
    .attr("x1",function(d){return xScale(d+1);})
    .attr("y1",function(d){return yScale(d-1);})
    .attr("x2",function(d){return xScale(2*(a+b)-d+1);})
    .attr("y2",function(d){return yScale(d-1);})
    .attr("stroke","green")
    .attr("stroke-width",0.5);



ps = d3.range(1,a+b+1).reverse();
qs = d3.range(1,a+b+1);
svg.selectAll("text.plab")
    .data(ps)
    .enter()
    .append("text")
    .attr("class","plab")
    .attr("x",function(d,i){return xScale(i+0.5);})
    .attr("y",function(d,i){return yScale(i+0.5);})
    .text(function(d){return d;});
svg.selectAll("text.qlab")
    .data(qs)
    .enter()
    .append("text")
    .attr("class","qlab")
    .attr("x",function(d,i){return xScale(a+b+i+2);})
    .attr("y",function(d,i){return yScale(a+b-i-1);})
    .text(function(d){return d;});

svg.append("text")
    .attr("id","pvaltext")
    .attr("x",xScale(1))
    .attr("y",yScale(a+b))
    .text("");
svg.append("text")
    .attr("id","qvaltext")
    .attr("x",xScale(1))
    .attr("y",yScale(a+b-1))
    .text("");

for (i = 0; i < a + b; i++){
    for (j = 0; j < a+b-i; j++){
	svg.append("rect")
	    .attr("x",function(d){return(xScale(((a+b)-i+j)));})
	    .attr("y",yScale(((a+b)-j-i)-0.5))
	    .attr("width",xunit)
	    .attr("height",yunit)
	    .attr("fill","none")
	    .attr("stroke-width",
		  function(){
		      if (i < b && j < a+1){
			  return "2";
		      }else{
			  return "0.1";
		      }
		  }
		  )
	    .attr("stroke",
		  function(){
		      if (i < b && j < a+1){
			  return "purple";
		      }else{
			  return "black";
		      }
		  }
		 );
	svg.append("rect")
	    .attr("x",function(d){return(xScale(((a+b)-i+j+1)));})
	    .attr("y",yScale(((a+b)-j-i)-0.5))
	    .attr("width",xunit)
	    .attr("height",yunit)
	    .attr("fill",
		  function(){
		      if (i < b+1 && j < a){
			  return "purple";
		      }else{
			  return "none";
		      }
		  }
		  )
	    .attr("fill-opacity",
		  function(){
		      if (i < b+1 && j < a){
			  return "0.2";
		      }else{
			  return "0";
		      }
		  }
		  )
	    .attr("stroke-width",
		  function(){
		      if (i < b+1 && j < a){
			  return "2";
		      }else{
			  return "0.1";
		      }
		  }
		  )
	    .attr("stroke",
		  function(){
		      if (i < b+1 && j < a){
			  return "purple";
		      }else{
			  return "black";
		      }
		  }
		 );
    }
}


var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag",dragmove)
    .on("dragstart",dragstart)
    .on("dragend",dragend);


svg.append("rect")
    .attr("id","defect1")
    .attr("x",xScale(Math.floor(a+b-b/2+a/2+1)))    
    .attr("y",yScale(Math.floor(a+b-b/2-a/2+1)-0.5))
    .attr("width",xunit)
    .attr("height",yunit)
    .attr("fill","purple")
    .style("cursor","move")
    .call(drag);
svg.append("rect")
    .attr("id","defect2")
    .attr("x",xScale(Math.floor(a+b-b/2+a/2)))    
    .attr("y",yScale(Math.floor(a+b-b/2-a/2)-0.5))
    .attr("width",xunit)
    .attr("height",yunit)
    .attr("fill","purple");

var defectp = Math.floor(b/2+1);
var defectq = Math.floor(a/2+1);


function dragstart() {
    console.log(xScale.invert(d3.select(this).attr("x")));
    console.log(yScale.invert(d3.select(this).attr("y")));
}
function dragmove() {
    d3.select(this).attr("x", +d3.select(this).attr("x") + d3.event.dx);
    d3.select(this).attr("y", +d3.select(this).attr("y") + d3.event.dy);
    d3.select("#defect2").attr("x", +d3.select(this).attr("x") + d3.event.dx-xunit);
    d3.select("#defect2").attr("y", +d3.select(this).attr("y") + d3.event.dy+yunit);
}
function dragend() {
    i = Math.round((xScale.invert(d3.select(this).attr("x"))+yScale.invert(d3.select(this).attr("y")))/2);
    i = Math.max(a+1,Math.min(a+b,i));
    j = Math.round((xScale.invert(d3.select(this).attr("x"))-yScale.invert(d3.select(this).attr("y")))/2);
    j = Math.max(1,Math.min(a,j));
    d3.select("#defect1").attr("x",xScale((i+j)));
    d3.select("#defect1").attr("y",yScale((i-j)+0.5));
    d3.select("#defect2").attr("x",xScale((i+j)-1));
    d3.select("#defect2").attr("y",yScale((i-j)+0.5-1));
    d3.select("#pvaltext").text("p="+(a+b-i+1)+",  q="+(j));
    console.log(a+b-i);
    console.log(j);
    defectp = a+b-i+1;
    defectq = j;
}


aindex = d3.range(1,a+1);
svg.selectAll("text.aindex")
    .data(aindex)
    .enter()
    .append("text")
    .attr("class","aindex")
    .attr("x",function(d){return xScale(2.0*d);})
    .attr("y",yScale(-0.5))
    .attr("text-anchor","middle")
    .text(function(d){return a-d+1;});
svg.selectAll("circle.aindex")
    .data(aindex)
    .enter()
    .append("circle")
    .attr("class","aindex")
    .attr("cx",function(d){return xScale(2.0*d);})
    .attr("cy",yScale(0))
    .attr("r",0.1*xunit)
    .attr("fill","red");

bindex = d3.range(1,b+1);
svg.selectAll("text.bindex")
    .data(bindex)
    .enter()
    .append("text")
    .attr("class","bindex")
    .attr("x",function(d){return xScale(2.0*(a+d));})
    .attr("y",yScale(-0.5))
    .attr("text-anchor","middle")
    .text(function(d){return d;});
svg.selectAll("circle.bindex")
    .data(bindex)
    .enter()
    .append("circle")
    .attr("class","bindex")
    .attr("cx",function(d){return xScale(2.0*(a+d));})
    .attr("cy",yScale(0))
    .attr("r",0.1*xunit)
    .attr("fill","blue");

for (p = 1; p < a; p++){
    for (q = p+2; q < b; q++){
	svg.append("line")
	    .attr("x1",xScale(a+q))
	    .attr("y1",yScale(b-p))
	    .attr("x2",xScale(a+q))
	    .attr("y2",yScale(b-p-1))
	    .attr("stroke-width",10);
    }
}


function rotateDomino(p,q,dir){
    domino = d3.select("#domino-" + p + "-" + q);
    if (dir == 0){
	tiles[p-1][q-1] = 0;
	domino.select("rect")
	    .attr("x",0)
	    .attr("y",0)
	    .attr("height",xunit)
	    .attr("width",2*xunit);
	domino.select("line")
	    .attr("x1",0)
	    .attr("y1",xunit/2)
	    .attr("x2",2*xunit)
	    .attr("y2",xunit/2);
    }
    else if (dir == 2){
	tiles[p-1][q-1] = 2;
	domino.select("rect")
	    .attr("x",0)
	    .attr("y",-xunit)
	    .attr("height",2*xunit)
	    .attr("width",xunit);
	domino.select("line")
	    .attr("x1",0)
	    .attr("y1",xunit/2)
	    .attr("x2",xunit)
	    .attr("y2",-xunit/2);
    }
    else if (dir == 4){
	tiles[p-1][q-1] = 4;
	domino.select("rect")
	    .attr("x",-xunit)
	    .attr("y",0)
	    .attr("height",xunit)
	    .attr("width",2*xunit);
	domino.select("line")
	    .attr("x1",-xunit)
	    .attr("y1",xunit/2)
	    .attr("x2",xunit)
	    .attr("y2",xunit/2);
    }
    else if (dir == 6){
	tiles[p-1][q-1] = 6;
	domino.select("rect")
	    .attr("x",0)
	    .attr("y",0)
	    .attr("height",2*xunit)
	    .attr("width",xunit);
	domino.select("line")
	    .attr("x1",0)
	    .attr("y1",xunit/2)
	    .attr("x2",xunit)
	    .attr("y2",3*xunit/2);
    }
}

function removeDomino(p,q){
    d3.select("#domino-" + p + "-" + q).remove();
}
function removeDefect(){
    d3.select("#defect").remove();
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};
d3.selection.prototype.moveToBack = function() { 
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    }); 
};

function addDomino(p,q,dir){
    if (dir == 1){
	defect = svg.append("g")
	    .attr("id","defect")
	    .attr("transform","translate(" + xScale(2*a-p+1+q-1) + "," + yScale(0-0.5+p+q-1) + ")");
	console.log(p + "," + q);
	tiles[p-1][q-1] = 1;
	defect.append("rect")
	    .attr("class","plus")
	    .attr("width",xunit)
	    .attr("height",xunit)
	    .attr("fill","red")
	    .style("cursor","crosshair")
	    .on("click",
		  function(){
		      if (tiles[p][q] == 6){
			  console.log(p + "," + q);
			  removeDomino(p+1,q+1);
			  removeDefect();
			  addDomino(p,q,2);
			  addDomino(p+1,q+1,3);
		      }
		      else if (tiles[p][q-1] == 0){
			  console.log(p + "," + q);
			  removeDomino(p+1,q);
			  removeDefect();
			  addDomino(p,q+1,4);
			  addDomino(p+1,q,3);
		      }
		  }
	       );
	defect.append("rect")
	    .attr("class","minus")
	    .attr("x",xunit)
	    .attr("y",-xunit)
	    .attr("width",xunit)
	    .attr("height",xunit)
	    .attr("fill","red")
	    .style("cursor","crosshair")
	    .on("click",
		  function(){
		      if (tiles[p-2][q-1] == 2){
			  console.log(p + "," + q + ":" + tiles[p-2][q-1]);
			  removeDomino(p-1,q);
			  removeDefect();
			  addDomino(p,q,3);
			  addDomino(p,q+1,6);
		      }
		      else if (tiles[p-2][q] == 4){
			  console.log(p + "," + q + ":" + tiles[p-2][q]);
			  removeDomino(p-1,q+1);
			  removeDefect();
			  addDomino(p,q,0);
			  addDomino(p,q+1,3);
		      }
		  }
	       );
    }
    else if (dir == 3){
	defect = svg.append("g")
	    .attr("id","defect")
	    .attr("transform","translate(" + xScale(2*a-p+1+q-1) + "," + yScale(0-0.5+p+q-1) + ")");
	console.log(p + "," + q);
	tiles[p-1][q-1] = 3;
	defect.append("rect")
	    .attr("class","plus")
	    .attr("width",xunit)
	    .attr("height",xunit)
	    .attr("fill","red")
	    .style("cursor","crosshair")
	    .on("click",
		function(){
		    console.log(tiles[p-2][q-2]);
		    if (tiles[p-2][q-2] == 2){
			console.log(p + "," + q);
			removeDomino(p-1,q-1);
			removeDefect();
			addDomino(p,q,6);
			addDomino(p-1,q-1,1);
		    }
		    else if (tiles[p-1][q-2] == 0){
			console.log(p + "," + q);
			removeDomino(p,q-1);
			removeDefect();
			addDomino(p,q-1,1);
			addDomino(p-1,q,4);
		    }
		}
	       );
	defect.append("rect")
	    .attr("class","minus")
	    .attr("x",xunit)
	    .attr("y",xunit)
	    .attr("width",xunit)
	    .attr("height",xunit)
	    .attr("fill","red")
	    .style("cursor","crosshair")
	    .on("click",
		function(){
		    if (tiles[p-1][q] == 6){
			console.log(p + "," + q);
			removeDomino(p,q+1);
			removeDefect();
			addDomino(p,q,1);
			addDomino(p-1,q,2);
		    }
		    else if (tiles[p-2][q] == 4){
			console.log(p + "," + q);
			removeDomino(p-1,q+1);
			removeDefect();
			addDomino(p-1,q,1);
			addDomino(p,q,0);
		    }
		}
	       );
    }
    else{ // normal domino
	domino = svg.append("g")
	    .attr("id","domino-"+p+"-"+q)
	    .attr("transform","translate(" + xScale(2*a-p+1+q-1) + "," + yScale(0-0.5+p+q-1) + ")");
	domino.append("rect")
	    .attr("stroke-width",1)
	    .attr("fill","#aaa")
	    .attr("stroke","white");
	domino.append("line")
	    .attr("stroke-width",2)
	    .attr("stroke","black");
	svg.append("circle")
	    .attr("id","button-"+p+"-"+q)
	    .attr("class","rotatebutton")
	    .attr("r",xunit/10);
	if (q <= b ){
	    domino.append("circle")
		.attr("class","rotatebutton1")
		.attr("cx",xunit)
		.attr("cy",0)
		.attr("p",p)
		.attr("q",q)
		.attr("r",xunit/2)
		.attr("opacity",0)
		.on("mouseover", function(){
		    console.log(p + "," + q);
		    console.log(tiles[p-1][q-1] + "," + tiles[p-1][q]);
		    if (tiles[p-1][q-1]==2 && tiles[p-1][q]==6){
			d3.select(this)
			    .style("cursor","crosshair");
		    }
		    else if (tiles[p-1][q-1]==0 && tiles[p-1][q]==4){
			d3.select(this)
			    .style("cursor","crosshair");
		    }
		})
		.on("click", function(){
		    if (tiles[p-1][q-1]==2 && tiles[p-1][q]==6){
			rotateDomino(p,q,0);
			rotateDomino(p,q+1,4);
		    }
		    else if (tiles[p-1][q-1]==0 && tiles[p-1][q]==4){
			rotateDomino(p,q,2);
			rotateDomino(p,q+1,6);
		    }
		});
	}
	if (q > 1 && q <= b && p < a){
	    domino.append("circle")
		.attr("class","rotatebutton2")
		.attr("cx",0)
		.attr("cy",0)
		.attr("p",p)
		.attr("q",q)
		.attr("r",xunit/2)
		.attr("opacity",0)
		.attr("fill", "red")
		.on("mouseover", function(){
		    console.log(p + "," + q);
		    console.log(tiles[p-1][q-1] + "," + tiles[p][q-1]);
		    if (tiles[p-1][q-1]==2 && tiles[p][q-1]==6){
			d3.select(this)
			    .style("cursor","crosshair");
		    }
		    else if (tiles[p-1][q-1]==4 && tiles[p][q-1]==0){
			d3.select(this)
			    .style("cursor","crosshair");
		    }
		})
		.on("click", function(){
		    if (tiles[p-1][q-1]==2 && tiles[p][q-1]==6){
			rotateDomino(p,q,4);
			rotateDomino(p+1,q,0);
		    }
		    else if (tiles[p-1][q-1]==4 && tiles[p][q-1]==0){
			rotateDomino(p,q,2);
			rotateDomino(p+1,q,6);
		    }
		});
	}
    }

    if (dir == 0){
	tiles[p-1][q-1] = 0;
	domino.select("rect")
	    .attr("x",0)
	    .attr("y",0)
	    .attr("height",xunit)
	    .attr("width",2*xunit);
	domino.select("line")
	    .attr("x1",0)
	    .attr("y1",xunit/2)
	    .attr("x2",2*xunit)
	    .attr("y2",xunit/2);
	svg.select("#button-"+p+"-"+q)
	    .attr("cx",xScale(2*a-p+1+q-1+1))
	    .attr("cy",yScale(0-0.5+p+q-1));
    }
    else if (dir == 2){
	tiles[p-1][q-1] = 2;
	domino.select("rect")
	    .attr("x",0)
	    .attr("y",-xunit)
	    .attr("height",2*xunit)
	    .attr("width",xunit);
	domino.select("line")
	    .attr("x1",0)
	    .attr("y1",xunit/2)
	    .attr("x2",xunit)
	    .attr("y2",-xunit/2);
	svg.select("#button-"+p+"-"+q)
	    .attr("cx",xScale(2*a-p+1+q-1+1))
	    .attr("cy",yScale(0-0.5+p+q-1));
    }
    else if (dir == 4){
	tiles[p-1][q-1] = 4;
	domino.select("rect")
	    .attr("x",-xunit)
	    .attr("y",0)
	    .attr("height",xunit)
	    .attr("width",2*xunit);
	domino.select("line")
	    .attr("x1",-xunit)
	    .attr("y1",xunit/2)
	    .attr("x2",xunit)
	    .attr("y2",xunit/2);
	svg.select("#button-"+p+"-"+q)
	    .attr("cx",xScale(2*a-p+1+q-1-1))
	    .attr("cy",yScale(0-0.5+p+q-1));
    }
    else if (dir == 6){
	tiles[p-1][q-1] = 6;
	domino.select("rect")
	    .attr("x",0)
	    .attr("y",0)
	    .attr("height",2*xunit)
	    .attr("width",xunit);
	domino.select("line")
	    .attr("x1",0)
	    .attr("y1",xunit/2)
	    .attr("x2",xunit)
	    .attr("y2",3*xunit/2);
	svg.select("#button-"+p+"-"+q)
	    .attr("cx",xScale(2*a-p+1+q-1))
	    .attr("cy",yScale(0-0.5+p+q-1-1))
	    .attr("fill","red");
    }
}



var tiles = new Array(a);
var vacantnums = new Array(a);


for (p=1; p<=a; p++){
    tiles[p-1] = new Array(b+1);
    vacantnums[p-1] = new Array(b+1);
    for (q=1; q<=(b+1); q++){
	if ( p - q > 1){
	    addDomino(p,q,2)
	}else if ( p - q <  0){
	    addDomino(p,q,6)
	}else if (p < a/2){
	    addDomino(p,q,2);
	}else if (p > a/2+1){
	    addDomino(p,q,6);
	}
    }
}

addDomino(Math.floor(a/2+1), Math.floor(b/2+1), 1);

svg.selectAll(".rotatebutton")
    .moveToFront();

//drawDomino(1,1);
//drawDomino(1,2);
