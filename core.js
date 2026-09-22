(function(root){
  'use strict';
  const D=typeof module!=='undefined'&&module.exports?require('./data.js'):root.EWData;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function stats(m){const s=D.species[m.species];return {maxHp:s.hp+m.level*5,attack:s.attack+m.level*2,defense:s.defense+m.level};}
  function creature(species,level=3){const m={species,level,xp:0,hp:0};m.hp=stats(m).maxHp;return m;}
  function initial(starter){return {version:1,area:'glen',x:13,y:10,facing:'down',team:[creature(starter)],active:0,orbs:8,potions:5,coins:60,badges:[],caught:[starter],steps:0,wins:0,completed:false,claimed:[],inventory:{},quests:{first_steps:'active'},discovered:['glen'],achievements:[],playerLevel:1,playerXp:0,created:Date.now()};}
  function routePath(r,x,y){
    if(r===1)return (y===8&&x<=4)||(x===4&&y>=6&&y<=8)||(y===6&&x>=4&&x<=10)||(x===10&&y>=6&&y<=11)||(y===11&&x>=10&&x<=16)||(x===13&&y>=8&&y<=11)||(x===16&&y>=8&&y<=11)||(y===8&&x>=16&&x<=22)||(x===22&&y>=5&&y<=8)||(y===5&&x>=22&&x<=27)||(x===27&&y>=5&&y<=8);
    if(r===2)return (y===8&&x<=7)||(x===7&&y>=8&&y<=13)||(y===13&&x>=7&&x<=13)||(x===13&&y>=8&&y<=13)||(y===8&&x>=13&&x<=21)||(x===21&&y>=3&&y<=8)||(y===3&&x>=21&&x<=25)||(x===25&&y>=3&&y<=8)||(y===8&&x>=25);
    if(r===3)return (y===8&&x<=6)||(x===6&&y>=4&&y<=8)||(y===4&&x>=6&&x<=13)||(x===13&&y>=4&&y<=8)||(y===8&&x>=13&&x<=18)||(x===18&&y>=8&&y<=13)||(y===13&&x>=18&&x<=24)||(x===24&&y>=8&&y<=13)||(y===8&&x>=24);
    if(r===4)return (y===8&&x<=5)||(x===5&&y>=8&&y<=12)||(y===12&&x>=5&&x<=13)||(x===13&&y>=5&&y<=12)||(y===5&&x>=13&&x<=19)||(x===19&&y>=5&&y<=8)||(y===8&&x>=19);
    if(r===5)return (y===8&&x<=4)||(x===4&&y>=3&&y<=8)||(y===3&&x>=4&&x<=9)||(x===9&&y>=3&&y<=13)||(y===13&&x>=9&&x<=13)||(x===13&&y>=5&&y<=13)||(y===5&&x>=13&&x<=19)||(x===19&&y>=5&&y<=10)||(y===10&&x>=19&&x<=24)||(x===24&&y>=8&&y<=10)||(y===8&&x>=24);
    if(r===6)return (y===8&&x<=6)||(x===6&&y>=5&&y<=8)||(y===5&&x>=6&&x<=13)||(x===13&&y>=5&&y<=12)||(y===12&&x>=13&&x<=20)||(x===20&&y>=8&&y<=12)||(y===8&&x>=20);
    if(r===7)return (y===8&&x<=7)||(x===7&&y>=3&&y<=8)||(y===3&&x>=7&&x<=13)||(x===13&&y>=3&&y<=8)||(y===8&&x>=13&&x<=18)||(x===18&&y>=8&&y<=14)||(y===14&&x>=18&&x<=24)||(x===24&&y>=8&&y<=14)||(y===8&&x>=24);
    if(r===8)return (y===8&&x<=7)||(x===7&&y>=8&&y<=12)||(y===12&&x>=7&&x<=13)||(x===13&&y>=4&&y<=12)||(y===4&&x>=13&&x<=18)||(x===18&&y>=4&&y<=8)||(y===8&&x>=18&&x<=22)||(x===22&&y>=8&&y<=13)||(y===13&&x>=22&&x<=25)||(x===25&&y>=8&&y<=13)||(y===8&&x>=25);
    if(r===9)return (y===8&&x<=5)||(x===5&&y>=3&&y<=8)||(y===3&&x>=5&&x<=13)||(x===13&&y>=3&&y<=8)||(y===8&&x>=13&&x<=20)||(x===20&&y>=7&&y<=8)||(y===7&&x>=20&&x<=23)||(x===23&&y>=7&&y<=8)||(y===8&&x>=22);
    return (y===8&&x<=6)||(x===6&&y>=4&&y<=8)||(y===4&&x>=6&&x<=13)||(x===13&&y>=4&&y<=12)||(y===12&&x>=13&&x<=19)||(x===19&&y>=8&&y<=12)||(y===8&&x>=19);
  }
  function tile(area,x,y){
    if(x<0||x>27||y<0||y>17)return 'wall';
    const a=D.areas[area];
    if(a.exits.some(e=>e.x===x&&e.y===y))return 'path';
    if(area==='oldwell'){
      if(x===0||x===27||y===0||y===17)return 'rock';
      if((x>=2&&x<=10&&y>=8&&y<=10)||(x>=16&&x<=25&&y>=5&&y<=7))return 'water';
      if((x===11&&y>=2&&y<=12)||(x===17&&y>=9&&y<=16)||(y===12&&x>=3&&x<=12)||(y===3&&x>=18&&x<=26))return 'path';
      if((x>=3&&x<=8&&y>=3&&y<=7)||(x>=19&&x<=25&&y>=12&&y<=15))return 'grass';
      if((x+y)%11===0||(x===14&&y>=3&&y<=9))return 'crystal';
      return 'ground';
    }
    if(area==='rootvault'){
      if(x===0||x===27||y===0||y===17)return 'rock';
      if(y===8||y===9||(x===7&&y>=4&&y<=13)||(x===20&&y>=5&&y<=12))return 'ruinpath';
      if((x>=2&&x<=6&&y>=2&&y<=6)||(x>=10&&x<=15&&y>=11&&y<=16)||(x>=22&&x<=26&&y>=2&&y<=6))return 'crystal';
      if((x>=9&&x<=14&&y>=3&&y<=6)||(x>=22&&x<=25&&y>=11&&y<=15))return 'water';
      return 'ground';
    }
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
      if((x>=5&&x<=9&&y>=4&&y<=7)||(x>=18&&x<=22&&y>=4&&y<=7)||(x>=11&&x<=15&&y>=3&&y<=6)||(x>=25&&x<=26&&y>=11&&y<=13))return 'house';
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
      const r=a.route,surfaces=['','trail','boardwalk','ashpath','icepath','crystalpath','ruinpath','causeway','skybridge','starpath','aurorapath'];
      if(routePath(r,x,y))return surfaces[r];
      if(r===1&&((x>=1&&x<=8&&y>=1&&y<=4)||(x>=17&&x<=21&&y>=12&&y<=16)))return 'tree';
      if(r===2&&((x>=2&&x<=19&&y>=2&&y<=6)||(x>=2&&x<=24&&y>=10&&y<=16)))return 'water';
      if(r===3&&((x>=1&&x<=11&&y>=10&&y<=16)||(x>=15&&x<=26&&y>=1&&y<=6)))return 'lava';
      if(r===4&&((x>=1&&x<=11&&y>=2&&y<=6)||(x>=16&&x<=26&&y>=10&&y<=16)))return 'ice';
      if(r===5&&((x>=2&&x<=8&&y>=10&&y<=16)||(x>=15&&x<=26&&y>=1&&y<=4)||(x>=20&&x<=23&&y>=12&&y<=15)))return 'crystal';
      if(r===6&&((x>=1&&x<=10&&y>=11&&y<=16)||(x>=16&&x<=26&&y>=2&&y<=6)))return 'ruin';
      if(r===7&&((x>=1&&x<=17&&y>=10&&y<=16)||(x>=15&&x<=26&&y>=1&&y<=6)))return 'water';
      if(r===8&&((x>=1&&x<=12&&y>=1&&y<=6)||(x>=15&&x<=26&&y>=10&&y<=16)))return 'cloud';
      if(r===9&&((x>=1&&x<=12&&y>=10&&y<=16)||(x>=15&&x<=26&&y>=1&&y<=6)))return 'chasm';
      if(r===10&&((x>=1&&x<=11&&y>=10&&y<=16)||(x>=16&&x<=26&&y>=1&&y<=6)))return 'aurora';
      if((x*7+y*11+r)%17<5)return 'grass';
    }
    return 'ground';
  }
  const passable=(area,x,y)=>['path','ground','grass','sand','floor','rug','trail','boardwalk','ashpath','icepath','crystalpath','ruinpath','causeway','skybridge','starpath','aurorapath'].includes(tile(area,x,y))&&!D.areas[area].npcs.some(n=>n.x===x&&n.y===y);
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
    return {kind,npc:npc?.id,badge:npc?.badge,enemies,index:0,energy:3,guard:false,turn:0,phase:1,enemyStatus:null,enemyWeak:false,enemyExposed:false,ended:false,outcome:null,log:kind==='wild'?`A wild ${D.species[enemies[0].species].name} appeared!`:kind==='boss'?'The beacon tests the strength of your bond.':kind==='regional'?'The Rootwarden awakens. The whole vault begins to breathe.':`${npc.name} challenges you!`};
  }
  function battleAction(s,b,action,target,rng=Math.random){
    if(b.ended)return b.log;let m=s.team[s.active],enemy=b.enemies[b.index],log='';
    if(action==='strike'||action==='skill'){
      if(action==='skill'&&b.energy<1)return b.log='No focus left. Use Strike to restore it.';
      const ability=action==='skill'?D.abilities?.[D.species[m.species].skill]:null;
      let d=damage(m,enemy,action==='skill',rng);if(b.enemyExposed){d=Math.round(d*1.3);b.enemyExposed=false;}enemy.hp=Math.max(0,enemy.hp-d);
      b.energy=action==='skill'?b.energy-1:Math.min(3,b.energy+1);
      log=`${D.species[m.species].name} used ${action==='skill'?D.species[m.species].skill:'Strike'}: ${d} damage.`;
      if(action==='skill'&&D.advantages[D.species[m.species].type]===D.species[enemy.species].type)log+=' Super effective!';
      if(ability){
        if(ability.effect==='heal'){const gain=Math.min(10,stats(m).maxHp-m.hp);m.hp+=gain;if(gain)log+=` Restored ${gain} HP.`;}
        if(ability.effect==='shield'){b.guard=true;log+=' A protective ward formed.';}
        if(ability.effect==='focus'){b.energy=Math.min(3,b.energy+1);log+=' Focus returned.';}
        if(ability.effect==='burn'||ability.effect==='poison'){b.enemyStatus={kind:ability.effect,turns:3};log+=` ${D.species[enemy.species].name} is ${ability.effect==='burn'?'burning':'poisoned'}.`;}
        if(ability.effect==='stun'&&rng()<.4){b.enemyStatus={kind:'stun',turns:1};log+=' The foe was stunned!';}
        if(ability.effect==='snare'){b.enemyWeak=true;log+=' The foe was entangled.';}
        if(ability.effect==='weaken'){b.enemyExposed=true;log+=' Its guard cracked.';}
      }
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
      const reward=enemy.level*10+12;s.coins+=reward;s.wins++;s.playerXp=(s.playerXp||0)+enemy.level*6;while(s.playerXp>=s.playerLevel*80){s.playerXp-=s.playerLevel*80;s.playerLevel++;log+=` Ranger level ${s.playerLevel}!`;}
      log+=` +${reward} shards.`+addXP(s,m,enemy.level*18+18);
      if(['glen','oldwell'].includes(s.area)&&s.wins%2===0){s.inventory.moonleaf=(s.inventory.moonleaf||0)+1;log+=' Found 1 Moonleaf.';}
      s.team.forEach((other,i)=>{if(i!==s.active&&other.hp>0)log+=addXP(s,other,Math.ceil(enemy.level*7));});
      if(b.index<b.enemies.length-1){b.index++;b.energy=3;return b.log=log+` Next: ${D.species[b.enemies[b.index].species].name}!`;}
      b.ended=true;b.outcome='won';
      if(b.kind==='warden'&&!s.badges.includes(b.badge)){s.badges.push(b.badge);s.orbs+=4;s.potions+=3;heal(s);log+=' Sigil earned! Your team is healed. +4 bindstones, +3 tonics.';}
      if((b.kind==='elite'||b.kind==='regional')&&b.npc&&!s.claimed.includes('defeated-'+b.npc)){s.claimed.push('defeated-'+b.npc);heal(s);if(b.kind==='elite'){s.inventory.vaultkey=(s.inventory.vaultkey||0)+1;s.orbs+=2;log+=' Gloomfang yields the Rootbound Key. The sealed passage is open.';}else{s.inventory.prismdust=(s.inventory.prismdust||0)+2;s.coins+=100;log+=' The Rootwarden accepts your courage. +100 shards and 2 Prism Dust.';}}
      if(b.kind==='boss'){s.completed=true;heal(s);if(s.team.length<12){s.team.push(creature('solwyrm',10));if(!s.caught.includes('solwyrm'))s.caught.push('solwyrm');}log+=' The beacon shines again! Solwyrm has joined your sanctuary. Your adventure continues.';}
      return b.log=log;
    }
    if(b.enemyStatus?.kind==='burn'||b.enemyStatus?.kind==='poison'){const dot=Math.max(3,Math.round(stats(enemy).maxHp*.06));enemy.hp=Math.max(1,enemy.hp-dot);b.enemyStatus.turns--;log+=` ${b.enemyStatus.kind==='burn'?'Embers':'Poison'} dealt ${dot}.`;if(b.enemyStatus.turns<=0)b.enemyStatus=null;}
    if(b.enemyStatus?.kind==='stun'){b.enemyStatus=null;log+=' The stunned foe lost its turn.';return b.log=log;}
    if(b.kind==='regional'&&b.phase===1&&enemy.hp<=stats(enemy).maxHp/2){b.phase=2;enemy.hp=Math.min(stats(enemy).maxHp,enemy.hp+18);b.guard=true;log+=' The vault surges: phase two! The Rootwarden restores 18 HP and raises a heartwood shield.';}
    const enemySkill=b.turn%3===0,hit=damage(enemy,m,enemySkill,rng),weakened=b.enemyWeak?Math.ceil(hit*.7):hit,actual=b.guard?Math.ceil(weakened*.4):weakened;b.guard=false;b.enemyWeak=false;m.hp=Math.max(0,m.hp-actual);log+=` ${D.species[enemy.species].name} used ${enemySkill?D.species[enemy.species].skill:'Strike'} for ${actual}${actual<hit?' (reduced)':''}.`;
    if(m.hp<=0){const next=s.team.findIndex(c=>c.hp>0);if(next<0){b.ended=true;b.outcome='lost';heal(s);s.area='glen';s.x=13;s.y=10;s.coins=Math.max(0,s.coins-15);log+=' Your team needs rest. Mira brought you home (up to 15 shards used).';}else{s.active=next;log+=` ${D.species[s.team[next].species].name} steps in!`;}}
    return b.log=log;
  }
  function validate(raw){
    if(!raw||raw.version!==1||!D.areas[raw.area]||!Array.isArray(raw.team)||raw.team.length<1||raw.team.length>12)throw Error('This is not a supported Emberwild save.');
    const integer=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
    if(!integer(raw.x,0,27)||!integer(raw.y,0,17))throw Error('Invalid player position.');let saveX=raw.x,saveY=raw.y;if(!passable(raw.area,saveX,saveY)){if(D.areas[raw.area].route){saveX=13;saveY=8;}else throw Error('Invalid player position.');}
    const team=raw.team.map(m=>{if(!m||!D.species[m.species]||!integer(m.level,1,30)||!integer(m.xp,0,1000000)||!integer(m.hp,0,stats(m).maxHp))throw Error('Invalid companion data.');return {species:m.species,level:m.level,xp:m.xp,hp:m.hp};});
    for(const key of ['coins','orbs','potions','steps','wins'])if(!integer(raw[key],0,10000000))throw Error('Invalid inventory data.');
    if(!integer(raw.active,0,team.length-1)||!Array.isArray(raw.badges)||raw.badges.some(v=>!['reed','tide','ember','sky','stone'].includes(v))||!Array.isArray(raw.caught)||raw.caught.some(v=>!D.species[v]))throw Error('Invalid journal data.');
    if(typeof raw.completed!=='boolean'||!Array.isArray(raw.claimed)||raw.claimed.some(v=>typeof v!=='string'||v.length>30))throw Error('Invalid progress data.');
    const cleanObject=(v,allowed)=>{const out={};if(v&&typeof v==='object'&&!Array.isArray(v))for(const [k,n] of Object.entries(v))if(allowed(k)&&Number.isInteger(n)&&n>=0&&n<=10000)out[k]=n;return out;};
    const inventory=cleanObject(raw.inventory,k=>!!D.items?.[k]),quests={};if(raw.quests&&typeof raw.quests==='object'&&!Array.isArray(raw.quests))for(const [k,v] of Object.entries(raw.quests))if(D.quests?.[k]&&['active','complete'].includes(v))quests[k]=v;
    const discovered=Array.isArray(raw.discovered)?[...new Set(raw.discovered.filter(v=>D.areas[v]))]:[raw.area];if(!discovered.includes(raw.area))discovered.push(raw.area);
    const achievements=Array.isArray(raw.achievements)?[...new Set(raw.achievements.filter(v=>typeof v==='string'&&v.length<=40))]:[];
    const s={version:1,area:raw.area,x:saveX,y:saveY,facing:['up','down','left','right'].includes(raw.facing)?raw.facing:'down',team,active:raw.active,orbs:raw.orbs,potions:raw.potions,coins:raw.coins,badges:[...new Set(raw.badges)],caught:[...new Set(raw.caught)],steps:raw.steps,wins:raw.wins,completed:raw.completed,claimed:[...new Set(raw.claimed)],inventory,quests:Object.keys(quests).length?quests:{first_steps:'active'},discovered,achievements,playerLevel:integer(raw.playerLevel,1,100)?raw.playerLevel:1,playerXp:integer(raw.playerXp,0,1000000)?raw.playerXp:0,created:Number.isFinite(raw.created)?raw.created:Date.now()};
    if(!s.team.some(m=>m.hp>0))heal(s);if(s.team[s.active].hp<=0)s.active=s.team.findIndex(m=>m.hp>0);return s;
  }
  function questProgress(s,q){const o=q.objective;if(o.kind==='claimed')return s.claimed.includes(o.target)?1:0;if(o.kind==='caught')return s.caught.length;if(o.kind==='item')return s.inventory[o.target]||0;if(o.kind==='area')return s.discovered.includes(o.target)?1:0;if(o.kind==='areas')return o.targets.filter(a=>s.discovered.includes(a)).length;if(o.kind==='caches')return s.claimed.filter(id=>id.includes('cache')||id==='wellcache'||id==='vaultcache').length;if(o.kind==='wins')return s.wins;if(o.kind==='mastery')return s.claimed.includes('defeated-rootwarden')?s.caught.length:0;return 0;}
  function claimQuest(s,id){const q=D.quests[id];if(!q||s.quests[id]!=='active'||questProgress(s,q)<q.objective.amount)return false;s.quests[id]='complete';const r=q.reward||{};s.coins+=r.coins||0;s.orbs+=r.orbs||0;s.potions+=r.potions||0;if(r.item)s.inventory[r.item]=(s.inventory[r.item]||0)+(r.amount||1);return true;}
  const api={stats,creature,initial,tile,passable,heal,addXP,damage,beginBattle,battleAction,questProgress,claimQuest,validate};root.EWCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
