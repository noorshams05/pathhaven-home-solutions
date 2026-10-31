// Optional pre-publication maintenance command. The site has no runtime build step.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'assets/js/main.js'),'utf8');
const expression=source.slice(source.indexOf('export const CONFIG = ')+22,source.indexOf('\n};')+2);
const config=vm.runInNewContext('('+expression+')',{}, {timeout:1000});
const mapping={'[PHONE]':config.phone,'[SMS NUMBER]':config.smsNumber,'[EMAIL]':config.email,'[LEGAL ENTITY NAME]':config.legalEntityName,'[YOUR-DOMAIN]':config.siteUrl.replace(/^https?:\/\//,'').replace(/\/$/,''),'[OFFICE HOURS]':config.officeHours,'[STATE-SPECIFIC DISCLOSURE]':config.stateDisclosure,'[EFFECTIVE DATE]':config.effectiveDate};
config.areas.forEach((a,i)=>{mapping[['[CALIFORNIA COUNTIES]','[GEORGIA COUNTIES]','[FLORIDA COUNTIES]','[TEXAS COUNTIES]','[ARKANSAS COUNTIES]'][i]]=a.counties.join(', ')});
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const baseline=path.join(root,'scripts/page-templates.json');
const files=['index.html','privacy.html','terms.html','404.html','robots.txt','sitemap.xml'];
let originals=fs.existsSync(baseline)?JSON.parse(fs.readFileSync(baseline,'utf8')):Object.fromEntries(files.map(f=>[f,fs.readFileSync(path.join(root,f),'utf8')]));
if(!fs.existsSync(baseline))fs.writeFileSync(baseline,JSON.stringify(originals));
for(const file of files){let text=originals[file];for(const [key,value] of Object.entries(mapping))text=text.replaceAll(key,file.endsWith('.html')?esc(value):String(value));text=text.replaceAll('within 24 hours of getting your details',esc(config.offerTimeframe));fs.writeFileSync(path.join(root,file),text)}
console.log('Static contact details, legal text and SEO updated from CONFIG.');
const unresolved=Object.entries(mapping).filter(([k,v])=>String(v).includes('[')).map(([k])=>k);if(unresolved.length)console.log('Still to fill in: '+unresolved.join(', '));
