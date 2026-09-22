(function(root){
 'use strict';
 const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let client=null,source=null,players=[],messages=[],onChange=()=>{},timer=null;
 const storeKey='emberwild-online-v1';
 function endpoint(path){return './api/rooms/'+path;}
 async function request(path,body){const r=await fetch(endpoint(path),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});const data=await r.json().catch(()=>({}));if(!r.ok)throw Error(data.error||'The online service could not be reached.');return data;}
 function persist(){if(client)localStorage.setItem(storeKey,JSON.stringify({room:client.room,name:client.name,id:client.id,token:client.token}));else localStorage.removeItem(storeKey);}
 function connectStream(){
  if(source)source.close();if(!client)return;
  source=new EventSource(endpoint(`stream?room=${encodeURIComponent(client.room)}&id=${encodeURIComponent(client.id)}&token=${encodeURIComponent(client.token)}`));
  source.addEventListener('room',e=>{const d=JSON.parse(e.data);players=d.players||[];messages=d.messages||[];client.raid=d.raid;client.connected=true;onChange();});
  source.addEventListener('error',()=>{if(client){client.connected=false;onChange();}});
 }
 async function join(room,name,state){
  room=String(room||'').trim().toUpperCase();name=String(name||'').trim();
  const d=await request('join',{room,name,area:state?.area,x:state?.x,y:state?.y,species:state?.team?.[state.active]?.species});
  client={...d.player,room:d.room,token:d.token,connected:true,raid:d.raid};players=d.players;messages=d.messages;persist();connectStream();onChange();return d.room;
 }
 async function resume(state){try{const old=JSON.parse(localStorage.getItem(storeKey));if(!old?.room||!old?.token)return false;const d=await request('resume',{...old,area:state?.area,x:state?.x,y:state?.y,species:state?.team?.[state.active]?.species});client={...d.player,room:d.room,token:old.token,connected:true,raid:d.raid};players=d.players;messages=d.messages;connectStream();onChange();return true;}catch{leave(false);return false;}}
 function update(state){if(!client||!state)return;clearTimeout(timer);timer=setTimeout(async()=>{try{await request('move',{room:client.room,id:client.id,token:client.token,area:state.area,x:state.x,y:state.y,facing:state.facing,species:state.team[state.active]?.species});}catch{}},75);}
 async function chat(text){if(!client)return;await request('chat',{room:client.room,id:client.id,token:client.token,text});}
 async function raid(){if(!client)return;return request('raid',{room:client.room,id:client.id,token:client.token});}
 function leave(call=true){if(source)source.close();source=null;const old=client;client=null;players=[];messages=[];persist();onChange();if(call&&old)request('leave',{room:old.room,id:old.id,token:old.token}).catch(()=>{});}
 function draw(ctx){if(!client||!root.EWArt)return;for(const p of players){if(p.id===client.id||p.area!==client.area)continue;root.EWArt.player(ctx,p.x*32,p.y*32,p.color,p.facing||'down',0);ctx.fillStyle='#173f36cc';ctx.fillRect(p.x*32-7,p.y*32-13,48,11);ctx.fillStyle='#fff6da';ctx.font='bold 8px system-ui';ctx.textAlign='center';ctx.fillText(p.name.slice(0,12),p.x*32+17,p.y*32-5);}}
 function setLocal(state){if(client){client.area=state.area;client.x=state.x;client.y=state.y;}}
 function status(){return {client,players,messages};}
 function subscribe(fn){onChange=fn;}
 root.EWOnline={join,resume,update,chat,raid,leave,draw,setLocal,status,subscribe,esc};
})(window);
