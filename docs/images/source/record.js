// Serve the repo root (python3 -m http.server 8791), then: node record.js http://localhost:8791/index.html
// Encode: cd frames && ffmpeg -f concat -safe 0 -i list.txt -vf "fps=10,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle" -loop 0 ../../garage-studio-header.gif
// Records the README header for Garage Studio as a list of key states with hold times (frames/list.txt for ffmpeg concat).
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/fonts\.g/,r=>r.fulfill({body:''}));
 await p.goto(process.argv[2]||'http://localhost:8791/index.html');await p.waitForTimeout(8000);
 let n=0;const list=[];
 const shot=async(hold,wait=1200)=>{await p.waitForTimeout(wait);const f=`f${String(n++).padStart(2,'0')}.png`;await p.screenshot({path:'frames/'+f});list.push(`file '${f}'\nduration ${hold}`);};
 const plus=async(label)=>{await p.evaluate(l=>{const lab=[...document.querySelectorAll('#top-pane-dims *')].find(e=>e.children.length===0&&e.textContent.trim()===l);
   let r=lab;while(r&&r.querySelectorAll('button').length<2)r=r.parentElement;const btns=[...r.querySelectorAll('button')];
   const plusBtn=btns.find(b=>b.textContent.trim()==='+')||btns[btns.length-1];plusBtn.click();},label);};
 await shot(1.4,200);
 await p.click('#btn-top-presets');await shot(0.7);
 for(let i=0;i<3;i++){await plus('Width');await shot(0.45);}
 await plus('Shelves');await shot(1.0);
 await plus('Height');await shot(0.45);
 await plus('Height');await shot(1.2);
 await p.click('#btn-top-presets');await shot(0.5,800);
 await p.click('#dock-btn-totes');await shot(1.8,6000);
 await p.click('#dock-btn-ghost');await shot(1.3,1500);
 await p.click('#dock-btn-ghost');await shot(0.6,1200);
 await p.click('#btn-top-bom');await shot(2.4,1800);
 fs.writeFileSync('frames/list.txt',list.join('\n')+`\nfile 'f${String(n-1).padStart(2,'0')}.png'\n`);
 console.log('states',n,'errors',JSON.stringify(errs.slice(0,4)));await b.close();})();
