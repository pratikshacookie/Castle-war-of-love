const g=document.querySelector('#game');
const S={q:0,score:0,sit:0,first:null,pairs:0,lock:false};
const Q=[
['On which date prince and princess married each other?',['11 April','27 april','22 may','18 june'],2],
['What was prince first impression of princess',["She's smart","She's pretty","She's lazy","She's a boy"],3],
['What would ur wife say if she is shy?',['Moon is beautiful','Meaw','Atoms r kewl/hawt','All of the above'],3],
['What is most important for a relationship?',['Looks','Chicks','Lust','Loyality'],3],
['What is princess dream?',['Go to a beach','Pet a cat','Eat ice-cream','Shower with prince husband (better dessert 😏)'],3],
['Prince dream home MUST have?',['Theatre room','Sauna room','Hall','Soundproof big bedroom with attached shower room 😏'],3],
["What's something that will make her upset?",['not saying I love u back','not Kissing back','not Hugging back','All of the above'],3],
['Which song is prince least favourite?',['Skyfall','Most songs by c418','Playful massacre song for wembu','Rickroll'],3],
['His is famous called as what by basement kids?',['Powerless guy','Pookie','Wolfy','Supreme torturer'],3],
['What is heroz most important Mission?',['Save his wife from "monsyeter"','Pet a wolf','Spend time with Princess\'s sister 🤨','Kill spiders'],0]
];
const situations=[
["If a clone of me appeared that was pro gamer and cooked better 5 star meals, but clearly lacked my chaotic energy humour, how long before you realized it wasn't the real me?",['Within seconds honey, c\'mon ilysm','Might take me a while to differentiate, till then I\'ll spend time w that shawty😍'],0],
["If I suddenly gained the ability to speak fluently to pigeons and decided to assemble a local bird spy team irl to do my detective work, would you join my bird empire ?",['No that\'s boring','Ofc love 😘, we\'ll be better than cbi'],1],
["If I got turned into a worm, would you keep me in a nice little box with fancy dirt, or would you take me everywhere in your pocket?",["You'll always be with me sweetheart",'No ewww, be covered in mud idc, i wont love a worm😒😒'],0]
];
function page(x){g.innerHTML=`<div class="wrap">${x}</div>`}
function start(){page(`<div class="hero">🤴💕👸</div><h1>THE BOYFRIEND<br>BIRTHDAY QUEST</h1><p>Your Princess has been locked away by the Evil King.</p><p class="small">One Prince. One kingdom. One extremely suspicious amount of spiders.</p><button class="btn" onclick="trial1()">⚔️ ENTER THE KINGDOM</button>`)}
function trial1(){S.q=0;S.score=0;quiz()}
function quiz(){const q=Q[S.q];page(`<p class="small">THE FIRST TRIAL · ${S.q+1}/10</p><div class="progress"><i style="width:${S.q/10*100}%"></i></div><h2>🧠 PROVE YOU KNOW THE PRINCESS</h2><div class="box"><h3>${q[0]}</h3></div>${q[1].map((a,i)=>`<button class="btn" onclick="answer(${i})">${'ABCD'[i]}. ${a}</button>`).join('')}`)}
function answer(i){const q=Q[S.q],ok=i===q[2];if(ok)S.score++;page(`<div class="hero">${ok?'💗':'😭'}</div><h2>${ok?'CORRECT!':'WRONG ANSWER!'}</h2><p>${ok?'The Princess is impressed.':'The Evil King is taking notes. 👺'}</p><p class="small">Score: ${S.score}/${S.q+1}</p><button class="btn" onclick="${S.q<9?'S.q++;quiz()':'kingTaunt()'}">CONTINUE ➜</button>`)}
function kingTaunt(){page(`<div class="hero">👺</div><p class="small">THE EVIL KING</p><div class="box"><h2>“Damn. You’re certified husband material.”</h2><p>“...well, I still bet you can’t defeat me.”</p><p><b>“I’m the cruel MONSYETER KING, with the powers of the FINAL BOSS OF ALL SPIDERS COMBINED 👺”</b></p><h2>“FIGHT MEEEEEE, YOU LIL WOLF.” 🤴⚔️</h2></div><button class="btn" onclick="trial2()">🗝️ FACE THE SECOND TRIAL</button>`)}
function trial2(){S.sit=0;scenario()}
function scenario(){const q=situations[S.sit];page(`<p class="small">THE SECOND TRIAL · ${S.sit+1}/3</p><div class="progress"><i style="width:${S.sit/3*100}%"></i></div><h2>💗 THE HUSBAND TEST</h2><div class="box"><h3>${q[0]}</h3></div>${q[1].map((a,i)=>`<button class="btn" onclick="sitAnswer(${i})">${'AB'[i]}. ${a}</button>`).join('')}`)}
function sitAnswer(i){const q=situations[S.sit],ok=i===q[2];page(`<div class="hero">${ok?'🥹':'👺'}</div><h2>${ok?'THE PRINCESS APPROVES':'THE KING LAUGHS MENACINGLY'}</h2><p>${ok?'Correct. Certified lil wolf. 🤴❤️':'That answer has been added to the Evil King’s evidence.'}</p><button class="btn" onclick="${S.sit<2?'S.sit++;scenario()':'memory()'}">CONTINUE ➜</button>`)}
function memory(){S.first=null;S.lock=false;S.pairs=0;const a=['❤️','🌙','🎮','💌','⭐','👑'],arr=[...a,...a].sort(()=>Math.random()-.5);page(`<p class="small">THE THIRD TRIAL</p><h2>🧩 THE MEMORY GATE</h2><p class="small">Match the symbols to open the castle gate.</p><div class="grid">${arr.map((x,i)=>`<button class="card" data-v="${x}" onclick="flip(this)">?</button>`).join('')}</div>`)}
function flip(el){if(S.lock||el.disabled||el.classList.contains('open'))return;el.classList.add('open');el.textContent=el.dataset.v;if(!S.first){S.first=el;return}const f=S.first;S.first=null;if(f.dataset.v===el.dataset.v){S.pairs++;f.disabled=el.disabled=true;if(S.pairs===6)setTimeout(bossIntro,500)}else{S.lock=true;setTimeout(()=>{f.classList.remove('open');el.classList.remove('open');f.textContent='?';el.textContent='?';S.lock=false},650)}}
function bossIntro(){page(`<div class="hero">🏰</div><h2>THE KING'S KEEP</h2><div class="box"><p>The castle doors open.</p><p>Behind them stands the MONSYETER KING.</p><p class="small">Your Princess is somewhere beyond him.</p></div><button class="btn" onclick="boss()">⚔️ ENTER THE BATTLEFIELD</button>`)}

let B=null;
const WORLD={w:680,h:500,r:14,playerSpeed:185,kingSpeed:72,monsterSpeed:78,shotSpeed:410};
const WALLS=[
{x:105,y:40,w:28,h:135},{x:105,y:260,w:28,h:125},{x:205,y:90,w:130,h:28},{x:205,y:90,w:28,h:120},
{x:205,y:310,w:150,h:28},{x:327,y:310,w:28,h:120},{x:425,y:35,w:28,h:150},{x:425,y:270,w:28,h:125},
{x:510,y:150,w:110,h:28},{x:55,y:410,w:150,h:28},{x:470,y:410,w:150,h:28},{x:55,y:205,w:80,h:28}
];
function boss(){
 const maxHp=190+S.score*14;
 const monsterHp=58+Math.floor(S.score*2);
 const monsters=[
  {x:165,y:55,hp:monsterHp,maxHp:monsterHp,shootCd:1.4,flash:0,dead:false},
  {x:355,y:55,hp:monsterHp,maxHp:monsterHp,shootCd:1.8,flash:0,dead:false},
  {x:555,y:90,hp:monsterHp,maxHp:monsterHp,shootCd:1.6,flash:0,dead:false},
  {x:350,y:250,hp:monsterHp,maxHp:monsterHp,shootCd:2.0,flash:0,dead:false},
  {x:555,y:335,hp:monsterHp,maxHp:monsterHp,shootCd:1.5,flash:0,dead:false}
 ];
 B={running:true,win:false,keys:{},shots:[],particles:[],last:performance.now(),shake:0,player:{x:55,y:70,hp:maxHp,maxHp,dir:'right',shootCd:0,shield:false,inv:0},monsters,king:{x:610,y:350,hp:235+S.score*5,maxHp:235+S.score*5,dir:'left',shootCd:2.5,flash:0,dead:false,phase:1},cleanup:null};
 page(`<p class="small">THE FINAL TRIAL</p><h2>⚔️ WOLFY VS THE MONSYETER KING</h2><div class="battleHud"><div><b>🤴 WOLFY · KNIGHT</b><div class="bar"><i id="php"></i></div><span id="pht"></span></div><div><b>👺 MONSYETER KING</b><div class="bar enemy"><i id="khp"></i></div><span id="kht"></span><div class="small" id="mht">👹 GUARDS: 5</div></div></div><div id="arena" class="mazeArena"><canvas id="battleCanvas"></canvas><div class="bossWarning" id="bossWarning">⚠️ FIVE MONSTER GUARDS ARE HUNTING YOU</div><div class="battleText" id="battleText">Take down the guards, then finish the cruel King. Walls block magic shots.</div><div class="deathOverlay" id="death"></div></div><div class="battleControls"><div class="dpad"><button data-dir="up">▲</button><div><button data-dir="left">◀</button><button data-dir="down">▼</button><button data-dir="right">▶</button></div></div><div class="combatBtns"><button class="combat attackBtn" id="attackBtn">✨ SHOOT</button><button class="combat shieldBtn" id="shieldBtn">🛡️ SHIELD</button></div></div><p class="hint">Phone: hold a direction to move. Tap SHOOT to fire at the nearest visible enemy. Hold SHIELD. Desktop: WASD/arrows · Space · Shift.</p>`);
 initBattle();
}
function initBattle(){const c=document.querySelector('#battleCanvas');B.canvas=c;B.ctx=c.getContext('2d');resizeBattle();bindBattleControls();updateHud();startBattleAudio();B.last=performance.now();B.raf=requestAnimationFrame(loop)}
function resizeBattle(){if(!B)return;const arena=document.querySelector('#arena'),r=arena.getBoundingClientRect(),d=Math.max(1,Math.min(2,devicePixelRatio||1));B.viewW=r.width;B.viewH=r.height;B.scale=Math.min(r.width/WORLD.w,r.height/WORLD.h);B.ox=(r.width-WORLD.w*B.scale)/2;B.oy=(r.height-WORLD.h*B.scale)/2;B.canvas.width=Math.floor(r.width*d);B.canvas.height=Math.floor(r.height*d);B.canvas.style.width=r.width+'px';B.canvas.style.height=r.height+'px';B.ctx.setTransform(d,0,0,d,0,0)}
function bindBattleControls(){
 const keydown=e=>{if(!B?.running)return;const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','shift',' '].includes(k))e.preventDefault();if(k===' '){shoot()}else B.keys[k]=true};
 const keyup=e=>{if(B)B.keys[e.key.toLowerCase()]=false};window.addEventListener('keydown',keydown);window.addEventListener('keyup',keyup);window.addEventListener('resize',resizeBattle);
 document.querySelectorAll('[data-dir]').forEach(b=>{const d=b.dataset.dir;const on=e=>{e.preventDefault();B.keys[d]=true;b.setPointerCapture?.(e.pointerId)};const off=e=>{e.preventDefault();B.keys[d]=false};b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off);b.addEventListener('lostpointercapture',off)});
 const a=document.querySelector('#attackBtn');a.addEventListener('pointerdown',e=>{e.preventDefault();shoot()});
 const sh=document.querySelector('#shieldBtn');const on=e=>{e.preventDefault();B.keys.shield=true;sh.setPointerCapture?.(e.pointerId)},off=e=>{e.preventDefault();B.keys.shield=false};sh.addEventListener('pointerdown',on);sh.addEventListener('pointerup',off);sh.addEventListener('pointercancel',off);sh.addEventListener('lostpointercapture',off);
 B.cleanup=()=>{window.removeEventListener('keydown',keydown);window.removeEventListener('keyup',keyup);window.removeEventListener('resize',resizeBattle);cancelAnimationFrame(B.raf)};
}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function circleRect(x,y,r,w){const cx=clamp(x,w.x,w.x+w.w),cy=clamp(y,w.y,w.y+w.h);return (x-cx)**2+(y-cy)**2<r*r}
function wallHit(x,y,r){return WALLS.some(w=>circleRect(x,y,r,w))}
function moveCircle(o,dx,dy,speed,dt,r){let len=Math.hypot(dx,dy);if(len){dx/=len;dy/=len}const step=speed*dt;const nx=clamp(o.x+dx*step,r,WORLD.w-r),ny=clamp(o.y+dy*step,r,WORLD.h-r);if(!wallHit(nx,o.y,r))o.x=nx;if(!wallHit(o.x,ny,r))o.y=ny}
function clearLine(a,b){for(const r of WALLS)if(segmentRect(a.x,a.y,b.x,b.y,r))return false;return true}
function segmentRect(x1,y1,x2,y2,r){let t0=0,t1=1,dx=x2-x1,dy=y2-y1;for(const [p,q] of [[-dx,x1-r.x],[dx,r.x+r.w-x1],[-dy,y1-r.y],[dy,r.y+r.h-y1]]){if(Math.abs(p)<1e-9){if(q<0)return false}else{const t=q/p;if(p<0){if(t>t1)return false;if(t>t0)t0=t}else{if(t<t0)return false;if(t<t1)t1=t}}}return t0<=t1}
function livingEnemies(){return [...B.monsters.filter(m=>!m.dead),B.king].filter(e=>!e.dead)}
function shoot(){if(!B?.running||B.player.shootCd>0)return;const p=B.player;const enemies=livingEnemies().filter(e=>clearLine(p,e));let target=enemies.sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0];let dx,dy;if(target){dx=target.x-p.x;dy=target.y-p.y}else{if(p.dir==='left')dx=-1,dy=0;else if(p.dir==='right')dx=1,dy=0;else if(p.dir==='up')dx=0,dy=-1;else dx=0,dy=1}const l=Math.hypot(dx,dy)||1;B.shots.push({x:p.x,y:p.y,vx:dx/l*WORLD.shotSpeed,vy:dy/l*WORLD.shotSpeed,owner:'p',life:0});p.shootCd=.28;burst(p.x,p.y,'#d9efff',5);msg(target?`✨ MAGIC SHOT — ${target===B.king?'KING':'MONSTER'} HIT!`:'✨ MAGIC SHOT — GET AROUND THE WALL!')}
function enemyShoot(e,isKing=false){const p=B.player;if(!clearLine(e,p))return;const dx=p.x-e.x,dy=p.y-e.y,l=Math.hypot(dx,dy)||1;B.shots.push({x:e.x,y:e.y,vx:dx/l*WORLD.shotSpeed*(isKing?.9:.78),vy:dy/l*WORLD.shotSpeed*(isKing?.9:.78),owner:'e',life:0});e.shootCd=isKing?(e.phase===2?1.45:2.2):(1.15+Math.random()*.55);burst(e.x,e.y,isKing?'#ff5263':'#ffb05c',4);if(isKing){const w=document.querySelector('#bossWarning');if(w){w.textContent='⚠️ KING + MONSTERS ATTACKING — HIDE!';w.classList.add('danger');setTimeout(()=>w.classList.remove('danger'),700)}msg('👺 THE KING FIRES — THE MONSTERS JOIN IN!')}else msg('👹 A MONSTER FIRES — KEEP MOVING!')}
function damageEnemy(target,amount,label){target.hp=Math.max(0,target.hp-amount);target.flash=.15;burst(target.x,target.y,'#ffffff',10);msg(`💥 ${label} HIT! HP −${amount}`);if(target.hp<=0){target.dead=true;burst(target.x,target.y,'#ffcf72',20);}}
function update(dt){const p=B.player,k=B.king;if(!B.running)return;B.shake=Math.max(0,B.shake-dt);let dx=0,dy=0;if(B.keys.w||B.keys.arrowup||B.keys.up)dy--;if(B.keys.s||B.keys.arrowdown||B.keys.down)dy++;if(B.keys.a||B.keys.arrowleft||B.keys.left)dx--;if(B.keys.d||B.keys.arrowright||B.keys.right)dx++;if(dx||dy){if(Math.abs(dx)>Math.abs(dy))p.dir=dx>0?'right':'left';else p.dir=dy>0?'down':'up'}moveCircle(p,dx,dy,WORLD.playerSpeed,dt,WORLD.r);p.shield=!!B.keys.shield;p.shootCd=Math.max(0,p.shootCd-dt);p.inv=Math.max(0,p.inv-dt);k.flash=Math.max(0,k.flash-dt);
 if(!k.dead){if(k.hp<k.maxHp*.35)k.phase=2;let kdx=0,kdy=0;const d=Math.hypot(p.x-k.x,p.y-k.y);if(d>185){kdx=(p.x-k.x)/(d||1);kdy=(p.y-k.y)/(d||1)}else if(d<125){kdx=(k.x-p.x)/(d||1);kdy=(k.y-p.y)/(d||1)}moveCircle(k,kdx,kdy,k.phase===2?WORLD.kingSpeed*1.35:WORLD.kingSpeed,dt,WORLD.r+5);if(Math.abs(kdx)>Math.abs(kdy))k.dir=kdx>0?'right':'left';else if(kdy)k.dir=kdy>0?'down':'up';k.shootCd=Math.max(0,k.shootCd-dt);if(k.shootCd<=0&&clearLine(k,p))enemyShoot(k,true)}
 for(const m of B.monsters){if(m.dead)continue;m.flash=Math.max(0,m.flash-dt);m.shootCd=Math.max(0,m.shootCd-dt);const d=Math.hypot(p.x-m.x,p.y-m.y);let mdx=0,mdy=0;if(d>150){mdx=(p.x-m.x)/(d||1);mdy=(p.y-m.y)/(d||1)}else if(d<85){mdx=(m.x-p.x)/(d||1);mdy=(m.y-p.y)/(d||1)}else{mdx=Math.sin((performance.now()/700)+m.x)*.35;mdy=Math.cos((performance.now()/900)+m.y)*.35}moveCircle(m,mdx,mdy,WORLD.monsterSpeed,dt,WORLD.r+2);if(m.shootCd<=0&&clearLine(m,p))enemyShoot(m,false)}
 for(let i=B.shots.length-1;i>=0;i--){const s=B.shots[i];const ox=s.x,oy=s.y;s.x+=s.vx*dt;s.y+=s.vy*dt;s.life+=dt;if(s.x<0||s.x>WORLD.w||s.y<0||s.y>WORLD.h||WALLS.some(w=>segmentRect(ox,oy,s.x,s.y,w))){B.shots.splice(i,1);continue}if(s.owner==='p'){const targets=livingEnemies();let hit=targets.find(t=>Math.hypot(s.x-t.x,s.y-t.y)<WORLD.r+10);if(hit){B.shots.splice(i,1);if(hit===k){damageEnemy(k,24,'KING');if(k.hp<=0){winBattle();return}}else{damageEnemy(hit,34,'MONSTER');if(hit.hp<=0)msg('💀 MONSTER GUARD DEFEATED!')}}}else{if(Math.hypot(s.x-p.x,s.y-p.y)<WORLD.r+8){B.shots.splice(i,1);if(p.inv<=0){if(p.shield){p.inv=.2;B.shake=.12;burst(p.x,p.y,'#9ed5ff',10);msg('🛡️ BLOCKED!')}else{B.shake=.18;p.hp=Math.max(0,p.hp-(s.owner==='e'?(k.phase===2?18:13):13));p.inv=.55;burst(p.x,p.y,'#ff6878',10);msg(`💥 WOLFY HIT! ${k.phase===2?'THE KING IS ENRAGED — ':''}HIDE OR SHIELD!`);if(p.hp<=0){loseBattle();return}}}}}}
 if(B.monsters.every(m=>m.dead)&&!k.dead)msg('🔥 ALL MONSTERS DOWN — NOW FACE THE CRUEL KING!');updateParticles(dt);updateHud()}
function updateParticles(dt){for(let i=B.particles.length-1;i>=0;i--){const q=B.particles[i];q.x+=q.vx*dt;q.y+=q.vy*dt;q.life-=dt;if(q.life<=0)B.particles.splice(i,1)}}
function burst(x,y,c,n){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=40+Math.random()*100;B.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.35,c})}}
function msg(t){const e=document.querySelector('#battleText');if(e)e.textContent=t}
function updateHud(){if(!B)return;const a=document.querySelector('#php'),b=document.querySelector('#khp');if(a)a.style.width=`${B.player.hp/B.player.maxHp*100}%`;if(b)b.style.width=`${B.king.hp/B.king.maxHp*100}%`;const c=document.querySelector('#pht'),d=document.querySelector('#kht');if(c)c.textContent=`${Math.ceil(B.player.hp)}/${B.player.maxHp} HP`;if(d)d.textContent=`${Math.ceil(B.king.hp)}/${B.king.maxHp} HP`;const m=document.querySelector('#mht');if(m){const left=B.monsters.filter(x=>!x.dead).length;m.textContent=`👹 GUARDS: ${left}`}}
function loop(now){if(!B?.running)return;const dt=Math.min(.033,(now-B.last)/1000||0);B.last=now;update(dt);draw();B.raf=requestAnimationFrame(loop)}
function draw(){
 const ctx=B.ctx;ctx.setTransform(devicePixelRatio||1,0,0,devicePixelRatio||1,0,0);ctx.clearRect(0,0,B.viewW,B.viewH);
 const sx=(Math.random()-.5)*B.shake*38, sy=(Math.random()-.5)*B.shake*38;
 ctx.save();ctx.translate(B.ox+sx,B.oy+sy);ctx.scale(B.scale,B.scale);
 ctx.fillStyle='#05050a';ctx.fillRect(0,0,WORLD.w,WORLD.h);
 for(let x=0;x<WORLD.w;x+=34)for(let y=0;y<WORLD.h;y+=34){ctx.fillStyle=(x/34+y/34)%2?'#0d1017':'#090c12';ctx.fillRect(x,y,33,33)}
 drawCastleDetails(ctx);
 // Ominous floor cracks
 ctx.save();ctx.globalAlpha=.22;ctx.strokeStyle='#6b2634';ctx.lineWidth=2;
 for(const c of [[70,120,120,145],[155,390,205,365],[370,160,405,185],[525,285,580,265],[285,430,320,405]]){ctx.beginPath();ctx.moveTo(c[0],c[1]);ctx.lineTo(c[2],c[3]);ctx.stroke()}
 ctx.restore();
 for(const w of WALLS){ctx.fillStyle='#252a33';ctx.fillRect(w.x,w.y,w.w,w.h);ctx.fillStyle='#505865';ctx.fillRect(w.x,w.y,w.w,4);ctx.fillStyle='#171b22';ctx.fillRect(w.x+3,w.y+8,5,Math.max(0,w.h-11))}
 for(const s of B.shots)drawShot(ctx,s);drawKnight(ctx,B.player);for(const m of B.monsters)if(!m.dead)drawMonster(ctx,m);drawKing(ctx,B.king);
 for(const q of B.particles){ctx.globalAlpha=Math.max(0,q.life/.35);ctx.fillStyle=q.c;ctx.beginPath();ctx.arc(q.x,q.y,3,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;ctx.restore();
 // Vignette and heartbeat-like darkness, purely visual
 const pulse=(Math.sin(performance.now()/240)+1)/2;
 const g=ctx.createRadialGradient(B.viewW/2,B.viewH/2,Math.min(B.viewW,B.viewH)*.18,B.viewW/2,B.viewH/2,Math.max(B.viewW,B.viewH)*.72);
 g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.72,`rgba(0,0,0,${.38+.10*pulse})`);g.addColorStop(1,`rgba(0,0,0,${.78+.08*pulse})`);
 ctx.fillStyle=g;ctx.fillRect(0,0,B.viewW,B.viewH);
}
function drawCastleDetails(ctx){
 ctx.save();
 ctx.globalAlpha=.58;
 for(const t of [[38,42],[390,55],[650,80],[165,235],[390,235],[650,250],[245,450],[400,455],[650,450]]){
  ctx.fillStyle='#ffbf62';ctx.shadowColor='#ff8a3d';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(t[0],t[1],5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#7a4930';ctx.shadowBlur=0;ctx.fillRect(t[0]-2,t[1]+5,4,9);
 }
 ctx.globalAlpha=.25;ctx.strokeStyle='#7c7186';ctx.lineWidth=2;
 for(let x=20;x<WORLD.w;x+=85){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,18);ctx.stroke()}
 ctx.restore();
}
function drawKnight(ctx,p){ctx.save();ctx.translate(p.x,p.y);if(p.inv>0)ctx.globalAlpha=.5;ctx.fillStyle='#0009';ctx.beginPath();ctx.ellipse(0,18,21,8,0,0,Math.PI*2);ctx.fill();ctx.font='36px system-ui, Apple Color Emoji, Segoe UI Emoji';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🤴',0,-2);ctx.strokeStyle='#8bd4ff';ctx.lineWidth=3;ctx.shadowColor='#8bd4ff';ctx.shadowBlur=13;ctx.beginPath();ctx.moveTo(p.dir==='left'?-17:p.dir==='right'?17:0,p.dir==='up'?-15:p.dir==='down'?19:2);ctx.lineTo(p.dir==='left'?-32:p.dir==='right'?32:p.dir==='up'?0:0,p.dir==='up'?-15:p.dir==='down'?32:p.dir==='left'||p.dir==='right'?2:0);ctx.stroke();ctx.restore()}
function drawMonster(ctx,m){ctx.save();ctx.translate(m.x,m.y);if(m.flash>0)ctx.globalAlpha=.5;ctx.fillStyle='#0009';ctx.beginPath();ctx.ellipse(0,20,22,8,0,0,Math.PI*2);ctx.fill();ctx.font='34px system-ui, Apple Color Emoji, Segoe UI Emoji';ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='#ff9d4d';ctx.shadowBlur=12;ctx.fillText('👹',0,0);ctx.restore()}
function drawKing(ctx,k){ctx.save();ctx.translate(k.x,k.y);if(k.flash>0)ctx.globalAlpha=.5;ctx.fillStyle='#000a';ctx.beginPath();ctx.ellipse(0,22,27,10,0,0,Math.PI*2);ctx.fill();ctx.font='43px system-ui, Apple Color Emoji, Segoe UI Emoji';ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor=k.phase===2?'#ff243e':'#ff5263';ctx.shadowBlur=k.phase===2?25:16;ctx.fillText('👺',0,0);ctx.restore()}
function drawShot(ctx,s){ctx.save();ctx.translate(s.x,s.y);ctx.rotate(Math.atan2(s.vy,s.vx));ctx.fillStyle=s.owner==='p'?'#eaf7ff':'#ff5263';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=12;ctx.fillRect(-10,-3,20,6);ctx.restore()}
function winBattle(){if(!B.running)return;B.running=false;B.king.dead=true;stopBattleAudio();B.cleanup?.();const death=document.querySelector('#death');if(death)death.innerHTML='<div class="deathKingBig">👺</div><div class="deathLine">“YES UR INDEED SUPREME TORTURER MANNN...”</div><div class="deathLine">“U DESERVE HERRR... LOL.”</div>';msg('THE MONSYETER KING FALLS...');setTimeout(reunion,2600)}
function loseBattle(){if(!B.running)return;B.running=false;stopBattleAudio();B.cleanup?.();page(`<div class="hero">💔</div><h2>WOLFY FELL...</h2><p>The Princess is still waiting inside the castle.</p><button class="btn" onclick="boss()">⚔️ TRY AGAIN</button>`)}
function reunion(){page(`<div class="reunion"><div class="castleGlow">🏰</div><div class="reunionScene"><div class="person wolfy">🤴</div><div class="heartBurst">❤️</div><div class="person princess">👸</div></div><h1>YOU FOUND HER.</h1><div class="box"><h2>THE PRINCE & HIS PRINCESS</h2><p>The Evil King is gone.</p><p><b>Wolfy finally reaches his Princess.</b></p><p class="hug">🤴❤️🤗❤️👸</p><p><b>And finally... the hug he came for. 💕</b></p></div><button class="btn" onclick="birthdayEnd()">💕 ONE LAST THING...</button></div>`)}
function birthdayEnd(){page(`<div class="hero">🤴❤️👸</div><h1>GAME OVER</h1><div class="box"><h2>THERE'S A BIRTHDAY SURPRISE VIDEO FOR U LOVEE 💕</h2><p>You defeated the MONSYETER KING, saved your Princess, and completed the quest.</p><p class="small">Your Princess has something waiting for you outside the game. 🥹❤️</p></div><p class="small">THE END · WOLFY & HIS PRINCESS</p>`)}

let audioCtx=null,audioNodes=[];
function startBattleAudio(){
 try{
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  const master=audioCtx.createGain();master.gain.value=.035;master.connect(audioCtx.destination);
  const o=audioCtx.createOscillator(),og=audioCtx.createGain();o.type='sine';o.frequency.value=48;og.gain.value=.6;o.connect(og);og.connect(master);o.start();
  const lfo=audioCtx.createOscillator(),lg=audioCtx.createGain();lfo.frequency.value=.13;lg.gain.value=16;lfo.connect(lg);lg.connect(o.frequency);lfo.start();
  const o2=audioCtx.createOscillator(),g2=audioCtx.createGain();o2.type='triangle';o2.frequency.value=82;g2.gain.value=.08;o2.connect(g2);g2.connect(master);o2.start();
  const lfo2=audioCtx.createOscillator(),lg2=audioCtx.createGain();lfo2.frequency.value=.55;lg2.gain.value=.035;lfo2.connect(lg2);lg2.connect(g2.gain);lfo2.start();
  audioNodes=[o,lfo,o2,lfo2,master,og,lg,g2,lg2];
 }catch(e){}
}
function stopBattleAudio(){if(!audioCtx)return;try{audioNodes.forEach(n=>{try{n.stop?.()}catch(e){}});audioCtx.close()}catch(e){}audioCtx=null;audioNodes=[]}

start();
