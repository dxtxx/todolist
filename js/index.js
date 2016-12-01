function postaction(){
	var title = document.querySelector("#shuru");
		var data=loadData();
		var yyy={"title":title.value,"done":false};
		data.push(yyy);
		saveData(data);
		var form=document.querySelector("#form");
		form.reset();
		load();	
}

function saveSort(){
	var nolist=document.querySelector(".one .lb");
	var donelist=document.querySelector(".two .lb");
	var nl=nolist.getElementsByTagName("p");
	var dl=donelist.getElementsByTagName("p");
	var data=[];
	for(i=0;i<nl.length; i++){
		var yyy={"title":nl[i].innerHTML,"done":false};
		data.unshift(yyy);
	}
	for(i=0;i<dl.length; i++){
		var yyy={"title":dl[i].innerHTML,"done":true};
		data.unshift(yyy);
	}
	saveData(data);
	load();
}
function saveData(data){
	localStorage.setItem("yyy",JSON.stringify(data));
	load();
}
function removeData(i){
	var data=loadData();
	var todo=data.splice(i,1)[0];
	saveData(data);
	load();	
}

function update(i,fi,val){
	var data = loadData();
	var yyy = data.splice(i,1)[0];
	yyy[fi] = val;
	data.splice(i,0,yyy);
	saveData(data);
	load();
}
function loadData(){
	var content=localStorage.getItem("yyy");
	if(content!=null){
		return JSON.parse(content);
	}
	else return [];
}

function edit(i){
	load();
	var p = document.getElementById("pp"+i);
	title = p.innerHTML;
	p.innerHTML="<input id='input"+i+"' value='"+title+"'/>";
	 var input = document.getElementById("input"+i);
	input.setSelectionRange(0,input.value.length);
	input.focus();
	input.onblur =function(){
		if(input.value.length == 0){
			p.innerHTML = title;
		}
		else{
			update(i,"title",input.value);
		}
	};
		
}
    
function load(){
	var nolist=document.querySelector(".one .lb");
	var donelist=document.querySelector(".two .lb");
	var content=localStorage.getItem("yyy");
	var nojl=document.querySelector('.one .jl');
	var donejl=document.querySelector('.two .jl');
	if(content!=null){
		var data=JSON.parse(content);
		var noCount=0;
		var doneCount=0;
		var noString="";
		var doneString="";
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].done){
				doneString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",false)' checked='checked' />"
				+"<p id='pp"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<div class='iconfont' onclick='removeData("+i+")'>&#xe61a;</div></li>";
				doneCount++;
	        }else{
				noString+="<li draggable='true'><input type='checkbox' onchange='update("+i+",\"done\",true)' />"
				+"<p id='pp"+i+"' onclick='edit("+i+")'>"+data[i].title+"</p>"
				+"<div class='iconfont' onclick='removeData("+i+")'>&#xe61a;</div></li>";
				noCount++;
			}
		};
		nojl.innerHTML=noCount;
		nolist.innerHTML=noString;
		donejl.innerHTML=doneCount;
		donelist.innerHTML=doneString;
	}
	var lis=nolist.querySelectorAll('.one li');
	[].forEach.call(lis, function(li) {
		li.addEventListener('dragstart', handleDragStart, false);
		li.addEventListener('dragover', handleDragOver, false);
		li.addEventListener('drop', handleDrop, false);
	})		
}
load();

window.onload=load;

window.addEventListener("storage",load,false);

var dragSrcEl = null;
function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}
function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); 
  }
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}