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
  const bonus=Math.min(45,S.score*4); // reward for the trials: 100-140+ HP
  B={running:true,player:{x:80,y:300,hp:100+bonus,maxHp:100+bonus,shield:0,inv:0,attackCd:0},king:{x:640,y:220,hp:260,maxHp:260,attackCd:1800,stagger:0},keys:{},last:performance.now(),lastKing:performance.now(),projectiles:[],particles:[],walls:[
    {x:250,y:95,w:55,h:220},{x:420,y:310,w:55,h:150},{x:560,y:70,w:45,h:150},{x:105,y:420,w:170,h:42}
  ],shake:0,hitFlash:0,closeLock:0};
  page(`<p class="small">FINAL BATTLE · WOLFY VS THE MONSYETER KING</p><div class="battleHud"><div><b>🐺 WOLFY</b><div class="bar"><i id="php" style="width:100%"></i></div><span id="pht">${B.player.hp}/${B.player.maxHp} HP</span></div><div><b>👺 MONSYETER KING</b><div class="bar enemy"><i id="khp" style="width:100%"></i></div><span id="kht">260/260 HP</span></div></div><div id="arena" class="battleArena"><canvas id="battleCanvas"></canvas><div id="battleWarn" class="battleWarn">FIND HIM. USE THE WALLS.</div><div id="battleText" class="battleText">Move Wolfy around the castle. If the King can see you, he can throw his magical sword.</div><div id="death" class="deathOverlay"></div></div><div class="battleControls"><div class="dpad"><button data-dir="up">▲</button><div><button data-dir="left">◀</button><button data-dir="down">▼</button><button data-dir="right">▶</button></div></div><div class="combatBtns"><button class="combat attackBtn" id="attackBtn">⚔️ ATTACK</button><button class="combat shieldBtn" id="shieldBtn">🛡️ SHIELD</button></div></div><p class="hint">Desktop: WASD / arrows to move · Space or Attack to throw sword · hold Shift/Shield to block. On phone, use the movement pad + buttons.</p>`);
  startBattle();
}
function startBattle(){
  const c=document.querySelector('#battleCanvas'),arena=document.querySelector('#arena');
  B.canvas=c;B.ctx=c.getContext('2d');
  resizeBattle(); window.addEventListener('resize',resizeBattle);
  B.last=performance.now(); B.lastKing=performance.now();
  bindBattleControls();
  battleLoop(B.last);
}
function resizeBattle(){if(!B?.canvas)return;const r=document.querySelector('#arena').getBoundingClientRect();B.canvas.width=Math.floor(r.width*devicePixelRatio);B.canvas.height=Math.floor(r.height*devicePixelRatio);B.w=r.width;B.h=r.height;B.ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
function bindBattleControls(){
  const k=e=>{B.keys[e.key.toLowerCase()]=true;if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase()))e.preventDefault();if(e.code==='Space'){e.preventDefault();playerAttack()}};
  const u=e=>{B.keys[e.key.toLowerCase()]=false};window.addEventListener('keydown',k);window.addEventListener('keyup',u);B.cleanup=()=>{window.removeEventListener('keydown',k);window.removeEventListener('keyup',u);window.removeEventListener('resize',resizeBattle)};
  document.querySelectorAll('[data-dir]').forEach(btn=>{const d=btn.dataset.dir;const on=e=>{e.preventDefault();B.keys[d]=true};const off=e=>{e.preventDefault();B.keys[d]=false};btn.addEventListener('pointerdown',on);btn.addEventListener('pointerup',off);btn.addEventListener('pointercancel',off);btn.addEventListener('pointerleave',off)});
  const ab=document.querySelector('#attackBtn');ab.addEventListener('pointerdown',e=>{e.preventDefault();playerAttack()});
  const sb=document.querySelector('#shieldBtn');const on=e=>{e.preventDefault();B.keys.shield=true};const off=e=>{e.preventDefault();B.keys.shield=false};sb.addEventListener('pointerdown',on);sb.addEventListener('pointerup',off);sb.addEventListener('pointercancel',off);sb.addEventListener('pointerleave',off);
}
function blockedByWall(a,b){for(const w of B.walls){if(segmentRect(a.x,a.y,b.x,b.y,w))return true}return false}
function segmentRect(x1,y1,x2,y2,r){for(let i=0;i<=24;i++){const t=i/24,x=x1+(x2-x1)*t,y=y1+(y2-y1)*t;if(x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h)return true}return false}
function moveEntity(e,dx,dy){let nx=Math.max(22,Math.min(B.w-22,e.x+dx)),ny=Math.max(25,Math.min(B.h-45,e.y+dy));if(!circleWalls(nx,ny,17))e.x=nx;if(!circleWalls(e.x,ny,17))e.y=ny}
function circleWalls(x,y,rad){return B.walls.some(w=>x+rad>w.x&&x-rad<w.x+w.w&&y+rad>w.y&&y-rad<w.y+w.h)}
function playerAttack(){if(!B?.running||B.player.attackCd>0||B.player.hp<=0)return;B.player.attackCd=520;const p=B.player,k=B.king,visible=!blockedByWall(p,k);if(!visible){battleMsg('The wall blocks your magical sword. Get a clear line!');return}launchSword(p,k,'player');battleMsg('WOLFY THROWS THE MAGICAL SWORD! ⚔️');}
function launchSword(from,to,owner){const dx=to.x-from.x,dy=to.y-from.y,len=Math.hypot(dx,dy)||1;B.projectiles.push({x:from.x,y:from.y,vx:dx/len*7,vy:dy/len*7,owner,life:0,max:75});}
function kingAttack(){if(!B.running)return;const p=B.player,k=B.king;if(blockedByWall(k,p)){battleMsg('A castle wall saves Wolfy. The King cannot strike through it.');return}const d=Math.hypot(p.x-k.x,p.y-k.y);if(d<100){k.stagger=300;B.closeLock=250;B.projectiles.push({x:k.x,y:k.y,vx:(p.x-k.x)/(d||1)*9,vy:(p.y-k.y)/(d||1)*9,owner:'king',life:0,max:38,melee:true});battleMsg('CLOSE COMBAT! The King slashes hard! 🗡️');}else{launchSword(k,p,'king');battleMsg('INCOMING! THE KING THROWS HIS MAGICAL SWORD!');}B.lastKing=performance.now();}
function updateBattle(dt,now){const p=B.player,k=B.king;let sp=2.65*(B.keys.shield?0.65:1);let dx=0,dy=0;if(B.keys.a||B.keys.arrowleft||B.keys.left)dx--;if(B.keys.d||B.keys.arrowright||B.keys.right)dx++;if(B.keys.w||B.keys.arrowup||B.keys.up)dy--;if(B.keys.s||B.keys.arrowdown||B.keys.down)dy++;if(dx||dy){const l=Math.hypot(dx,dy);moveEntity(p,dx/l*sp*dt/16.67,dy/l*sp*dt/16.67)}
  if(B.keys.shield)p.shield=1;else p.shield=0;p.attackCd=Math.max(0,p.attackCd-dt);p.inv=Math.max(0,p.inv-dt);k.stagger=Math.max(0,k.stagger-dt);
  // King keeps moving, but cannot walk through castle walls.
  if(k.stagger<=0){const d=Math.hypot(p.x-k.x,p.y-k.y);if(d>175){moveEntity(k,(p.x-k.x)/(d||1)*0.75*dt/16.67,(p.y-k.y)/(d||1)*0.75*dt/16.67)}else if(d<105){moveEntity(k,-(p.x-k.x)/(d||1)*0.5*dt/16.67,-(p.y-k.y)/(d||1)*0.5*dt/16.67)}}
  if(now-B.lastKing>=5000)kingAttack();
  for(let i=B.projectiles.length-1;i>=0;i--){let s=B.projectiles[i];s.x+=s.vx*dt/16.67;s.y+=s.vy*dt/16.67;s.life+=dt;let target=s.owner==='player'?k:p;if(circleWalls(s.x,s.y,6)){B.projectiles.splice(i,1);continue}if(Math.hypot(s.x-target.x,s.y-target.y)<24){if(s.owner==='player'){k.hp=Math.max(0,k.hp-(s.melee?22:16));k.stagger=180;B.hitFlash=120;burst(k.x,k.y,'#fff');battleMsg('HIT! The King staggers. ⚔️')}else if(p.inv<=0){if(p.shield){battleMsg('SHIELD UP! The magical sword crashes away. 🛡️');p.inv=300}else{p.hp=Math.max(0,p.hp-(s.melee?18:14));p.inv=650;B.shake=180;B.hitFlash=90;burst(p.x,p.y,'#f55');battleMsg('WOLFY IS HIT! MOVE OR SHIELD!')}}B.projectiles.splice(i,1);continue}if(s.life>s.max){B.projectiles.splice(i,1)}}
  B.shake=Math.max(0,(B.shake||0)-dt);B.hitFlash=Math.max(0,B.hitFlash-dt);if(k.hp<=0)return battleWin();if(p.hp<=0)return battleLose();updateBattleHud();}
function battleMsg(t){const e=document.querySelector('#battleText');if(e)e.textContent=t}
function updateBattleHud(){document.querySelector('#php').style.width=(B.player.hp/B.player.maxHp*100)+'%';document.querySelector('#pht').textContent=`${Math.ceil(B.player.hp)}/${B.player.maxHp} HP`;document.querySelector('#khp').style.width=(B.king.hp/260*100)+'%';document.querySelector('#kht').textContent=`${Math.ceil(B.king.hp)}/260 HP`}
function burst(x,y,c){for(let i=0;i<10;i++){const a=Math.random()*Math.PI*2;B.particles.push({x,y,vx:Math.cos(a)*2,vy:Math.sin(a)*2,life:400,c})}}
function drawBattle(){const ctx=B.ctx,w=B.w,h=B.h;ctx.clearRect(0,0,w,h);ctx.fillStyle='#090a10';ctx.fillRect(0,0,w,h);ctx.fillStyle='#17161b';ctx.fillRect(12,20,w-24,h-55);
  // stone floor
  ctx.strokeStyle='#27252d';ctx.lineWidth=1;for(let x=20;x<w;x+=42){ctx.beginPath();ctx.moveTo(x,22);ctx.lineTo(x,h-36);ctx.stroke()}for(let y=35;y<h-35;y+=42){ctx.beginPath();ctx.moveTo(12,y);ctx.lineTo(w-12,y);ctx.stroke()}
  // castle walls
  for(const r of B.walls){ctx.fillStyle='#39363d';ctx.fillRect(r.x,r.y,r.w,r.h);ctx.fillStyle='#4b4850';ctx.fillRect(r.x,r.y,r.w,7);ctx.fillStyle='#242229';ctx.fillRect(r.x+6,r.y+8,r.w-12,r.h-14)}
  // line of sight indicator
  if(!blockedByWall(B.player,B.king)){ctx.save();ctx.globalAlpha=.07;ctx.strokeStyle='#f33';ctx.lineWidth=20;ctx.beginPath();ctx.moveTo(B.player.x,B.player.y);ctx.lineTo(B.king.x,B.king.y);ctx.stroke();ctx.restore()}
  drawKing(ctx,B.king);drawPrince(ctx,B.player);for(const s of B.projectiles)drawSword(ctx,s);for(let i=B.particles.length-1;i>=0;i--){const q=B.particles[i];q.x+=q.vx;q.y+=q.vy;q.life-=16;ctx.globalAlpha=Math.max(0,q.life/400);ctx.fillStyle=q.c;ctx.beginPath();ctx.arc(q.x,q.y,3,0,7);ctx.fill();if(q.life<=0)B.particles.splice(i,1)}ctx.globalAlpha=1;
  if(B.hitFlash>0){ctx.fillStyle=`rgba(255,30,40,${B.hitFlash/500})`;ctx.fillRect(0,0,w,h)}
}
function drawPrince(ctx,p){ctx.save();ctx.translate(p.x,p.y);if(p.inv>0)ctx.globalAlpha=.55;ctx.fillStyle='#151922';ctx.beginPath();ctx.ellipse(0,13,18,8,0,0,7);ctx.fill();ctx.fillStyle='#e8c3a0';ctx.beginPath();ctx.arc(0,-12,10,0,7);ctx.fill();ctx.fillStyle='#e9edf5';ctx.beginPath();ctx.moveTo(-13,1);ctx.lineTo(13,1);ctx.lineTo(10,20);ctx.lineTo(-10,20);ctx.closePath();ctx.fill();ctx.fillStyle='#222a39';ctx.fillRect(-8,-24,16,5);ctx.fillStyle='#d9e6ff';ctx.fillRect(8,-3,28,4);ctx.restore()}
function drawKing(ctx,k){ctx.save();ctx.translate(k.x,k.y);ctx.fillStyle='#0a0a0d';ctx.beginPath();ctx.ellipse(0,15,25,10,0,0,7);ctx.fill();ctx.fillStyle='#47262b';ctx.beginPath();ctx.arc(0,-10,15,0,7);ctx.fill();ctx.fillStyle='#15151b';ctx.beginPath();ctx.moveTo(-19,4);ctx.lineTo(19,4);ctx.lineTo(15,28);ctx.lineTo(-15,28);ctx.closePath();ctx.fill();ctx.fillStyle='#c52b35';ctx.beginPath();ctx.arc(-6,-12,2,0,7);ctx.arc(6,-12,2,0,7);ctx.fill();ctx.fillStyle='#d7b34a';ctx.beginPath();ctx.moveTo(-17,-22);ctx.lineTo(-9,-34);ctx.lineTo(0,-24);ctx.lineTo(9,-34);ctx.lineTo(17,-22);ctx.closePath();ctx.fill();ctx.fillStyle='#d9e6ff';ctx.fillRect(-39,-3,-28,4);ctx.restore()}
function drawSword(ctx,s){ctx.save();ctx.translate(s.x,s.y);ctx.rotate(Math.atan2(s.vy,s.vx));ctx.shadowBlur=12;ctx.shadowColor=s.owner==='king'?'#d13b4b':'#b7d5ff';ctx.fillStyle=s.owner==='king'?'#ff5260':'#eaf4ff';ctx.fillRect(-18,-2,36,4);ctx.fillStyle='#b78a42';ctx.fillRect(-8,-5,5,10);ctx.restore()}
function battleLoop(now){if(!B?.running)return;const dt=Math.min(40,now-B.last);B.last=now;updateBattle(dt,now);const ctx=B.ctx;ctx.save();if(B.shake>0)ctx.translate((Math.random()-.5)*8,(Math.random()-.5)*8);drawBattle();ctx.restore();requestAnimationFrame(battleLoop)}
function battleWin(){if(!B?.running)return;B.running=false;B.cleanup?.();const arena=document.querySelector('#arena'),warn=document.querySelector('#battleWarn');if(warn)warn.textContent='THE MONSYETER KING FALLS';battleMsg('YESSS... YOU’RE INDEED THE SUPREME TORTURER, MANNN...');const death=document.querySelector('#death');if(death)death.innerHTML='<div class="deathKing">👺</div><div class="deathLine">“YOU DESERVE HERRR... LOL.”</div>';setTimeout(()=>reunion(),2300)}
function battleLose(){if(!B?.running)return;B.running=false;B.cleanup?.();page(`<div class="hero">💔</div><h2>WOLFY FELL...</h2><p>The Princess is still waiting beyond the King.</p><button class="btn" onclick="boss()">⚔️ TRY THE BATTLE AGAIN</button>`)}
function reunion(){page(`<div class="reunion"><div class="castleGlow">🏰</div><div class="reunionScene"><div class="person wolfy">🐺</div><div class="heartBurst">❤️</div><div class="person princess">👑</div></div><h1>YOU FOUND HER.</h1><div class="box"><h2>THE PRINCE & HIS PRINCESS</h2><p>After everything — the trials, the castle, the MONSYETER KING...</p><p><b>Wolfy finally reaches his Princess.</b></p><p class="hug">🐺❤️🤗❤️👑</p></div><button class="btn" onclick="code()">🔐 ENTER THE FINAL VAULT</button></div>`)}

function code(){page(`<div class="hero">👑</div><h1>THE PRINCESS IS FREE</h1><div class="box"><p>The Evil King has fallen.</p><p>But the final castle vault remains locked.</p><p>🔐 <b>FINAL CODE</b></p><p class="small">Prototype code for now: <b>2205</b> — we can replace this with your real relationship clue.</p></div><input id="code" class="input" placeholder="ENTER CODE"><button class="btn" onclick="checkCode()">🔓 UNLOCK THE VAULT</button><p id="err" class="small"></p>`)}
function checkCode(){if(document.querySelector('#code').value.trim()==='2205')gift();else document.querySelector('#err').textContent='Wrong code. The King may be gone, but he left one last trap. 👺'}
function gift(){page(`<div class="hero">🎁</div><h1>QUEST COMPLETE</h1><div class="box"><p>👺 Evil King: DEFEATED</p><p>👑 Princess: RESCUED</p><p>🐺 Prince: VICTORIOUS</p><p>❤️ Kingdom: SAFE</p><h2>One final reward awaits...</h2></div><button class="btn" onclick="video()">🎬 OPEN THE BIRTHDAY SURPRISE</button>`)}
function video(){page(`<div class="hero">🥹❤️</div><h1>YOU FOUND IT.</h1><div class="box"><h2>🎬 YOUR BIRTHDAY VIDEO</h2><p class="small">Replace this screen with your real video link/file when you're ready.</p></div><button class="btn" onclick="secret()">🕵️ FIND SECRET LEVEL</button>`)}
function secret(){page(`<div class="hero">🕵️</div><h2>SECRET LEVEL</h2><p>You defeated a spider-powered MONSYETER KING just to reach your princess.</p><p><b>You're my favourite idiot. ❤️</b></p><button class="btn" onclick="start()">↻ PLAY AGAIN</button>`)}
start();
