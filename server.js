/* Emberwild web + multiplayer server. Uses only Node.js built-ins. */
'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{areas}=require('./data.js');
const root=__dirname,port=Number(process.env.PORT)||8080,host=process.env.HOST||'0.0.0.0';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.md':'text/plain; charset=utf-8','.png':'image/png'};
const rooms=new Map(),colors=['#d5a75f','#75a9a0','#9c85b5','#c17b68','#789f65','#6d8fb2'];
const clean=(v,max=20)=>String(v??'').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,max);
function code(){const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';return Array.from({length:5},()=>chars[crypto.randomInt(chars.length)]).join('');}
function room(id,create=false){let r=rooms.get(id);if(!r&&create){r={id,players:new Map(),clients:new Map(),messages:[],raid:{hp:240,maxHp:240,won:false},updated:Date.now()};rooms.set(id,r);}return r;}
function player(r,id,token){const p=r?.players.get(id),a=Buffer.from(p?.token||''),b=Buffer.from(String(token||''));return p&&a.length===b.length&&crypto.timingSafeEqual(a,b)?p:null;}
function publicPlayer(p){return {id:p.id,name:p.name,color:p.color,area:p.area,x:p.x,y:p.y,facing:p.facing,species:p.species,lastSeen:p.lastSeen};}
function snapshot(r){return {room:r.id,players:[...r.players.values()].map(publicPlayer),messages:r.messages,raid:r.raid};}
function sendSSE(res,event,data){res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);}
function broadcast(r){const data=snapshot(r);for(const res of r.clients.values())sendSSE(res,'room',data);}
function readBody(req){return new Promise((resolve,reject)=>{let raw='';req.on('data',c=>{raw+=c;if(raw.length>16384){reject(Error('Request too large'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(raw||'{}'));}catch{reject(Error('Invalid JSON'));}});req.on('error',reject);});}
function json(res,status,data){res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'});res.end(JSON.stringify(data));}
function validPosition(b){return Object.hasOwn(areas,b.area)&&Number.isInteger(b.x)&&b.x>=0&&b.x<=27&&Number.isInteger(b.y)&&b.y>=0&&b.y<=17;}
async function api(req,res,url){
 const action=url.pathname.slice('/api/rooms/'.length);
 if(req.method==='GET'&&action==='stream'){
  const id=clean(url.searchParams.get('id'),40),roomId=clean(url.searchParams.get('room'),8).toUpperCase(),r=room(roomId),p=player(r,id,url.searchParams.get('token'));
  if(!p)return json(res,401,{error:'Room session expired.'});
  res.writeHead(200,{'content-type':'text/event-stream','cache-control':'no-cache, no-transform','connection':'keep-alive','x-accel-buffering':'no'});res.write(': connected\n\n');r.clients.set(id,res);p.lastSeen=Date.now();sendSSE(res,'room',snapshot(r));
  const keep=setInterval(()=>{p.lastSeen=Date.now();res.write(': keepalive\n\n');},20000);req.on('close',()=>{clearInterval(keep);r.clients.delete(id);});return;
 }
 if(req.method!=='POST')return json(res,405,{error:'Method not allowed.'});
 let b;try{b=await readBody(req);}catch(e){return json(res,400,{error:e.message});}
 if(action==='join'){
  let roomId=clean(b.room,8).toUpperCase();if(roomId&&!/^[A-Z2-9]{3,8}$/.test(roomId))return json(res,400,{error:'Room codes use 3–8 letters or numbers.'});if(!roomId){do{roomId=code();}while(rooms.has(roomId));}
  const r=room(roomId,true);if(r.players.size>=20)return json(res,409,{error:'That room is full.'});const name=clean(b.name,16);if(name.length<2)return json(res,400,{error:'Choose a name with at least 2 characters.'});
  const id=crypto.randomUUID(),token=crypto.randomBytes(24).toString('hex'),p={id,token,name,color:colors[r.players.size%colors.length],area:validPosition(b)?b.area:'glen',x:validPosition(b)?b.x:13,y:validPosition(b)?b.y:10,facing:'down',species:clean(b.species,20)||'spriglet',lastSeen:Date.now(),lastAction:0};r.players.set(id,p);r.messages.push({id:crypto.randomUUID(),system:true,text:`${name} entered the Vale.`,at:Date.now()});r.messages=r.messages.slice(-30);r.updated=Date.now();broadcast(r);return json(res,200,{...snapshot(r),token,player:publicPlayer(p)});
 }
 const roomId=clean(b.room,8).toUpperCase(),r=room(roomId),p=player(r,clean(b.id,40),b.token);if(!p)return json(res,401,{error:'Room session expired. Join again.'});p.lastSeen=Date.now();r.updated=Date.now();
 if(action==='resume'){if(validPosition(b)){p.area=b.area;p.x=b.x;p.y=b.y;}if(clean(b.name,16))p.name=clean(b.name,16);broadcast(r);return json(res,200,{...snapshot(r),player:publicPlayer(p)});}
 if(action==='move'){if(!validPosition(b))return json(res,400,{error:'Invalid position.'});if(Date.now()-p.lastAction<35)return json(res,429,{error:'Slow down.'});p.lastAction=Date.now();p.area=b.area;p.x=b.x;p.y=b.y;p.facing=['up','down','left','right'].includes(b.facing)?b.facing:'down';p.species=clean(b.species,20)||p.species;broadcast(r);return json(res,200,{ok:true});}
 if(action==='chat'){const text=clean(b.text,140);if(!text)return json(res,400,{error:'Write a message first.'});if(Date.now()-p.lastAction<500)return json(res,429,{error:'Please wait before sending again.'});p.lastAction=Date.now();r.messages.push({id:crypto.randomUUID(),playerId:p.id,name:p.name,text,at:Date.now()});r.messages=r.messages.slice(-30);broadcast(r);return json(res,200,{ok:true});}
 if(action==='raid'){if(Date.now()-p.lastAction<900)return json(res,429,{error:'Your companion needs a moment.'});p.lastAction=Date.now();if(r.raid.won)return json(res,200,{...r.raid,damage:0});const active=[...r.players.values()].filter(v=>r.clients.has(v.id)||Date.now()-v.lastSeen<45000).length;if(active<2)return json(res,400,{error:'The beacon raid needs at least two connected players.'});const damage=12+crypto.randomInt(9);r.raid.hp=Math.max(0,r.raid.hp-damage);if(!r.raid.hp)r.raid.won=true;r.messages.push({id:crypto.randomUUID(),system:true,text:`${p.name}'s companion struck the Rift Wyrm for ${damage}!`,at:Date.now()});if(r.raid.won)r.messages.push({id:crypto.randomUUID(),system:true,text:'The room defeated the Rift Wyrm together!',at:Date.now()});r.messages=r.messages.slice(-30);broadcast(r);return json(res,200,{...r.raid,damage});}
 if(action==='leave'){r.players.delete(p.id);r.clients.get(p.id)?.end();r.clients.delete(p.id);r.messages.push({id:crypto.randomUUID(),system:true,text:`${p.name} left the room.`,at:Date.now()});broadcast(r);return json(res,200,{ok:true});}
 return json(res,404,{error:'Unknown room action.'});
}
const server=http.createServer(async(req,res)=>{
 try{const url=new URL(req.url,'http://localhost');if(url.pathname==='/health')return json(res,200,{ok:true,rooms:rooms.size});if(url.pathname.startsWith('/api/rooms/'))return api(req,res,url);
  const pathname=decodeURIComponent(url.pathname),file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep))return json(res,403,{error:'Forbidden'});
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream','cache-control':process.env.NODE_ENV==='production'?'public, max-age=300':'no-store'});res.end(data);});
 }catch{json(res,400,{error:'Bad request'});}
});
setInterval(()=>{const now=Date.now();for(const [id,r] of rooms){for(const [pid,p] of r.players)if(now-p.lastSeen>120000&&!r.clients.has(pid))r.players.delete(pid);if(!r.players.size&&now-r.updated>300000)rooms.delete(id);}},60000).unref();
server.listen(port,host,()=>console.log(`Emberwild multiplayer is ready: http://${host}:${port}`));
module.exports={server,rooms};
