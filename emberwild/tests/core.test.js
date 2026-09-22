'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../core.js'),D=require('../data.js');
const mid=()=>.5;
function finish(s,b){for(let i=0;i<250&&!b.ended;i++){const m=s.team[s.active];C.battleAction(s,b,m.hp<C.stats(m).maxHp*.4&&s.potions?'potion':b.energy?'skill':'strike',undefined,mid);}assert.ok(b.ended,'Battle must terminate');return b.outcome;}
test('every region, exit, healer and story character is reachable',()=>{
 for(const [area,data] of Object.entries(D.areas)){
  const start=[data.exits[0].x,data.exits[0].y],seen=new Set([start.join(',')]),queue=[start];
  while(queue.length){const [x,y]=queue.shift();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const p=[x+dx,y+dy],key=p.join(',');if(!seen.has(key)&&C.passable(area,...p)){seen.add(key);queue.push(p);}}}
  for(const n of data.npcs)assert.ok([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>seen.has([n.x+dx,n.y+dy].join(','))),`${area}: ${n.id} must be reachable`);
  for(const e of data.exits){assert.ok(seen.has([e.x,e.y].join(',')));assert.ok(C.passable(e.to,e.tx,e.ty));}
 }
});
test('catching consumes a bindstone and adds a unique journal entry',()=>{
 const s=C.initial('spriglet'),b=C.beginBattle(s,'wild',null,()=>.1);b.enemies[0].hp=1;
 C.battleAction(s,b,'catch',undefined,()=>0);assert.equal(s.orbs,7);assert.equal(s.team.length,2);assert.equal(b.outcome,'caught');assert.equal(new Set(s.caught).size,s.caught.length);
});
test('capture restrictions do not spend resources or a turn',()=>{
 const s=C.initial('cindercub'),b=C.beginBattle(s,'warden',D.areas.fen.npcs[1]);C.battleAction(s,b,'catch');assert.equal(s.orbs,8);assert.equal(b.turn,0);
 const w=C.beginBattle(s,'wild');s.orbs=0;C.battleAction(s,w,'catch');assert.equal(w.turn,0);
 s.orbs=5;s.team=Array.from({length:12},()=>C.creature('spriglet'));C.battleAction(s,w,'catch');assert.equal(s.orbs,5);assert.equal(w.turn,0);
});
test('skill advantage and resistance change damage',()=>{
 const a=C.creature('spriglet',5),b=C.creature('ripplefin',5),c=C.creature('cindercub',5);
 assert.ok(C.damage(a,b,true,mid)>C.damage(a,c,true,mid));
});
test('evolution at level 8 updates stats and journal',()=>{
 for(const id of D.starters){const s=C.initial(id),m=s.team[0];C.addXP(s,m,5000);assert.equal(m.species,D.species[id].evolve);assert.ok(s.caught.includes(m.species));assert.ok(m.hp<=C.stats(m).maxHp);}
});
test('all starters can finish the complete story after reasonable training',()=>{
 for(const id of D.starters){
  const s=C.initial(id);s.potions=200;
  for(let i=0;i<12;i++){C.heal(s);const b=C.beginBattle(s,'wild',null,()=>.1);assert.equal(finish(s,b),'won');}
  assert.ok(s.team[0].level>=8);C.heal(s);
  const b1=C.beginBattle(s,'warden',D.areas.fen.npcs.find(n=>n.id==='warden1'));assert.equal(finish(s,b1),'won',id+' must beat Sable');assert.ok(s.badges.includes('reed'));
  for(const companion of ['coralisk','stormjay','pebblit']){s.team.push(C.creature(companion,8));s.caught.push(companion);}
  const route=['verdantpass','stormmarsh','emberbasin','frosthollow','shardmaze','ancientgarden','sunkensanctum','cloudstep','starbridge','aurorapeak','summit'];
  for(const area of route){s.area=area;for(let i=0;i<3;i++){C.heal(s);assert.equal(finish(s,C.beginBattle(s,'wild',null,()=>.45)),'won',id+' must train in '+area);}
   const guardian=D.areas[area].npcs.find(n=>n.role==='warden');if(guardian){C.heal(s);assert.equal(finish(s,C.beginBattle(s,'warden',guardian)),'won',id+' must beat '+guardian.name);assert.ok(s.badges.includes(guardian.badge));}}
  assert.deepEqual(new Set(s.badges),new Set(['reed','tide','ember','sky','stone']));
  const boss=C.beginBattle(s,'boss');assert.equal(finish(s,boss),'won',id+' must finish');assert.equal(s.completed,true);assert.ok(s.caught.includes('solwyrm'));assert.doesNotThrow(()=>C.validate(s));
 }
});
test('defeat heals the team, returns home and never makes coins negative',()=>{
 const s=C.initial('spriglet');s.team[0].hp=1;s.coins=5;const b=C.beginBattle(s,'boss');C.battleAction(s,b,'strike',undefined,mid);assert.equal(b.outcome,'lost');assert.equal(s.area,'glen');assert.equal(s.coins,0);assert.equal(s.team[0].hp,C.stats(s.team[0]).maxHp);
});
test('guard reduces a hit; switching can trigger automatic replacement',()=>{
 const s=C.initial('spriglet');s.team.push(C.creature('ripplefin'));const b=C.beginBattle(s,'wild',null,mid);const before=s.team[0].hp;C.battleAction(s,b,'guard',undefined,mid);assert.ok(before-s.team[0].hp<C.damage(b.enemies[0],s.team[0],false,mid));
 s.team[1].hp=1;C.battleAction(s,b,'switch',1,mid);assert.equal(s.team[1].hp,0);assert.equal(s.active,0);
});
test('save validation rejects malformed, oversized, and unsafe data',()=>{
 const valid=C.initial('spriglet');assert.deepEqual(C.validate(JSON.parse(JSON.stringify(valid))),valid);
 for(const patch of [{version:2},{area:'other'},{team:[]},{x:-1},{x:0,y:0},{orbs:NaN},{badges:['fake']},{active:9},{caught:['<script>']},{completed:'yes'},{claimed:null},{team:[{species:'bad',level:2,xp:0,hp:2}]}])assert.throws(()=>C.validate({...valid,...patch}));
});
test('invalid actions, empty focus and full health tonics do not advance turns',()=>{
 const s=C.initial('spriglet'),b=C.beginBattle(s);C.battleAction(s,b,'potion');assert.equal(s.potions,5);b.energy=0;C.battleAction(s,b,'skill');assert.equal(b.turn,0);C.battleAction(s,b,'not-an-action');assert.equal(b.turn,0);
});
