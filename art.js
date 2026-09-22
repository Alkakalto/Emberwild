(function(root){
 'use strict';
 const D=root.EWData,C=root.EWCore;
 function rect(ctx,x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
 function creature(ctx,id,x=0,y=0,size=64,back=false){
   const s=D.species[id],p=s.color,a=s.accent,d='#324c43';ctx.save();ctx.translate(x,y);ctx.scale(size/32,size/32);ctx.imageSmoothingEnabled=false;
   const r=(x,y,w,h,c)=>rect(ctx,x,y,w,h,c);
   ctx.fillStyle='#243f3825';ctx.beginPath();ctx.ellipse(16,28,12,3,0,0,Math.PI*2);ctx.fill();
   if(['fox','cat','stag'].includes(s.shape)){
     r(6,14,19,10,d);r(7,13,17,10,p);r(9,21,4,6,d);r(19,21,4,6,d);r(10,22,2,4,p);r(20,22,2,4,p);
     r(7,7,17,12,d);r(8,6,15,12,p);r(7,3,5,7,d);r(8,3,3,6,p);r(19,3,5,7,d);r(20,3,3,6,p);r(9,5,2,3,a);r(20,5,2,3,a);
     r(10,15,12,5,a);r(3,15,5,5,p);r(2,12,3,6,p);r(1,10,3,4,a);
     if(s.shape==='stag'){r(7,0,2,7,a);r(22,0,2,7,a);r(4,2,5,2,a);r(22,2,6,2,a);r(4,0,2,3,a);r(26,0,2,3,a);}
     if(s.type==='Ember'){r(24,17,4,5,p);r(27,12,3,8,a);r(28,8,2,7,'#f6de85');r(8,19,3,3,a);}
     if(s.type==='Grove'){r(14,2,3,5,'#315e49');r(16,1,6,3,'#a9c268');}
     if(s.type==='Spark'){r(25,12,3,8,a);r(27,10,3,4,d);r(28,6,3,6,a);r(7,14,3,2,'#ab8745');r(21,14,3,2,'#ab8745');}
   }else if(s.shape==='fin'){
     r(7,10,18,12,d);r(6,12,20,8,p);r(9,8,14,15,p);r(11,18,11,5,a);r(2,12,6,8,d);r(2,13,6,6,a);r(25,12,6,8,a);r(15,3,4,7,d);r(16,4,5,5,a);r(12,23,8,3,p);
   }else if(s.shape==='moth'){
     r(2,5,10,9,d);r(3,6,9,10,p);r(2,17,11,8,p);r(20,5,10,9,d);r(20,6,9,10,p);r(20,17,10,8,p);r(5,8,5,5,a);r(22,8,5,5,a);r(5,19,5,3,a);r(22,19,5,3,a);r(12,10,8,16,d);r(13,10,6,15,a);r(12,5,2,6,d);r(18,5,2,6,d);r(10,3,3,3,a);r(20,3,3,3,a);
   }else if(s.shape==='rock'){
     r(6,10,20,15,d);r(9,6,14,19,p);r(5,13,23,9,p);r(11,5,10,5,a);r(3,19,5,6,d);r(25,18,5,7,d);r(8,24,5,4,d);r(21,24,5,4,d);r(13,9,3,3,a);r(21,19,3,3,a);
   }else if(s.shape==='frog'){
     r(6,12,21,12,d);r(7,12,19,11,p);r(5,7,8,8,p);r(20,7,8,8,p);r(9,18,15,6,a);r(3,22,10,5,p);r(21,22,9,5,p);r(9,2,2,8,'#648551');r(23,0,2,8,'#648551');r(8,1,4,3,a);r(22,0,4,3,a);
   }else if(s.shape==='owl'){
     r(7,8,20,16,d);r(8,7,18,17,p);r(7,3,5,9,p);r(22,3,5,9,p);r(11,16,12,9,a);r(4,14,5,10,p);r(25,14,4,10,p);r(9,9,6,6,a);r(19,9,6,6,a);r(15,16,4,3,'#c8a96c');r(10,25,5,3,'#c8a96c');r(21,25,5,3,'#c8a96c');
   }else{
     r(9,11,17,14,d);r(10,10,15,14,p);r(14,18,10,7,a);r(13,4,13,10,p);r(11,1,4,7,a);r(23,1,4,7,a);r(2,9,8,13,d);r(3,7,6,12,p);r(4,5,3,10,a);r(25,16,5,6,p);r(28,12,3,8,a);r(9,25,6,3,p);r(21,25,6,3,p);
   }
   if(!back){const eyeY=s.shape==='frog'?10:12;r(10,eyeY,3,4,d);r(21,eyeY,3,4,d);r(10,eyeY,1,1,'#fff7dc');r(21,eyeY,1,1,'#fff7dc');if(s.shape!=='owl')r(15,17,3,2,d);}
   ctx.restore();
 }
  function tree(ctx,x,y,variant=0){const r=(a,b,w,h,c)=>rect(ctx,x+a,y+b,w,h,c);r(12,21,8,14,'#685d40');r(10,28,12,4,'#4b5d3b');r(2,9,28,15,'#315d43');r(5,3,22,24,'#3e714a');r(9,0,14,25,'#467b4d');r(6,6,19,13,variant?'#598553':'#528950');r(10,2,10,4,'#649355');r(5,19,21,4,'#356641');r(8,10,5,3,'#629858');}
  function person(ctx,x,y,color='#e4c68b',dir='down',frame=0){const r=(a,b,w,h,c)=>rect(ctx,x+a,y+b,w,h,c);r(8,28,18,3,'#25453244');r(11,21,4,8,'#344b49');r(19,21,4,8,'#344b49');r(10,28-(frame%2),6,3,'#344346');r(19,28-(frame%2?0:1),6,3,'#344346');r(9,14,16,11,color);r(7,16,4,8,'#ddb895');r(24,16,4,8,'#ddb895');r(10,5,14,11,'#ebc89b');r(8,3,18,5,'#314b45');r(10,0,14,5,'#344f48');r(7,6,20,3,color);if(dir!=='up'){r(dir==='left'?11:14,10,2,2,'#34433b');r(dir==='right'?22:20,10,2,2,'#34433b');}else{r(11,9,12,4,'#344d43');r(12,16,10,9,'#a37b50');r(14,17,6,6,'#c6a778');}r(10,23,14,2,'#75816a');}
  function ambient(ctx,area,time,front=false){
    const route=D.areas[area].route||0,t=time/1000,r=(x,y,w,h,c)=>rect(ctx,x,y,w,h,c);ctx.save();
    if(!front){
      if(area==='glen'){for(let i=0;i<4;i++){const y=150-((time*.018+i*29)%95),x=276+Math.sin(t+i)*10;ctx.globalAlpha=.12+(i*.03);ctx.fillStyle='#eef0d8';ctx.beginPath();ctx.arc(x,y,10+i*3,0,7);ctx.fill();}}
      if(area==='fen'){ctx.globalAlpha=.12;for(let i=0;i<3;i++)r(0,110+i*145+Math.sin(t+i)*10,896,32,'#e7eee0');}
      if(area==='sunshore'){for(let i=0;i<5;i++){const y=430+i*25+Math.sin(t*1.6+i)*5;ctx.globalAlpha=.35;r(430+(i%2)*35,y,430,3,'#edf0d2');r(510+(i%3)*29,y+7,270,2,'#bfd8ca');}}
      if(area==='moonruins'){ctx.strokeStyle='#c5d4b955';for(let i=0;i<3;i++){ctx.lineWidth=2;ctx.beginPath();ctx.arc(448,180,45+i*31+Math.sin(t+i)*5,0,7);ctx.stroke();}}
      if(area==='crystaldepths'){ctx.globalCompositeOperation='screen';for(let i=0;i<5;i++){const x=100+i*175,y=90+(i%3)*150,g=ctx.createRadialGradient(x,y,0,x,y,70);g.addColorStop(0,'#9ee5d077');g.addColorStop(1,'#9ee5d000');ctx.fillStyle=g;ctx.fillRect(x-70,y-70,140,140);}ctx.globalCompositeOperation='source-over';}
      if(area==='summit'){ctx.globalAlpha=.14;for(let i=0;i<5;i++){const y=70+i*95+Math.sin(t+i)*12;r((time*.04+i*190)%960-40,y,130,2,'#f5f0d3');}}
      if(route===2){ctx.strokeStyle='#b8ded066';for(let i=0;i<8;i++){ctx.beginPath();ctx.ellipse((i*127+time*.02)%896,110+(i%4)*118,18+Math.sin(t+i)*5,5,0,0,7);ctx.stroke();}}
      if(route===3){for(let i=0;i<8;i++){const x=55+i*112,y=115+(i%4)*120,rad=5+Math.sin(t*3+i)*3;ctx.globalAlpha=.35;ctx.fillStyle='#f5ad52';ctx.beginPath();ctx.arc(x,y,Math.max(2,rad),0,7);ctx.fill();}}
      if(route===4){ctx.globalAlpha=.18;for(let i=0;i<5;i++){ctx.fillStyle='#effff5';ctx.beginPath();ctx.moveTo(60+i*205,80);ctx.lineTo(180+i*155,500);ctx.lineTo(205+i*155,500);ctx.closePath();ctx.fill();}}
      if(route===5){ctx.globalCompositeOperation='screen';for(let i=0;i<5;i++){ctx.globalAlpha=.1+.08*Math.sin(t*2+i);ctx.fillStyle=['#d5b7ef','#a9e9dc','#fff2b0'][i%3];ctx.beginPath();ctx.moveTo(i*190,0);ctx.lineTo(i*190+170,576);ctx.lineTo(i*190+240,576);ctx.closePath();ctx.fill();}ctx.globalCompositeOperation='source-over';}
      if(route===6){for(let i=0;i<14;i++){const x=(i*83)%896,y=(i*137)%576;r(x,y,3,3,i%2?'#e1d385':'#b7cf86');}}
      if(route===7){ctx.globalAlpha=.12;for(let i=0;i<7;i++){const y=(i*92+time*.025)%620-20;r(0,y,896,5,'#c4e6d5');}}
      if(route===8){ctx.globalAlpha=.16;for(let i=0;i<5;i++){const x=(i*230+time*.025)%1100-160,y=80+(i%3)*170;ctx.fillStyle='#eff2e6';ctx.beginPath();ctx.ellipse(x,y,100,26,0,0,7);ctx.fill();}}
      if(route===9){for(let i=0;i<24;i++){const x=(i*149)%896,y=(i*83)%576,a=.18+.35*Math.sin(t*2+i)**2;r(x,y,i%5?2:3,i%5?2:3,`rgba(248,232,164,${a})`);}}
      if(route===10){ctx.globalAlpha=.16;for(let i=0;i<3;i++){ctx.strokeStyle=['#85d2a1','#ac9edd','#e3cf79'][i];ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(-30,100+i*95+Math.sin(t+i)*30);ctx.bezierCurveTo(250,10+i*95+Math.sin(t*.7+i)*40,600,210-i*40,940,70+i*100+Math.sin(t*.8+i)*35);ctx.stroke();}ctx.lineWidth=1;}
    }else{
      const leaf=(count,color,speed)=>{ctx.fillStyle=color;for(let i=0;i<count;i++){const x=(i*137+time*speed)%940-20,y=(i*89+time*speed*.28)%610-20;r(x,y,5+(i%2)*2,3,color);}};
      const sparkle=(count,color)=>{for(let i=0;i<count;i++){const x=(i*151)%880+8,y=(i*97)%550+8,a=.2+.65*Math.sin(t*2.2+i)**2;ctx.globalAlpha=a;r(x-3,y,7,1,color);r(x,y-3,1,7,color);}};
      if(area==='glen'){for(let i=0;i<6;i++){const x=(i*173+time*.025)%900,y=210+(i%3)*93+Math.sin(t*2+i)*14;r(x,y,4,3,i%2?'#f0cc77':'#d8e59a');r(x+5,y-2,3,3,'#fff0c2');}}
      if(area==='fen'){for(let i=0;i<14;i++){const x=(i*137+71)%860,y=(i*67+time*.08)%560;ctx.globalAlpha=.3+.55*Math.sin(t*2+i)**2;r(x,y,3,3,'#eff1b0');}}
      if(area==='whisperwood')leaf(12,'#bdd17f',.018);
      if(area==='sunshore'){for(let i=0;i<4;i++){const x=(i*260+time*.05)%1050-80,y=70+i*45;ctx.strokeStyle='#f5f1d6';ctx.beginPath();ctx.moveTo(x-8,y+4);ctx.quadraticCurveTo(x,y-4,x+8,y+4);ctx.quadraticCurveTo(x+16,y-4,x+24,y+4);ctx.stroke();}}
      if(area==='moonruins'){for(let i=0;i<8;i++){const x=(i*113+Math.sin(t+i)*20)%896,y=540-((i*79+time*.03)%560);ctx.globalAlpha=.18+.2*Math.sin(t+i)**2;ctx.fillStyle='#c9d9d1';ctx.beginPath();ctx.arc(x,y,7,0,7);ctx.fill();}}
      if(area==='crystaldepths')sparkle(15,'#c8f4df');
      if(area==='summit')leaf(16,'#eef1df',.055);
      if(route===1)leaf(18,'#c8d47d',.035);
      if(route===2){ctx.strokeStyle='#b8d4ca99';ctx.lineWidth=2;for(let i=0;i<34;i++){const x=(i*53+time*.22)%930-20,y=(i*89+time*.48)%610-30;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-8,y+15);ctx.stroke();}if(Math.sin(t*2.7)>.985){ctx.globalAlpha=.13;ctx.fillStyle='#effff7';ctx.fillRect(0,0,896,576);}ctx.lineWidth=1;}
      if(route===3){for(let i=0;i<20;i++){const x=(i*89+Math.sin(i)*30)%896,y=590-((i*71+time*.075)%620);ctx.globalAlpha=.25+.4*(i%3===0);r(x,y,3,3,i%2?'#f3a04b':'#d76a3f');}}
      if(route===4){for(let i=0;i<28;i++){const x=(i*83+Math.sin(t+i)*18)%896,y=(i*57+time*.035)%600-12;ctx.globalAlpha=.45;r(x,y,i%3+2,i%3+2,'#f4fff5');}}
      if(route===5)sparkle(20,'#eee0ff');
      if(route===6)leaf(17,'#e8ce86',.022);
      if(route===7){ctx.strokeStyle='#d5eee377';for(let i=0;i<15;i++){const x=(i*107)%896,y=580-((i*91+time*.045)%600),rad=2+i%4;ctx.beginPath();ctx.arc(x,y,rad,0,7);ctx.stroke();}}
      if(route===8){ctx.strokeStyle='#eff5e6aa';for(let i=0;i<16;i++){const x=(i*127+time*.12)%1000-80,y=45+(i%8)*66;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+35+(i%3)*17,y);ctx.stroke();}}
      if(route===9){sparkle(18,'#fff1aa');const sx=(time*.24)%1100-120,sy=80+(sx*.18)%220;ctx.strokeStyle='#fff0ae';ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+80,sy+28);ctx.stroke();}
      if(route===10){sparkle(14,'#f5e7a6');leaf(8,'#d7e7c3',.018);}
      ctx.globalAlpha=1;
    }
    ctx.restore();
  }
  function world(ctx,s,time){
   const area=s?.area||'glen',palette=D.areas[area].palette;ctx.clearRect(0,0,896,576);
   for(let y=0;y<18;y++)for(let x=0;x<28;x++){
     const t=C.tile(area,x,y),px=x*32,py=y*32,n=(x*73+y*37)%11;rect(ctx,px,py,32,32,palette[n%3===0?1:0]);
      if(['path','trail','boardwalk','ashpath','icepath','crystalpath','ruinpath','causeway','skybridge','starpath','aurorapath'].includes(t)){
        const road={path:'#c9bc87',trail:'#a98f63',boardwalk:'#8d7452',ashpath:'#765b50',icepath:'#a9c9c8',crystalpath:'#8d81a5',ruinpath:'#8b8c75',causeway:'#819b93',skybridge:'#bdc7bd',starpath:'#7c819a',aurorapath:'#9bac9f'}[t];rect(ctx,px,py,32,32,area==='summit'?'#c1ba96':road);
        if(t==='boardwalk'){for(let k=2;k<32;k+=7)rect(ctx,px,py+k,32,2,'#5f513f');rect(ctx,px+3,py,3,32,'#b29663');rect(ctx,px+26,py,3,32,'#b29663');}
        else if(t==='ashpath'){rect(ctx,px+n,py+6,11,2,'#a46e50');rect(ctx,px+17,py+22,12,2,'#493f3d');rect(ctx,px+7,py+9,2,8,'#cf8052');}
        else if(t==='icepath'){rect(ctx,px+3,py+5,25,3,'#d7e8df');rect(ctx,px+12,py+8,2,20,'#789fa2');rect(ctx,px+14,py+15,10,2,'#789fa2');}
        else if(t==='crystalpath'){rect(ctx,px+4,py+4,5,5,'#c0b4d2');rect(ctx,px+21,py+18,7,3,'#655b7c');rect(ctx,px+12,py+10,3,14,'#afa0c6');}
        else if(t==='ruinpath'){rect(ctx,px+2,py+3,13,11,'#a7a88b');rect(ctx,px+17,py+17,12,12,'#6f7569');rect(ctx,px+15,py,2,32,'#697166');}
        else if(t==='causeway'){rect(ctx,px,py+2,32,3,'#bbcec1');rect(ctx,px,py+27,32,3,'#506f6d');rect(ctx,px+5+n,py+13,8,2,'#abc1b7');}
        else if(t==='skybridge'){rect(ctx,px,py+2,32,2,'#edf1df');rect(ctx,px,py+28,32,2,'#748b87');rect(ctx,px+14,py+5,3,22,'#d8ddcf');}
        else if(t==='starpath'){rect(ctx,px,py+3,32,2,'#a7abc1');rect(ctx,px+(n*3)%25,py+14,3,3,'#eee0a2');rect(ctx,px+20,py+24,2,2,'#c9d2df');}
        else if(t==='aurorapath'){rect(ctx,px,py+3,32,3,'#c6d6bd');rect(ctx,px,py+26,32,3,'#638b7e');rect(ctx,px+7,py+8,2,17,'#d8c98d');}
        else{rect(ctx,px+n*2,py+7,3,2,'#8f7b59');rect(ctx,px+20,py+23,4,2,'#d1bb82');}
      }
      else if(t==='water'){rect(ctx,px,py,32,32,'#568f8c');rect(ctx,px,py,32,3,'#6fa69b');const w=(Math.floor(time/550)+n)%3;rect(ctx,px+3+w*3,py+10,12,2,'#91bbb0');rect(ctx,px+15-w*2,py+24,10,2,'#70a99f');}
      else if(t==='lava'){rect(ctx,px,py,32,32,'#4d3531');rect(ctx,px,py+5+(n%3)*9,32,5,'#c45f3b');rect(ctx,px+5,py+7+(n%3)*9,18,2,'#f3ae54');rect(ctx,px+24,py+17,5,4,'#e48946');}
      else if(t==='ice'){rect(ctx,px,py,32,32,'#729a9f');rect(ctx,px+2,py+2,28,28,'#a8c4c1');rect(ctx,px+4,py+5,18,3,'#dce9df');rect(ctx,px+15,py+8,2,20,'#718f95');rect(ctx,px+16,py+18,10,2,'#718f95');}
      else if(t==='cloud'){rect(ctx,px,py,32,32,'#526c70');ctx.fillStyle='#dae0d4aa';ctx.beginPath();ctx.arc(px+8,py+19,8,0,7);ctx.arc(px+17,py+14,11,0,7);ctx.arc(px+26,py+20,7,0,7);ctx.fill();}
      else if(t==='chasm'){rect(ctx,px,py,32,32,'#262b3b');rect(ctx,px+(n*3)%28,py+5,2,2,'#c8c7b0');rect(ctx,px+21,py+22,3,3,'#8089aa');}
      else if(t==='aurora'){rect(ctx,px,py,32,32,'#506861');rect(ctx,px+3,py,5,32,'#77aa8a66');rect(ctx,px+13,py,4,32,'#b4a4c766');rect(ctx,px+23,py,6,32,'#d5c77d55');}
     else if(t==='grass'){rect(ctx,px,py,32,32,area==='summit'?'#7d916d':'#608651');for(let i=0;i<4;i++){let gx=px+4+(i%2)*15,gy=py+5+Math.floor(i/2)*15;rect(ctx,gx,gy,2,8,'#a7b579');rect(ctx,gx-3,gy+2,2,4,'#99ae6c');rect(ctx,gx+3,gy+1,2,5,'#46744c');}}
     else if(t==='sand'){rect(ctx,px,py,32,32,'#d8c78e');rect(ctx,px+n*2,py+8,2,2,'#bbaa78');rect(ctx,px+24,py+21,3,2,'#eadba8');}
     else if(t==='floor'){rect(ctx,px,py,32,32,'#bca778');rect(ctx,px,py+29,32,3,'#a28c64');rect(ctx,px+(n%3)*8,py+8,10,2,'#cdbb8e');}
     else if(t==='rug'){rect(ctx,px,py,32,32,'#785b4d');rect(ctx,px+3,py,3,32,'#d2ad6e');rect(ctx,px+26,py,3,32,'#d2ad6e');rect(ctx,px+10,py+12,12,8,'#9d7c5d');}
     else if(t==='wall'){rect(ctx,px,py,32,32,'#5a6259');rect(ctx,px+2,py+2,28,27,'#8a8d78');rect(ctx,px+4,py+4,24,8,'#aaa78b');rect(ctx,px,py+28,32,4,'#3d4b44');}
     else if(t==='shelf'){rect(ctx,px,py,32,32,'#725a40');rect(ctx,px+3,py+4,26,5,'#4f4536');rect(ctx,px+3,py+17,26,4,'#4f4536');for(let i=0;i<5;i++)rect(ctx,px+5+i*5,py+9,3,8,['#788e70','#bc8a65','#d2ba73'][i%3]);}
     else if(t==='counter'){rect(ctx,px,py,32,32,'#8d704d');rect(ctx,px,py+2,32,7,'#d0b47c');rect(ctx,px+3,py+10,26,19,'#a5865e');rect(ctx,px+7,py+13,3,13,'#755d45');}
     else if(t==='void'){rect(ctx,px,py,32,32,'#172a25');}
     else if(t==='crystal'){rect(ctx,px,py,32,32,'#334d50');ctx.fillStyle='#83c6ba';ctx.beginPath();ctx.moveTo(px+16,py+2);ctx.lineTo(px+27,py+23);ctx.lineTo(px+18,py+30);ctx.lineTo(px+6,py+22);ctx.closePath();ctx.fill();rect(ctx,px+14,py+5,4,17,'#d2eee0');}
     else{rect(ctx,px+n*2,py+12,2,3,palette[2]);rect(ctx,px+24,py+25,3,2,palette[1]);if(n===3&&t==='ground'){rect(ctx,px+10,py+20,2,4,'#53784c');rect(ctx,px+8,py+18,5,3,area==='fen'?'#cac497':'#e4d699');}}
     if(t==='tree')tree(ctx,px,py,n%2);
     if(t==='rock'){rect(ctx,px+3,py+11,27,20,'#626f65');rect(ctx,px+6,py+5,20,23,'#929b87');rect(ctx,px+9,py+4,15,6,'#b1b8a0');rect(ctx,px+4,py+25,26,4,'#73816c');}
     if(t==='ruin'){rect(ctx,px+2,py+9,28,23,'#5e665e');rect(ctx,px+5,py+4,22,25,'#969685');rect(ctx,px+8,py+1,16,8,'#bbb59a');rect(ctx,px+11,py+11,10,18,'#626c63');}
   }
   const r=(x,y,w,h,c)=>rect(ctx,x,y,w,h,c);
   if(area==='glen'){
     function house(x,y,roof,sign){r(x+5,y+50,152,82,'#445b3f33');r(x+10,y+34,140,88,'#e1d4a4');r(x+10,y+108,140,12,'#a49166');r(x+3,y+22,154,39,'#755f47');r(x+9,y+10,142,38,roof);r(x+18,y,122,28,roof);for(let i=0;i<4;i++){r(x+15,y+17+i*10,132,2,'#684f4733');}r(x+115,y-9,15,27,'#9c9279');r(x+112,y-12,21,5,'#b4aa8c');r(x+24,y+70,26,26,'#826f4e');r(x+27,y+72,20,19,'#84ac9b');r(x+37,y+72,2,20,'#ddd2a2');r(x+105,y+70,26,26,'#826f4e');r(x+108,y+72,20,19,'#84ac9b');r(x+118,y+72,2,20,'#ddd2a2');r(x+62,y+77,29,45,'#665d46');r(x+66,y+81,21,41,'#8a7653');r(x+80,y+100,3,3,'#e6d79e');r(x+60,y+63,34,10,'#f0e5b8');ctx.fillStyle='#647a58';ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.fillText(sign,x+77,y+71);}
     house(5*32,4*32,'#af795c','REST');house(18*32,4*32,'#758e83','SHOP');
     r(11*32,3*32,5*32,4*32,'#d8c994');r(11*32-8,3*32+4,5*32+16,32,'#4d6f61');r(11*32+12,3*32-16,5*32-24,26,'#6f927b');r(13*32-4,6*32,40,32,'#604f3e');r(13*32+2,6*32+5,28,27,'#8a7251');r(12*32,4*32,3*32,18,'#f0e0aa');ctx.fillStyle='#365a4d';ctx.font='bold 9px monospace';ctx.fillText('PATHFINDERS',13.5*32,4*32+12);
     r(24*32,11*32,3*32,3*32,'#d7c58e');r(24*32-6,11*32-13,3*32+12,28,'#9f7152');r(24*32+7,11*32+20,21,20,'#80a994');r(25*32+4,11*32+51,30,45,'#68543e');for(let i=0;i<5;i++){r(23*32+i*23,14*32+(i%2)*7,3,14,'#6f9257');r(23*32+i*23-3,14*32+3+(i%2)*7,8,3,'#b8d080');}
     r(2*32+7,13*32+8,57,23,'#4b514b');r(2*32+13,13*32,45,18,'#8e907b');ctx.fillStyle='#1e3330';ctx.beginPath();ctx.ellipse(3*32,14*32,19,10,0,0,7);ctx.fill();ctx.strokeStyle='#c8b777';ctx.lineWidth=3;ctx.stroke();ctx.lineWidth=1;r(2*32+4,12*32+16,58,5,'#856d4e');
     for(let x=3;x<11;x++){r(x*32,8*32-6,30,4,'#bda779');r(x*32+4,8*32-14,5,23,'#d1bd8a');}
     r(15*32+8,10*32+5,6,30,'#76694b');r(15*32-3,10*32,34,17,'#dfcd98');ctx.fillStyle='#6b7654';ctx.font='8px monospace';ctx.fillText('FEN →',15*32+14,10*32+12);
   }
   if(area==='fen')for(let y=8;y<=9;y++){r(10*32,y*32,5*32,32,'#ae9970');for(let i=0;i<20;i++)r(10*32+i*8,y*32,2,32,'#928664');r(10*32,y*32+3,160,3,'#d4bd8c');}
   if(area==='summit'){
     r(21*32,4*32,160,25,'#727f73');r(21*32+10,4*32-10,140,13,'#b4b7a0');r(22*32,2*32,20,70,'#aeb59e');r(25*32-18,2*32,20,70,'#aeb59e');r(22*32-3,2*32-6,27,10,'#d0cdb1');r(25*32-21,2*32-6,27,10,'#d0cdb1');r(23*32-6,2*32+18,40,46,'#839588');r(23*32,2*32+10,28,40,'#c4cbb1');
     const lit=s?.completed;ctx.fillStyle=lit?'#f9dd8a':'#86c1b2';ctx.beginPath();ctx.moveTo(750,53);ctx.lineTo(762,82);ctx.lineTo(750,99);ctx.lineTo(738,82);ctx.closePath();ctx.fill();if(lit){ctx.fillStyle='#ffe8a330';ctx.beginPath();ctx.arc(750,78,44+Math.sin(time/700)*5,0,7);ctx.fill();}
   }
   if(area==='whisperwood'){
     r(12*32+5,6*32,22,64,'#44553f');r(12*32,6*32,32,9,'#a7a07c');r(12*32+3,7*32+20,26,5,'#756f57');
     for(let i=0;i<7;i++){const xx=80+i*119,yy=65+(i%3)*116;ctx.globalAlpha=.25+.2*Math.sin(time/700+i);r(xx,yy,4,4,'#e8e2a0');}ctx.globalAlpha=1;
   }
   if(area==='sunshore'){
     for(let x=3;x<13;x++){r(x*32,12*32+22,28,7,'#82684b');r(x*32+4,12*32+18,4,14,'#594d3b');}r(10*32,11*32+8,4,35,'#d9d1a1');r(10*32-9,11*32+8,23,4,'#d9d1a1');
   }
   if(area==='moonruins'){
     r(12*32,3*32,32,70,'#5c665f');r(15*32,3*32,32,70,'#5c665f');r(12*32,3*32,128,12,'#a6a594');r(13*32,4*32,64,55,'#747e73');r(13*32+7,4*32+8,50,47,'#3c514e');
   }
   if(area==='crystaldepths'){
     for(const [xx,yy] of [[4,8],[9,14],[18,3],[24,9]]){ctx.fillStyle='#82cabf55';ctx.beginPath();ctx.arc(xx*32,yy*32,22+Math.sin(time/500+xx)*4,0,7);ctx.fill();}
   }
   if(area==='oldwell'){
     ctx.fillStyle='#d7dda422';for(let i=0;i<16;i++){const xx=(i*79+43)%896,yy=(i*113+80)%576;ctx.beginPath();ctx.arc(xx,yy+Math.sin(time/600+i)*5,2+(i%3),0,7);ctx.fill();}
     for(const [xx,yy] of [[3,2],[9,13],[15,10],[24,8]]){r(xx*32,yy*32,5,72,'#283e37');r(xx*32-9,yy*32+54,24,6,'#58745e');r(xx*32-4,yy*32+30,16,5,'#405d4c');}
     r(18*32,2*32,9*32,9,'#8b8065');r(18*32,4*32-5,9*32,7,'#463f38');ctx.fillStyle='#d6b864';ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillText('SEALED HEART',22.5*32,2*32-7);
   }
   if(area==='rootvault'){
     r(18*32,5*32,7*32,8*32,'#273e37');r(18*32+8,5*32+8,7*32-16,8*32-16,'#40594c');for(let i=0;i<7;i++){ctx.strokeStyle=i%2?'#88775a':'#668261';ctx.beginPath();ctx.arc(21.5*32,9*32,28+i*12,Math.PI*.1,Math.PI*1.9);ctx.stroke();}
     ctx.fillStyle='#e3c87333';ctx.beginPath();ctx.arc(21.5*32,8.5*32,70+Math.sin(time/500)*8,0,7);ctx.fill();r(4*32,7*32,72,11,'#6f785f');r(5*32,5*32,10,93,'#4f6854');
   }
    if(D.areas[area].route){
      const route=D.areas[area].route;
      r(1*32+6,1*32+4,58,22,'#263e36cc');ctx.fillStyle='#ead482';ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.fillText(`ROUTE ${String(route).padStart(2,'0')}`,1*32+35,1*32+18);
      if(route===1){r(18*32,2*32+8,75,63,'#5f5139');r(18*32+8,2*32,58,23,'#8b7950');r(18*32+21,2*32+16,31,18,'#344c39');for(let i=0;i<7;i++)r(17*32+i*13,4*32+(i%2)*8,5,18,'#8f9f5e');}
      else if(route===2){for(let i=0;i<9;i++){const xx=(2+i*3)*32;r(xx,4*32+(i%2)*15,4,52,'#314f49');r(xx-6,4*32+9+(i%2)*15,7,3,'#9baa68');r(xx+3,4*32+19+(i%2)*15,8,3,'#9baa68');}ctx.globalAlpha=.25;rect(ctx,0,80+Math.sin(time/900)*8,896,45,'#dce7d7');ctx.globalAlpha=1;}
      else if(route===3){ctx.fillStyle='#4b3734';ctx.beginPath();ctx.moveTo(18*32,6*32);ctx.lineTo(21*32,1*32);ctx.lineTo(25*32,6*32);ctx.fill();ctx.fillStyle='#d26a3d';ctx.beginPath();ctx.moveTo(20*32,3*32);ctx.lineTo(21*32,1*32);ctx.lineTo(22*32,3*32);ctx.fill();r(20*32,3*32,64,5,'#f0a553');}
      else if(route===4){r(15*32,3*32,18,74,'#678c92');r(20*32,3*32,18,74,'#678c92');ctx.fillStyle='#bcd5d0';ctx.beginPath();ctx.arc(18*32+16,4*32,83,Math.PI,Math.PI*2);ctx.lineWidth=18;ctx.strokeStyle='#bcd5d0';ctx.stroke();ctx.lineWidth=1;}
      else if(route===5){for(const [xx,yy,h,c] of [[21,2,75,'#9b8db7'],[23,3,58,'#c1afd1'],[25,2,82,'#746a94']]){ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(xx*32,yy*32+h);ctx.lineTo(xx*32+16,yy*32);ctx.lineTo(xx*32+31,yy*32+h);ctx.fill();r(xx*32+14,yy*32+12,4,h-20,'#dfd2eb');}}
      else if(route===6){r(21*32,2*32,105,13,'#777965');r(21*32+10,2*32+13,18,100,'#99947a');r(21*32+76,2*32+13,18,100,'#99947a');r(21*32+6,2*32+105,92,10,'#666d5f');for(let i=0;i<6;i++){r(21*32+i*19,2*32+30+(i%2)*21,4,54,'#426345');r(21*32+i*19-4,2*32+43+(i%2)*21,12,4,'#7d9d61');}}
      else if(route===7){r(20*32,2*32,18,104,'#59736d');r(24*32,2*32,18,104,'#59736d');r(20*32-7,2*32-7,32,12,'#a8ada0');r(24*32-7,2*32-7,32,12,'#a8ada0');r(20*32,5*32,4*32+18,12,'#6e8880');for(let i=0;i<5;i++){ctx.globalAlpha=.25+.2*Math.sin(time/550+i);ctx.beginPath();ctx.arc(19*32+i*36,6*32-i*11,5+i,0,7);ctx.strokeStyle='#c4e1d7';ctx.stroke();}ctx.globalAlpha=1;}
      else if(route===8){ctx.fillStyle='#dbe3d6';ctx.beginPath();ctx.arc(5*32,3*32,45,0,7);ctx.arc(7*32,3*32,58,0,7);ctx.arc(9*32,3*32,40,0,7);ctx.fill();r(5*32,3*32,4*32,12,'#71867e');for(let i=0;i<5;i++)r(5*32+i*29,3*32+12,4,30+i%2*16,'#879b91');}
      else if(route===9){ctx.strokeStyle='#e3d79588';ctx.lineWidth=2;const stars=[[18,2],[21,3],[24,2],[22,5],[25,6]];ctx.beginPath();stars.forEach(([xx,yy],i)=>i?ctx.lineTo(xx*32,yy*32):ctx.moveTo(xx*32,yy*32));ctx.stroke();for(const [xx,yy] of stars){ctx.fillStyle='#f5e8a4';ctx.beginPath();ctx.arc(xx*32,yy*32,4+Math.sin(time/500+xx)*2,0,7);ctx.fill();}ctx.lineWidth=1;}
      else{ctx.globalAlpha=.28;for(let i=0;i<4;i++){ctx.strokeStyle=['#83d6a5','#b2a3df','#ead482','#87cad0'][i];ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(0,70+i*24);ctx.bezierCurveTo(250,10+i*35,540,150-i*20,896,45+i*30);ctx.stroke();}ctx.lineWidth=1;ctx.globalAlpha=1;r(22*32,2*32,62,14,'#65756b');r(22*32+9,2*32-38,44,45,'#a1b0a2');r(22*32+19,2*32-55,24,40,'#d7ce94');}
      for(let i=0;i<9;i++){
        const xx=(i*131+route*41)%850,yy=(i*73+route*29)%510,drift=Math.sin(time/500+i)*4;ctx.globalAlpha=.25+.25*Math.sin(time/600+i)**2;
        if(route===3)r(xx,yy+drift,3,3,'#f2b05f');else if(route===4)r(xx,yy+drift,4,2,'#eef8ed');else if(route===6)r(xx,yy+drift,3,5,'#b7cf86');else if(route>=8)r(xx,yy,3,3,'#f6e9a9');
      }
      ctx.globalAlpha=1;
    }
    if(D.areas[area].indoor){
      r(9*32,3*32+5,10*32,45,'#4c5e54');r(9*32+8,3*32+12,10*32-16,27,'#d9c895');ctx.fillStyle='#405b4e';ctx.font='bold 13px Georgia';ctx.textAlign='center';ctx.fillText(area==='market'?'TRAIL MARKET':area==='resthouse'?'REST & SANCTUARY':area==='lodge'?'PATHFINDER LODGE':area==='farmhouse'?'MOONLEAF FARM':'BEACON ARCHIVE',14*32,3*32+31);
      r(5*32,12*32,64,38,'#6d5843');r(5*32+5,12*32+5,54,25,'#c4aa78');r(21*32,12*32,42,38,'#6d5843');r(21*32+5,12*32+5,32,25,'#8da08a');
      for(const lx of [6,14,22]){r(lx*32+14,2*32,4,24,'#594c38');ctx.fillStyle='#f3d68255';ctx.beginPath();ctx.arc(lx*32+16,2*32+30,16+Math.sin(time/500+lx)*2,0,7);ctx.fill();r(lx*32+8,2*32+22,16,13,'#d9b95f');r(lx*32+11,2*32+25,10,7,'#fff0a0');}
      if(area==='market'){
        for(const [xx,c] of [[6,'#6f9680'],[7,'#ba7658'],[8,'#d7b85c'],[20,'#8d7195'],[21,'#6f9680'],[22,'#c98d59']]){r(xx*32+8,5*32+10,16,18,c);r(xx*32+11,5*32+6,10,5,'#ead8a2');r(xx*32+10,5*32+15,12,3,'#fff2c055');}
        r(11*32,9*32+6,6*32,12,'#674e39');r(11*32+8,9*32+1,6*32-16,8,'#d6b66d');for(let i=0;i<5;i++){r(11*32+17+i*31,9*32-9,17,11,['#658f7a','#c17c5e','#d4ae57'][i%3]);}
        r(3*32+5,13*32+4,58,45,'#76563e');r(3*32+11,13*32-3,46,11,'#b98f59');r(23*32,13*32+7,48,39,'#6b513e');r(23*32+5,13*32,38,11,'#d0ad68');
        ctx.fillStyle='#e8d17d';ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillText('FRESH STOCK',14*32,10*32-8);
      }else if(area==='resthouse'){
        for(const bx of [4,20]){r(bx*32,5*32+3,3*32,58,'#705940');r(bx*32+7,5*32+10,3*32-14,41,'#e6dcc1');r(bx*32+12,5*32+14,3*32-24,12,'#b8c9ac');r(bx*32+8,5*32+45,3*32-16,7,'#94705a');}
        r(12*32,10*32+5,4*32,18,'#6e5440');r(12*32+9,10*32+9,4*32-18,10,'#cfaa63');
        r(23*32,9*32,48,72,'#5f5141');r(23*32+6,9*32+7,36,54,'#292f2b');ctx.fillStyle='#ed9e4b';ctx.beginPath();ctx.moveTo(23*32+12,9*32+55);ctx.lineTo(23*32+24,9*32+20+Math.sin(time/250)*4);ctx.lineTo(23*32+36,9*32+55);ctx.fill();r(23*32+8,9*32+58,32,5,'#bb7445');
      }else if(area==='beaconhall'){
        for(const cx of [6,21]){ctx.fillStyle='#7ed0bf55';ctx.beginPath();ctx.arc(cx*32+16,7*32,32+Math.sin(time/450+cx)*4,0,7);ctx.fill();ctx.fillStyle='#7fc8b8';ctx.beginPath();ctx.moveTo(cx*32+16,5*32);ctx.lineTo(cx*32+29,7*32);ctx.lineTo(cx*32+16,8*32);ctx.lineTo(cx*32+3,7*32);ctx.closePath();ctx.fill();r(cx*32+14,5*32+10,4,56,'#e2f2d0');}
        r(11*32,10*32+4,6*32,13,'#59695e');for(let i=0;i<5;i++)r(11*32+15+i*34,10*32-11,18,15,i%2?'#829985':'#baa968');
      }else if(area==='lodge'){
        r(4*32,5*32,4*32,6*32,'#405149');for(let y=0;y<4;y++)for(let x=0;x<3;x++){r(4*32+14+x*36,5*32+15+y*36,26,20,'#d4c58f');r(4*32+17+x*36,5*32+18+y*36,20,14,['#668b68','#8e745b','#6c7489'][x%3]);}r(20*32,5*32,4*32,5*32,'#6b513c');r(20*32+9,5*32+10,4*32-18,5*32-20,'#d8ca9d');
      }else{
        for(let i=0;i<8;i++){r((4+i*3)*32,6*32+(i%2)*35,22,12,'#6f8f59');r((4+i*3)*32+4,6*32-6+(i%2)*35,14,8,'#b8ce76');}r(19*32,11*32,4*32,34,'#735943');r(19*32+7,11*32+6,4*32-14,20,'#d1b27a');
      }
    }
    ambient(ctx,area,time,false);
    D.areas[area].npcs.forEach(n=>{if(n.role==='boss')return;if(n.role==='cache'){const opened=s?.claimed.includes(n.id),x=n.x*32,y=n.y*32;r(x+3,y+13,27,17,opened?'#59665d':'#6d5038');r(x+5,y+8,23,9,opened?'#778178':'#a87a47');r(x+13,y+14,7,7,opened?'#8c978b':'#e0be62');r(x+2,y+28,29,3,'#263f3744');if(!opened){ctx.fillStyle='#fff0a8';ctx.font='bold 15px monospace';ctx.textAlign='center';ctx.fillText('✦',x+17,y+3+Math.sin(time/280)*2);}return;}person(ctx,n.x*32,n.y*32,n.role==='healer'?'#e2dec1':n.role==='warden'?'#a69ac0':n.role==='shop'?'#d6a35f':n.role==='guild'?'#789f86':n.role==='questgiver'?'#d1ad62':n.role==='regionalboss'?'#5f8b6c':n.role==='miniboss'?'#765f82':'#c59769','down',Math.floor(time/520)+n.x);const defeated=s?.claimed.includes('defeated-'+n.id),mark=n.role==='warden'&&!s?.badges.includes(n.badge)?'!':n.role==='questgiver'?'!':(n.role==='miniboss'||n.role==='regionalboss')&&!defeated?'⚔':n.role==='shop'?'◆':n.role==='guild'?'▣':n.role==='healer'&&D.areas[area].indoor?'✚':'';if(mark){ctx.fillStyle=n.role==='warden'||n.role==='questgiver'?'#f5e8b3':'#fff0ad';ctx.font='bold 14px monospace';ctx.textAlign='center';ctx.fillText(mark,n.x*32+17,n.y*32-6+Math.sin(time/310+n.x)*2);}});
    const player=s||{x:13,y:10,facing:'down',steps:0};person(ctx,player.x*32,player.y*32,'#d6b777',player.facing,player.steps);
    ambient(ctx,area,time,true);
    D.areas[area].exits.forEach(e=>{ctx.fillStyle='#f5e5a4';ctx.font='bold 22px monospace';ctx.textAlign='center';const arrow=e.x===0?'‹':e.x===27?'›':e.y===0?'↑':'↓';ctx.fillText(arrow,e.x*32+16,e.y*32+23);});
 }
 root.EWArt={creature,world,player:person};
})(window);
