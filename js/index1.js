function hp(parentClassName,objClassName,scrollClassName){
	this.iH=document.documentElement.clientHeight;

	this.parent=document.getElementsByClassName(parentClassName)[0];

	this.childNode=document.getElementsByClassName(objClassName)[0];

	this.oScroll=document.getElementsByClassName(scrollClassName)[0];



	this.index=1;

	this.downY=0;

	this.iTop=0;

	this.speed=0;

	this.prevY=0;

	this.timer1=0;

	this.inite=function(){



		this.iHeight=this.parent.offsetHeight*(this.parent.offsetHeight/this.childNode.offsetHeight);

		this.oScroll.style.height=this.iHeight+'px';


		this.Move();
	}

	this.Move=function(){
		var This=this;
		this.childNode.ontouchstart=function (ev) {
			var tc=ev.changedTouches[0];

			This.downY=tc.clientY;

			This.iTop=This.childNode.offsetTop;

			This.prevY=tc.clientY;

			var fleg=true;


			This.childNode.ontouchmove=function (ev) {
				ev.preventDefault();
				var tc=ev.changedTouches[0];
				This.speed=(tc.clientY-This.prevY)/6;
				This.prev=tc.clientY;
				This.oScroll.style.opacity=1;
				This.oScroll.style.display='block';
				
				if(This.iTop>=0){
					if(fleg){
						This.downY=tc.clientY;

						fleg=false;
					}

					This.childNode.style.top=(tc.clientY-This.downY)/3+'px';

					This.oScroll.style.height=This.iHeight*(1-	This.offsetTop/This.parent.offsetHeight)+'px';
				}else if(This.childNode.offsetTop<=This.parent.offsetHeight-This.childNode.offsetHeight){

					if(fleg){
						This.downY=tc.clientY;
						fleg=false;

					}


					This.childNode.style.top=This.iTop+(tc.clientY-This.downY)/3+'px';

					This.oScroll.style.height=This.iHeight*(1-Math.abs((This.childNode.offsetTop-(This.parent.offsetHeight-This.childNode.offsetHeight))/This.parent.offsetHeight))+'px';
					This.oScroll.style.top=This.parent.offsetHeight-This.oScroll.offsetHeight+'px';


				}else{

					 This.childNode.style.top=This.iTop+tc.clientY-This.downY+'px';

					var scale=This.childNode.offsetTop/(This.parent.offsetHeight-This.childNode.offsetHeight)

					This.oScroll.style.top=scale*(This.parent.offsetHeight-This.oScroll.offsetHeight)+'px';


				}

			}

		This.childNode.ontouchend=function(){

			clearInterval(This.timer1);



			This.timer1=setInterval(function(){

				if(Math.abs(This.speed)<=1||This.childNode.offsetTop>0||This.childNode.offsetTop<(This.parent.offsetHeight-This.childNode.offsetHeight)){
					clearInterval(This.timer1);
					if(This.childNode.offsetTop>=0){

							This.toMove(This.childNode,{top:0},400,'easeOut',function () {
								This.toMove(This.oScroll,{opacity:0},400,'easeOut');
							});
							This.toMove(This.oScroll,{height:iHeight},400,'easeOut');




					}else if(This.childNode.offsetTop<=This.parent.offsetHeight-This.childNode.offsetHeight){




							This.toMove(This.childNode,{top:This.parent.offsetHeight-This.childNode.offsetHeight},400,'easeOut',function () {
								This.toMove(This.oScroll,{opacity:0},200,'easeOut')
							});
							This.toMove(This.oScroll,{top:This.parent.offsetHeight-This.oScroll.offsetHeight,height:This.iHeight},400,'easeOut')

						}else{

						This.toMove(This.oScroll,{opacity:0},400,'easeOut');


					}


			}else{

					This.speed *= 0.95;
					This.childNode.style.top = This.childNode.offsetTop + This.speed + 'px';



					if(This.childNode.offsetTop >= 0){
						This.oScroll.style.height = This.iHeight * ( 1 - This.childNode.offsetTop/This.parent.offsetHeight ) + 'px';
						This.oScroll.style.top = 0;
					}
					else if(This.childNode.offsetTop <= This.parent.offsetHeight - This.childNode.offsetHeight){
						This.oScroll.style.height = This.iHeight * ( 1 - Math.abs((This.childNode.offsetTop - (This.parent.offsetHeight - This.childNode.offsetHeight)))/This.parent.offsetHeight ) + 'px';
						This.oScroll.style.top = This.parent.offsetHeight - This.oScroll.offsetHeight + 'px';
					}
					else{
						var scaleY = This.childNode.offsetTop / (This.parent.offsetHeight - This.childNode.offsetHeight);

						This.oScroll.style.top = scaleY * (This.parent.offsetHeight - This.oScroll.offsetHeight) + 'px';
					}

				}



			},13);

		}
		}

	}
}
hp.prototype=new Move();
