// node lembar.js out.png dir [kolom] [lebarSel] : lembar kontak gambar dalam folder
const puppeteer=require('puppeteer-core');const fs=require('fs');const path=require('path');const os=require('os');const tmp=path.join(os.tmpdir(),'_lembar.html');
(async()=>{const [out,dir,kol='5',w='260']=process.argv.slice(2);
const files=fs.readdirSync(dir).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();
const html=`<body style="margin:0;background:#888;font:12px sans-serif;display:grid;grid-template-columns:repeat(${kol},${w}px);gap:4px">`+files.map(f=>`<div><img src="file://${path.resolve(dir,f)}" style="width:${w}px;height:${Math.round(w*1.25)}px;object-fit:contain;background:#222;display:block"><div>${f}</div></div>`).join('')+'</body>';
fs.writeFileSync(tmp,html);
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args:['--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:(+w+4)*kol,height:400});await p.goto('file://'+tmp,{waitUntil:'networkidle0'});
await p.screenshot({path:out,fullPage:true});await b.close();})();
