(function(root){
  'use strict';
  const D=typeof module!=='undefined'&&module.exports?require('./data.js'):root.EWData;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function stats(m){const s=D.species[m.species];return {maxHp:s.hp+m.level*5,attack:s.attack+m.level*2,defense:s.defense+m.level};}
  function creature(species,level=3){const m={species,level,xp:0,hp:0};m.hp=stats(m).maxHp;return m;}
  function initial(starter){return {version:1,area:'glen',x:13,y:10,facing:'down',team:[creature(starter)],active:0,orbs:8,potions:5,coins:60,badges:[],caught:[starter],steps:0,wins:0,completed:false,claimed:[],created:Date.now()};}
  function tile(area,x,y){
    if(x<0||x>27||y<0||y>17)return 'wall';
    const a=D.areas[area];
    if(a.exits.some(e=>e.x===x&&e.y===y))return 'path';
    if(a.indoor){
      if(x<2||x>25||y<2||y>16)return 'void';
      if(x===2||x===25||y===2||y===16)return 'wall';
      if((y===5&&x>=5&&x<=9)||(y===5&&x>=19&&x<=22))return 'shelf';
      if(y===10&&x>=8&&x<=20&&x!==14)return 'counter';
      if((x===13||x===14||x===15)&&y>=11)return 'rug';
      return 'floor';
    }
    if(x===0||y===0||x===27||y===17){
      if(a.route&&[3,4,5,8,9,10].includes(a.route))return 'rock';
      if(a.route===7&&y===17)return 'water';
      if(area==='crystaldepths'||area==='moonruins'||area==='summit')return 'rock';
      if(area==='sunshore'&&y===17)return 'water';
      return 'tree';
    }
    if(area==='glen'){
      if((x>=5&&x<=9&&y>=4&&y<=7)||(x>=18&&x<=22&&y>=4&&y<=7))return 'house';
      if(x>=19&&x<=23&&y>=12&&y<=14)return 'water';
      if(y===8||y===9||(x>=12&&x<=14))return 'path';
      if((x<4&&y<7)||(x>23&&y<6)||(x<8&&y>13))return 'tree';
      if((x>=3&&x<=10&&y>=10&&y<=13)||(x>=17&&x<=24&&y>=10&&y<=11))return 'grass';
    }else if(area==='fen'){
      if(y===8||y===9||x===21)return 'path';
      if((x>=10&&x<=14&&y>=2&&y<=6)||(x>=10&&x<=14&&y>=11&&y<=15))return 'water';
      if((x>=6&&x<=9&&y>=3&&y<=6)||(x>=16&&x<=24&&y>=10&&y<=14))return 'grass';
      if((x<4||x>24)&&y<6||y>14&&x<9)return 'tree';
    }else if(area==='summit'){
      if(y===8||y===9||(x===23&&y>=5&&y<=10))return 'path';
      if(x>=21&&x<=25&&y>=2&&y<=4)return 'ruin';
      if((x>=6&&x<=12&&y>=3&&y<=6)||(x>=17&&x<=25&&y>=11&&y<=14))return 'grass';
      if((x<5&&y<6)||(x>=13&&x<=18&&y>=2&&y<=5)||(y>14))return 'rock';
    }else if(area==='whisperwood'){
      if(y===8||x===13||(x>=4&&x<=13&&y===12)||(x>=13&&x<=23&&y===4))return 'path';
      if((x>=3&&x<=8&&y>=3&&y<=6)||(x>=18&&x<=24&&y>=11&&y<=15)||(x>=4&&x<=9&&y>=14))return 'tree';
      if((x>=3&&x<=11&&y>=9&&y<=11)||(x>=16&&x<=24&&y>=5&&y<=7))return 'grass';
    }else if(area==='sunshore'){
      if(y===8||y===9||(x===7&&y>=8&&y<=14))return 'path';
      if(y>=13||((x>=15&&x<=23)&&y>=10))return 'water';
      if(y>=10)return 'sand';
      if((x>=3&&x<=8&&y>=3&&y<=6)||(x>=17&&x<=24&&y>=3&&y<=5))return 'grass';
    }else if(area==='moonruins'){
      if(y===8||y===9||x===14||(x>=4&&x<=14&&y===4)||(x>=14&&x<=23&&y===13))return 'path';
      if((x>=4&&x<=8&&y>=2&&y<=3)||(x>=19&&x<=23&&y>=4&&y<=6)||(x>=5&&x<=10&&y>=12&&y<=15))return 'ruin';
      if((x>=3&&x<=11&&y>=5&&y<=7)||(x>=17&&x<=25&&y>=10&&y<=12))return 'grass';
      if((x===11||x===17)&&y>=2&&y<=6)return 'rock';
    }else if(area==='crystaldepths'){
      if(x===14||y===9||(x>=5&&x<=14&&y===13)||(x>=14&&x<=23&&y===5))return 'path';
      if((x>=3&&x<=8&&y>=3&&y<=7)||(x>=20&&x<=25&&y>=11&&y<=15))return 'water';
      if((x>=4&&x<=11&&y>=10&&y<=12)||(x>=17&&x<=24&&y>=6&&y<=8))return 'grass';
      if((x>=9&&x<=12&&y>=3&&y<=6)||(x>=17&&x<=20&&y>=12&&y<=15))return 'crystal';
    }else if(a.route){
      const r=a.route;
      if(y===8||y===9||(x===7&&y>=4&&y<=9)||(x===14&&y>=8&&y<=14)||(x===22&&y>=3&&y<=9))return 'path';
      if([2,4,7,8].includes(r)&&((x>=3&&x<=7&&y>=11&&y<=15)||(x>=15&&x<=21&&y>=2&&y<=6)))return 'water';
      if([3,4,9,10].includes(r)&&((x>=3&&x<=9&&y>=2&&y<=6)||(x>=18&&x<=24&&y>=11&&y<=15)))return 'rock';
      if([5,9].includes(r)&&((x>=10&&x<=13&&y>=2&&y<=6)||(x>=15&&x<=18&&y>=11&&y<=15)))return 'crystal';
      if(r===6&&((x>=3&&x<=8&&y>=3&&y<=6)||(x>=18&&x<=24&&y>=11&&y<=14)))return 'ruin';
      if([1,6].includes(r)&&((x>=3&&x<=9&&y>=11&&y<=15)||(x>=17&&x<=24&&y>=2&&y<=6)))return 'tree';
      if((x>=3&&x<=12&&y>=10&&y<=13)||(x>=16&&x<=24&&y>=4&&y<=7))return 'grass';
    }
    return 'ground';
  }
  const passable=(area,x,y)=>['path','ground','grass','sand','floor','rug'].includes(tile(area,x,y))&&!D.areas[area].npcs.some(n=>n.x===x&&n.y===y);
  function heal(s){s.team.forEach(m=>m.hp=stats(m).maxHp);if(!s.team[s.active]||s.team[s.active].hp===0)s.active=0;}
  function addXP(s,m,amount){
    m.xp+=amount;let text='';
    while(m.level<30&&m.xp>=m.level*14){m.xp-=m.level*14;m.level++;m.hp=clamp(m.hp+9,1,stats(m).maxHp);text+=` ${D.species[m.species].name} reached level ${m.level}!`;}
    const evolved=D.species[m.species].evolve;
    if(evolved&&m.level>=8){m.species=evolved;m.hp=stats(m).maxHp;if(!s.caught.includes(evolved))s.caught.push(evolved);text+=` Your companion evolved into ${D.species[evolved].name}!`;}
    return text;
  }
  function damage(attacker,defender,skill=false,rng=Math.random){
    const a=D.species[attacker.species],b=D.species[defender.species];
    const mult=skill?(D.advantages[a.type]===b.type?1.6:D.advantages[b.type]===a.type?.7:1):1;
    return Math.max(2,Math.round((stats(attacker).attack*(skill?1.5:1)-stats(defender).defense*.45)*mult*(.9+rng()*.2)));
  }
  function beginBattle(s,kind='wild',npc=null,rng=Math.random){
    const a=D.areas[s.area];let enemies;
    if(kind==='wild')enemies=[creature(a.wild[Math.floor(rng()*a.wild.length)],a.levels[0]+Math.floor(rng()*(a.levels[1]-a.levels[0]+1)))];
    else if(kind==='boss')enemies=[creature('duskowl',21),creature('solwyrm',23)];
    else enemies=npc.team.map(([id,lv])=>creature(id,lv));
    if(!s.team[s.active]?.hp)s.active=Math.max(0,s.team.findIndex(m=>m.hp>0));
    return {kind,npc:npc?.id,badge:npc?.badge,enemies,index:0,energy:3,guard:false,turn:0,ended:false,outcome:null,log:kind==='wild'?`A wild ${D.species[enemies[0].species].name} appeared!`:kind==='boss'?'The beacon tests the strength of your bond.':`${npc.name} challenges you!`};
  }
  function battleAction(s,b,action,target,rng=Math.random){
    if(b.ended)return b.log;let m=s.team[s.active],enemy=b.enemies[b.index],log='';
    if(action==='strike'||action==='skill'){
      if(action==='skill'&&b.energy<1)return b.log='No focus left. Use Strike to restore it.';
      const d=damage(m,enemy,action==='skill',rng);enemy.hp=Math.max(0,enemy.hp-d);
      b.energy=action==='skill'?b.energy-1:Math.min(3,b.energy+1);
      log=`${D.species[m.species].name} used ${action==='skill'?D.species[m.species].skill:'Strike'}: ${d} damage.`;
      if(action==='skill'&&D.advantages[D.species[m.species].type]===D.species[enemy.species].type)log+=' Super effective!';
    }else if(action==='catch'){
      if(b.kind!=='wild')return b.log='Only wild creatures can be befriended with bindstones.';
      if(s.orbs<1)return b.log='No bindstones left. Visit Tavi in Briar Glen.';
      if(s.team.length>=12)return b.log='Your sanctuary is full (12 companions). Release one outside battle.';
      s.orbs--;const chance=.22+(1-enemy.hp/stats(enemy).maxHp)*.68;
      if(rng()<chance){const caught={...enemy,hp:Math.max(1,enemy.hp)};s.team.push(caught);if(!s.caught.includes(caught.species))s.caught.push(caught.species);b.ended=true;b.outcome='caught';return b.log=`${D.species[caught.species].name} joined your companions!`;}
      log='The bindstone glimmered… but the creature broke free!';
    }else if(action==='potion'){
      if(s.potions<1)return b.log='No tonics left.';
      if(m.hp===stats(m).maxHp)return b.log='Your companion is already at full health.';
      s.potions--;m.hp=Math.min(stats(m).maxHp,m.hp+40);log='The tonic restored up to 40 HP.';
    }else if(action==='switch'){
      if(!s.team[target]||s.team[target].hp<=0||target===s.active)return b.log='Choose another healthy companion.';
      s.active=target;m=s.team[target];log=`Go, ${D.species[m.species].name}!`;
    }else if(action==='run'){
      if(b.kind!=='wild')return b.log='This challenge must be finished. You can recover at a rest house if defeated.';
      b.ended=true;b.outcome='escaped';return b.log='You returned safely to the trail.';
    }else if(action==='guard'){b.guard=true;b.energy=Math.min(3,b.energy+1);log='You braced for the next attack and restored one focus.';}
    else return b.log;
    b.turn++;
    if(enemy.hp<=0){
      const reward=enemy.level*10+12;s.coins+=reward;s.wins++;
      log+=` +${reward} shards.`+addXP(s,m,enemy.level*18+18);
      s.team.forEach((other,i)=>{if(i!==s.active&&other.hp>0)log+=addXP(s,other,Math.ceil(enemy.level*7));});
      if(b.index<b.enemies.length-1){b.index++;b.energy=3;return b.log=log+` Next: ${D.species[b.enemies[b.index].species].name}!`;}
      b.ended=true;b.outcome='won';
      if(b.kind==='warden'&&!s.badges.includes(b.badge)){s.badges.push(b.badge);s.orbs+=4;s.potions+=3;heal(s);log+=' Sigil earned! Your team is healed. +4 bindstones, +3 tonics.';}
      if(b.kind==='boss'){s.completed=true;heal(s);if(s.team.length<12){s.team.push(creature('solwyrm',10));if(!s.caught.includes('solwyrm'))s.caught.push('solwyrm');}log+=' The beacon shines again! Solwyrm has joined your sanctuary. Your adventure continues.';}
      return b.log=log;
    }
    const enemySkill=b.turn%3===0,hit=damage(enemy,m,enemySkill,rng),actual=b.guard?Math.ceil(hit*.4):hit;b.guard=false;m.hp=Math.max(0,m.hp-actual);log+=` ${D.species[enemy.species].name} used ${enemySkill?D.species[enemy.species].skill:'Strike'} for ${actual}${actual<hit?' (guarded)':''}.`;
    if(m.hp<=0){const next=s.team.findIndex(c=>c.hp>0);if(next<0){b.ended=true;b.outcome='lost';heal(s);s.area='glen';s.x=13;s.y=10;s.coins=Math.max(0,s.coins-15);log+=' Your team needs rest. Mira brought you home (up to 15 shards used).';}else{s.active=next;log+=` ${D.species[s.team[next].species].name} steps in!`;}}
    return b.log=log;
  }
  function validate(raw){
    if(!raw||raw.version!==1||!D.areas[raw.area]||!Array.isArray(raw.team)||raw.team.length<1||raw.team.length>12)throw Error('This is not a supported Emberwild save.');
    const integer=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
    if(!integer(raw.x,0,27)||!integer(raw.y,0,17)||!passable(raw.area,raw.x,raw.y))throw Error('Invalid player position.');
    const team=raw.team.map(m=>{if(!m||!D.species[m.species]||!integer(m.level,1,30)||!integer(m.xp,0,1000000)||!integer(m.hp,0,stats(m).maxHp))throw Error('Invalid companion data.');return {species:m.species,level:m.level,xp:m.xp,hp:m.hp};});
    for(const key of ['coins','orbs','potions','steps','wins'])if(!integer(raw[key],0,10000000))throw Error('Invalid inventory data.');
    if(!integer(raw.active,0,team.length-1)||!Array.isArray(raw.badges)||raw.badges.some(v=>!['reed','tide','ember','sky','stone'].includes(v))||!Array.isArray(raw.caught)||raw.caught.some(v=>!D.species[v]))throw Error('Invalid journal data.');
    if(typeof raw.completed!=='boolean'||!Array.isArray(raw.claimed)||raw.claimed.some(v=>typeof v!=='string'||v.length>30))throw Error('Invalid progress data.');
    const s={version:1,area:raw.area,x:raw.x,y:raw.y,facing:['up','down','left','right'].includes(raw.facing)?raw.facing:'down',team,active:raw.active,orbs:raw.orbs,potions:raw.potions,coins:raw.coins,badges:[...new Set(raw.badges)],caught:[...new Set(raw.caught)],steps:raw.steps,wins:raw.wins,completed:raw.completed,claimed:[...new Set(raw.claimed)],created:Number.isFinite(raw.created)?raw.created:Date.now()};
    if(!s.team.some(m=>m.hp>0))heal(s);if(s.team[s.active].hp<=0)s.active=s.team.findIndex(m=>m.hp>0);return s;
  }
  const api={stats,creature,initial,tile,passable,heal,addXP,damage,beginBattle,battleAction,validate};root.EWCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
