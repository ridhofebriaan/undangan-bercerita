// Tangkapan resolusi penuh (390x844 @2x): cover, hero, dan beberapa bagian
const puppeteer=require("puppeteer-core");const wait=ms=>new Promise(r=>setTimeout(r,ms));
const [out,kode,...ids]=process.argv.slice(2);
(async()=>{const b=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",headless:"new"});const p=await b.newPage();
await p.emulate({viewport:{width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true},userAgent:"Mozilla/5.0 (Linux; Android 11) Mobile"});
await p.goto(`http://localhost:8765/tema/${kode}/?to=Bapak%20Ahmad`,{waitUntil:"networkidle0"});await p.evaluate(()=>document.fonts.ready);await wait(1800);
await p.screenshot({path:`${out}-cover.png`});await p.tap(".btn-open");await wait(3000);await p.screenshot({path:`${out}-hero.png`});
for(const id of ids){await p.evaluate(id=>{document.querySelectorAll('.reveal').forEach(r=>r.classList.add('in'));document.getElementById(id).scrollIntoView({block:"start"})},id);await wait(1600);await p.screenshot({path:`${out}-${id}.png`});}
await b.close()})();
