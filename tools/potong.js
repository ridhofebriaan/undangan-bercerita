// Potong foto (koordinat 0-1) dan simpan JPEG dengan lebar tertentu
const puppeteer=require("puppeteer-core");const fs=require("fs");
const jobs=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
(async()=>{const b=await puppeteer.launch({executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"});const p=await b.newPage();await p.goto("about:blank");
for(const j of jobs){const src="data:image/jpeg;base64,"+fs.readFileSync(j.src).toString("base64");
const out=await p.evaluate(async(j,src)=>{const img=new Image();img.src=src;await img.decode();const [cx,cy,cw,ch]=j.crop||[0,0,1,1];
const sw=cw*img.width,sh=ch*img.height;const s=Math.min(1,(j.lebar||1000)/sw);const c=document.createElement("canvas");c.width=Math.round(sw*s);c.height=Math.round(sh*s);
c.getContext("2d").drawImage(img,cx*img.width,cy*img.height,sw,sh,0,0,c.width,c.height);return c.toDataURL("image/jpeg",0.8).split(",")[1];},j,src);
fs.writeFileSync(j.out,Buffer.from(out,"base64"));console.log(j.out.split("/").slice(-3).join("/"),Math.round(fs.statSync(j.out).size/1024)+"KB");}
await b.close()})();
