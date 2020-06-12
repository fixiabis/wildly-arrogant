var doc=document,c=doc.querySelector("canvas").getContext("2d"),
    y=[
        {C:"lightblue"      ,T:"\u72c2\u8a00\u5984\u8a9e"},
        {C:"hotpink"        ,T:"\u751c\u8a00\u871c\u8a9e"},
        {C:"lightgray"      ,T:"\u81ea\u8a00\u81ea\u8a9e"},
        {C:"mediumslateblue",T:"\u9178\u8a00\u9178\u8a9e"},
        {C:"lightsalmon"    ,T:"\u6d41\u8a00\u871a\u8a9e"},
        {C:"lightseagreen"  ,T:"\u80e1\u8a00\u4e82\u8a9e"},
        {C:"crimson"        ,T:"\u6c61\u8a00\u7a62\u8a9e"},
        {C:"gold"           ,T:"\u540d\u8a00\u52f5\u8a9e"},
        {C:"cornflowerblue" ,T:"\u8352\u8a00\u8b2c\u8a9e"},
    ],u="",img="",pst=1,txq="";
	String.rwa={
		B:function(t,s){var f="",b="",r="#333";
			if(!t)t=doc.querySelector("#Type input:checked").getAttribute("data-type");
			if(!s)s=doc.querySelector("#Style input:checked").getAttribute("data-style");
			if(s==4)b="#fff";if(s==0||s==3)b="#000";if(s==1||s==2)b=y[t].C;
			if(s==2||s==4)f="#000";if(s==1||s==3)f="#fff";if(s==0)f=y[t].C;
			if(s==3||s==4)r=y[t].C;c.fillStyle=b;c.fillRect(5,5,490,290);
			c.lineWidth=10;c.strokeStyle=r;c.strokeRect(0,0,500,300);
			c.font="20px sens-serif";c.globalAlpha=0.8;c.fillStyle=f;
			c.fillText(y[t].T,415,290);c.globalAlpha=1;doc.title=y[t].T;
			c.font="30px sans-serif";doc.querySelector("header").style.color=y[t].C;
			doc.querySelector("header").innerHTML=y[t].T;return c
        },
		P:function(t,s){if(!s)s=30;c.font=s+"px sans-serif";
			var l=t.split("\n"),u=0,b=0,e=[];
			for(var i=0;i<l.length;i++){
				var w=c.measureText(l[i]).width;
				u+=l[i].length;if(w>b)b=w;
				if(w>480){var r="";
					for(var j=0;j<l[i].length;j++){
						var w=c.measureText(r+l[i][j]).width;
						if(w<=480){r+=l[i][j];if(w>b||b>480)b=w}
						else{e.push(r);r=l[i][j]}
					}if(r)e.push(r)
				}else if(l[i])e.push(l[i])
			}var v=(300-(e.length*(s+5)))/2+s-(s/5),a=(500-b)/2;
			this.W(e,s,a,v,0);this.H(c.canvas.toDataURL());
			return{e:e,u:u,b:b,v:v,a:a}
		},
		W:function(t,s,x,y,d){
			if(typeof t[d]=="undefined")return;c.font=s+"px sans-serif";
			c.fillText(t[d],x,y);return this.W(t,s,x,y+s+5,d+1)
		},
		L:function(){
			$(document).ready(function(){
				$.ajaxSetup({cache:true});
				$.getScript('https://connect.facebook.net/en_US/sdk.js',function(){
					FB.init({appId:String.rwa.T("F"),version:'v2.8'});
					String.rwa.A()
				})
			});var p=doc.querySelectorAll("#Type label");
			for(var i=0;i<p.length;i++)p[i].style.color=y[i].C;
			$("#Type label input").click(function(){
				$("#Type label").css("opacity","");
				this.parentNode.style.opacity=1;
				String.rwa.B(this.getAttribute("data-type"),doc.querySelector("#Style input:checked").getAttribute("data-style"));
				if($("#gifs input")[0].checked)String.rwa.F();
				else String.rwa.S()
			});
			$("#Style label input").click(function(){
				$("#Style label").css("opacity","");
				this.parentNode.style.opacity=1;
				String.rwa.B(doc.querySelector("#Type input:checked").getAttribute("data-type"),this.getAttribute("data-style"));
				if($("#gifs input")[0].checked)String.rwa.F();
				else String.rwa.S()
			});
			$("#gifs input").click(function(){
				if(this.checked){
					this.parentNode.style.opacity=1;
					this.parentNode.childNodes[2].innerHTML="\u958b\u555f";
					String.rwa.F()
				}else{
					this.parentNode.style.opacity="";
					this.parentNode.childNodes[2].innerHTML="\u95dc\u9589";
					String.rwa.S()
				}
			});
			$(window).keyup(function(){
				if(txq!=doc.querySelector("textarea").value)txq=doc.querySelector("textarea").value;
				else return;
				if(doc.querySelector("textarea").value.length>0&&$("#gifs input")[0].checked)String.rwa.F();
				else String.rwa.S()
			});
			doc.querySelector("#Sent input[type=button]").onclick=function(){
				if(pst)String.rwa.U(doc.querySelector("textarea").value)
			};this.S()
		},
		D:function(t){
			var b=atob(t.split(',')[1]),a=new ArrayBuffer(b.length),
				c=new Uint8Array(a);
			for(var i=0;i<b.length;i++)c[i]=b.charCodeAt(i);
			return new Blob([a],{type:'image/png'})
		},
		F:function(d,k,n){
			var g=doc.querySelector("textarea").value,p=g.split("\n"),q=[];
			for(var i=0;i<p.length;i++){
				if(p[i].length==0)continue;this.S(p[i]);q.push(c.canvas.toDataURL())
			}
			if(q.length==1){
				return this.G("\u4e00\u884c\u7121\u6cd5\u69cb\u6210Gif",function(){
					var f=$("#gifs input")[0];
					f.checked=false;f.parentNode.style.opacity="";
					f.parentNode.childNodes[2].innerHTML="\u95dc\u9589"
				})
			}this.G("\u6b63\u5728\u5efa\u7acbGif",null,"Gifing");
			gifshot.createGIF({images:q},
			function(r){var wa=String.rwa;wa.H(r.image);wa.Y(0,"Gifing");if(n)wa.M(d,k,n,r.image)})
		},
		M:function(d,k,n,m){
			if(!n)return this.G("\u7121\u5167\u5bb9",function(){});
			if(!u)return this.A();
			doc.getElementById("Delay").innerHTML="\u6b63\u5728\u5efa\u7acb\u5716\u7247URL";
			var x=new XMLHttpRequest(),f=new FormData();
			if(!m)m=c.canvas.toDataURL();
			f.append('image',this.D(m));
			x.open('POST','https://api.imgur.com/3/image');
			x.setRequestHeader('Authorization','Client-ID '+this.T("M"));
			x.onreadystatechange=function(){
				if(x.status==200 && x.readyState==4){
					var a=y[0].T,z=500,
						tt=y[doc.querySelector("#Type input:checked").getAttribute("data-type")].T;
					if(doc.body.clientWidth<z)z=doc.body.clientWidth;if(tt!=a)a+="\u4e4b"+tt;
					try{doc.getElementById("Delay").innerHTML="\u6b63\u5728\u4e0a\u50b3\u81f3\u81c9\u66f8";
						if(!$("#gifs input")[0].checked)FB.api("Wildly.Arrogant/photos?access_token="+k,"POST",{
							message:"#"+y[0].T+d+"\u000A#"+a+"\u000A\u6aa2\u8209\u6587\u7ae0\u8acb\u79c1\u8a0a\u6211\u5011\u000A"+n,
							url:JSON.parse(x.responseText).data.link
						},function(r){var wa=String.rwa;doc.title=tt;wa.Y(1);
							if(r.error)return wa.O("\u4e0a\u50b3\u5931\u6557");
							doc.querySelector("textarea").value="";
							doc.getElementById("Sent").innerHTML="<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FWildly.Arrogant%2Fposts%2F"+r.id+"%3A0&width="+z+"\" width=\""+z+"\" height=\"432\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>";wa.B()
						});
						else FB.api("Wildly.Arrogant/feed?access_token="+k,"POST",{
							message:"#"+y[0].T+d+"\u000A#"+a+"\u000A\u6aa2\u8209\u6587\u7ae0\u8acb\u79c1\u8a0a\u6211\u5011\u000A"+n,
							link:JSON.parse(x.responseText).data.link
						},function(r){var wa=String.rwa;doc.title=tt;wa.Y(1);
							if(r.error)return wa.O("\u4e0a\u50b3\u5931\u6557");
							doc.querySelector("textarea").value="";
							doc.getElementById("Sent").innerHTML="<iframe src=\"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FWildly.Arrogant%2Fposts%2F"+r.id.split("_")[1]+"&width="+z+"\" width=\""+z+"\" height=\"641\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>";wa.B()
						})
					}catch(e){String.rwa.O("\u4e0a\u50b3\u5931\u6557")}
				}
			};
			try{x.send(f)}
			catch(e){this.O("\u5efa\u7acb\u5931\u6557")}
		},
		U:function(n){
			var v=0,g=doc.querySelector("textarea").value.split("\n");
			if($("#gifs input")[0].checked){
				for(var i=0;i<g.length;i++){
					var s=this.S(g[i]);if(s.v<v||i==0)v=s.v
				}
			}else v=this.S().v;v-=20;
			if(!n)return this.G("\u7121\u5167\u5bb9",function(){});
			if(!u)return this.A();
			this.G("\u6b63\u5728\u53d6\u5f97\u6b0a\u9650...",null,"Delay");
			try{pst=0;
				$.get("https://script.google.com/macros/s/"+this.T("G")+ "/exec",{
					t:new Date().getTime(),
					y:y[doc.querySelector("#Type input:checked").getAttribute("data-type")].T,n:n,f:u,h:v
				},function(r){var wa=String.rwa;
					if(isNaN(r[0]*1)){
						return wa.G(r,function(){wa.Y()})
					}else wa.E(r[0],wa.N(r[2]),n,r[1])
				})
			}catch(e){this.O("\u53d6\u5f97\u5931\u6557")}
		},
		O:function(t){
			this.Y();this.G(t+"\uff0c\u53ef\u80fd\u662f\u672a\u9023\u7dda\uff0c\u6216\u662f\u76ee\u524d\u4f7f\u7528\u8005\u773e\u591a\u6240\u81f4\uff0c\u82e5\u4e0d\u65b7\u767c\u751f\u5931\u6557\u53ef\u9032\u884c\u56de\u5831<a href=\"m.me/String.rwa\">\u9ede\u6b64\u56de\u5831</a>",function(){});pst=1
		},
		Y:function(k,d){if(!d)d="Delay";
			for(var i=0;i<doc.querySelectorAll("#"+d).length;i++)if(doc.getElementById(d)){
				var a=doc.getElementById(d).parentNode.id;
				doc.body.removeChild(doc.getElementById(a.replace("Msg","MsgC")));
				doc.body.removeChild(doc.getElementById(a));
				if(k)this.G("\u5df2\u6210\u529f\u9001\u51fa",function(){})
			}
		},
		E:function(d,k,n,t){
			var m="\u70ba\u4e86\u907f\u514d\u81c9\u66f8\u5c01\u9396\uff0c\u5c1a\u6709"+Math.abs(Math.floor((t-new Date().getTime())/1000))+ "\u79d2";doc.title=m;
			doc.getElementById("Delay").innerHTML=m;
			if(new Date().getTime()>t){
				if($("#gifs input")[0].checked)this.F(d,k,n);
				else this.M(d,k,n)
			}else setTimeout(function(){
				String.rwa.E(d,k,n,t)
			},1000)
		},
		S:function(n){
			if(!n)n=doc.querySelector("textarea").value;
			if(!n)n="\u4f60\u6700\u8fd1\u5728\u72c2\u4ec0\u9ebc?";
			var l=n.split("\n");
			for(var i=25;i<61;i+=5){
				this.B();var r=this.P(n,i);
				if(r.v<i||l.length<r.e.length){
					this.B();return this.P(n,i-5)
				}
			}return this.P(n,60)
		},
		G:function(m,k,s){
			var g=doc.createElement("div"),c=doc.createElement("div"),d=0;
			if(!s)s="";
			while(1){if(!doc.getElementById("Msg"+d))break;d++}
			c.style.position="absolute";c.style.backgroundColor="#000";
			c.style.left="0px";c.style.top="0px";c.style.opacity=0.8;
			c.style.width="100%";c.style.height=doc.body.scrollHeight;
			c.style.zIndex=2;c.id="MsgC"+d;g.id="Msg"+d;
			g.style.position="absolute";g.style.height="auto";
			g.style.width=(doc.body.clientWidth<400)?"100%":"400px";
			g.style.backgroundColor="#222";g.style.zIndex=3;
			g.style.borderRadius="10px";g.style.fontSize="20px";
			g.innerHTML="<div id=\""+s+"\" style=\"margin:10px 10px;color:lightblue\">"+m+"</div>";
			if(k)g.innerHTML+="<div align=\"right\"style=\"margin:10px 10px\"><input type=\"button\" value=\"\u78ba\u8a8d\" id=\"MsgB"+d+"\"></div>";
			doc.body.appendChild(c);doc.body.appendChild(g);
			$("body").animate({scrollTop:0},500);
			g.style.left=(doc.body.clientWidth-g.clientWidth)/2+"px";
			g.style.top=(doc.body.clientHeight-g.clientHeight)/2+"px";
			if(k)doc.getElementById("MsgB"+d).addEventListener("click",function(){
				var d=this.id.replace("MsgB","");k();
				doc.body.removeChild(doc.getElementById("Msg"+d));
				doc.body.removeChild(doc.getElementById("MsgC"+d))
			})
		},
		T:function(t){
			switch(t){
				case "F":return this.N("51,56,55,50,57,54,49,52,0,1,2,3,4,5,4,5,1,0,6,5,0,7,7");
				case "G":return this.N("65,75,102,121,99,98,49,69,112,105,101,85,120,53,113,117,80,83,77,68,57,48,86,103,106,52,87,76,107,108,119,88,95,84,73,90,115,118,0,1,2,3,4,5,3,6,7,8,9,0,9,10,11,12,3,13,14,15,15,16,17,18,19,7,4,20,21,22,23,24,25,26,25,27,28,10,27,29,29,30,31,10,32,29,33,34,29,35,18,36,18,37,7");
				case "M":return this.N("57,56,100,97,55,54,49,101,99,98,0,1,1,2,3,1,2,4,5,6,6,7,6,8,9")
			}
		},
		A:function(){
			FB.getLoginStatus(function(r){
				if(r.status=="connected")u=r.authResponse.userID;
				else setTimeout(function(){FB.login(function(r){u=r.authResponse.userID})},10)
			})
		},
		C:function(t){
			var s=[[]];
			for(var i=0;i<t.length;i++){
				if(s[0].indexOf(t[i].charCodeAt())< 0){
					s[0].push(t[i].charCodeAt());s.push(s[0].length-1)
				}else s.push(s[0].indexOf(t[i].charCodeAt()))
			}return s.toString()
		},
		N:function(s){
			var d=[],r="",k=1;s=s.split(",");
			for(var i=0;i<s.length;i++){
				if(s[i]==0)k=0;if(k)d.push(s[i]);
				else r+=String.fromCharCode(d[s[i]])
			}return r
		},
		H:function(d){if(d)img=d;doc.querySelector("img").src=img}
    };
doc.body.onbeforeunload=function(){if(doc.getElementById("Delay"))return"\u78ba\u5b9a\u96e2\u958b?"};
String.rwa.B();String.rwa.L()