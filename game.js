const g=document.querySelector('#game');
const S={q:0,score:0,sit:0,first:null,pairs:0,hp:100,lock:false};
const Q=[
['On which date prince and princess married each other?',['11 April','27 april','22 may','18 june'],2],
['What was prince first impress of princess',["She's smart","She's pretty","She's lazy","She's a boy"],3],
['What would ur wife say if she is shy?',['Moon is beautiful','Meaw','Atoms r kewl/hawt','All of the above'],3],
['What is most important for a relationship?',['Looks','Chicks','Lust','Loyality'],3],
['What is princess dream?',['Go to a beach','Pet a cat','Eat ice-cream','Shower with prince husband (better dessert 😏)'],3],
['Prince dream home MUST have?',['Theatre room','Sauna room','Hall','Soundproof big bedroom with attached shower room 😏'],3],
["What's something that will make her upset?",['not saying I love u back','Kissing back','Hugging back','All of the above'],3],
['Which song is prince least favourite?',['Skyfall','Most songs by c418','Playful massacre song for wembu','Rickroll'],3],
['His is famous called as what by basement kids?',['Powerless guy','Pookie','Wolfy','Supreme torturer'],3],
['What is heroz most important Mission?',['Save his wife from "monsyeter"','Pet a wolf','Spend time with Princess\'s sister 🤨','Kill spiders'],0]
];
const situations=[
["If a clone of me appeared that was 20% more pretty and cooked better 5 star meals, but clearly lacked my chaotic energy humour, how long before you realized it wasn't the real me?",["Within seconds honey, c'mon ilysm","Might take me a while to differentiate, till then I'll spend time w that shawty😍"],0],
["If I suddenly gained the ability to speak fluently to pigeons and decided to assemble a local bird spy team irl to do my detective work, would you join my bird empire ?",['No that\'s boring','Ofc love 😘, we\'ll be better than cbi'],1],
["If I got turned into a worm, would you keep me in a nice little box with fancy dirt, or would you take me everywhere in your pocket?",["You'll always be with me sweetheart",'No ew you always be covered in mud , i would love u 😒😒'],0]
];
function page(x){g.innerHTML=`<div class="wrap">${x}</div>`}
function start(){page(`<div class="hero">👑</div><h1>THE BOYFRIEND<br>BIRTHDAY QUEST</h1><p>Your Princess has been locked away by the Evil King.</p><p class="small">One Prince. One kingdom. One extremely suspicious amount of spiders.</p><button class="btn" onclick="trial1()">⚔️ ENTER THE KINGDOM</button>`)}
function trial1(){S.q=0;S.score=0;quiz()}
function quiz(){let q=Q[S.q];page(`<p class="small">THE FIRST TRIAL · ${S.q+1}/10</p><div class="progress"><i style="width:${(S.q/10)*100}%"></i></div><h2>🧠 PROVE YOU KNOW THE PRINCESS</h2><div class="box"><h3>${q[0]}</h3></div>${q[1].map((a,i)=>`<button class="btn" onclick="answer(${i})">${'ABCD'[i]}. ${a}</button>`).join('')}`)}
function answer(i){let q=Q[S.q],ok=i===q[2];if(ok)S.score++;page(`<div class="hero">${ok?'💗':'😭'}</div><h2>${ok?'CORRECT!':'WRONG ANSWER!'}</h2><p>${ok?'The Princess is impressed.':'The Evil King is taking notes. 👺'}</p><p class="small">Score: ${S.score}/${S.q+1}</p><button class="btn" onclick="${S.q<9?'S.q++;quiz()':'kingTaunt()'}">CONTINUE ➜</button>`)}
function kingTaunt(){page(`<div class="hero">👺</div><p class="small">THE EVIL KING</p><div class="box"><h2>“Damn. You’re certified husband material.”</h2><p>“...well, I still bet you can’t defeat me.”</p><p><b>“I’m the cruel MONSYETER KING, with the powers of the FINAL BOSS OF ALL SPIDERS COMBINED 👺”</b></p><h2>“FIGHT MEEEEEE, YOU LIL WOLF.” 🐺⚔️</h2></div><button class="btn" onclick="trial2()">🗝️ FACE THE SECOND TRIAL</button>`)}
function trial2(){S.sit=0;scenario()}
function scenario(){let q=situations[S.sit];page(`<p class="small">THE SECOND TRIAL · ${S.sit+1}/3</p><div class="progress"><i style="width:${(S.sit/3)*100}%"></i></div><h2>💗 THE HUSBAND TEST</h2><div class="box"><h3>${q[0]}</h3></div>${q[1].map((a,i)=>`<button class="btn" onclick="sitAnswer(${i})">${'AB'[i]}. ${a}</button>`).join('')}`)}
function sitAnswer(i){let q=situations[S.sit],ok=i===q[2];page(`<div class="hero">${ok?'🥹':'👺'}</div><h2>${ok?'THE PRINCESS APPROVES':'THE KING LAUGHS MENACINGLY'}</h2><p>${ok?'Correct. Certified lil wolf. 🐺❤️':'That answer has been added to the Evil King’s evidence.'}</p><button class="btn" onclick="${S.sit<2?'S.sit++;scenario()':'memory()'}">CONTINUE ➜</button>`)}
function memory(){S.first=null;S.lock=false;S.pairs=0;let a=['❤️','🌙','🎮','💌','⭐','👑'],arr=[...a,...a].sort(()=>Math.random()-.5);page(`<p class="small">THE THIRD TRIAL</p><h2>🧩 THE MEMORY GATE</h2><p class="small">Match the symbols to open the castle gate.</p><div class="grid">${arr.map(x=>`<button class="card" data-v="${x}" onclick="flip(this)">?</button>`).join('')}</div>`)}
function flip(el){if(S.lock||el.classList.contains('open'))return;el.classList.add('open');el.textContent=el.dataset.v;if(!S.first){S.first=el;return}let f=S.first;S.first=null;if(f.dataset.v===el.dataset.v){S.pairs++;f.disabled=el.disabled=true;if(S.pairs===6)setTimeout(bossIntro,450)}else{S.lock=true;setTimeout(()=>{f.classList.remove('open');el.classList.remove('open');f.textContent=el.textContent='?';S.lock=false},650)}}
function bossIntro(){page(`<div class="hero">🏰</div><h2>THE KING'S KEEP</h2><div class="box"><p>The castle doors open.</p><p>Behind them stands the MONSYETER KING.</p><p class="small">Your Princess is somewhere beyond him.</p></div><button class="btn" onclick="boss()">⚔️ ENTER THE BATTLEFIELD</button>`)}

/* ========================= FINAL BATTLE ========================= */
let B=null;

function boss(){
  const bonus=Math.min(80,S.score*8);
  B={running:true, last:performance.now(), lastKing:performance.now(), audio:null,
    player:{x:58,y:60,hp:150+bonus,maxHp:150+bonus,dir:'right',cool:0,shield:false,inv:0},
    king:{x:620,y:430,hp:180,maxHp:180,dir:'left',cool:2600,inv:0,flash:0,dead:false},
    keys:{}, shots:[], particles:[], sparks:[], walls:[], shake:0, msgTimer:0, deathTimer:0, win:false
  };
  page(`<p class="small">THE FINAL TRIAL</p><h2>⚔️ WOLFY VS THE MONSYETER KING</h2><div class="battleHud"><div><b>🐺 WOLFY · KNIGHT</b><div class="bar"><i id="php"></i></div><span id="pht"></span></div><div><b>👺 MONSYETER KING</b><div class="bar enemy"><i id="khp"></i></div><span id="kht"></span></div></div><div id="arena" class="mazeArena"><canvas id="battleCanvas"></canvas><div class="bossWarning" id="bossWarning">THE KING HUNTS YOU...</div><div class="battleText" id="battleText">Move through the castle maze. Hide behind walls. Shoot when you have a clear line.</div><div class="deathOverlay" id="death"></div></div><div class="battleControls"><div class="dpad"><button data-dir="up">▲</button><div><button data-dir="left">◀</button><button data-dir="down">▼</button><button data-dir="right">▶</button></div></div><div class="combatBtns"><button class="combat attackBtn" id="attackBtn">✨ SHOOT</button><button class="combat shieldBtn" id="shieldBtn">🛡️ SHIELD</button></div></div><p class="hint">Like a tiny castle maze: move, hide, aim and shoot. Desktop: WASD / arrows · Space = shoot · hold Shift = shield.</p>`);
  startBattle();
}

function startBattle(){
  const c=document.querySelector('#battleCanvas');
  B.canvas=c; B.ctx=c.getContext('2d');
  buildMaze(); resizeBattle();
  window.addEventListener('resize',resizeBattle);
  bindBattleControls();
  startBattleAudio();
  updateBattleHud();
  battleMsg('Find a good corridor. The King can only shoot when he can see Wolfy.');
  B.last=performance.now(); B.lastKing=performance.now();
  requestAnimationFrame(battleLoop);
}

function buildMaze(){
  // Coordinates are based on the logical 680x520 arena and scaled to the phone viewport.
  B.walls=[
    {x:150,y:35,w:28,h:150},{x:150,y:250,w:28,h:120},
    {x:275,y:100,w:130,h:28},{x:275,y:100,w:28,h:130},
    {x:275,y:300,w:130,h:28},{x:377,y:300,w:28,h:145},
    {x:490,y:45,w:28,h:145},{x:490,y:255,w:28,h:120},
    {x:575,y:155,w:70,h:28},{x:70,y:405,w:145,h:28},
    {x:510,y:405,w:110,h:28},{x:70,y:190,w:90,h:28}
  ];
}

function resizeBattle(){
  if(!B?.canvas)return;
  const arena=document.querySelector('#arena'); if(!arena)return;
  const r=arena.getBoundingClientRect();
  const scale=Math.min(r.width/680,r.height/520);
  B.scale=scale; B.ox=(r.width-680*scale)/2; B.oy=(r.height-520*scale)/2;
  const d=window.devicePixelRatio||1;
  B.canvas.width=Math.floor(r.width*d); B.canvas.height=Math.floor(r.height*d);
  B.canvas.style.width=r.width+'px'; B.canvas.style.height=r.height+'px';
  B.ctx.setTransform(d,0,0,d,0,0); B.viewW=r.width; B.viewH=r.height;
}

function bindBattleControls(){
  const down=e=>{if(!B?.running)return; const k=e.key.toLowerCase();
    if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','shift',' '].includes(k))e.preventDefault();
    if(k===' ')playerShoot(); else B.keys[k]=true;
  };
  const up=e=>{if(B)B.keys[e.key.toLowerCase()]=false};
  window.addEventListener('keydown',down); window.addEventListener('keyup',up);
  const buttons=document.querySelectorAll('[data-dir]');
  buttons.forEach(btn=>{
    const d=btn.dataset.dir;
    const on=e=>{e.preventDefault();B.keys[d]=true};
    const off=e=>{e.preventDefault();B.keys[d]=false};
    btn.addEventListener('pointerdown',on); btn.addEventListener('pointerup',off); btn.addEventListener('pointercancel',off); btn.addEventListener('pointerleave',off);
  });
  const a=document.querySelector('#attackBtn');
  a.addEventListener('pointerdown',e=>{e.preventDefault();playerShoot()});
  const sh=document.querySelector('#shieldBtn');
  const son=e=>{e.preventDefault();B.keys.shield=true}; const soff=e=>{e.preventDefault();B.keys.shield=false};
  sh.addEventListener('pointerdown',son); sh.addEventListener('pointerup',soff); sh.addEventListener('pointercancel',soff); sh.addEventListener('pointerleave',soff);
  B.cleanup=()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('resize',resizeBattle);stopBattleAudio()};
}

function worldPos(x,y){return {x:B.ox+x*B.scale,y:B.oy+y*B.scale}}
function toWorld(x,y){return {x:(x-B.ox)/B.scale,y:(y-B.oy)/B.scale}}
function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
function circleHitsWall(x,y,r=13){return B.walls.some(w=>x+r>w.x&&x-r<w.x+w.w&&y+r>w.y&&y-r<w.y+w.h)}
function movePlayer(dx,dy){
  const p=B.player; const speed=2.9;
  if(dx||dy){const l=Math.hypot(dx,dy);dx/=l;dy/=l;if(Math.abs(dx)>Math.abs(dy))p.dir=dx>0?'right':'left';else p.dir=dy>0?'down':'up';}
  const sx=dx*speed,sy=dy*speed;
  const nx=Math.max(20,Math.min(660,p.x+sx)),ny=Math.max(20,Math.min(500,p.y+sy));
  if(!circleHitsWall(nx,p.y,13))p.x=nx;
  if(!circleHitsWall(p.x,ny,13))p.y=ny;
}
function moveKing(){
  const k=B.king,p=B.player;
  if(k.dead)return;
  const d=dist(k,p); if(d<1)return;
  let dx=(p.x-k.x)/d,dy=(p.y-k.y)/d;
  // Keep the King simple and responsive: he follows, but walls constrain him.
  const speed=d>150?0.78:0.42;
  const nx=Math.max(20,Math.min(660,k.x+dx*speed)),ny=Math.max(20,Math.min(500,k.y+dy*speed));
  if(!circleHitsWall(nx,k.y,15))k.x=nx;
  if(!circleHitsWall(k.x,ny,15))k.y=ny;
  if(Math.abs(dx)>Math.abs(dy))k.dir=dx>0?'right':'left';else k.dir=dy>0?'down':'up';
}
function lineBlocked(a,b){
  for(const w of B.walls){if(segmentIntersectsRect(a.x,a.y,b.x,b.y,w))return true}
  return false;
}
function segmentIntersectsRect(x1,y1,x2,y2,r){
  // Liang-Barsky style clipping.
  let t0=0,t1=1,dx=x2-x1,dy=y2-y1;
  const p=[-dx,dx,-dy,dy],q=[x1-r.x,r.x+r.w-x1,y1-r.y,r.y+r.h-y1];
  for(let i=0;i<4;i++){if(p[i]===0){if(q[i]<0)return false;continue}const t=q[i]/p[i];if(p[i]<0){if(t>t1)return false;if(t>t0)t0=t}else{if(t<t0)return false;if(t<t1)t1=t}}
  return t0<1&&t1>0;
}
function playerShoot(){
  if(!B?.running||B.win||B.player.cool>0)return;
  const p=B.player,k=B.king;
  if(!lineBlocked(p,k)){
    const dx=k.x-p.x,dy=k.y-p.y,l=Math.hypot(dx,dy)||1;
    B.shots.push({x:p.x,y:p.y,vx:dx/l*8,vy:dy/l*8,owner:'player',life:0});
    p.cool=420; sfx('shoot'); battleMsg('✨ WOLFY FIRES HIS MAGIC SHOT!');
  }else{battleMsg('🧱 WALL BLOCKS THE SHOT — move around the corner!')}
}
function kingShoot(){
  if(!B.running||B.king.dead)return;
  const p=B.player,k=B.king;
  if(lineBlocked(k,p)){battleMsg('🧱 The castle wall protects Wolfy!'); B.lastKing=performance.now();return}
  const d=dist(k,p),dx=(p.x-k.x)/(d||1),dy=(p.y-k.y)/(d||1);
  B.shots.push({x:k.x,y:k.y,vx:dx*7,vy:dy*7,owner:'king',life:0});
  k.cool=5000; B.lastKing=performance.now(); sfx('enemy');
  const w=document.querySelector('#bossWarning');if(w){w.textContent='⚠️ INCOMING MAGIC!';w.classList.add('danger');setTimeout(()=>w.classList.remove('danger'),700)}
  battleMsg('👺 THE KING LAUNCHES HIS MAGIC WEAPON!');
}
function updateBattle(dt,now){
  if(!B.running)return;
  const p=B.player,k=B.king;
  let dx=0,dy=0;
  if(B.keys.w||B.keys.arrowup||B.keys.up)dy--;
  if(B.keys.s||B.keys.arrowdown||B.keys.down)dy++;
  if(B.keys.a||B.keys.arrowleft||B.keys.left)dx--;
  if(B.keys.d||B.keys.arrowright||B.keys.right)dx++;
  movePlayer(dx,dy);
  p.shield=!!B.keys.shield; p.cool=Math.max(0,p.cool-dt);p.inv=Math.max(0,p.inv-dt);k.flash=Math.max(0,k.flash-dt);
  moveKing();
  if(now-B.lastKing>=5000)kingShoot();
  for(let i=B.shots.length-1;i>=0;i--){
    const s=B.shots[i];s.x+=s.vx*dt/16.67;s.y+=s.vy*dt/16.67;s.life+=dt;
    if(s.x<10||s.x>670||s.y<10||s.y>510||circleHitsWall(s.x,s.y,5)){B.shots.splice(i,1);continue}
    const target=s.owner==='player'?k:p;
    if(!target.dead&&dist(s,target)<20){
      if(s.owner==='player'){
        k.hp=Math.max(0,k.hp-18);k.flash=180;B.shake=90;burst(k.x,k.y,'#d9eaff',12);sfx('hit');battleMsg('💥 DIRECT HIT! KING HP -18');
        if(k.hp<=0){B.shots.splice(i,1);battleWin();return}
      }else{
        if(p.inv<=0){
          if(p.shield){p.inv=180;B.shake=45;burst(p.x,p.y,'#b9d8ff',8);sfx('block');battleMsg('🛡️ SHIELD BLOCK!');}
          else{p.hp=Math.max(0,p.hp-14);p.inv=700;B.shake=120;burst(p.x,p.y,'#ff7180',10);sfx('hurt');battleMsg('💥 WOLFY HIT! SHIELD OR HIDE!');if(p.hp<=0){battleLose();return}}
        }
      }
      B.shots.splice(i,1);
    }
  }
  updateParticles(dt);B.shake=Math.max(0,B.shake-dt);updateBattleHud();
}
function updateBattleHud(){
  const ph=document.querySelector('#php'),kh=document.querySelector('#khp');
  if(ph)ph.style.width=Math.max(0,B.player.hp/B.player.maxHp*100)+'%';
  if(kh)kh.style.width=Math.max(0,B.king.hp/B.king.maxHp*100)+'%';
  const pt=document.querySelector('#pht'),kt=document.querySelector('#kht');
  if(pt)pt.textContent=`${Math.ceil(B.player.hp)}/${B.player.maxHp} HP`;
  if(kt)kt.textContent=`${Math.ceil(B.king.hp)}/${B.king.maxHp} HP`;
}
function battleMsg(t){const e=document.querySelector('#battleText');if(e)e.textContent=t}
function burst(x,y,c,n=8){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=1+Math.random()*2.5;B.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:350,max:350,c})}}
function updateParticles(dt){for(let i=B.particles.length-1;i>=0;i--){const q=B.particles[i];q.x+=q.vx*dt/16.67;q.y+=q.vy*dt/16.67;q.life-=dt;if(q.life<=0)B.particles.splice(i,1)}}

function drawBattle(){
  const ctx=B.ctx;ctx.clearRect(0,0,B.viewW,B.viewH);ctx.save();ctx.translate(B.ox,B.oy);ctx.scale(B.scale,B.scale);
  ctx.fillStyle='#070910';ctx.fillRect(0,0,680,520);
  ctx.fillStyle='#151820';ctx.fillRect(8,8,664,504);
  // top-down stone tiles
  ctx.strokeStyle='#20252d';ctx.lineWidth=1;
  for(let x=12;x<672;x+=34){ctx.beginPath();ctx.moveTo(x,10);ctx.lineTo(x,510);ctx.stroke()}
  for(let y=12;y<512;y+=34){ctx.beginPath();ctx.moveTo(10,y);ctx.lineTo(670,y);ctx.stroke()}
  // maze walls
  for(const w of B.walls){
    ctx.fillStyle='#343943';ctx.fillRect(w.x,w.y,w.w,w.h);
    ctx.fillStyle='#515866';ctx.fillRect(w.x,w.y,w.w,6);
    ctx.fillStyle='#242831';ctx.fillRect(w.x+4,w.y+8,Math.max(1,w.w-8),Math.max(1,w.h-12));
  }
  // subtle line of sight, only when visible
  if(!lineBlocked(B.player,B.king)){ctx.strokeStyle='rgba(255,70,80,.12)';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(B.player.x,B.player.y);ctx.lineTo(B.king.x,B.king.y);ctx.stroke()}
  drawPrinceTop(ctx,B.player);drawKingTop(ctx,B.king);
  for(const s of B.shots)drawMagicShot(ctx,s);
  for(const q of B.particles){ctx.globalAlpha=Math.max(0,q.life/q.max);ctx.fillStyle=q.c;ctx.beginPath();ctx.arc(q.x,q.y,3,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;
  if(B.shake>0){/* shake is applied by the outer loop */}
  ctx.restore();
}
function drawPrinceTop(ctx,p){
  ctx.save();ctx.translate(p.x,p.y);if(p.inv>0)ctx.globalAlpha=.55;
  // Knight shadow, boots, armor, cape, helmet and plume.
  ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(0,13,19,8,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#5b202d';ctx.beginPath();ctx.moveTo(-14,3);ctx.lineTo(14,3);ctx.lineTo(18,19);ctx.lineTo(-18,19);ctx.closePath();ctx.fill();
  ctx.fillStyle='#cfd7e2';ctx.beginPath();ctx.arc(0,-3,15,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#747e8d';ctx.fillRect(-12,-10,24,8);ctx.fillStyle='#1a1e26';ctx.fillRect(-10,-7,20,5);
  ctx.fillStyle='#d9b14b';ctx.beginPath();ctx.moveTo(-11,-16);ctx.lineTo(-5,-26);ctx.lineTo(0,-17);ctx.lineTo(7,-27);ctx.lineTo(12,-16);ctx.closePath();ctx.fill();
  ctx.fillStyle='#e5edf8';ctx.fillRect(-4,8,8,9);
  // magic blaster / sword-gun
  ctx.fillStyle='#bcdcff';ctx.shadowBlur=9;ctx.shadowColor='#9cc8ff';ctx.fillRect(10,-3,25,6);ctx.fillStyle='#8b6b39';ctx.fillRect(13,3,6,9);ctx.shadowBlur=0;
  ctx.restore();
}
function drawKingTop(ctx,k){
  ctx.save();ctx.translate(k.x,k.y);if(k.dead)ctx.globalAlpha=.5;ctx.globalAlpha*=k.flash>0?0.45:1;
  ctx.fillStyle='rgba(0,0,0,.5)';ctx.beginPath();ctx.ellipse(0,16,25,10,0,0,Math.PI*2);ctx.fill();
  // monstrous armor/body
  ctx.fillStyle='#17171d';ctx.beginPath();ctx.moveTo(-21,3);ctx.lineTo(21,3);ctx.lineTo(17,30);ctx.lineTo(-17,30);ctx.closePath();ctx.fill();
  ctx.fillStyle='#54242c';ctx.beginPath();ctx.arc(0,-8,17,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#d83c4d';ctx.beginPath();ctx.arc(-7,-10,3,0,Math.PI*2);ctx.arc(7,-10,3,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#c49b3d';ctx.beginPath();ctx.moveTo(-19,-21);ctx.lineTo(-11,-34);ctx.lineTo(-3,-23);ctx.lineTo(4,-35);ctx.lineTo(11,-23);ctx.lineTo(19,-21);ctx.closePath();ctx.fill();
  ctx.fillStyle='#ff5260';ctx.shadowBlur=12;ctx.shadowColor='#ff3345';ctx.fillRect(-39,-3,-26,6);ctx.fillStyle='#9b7335';ctx.fillRect(-17,-7,6,14);ctx.shadowBlur=0;
  ctx.restore();
}
function drawMagicShot(ctx,s){
  ctx.save();ctx.translate(s.x,s.y);ctx.rotate(Math.atan2(s.vy,s.vx));
  ctx.shadowBlur=16;ctx.shadowColor=s.owner==='king'?'#ff3348':'#9fd1ff';ctx.fillStyle=s.owner==='king'?'#ff5161':'#e7f4ff';
  ctx.fillRect(-14,-3,28,6);ctx.fillStyle=s.owner==='king'?'#7b2530':'#7296c0';ctx.fillRect(-4,-7,8,14);ctx.restore();
}
function battleLoop(now){
  if(!B?.running)return;
  const dt=Math.min(34,now-B.last);B.last=now;updateBattle(dt,now);
  B.ctx.save();if(B.shake>0)B.ctx.translate((Math.random()-.5)*5,(Math.random()-.5)*5);drawBattle();B.ctx.restore();
  requestAnimationFrame(battleLoop);
}
function battleWin(){
  if(!B?.running||B.win)return;B.win=true;B.running=false;B.cleanup?.();
  const death=document.querySelector('#death');
  if(death)death.innerHTML='<div class="deathKingBig">👺</div><div class="deathLine">“YES... UR INDEED THE SUPREME TORTURER MANNN...”</div><div class="deathLine">“U DESERVE HERRR... LOL.”</div>';
  battleMsg('THE MONSYETER KING FALLS...');sfx('win');
  setTimeout(reunion,2600);
}
function battleLose(){
  if(!B?.running)return;B.running=false;B.cleanup?.();
  page(`<div class="hero">💔</div><h2>WOLFY FELL...</h2><p>The Princess is still waiting inside the castle.</p><button class="btn" onclick="boss()">⚔️ TRY AGAIN</button>`);
}
function reunion(){
  page(`<div class="reunion"><div class="castleGlow">🏰</div><div class="reunionScene"><div class="person wolfy">🐺</div><div class="heartBurst">❤️</div><div class="person princess">👑</div></div><h1>YOU FOUND HER.</h1><div class="box"><h2>THE PRINCE & HIS PRINCESS</h2><p>The Evil King is gone.</p><p><b>Wolfy finally reaches his Princess.</b></p><p class="hug">🐺❤️🤗❤️👑</p><p>And after everything he went through...</p><p><b>he finally gets the hug he came for. 💕</b></p></div><button class="btn" onclick="birthdayEnd()">💕 ONE LAST THING...</button></div>`);
}
function birthdayEnd(){
  page(`<div class="hero">👑💕</div><h1>GAME OVER</h1><div class="box"><h2>THERE'S A BIRTHDAY SURPRISE VIDEO FOR U LOVEE 💕</h2><p>You defeated the MONSYETER KING, saved your Princess, and completed the quest.</p><p class="small">Your Princess has something waiting for you outside the game. 🥹❤️</p></div><p class="small">THE END · WOLFY & HIS PRINCESS</p>`);
}

/* Tiny synthesized atmosphere — starts only after the user enters the battle, so mobile browsers allow it. */
function startBattleAudio(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    const ac=new AC();B.audio=ac;if(ac.state==='suspended')ac.resume();
    const master=ac.createGain();master.gain.value=.035;master.connect(ac.destination);
    const osc=ac.createOscillator(),gain=ac.createGain();osc.type='sine';osc.frequency.value=55;gain.gain.value=.35;osc.connect(gain).connect(master);osc.start();B.audioDrone={osc,gain,master};
  }catch(e){B.audio=null}
}
function stopBattleAudio(){if(!B?.audio)return;try{B.audio.close()}catch(e){}}
function sfx(type){
  const ac=B?.audio;if(!ac)return;try{
    const o=ac.createOscillator(),g=ac.createGain();o.connect(g).connect(B.audioDrone.master);
    const now=ac.currentTime;let f=type==='shoot'?480:type==='hit'?120:type==='hurt'?75:type==='block'?250:type==='enemy'?180:70;
    o.type=type==='hurt'||type==='enemy'?'sawtooth':'triangle';o.frequency.setValueAtTime(f,now);o.frequency.exponentialRampToValueAtTime(Math.max(35,f*.45),now+.12);g.gain.setValueAtTime(.22,now);g.gain.exponentialRampToValueAtTime(.001,now+.14);o.start(now);o.stop(now+.15);
  }catch(e){}
}
