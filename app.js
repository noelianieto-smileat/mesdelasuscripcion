const $=id=>document.getElementById(id);
const eur=(n,d=0)=>n.toLocaleString('es-ES',{minimumFractionDigits:d,maximumFractionDigits:d,useGrouping:'always'})+' €';
const num=n=>n.toLocaleString('es-ES',{useGrouping:'always'});
const T=DATA.totals,G=DATA.google.account;
const spend=T.spend_meta_es+T.spend_pt+G.cost;
const valEs=T.val_meta_es+G.val;
const roasEs=valEs/(T.spend_meta_es+G.cost);
const purchases=T.res_meta_es+T.res_pt+Math.round(G.conv);
$('hero-lede').textContent='Resultados de las promociones de septiembre: en España, el Mes de la Suscripción (25% en los tres primeros packs personalizados, 15% en el resto y envío gratis para siempre) y, en Portugal, envío gratis a partir de 20€.';
$('kpi-row').innerHTML=[
 [eur(spend),'Inversión total (Meta ES + PT + Google ES)'],
 [eur(valEs),'Valor de conversión España (Meta + Google)'],
 [roasEs.toFixed(2).replace('.',',')+'x','ROAS combinado España'],
 [num(purchases),'Compras (Meta ES + PT, conversiones Google)']
].map(([a,b])=>`<div class="kpi"><b>${a}</b><span>${b}</span></div>`).join('');
$('promo-grid').innerHTML=`
<div class="promo es"><span class="flag">ESPAÑA</span><h3>Mes de la Suscripción</h3><ul><li>25% de descuento en los tres primeros packs personalizados</li><li>15% de descuento en el resto</li><li>Envío gratis para siempre</li></ul></div>
<div class="promo pt"><span class="flag">PORTUGAL</span><h3>Envío gratis</h3><ul><li>Envío gratis a partir de 20€</li></ul></div>`;
const card=(c,i,lang,es)=>`<article class="card"><img src="assets/${lang}/${c.id}.jpg" alt="${c.name}" loading="lazy"><div class="body"><span class="rank">#${i+1}</span><h3>${c.name}</h3>
<div class="big">${num(c.res)} <small>compras</small></div><div class="stats">
<div><span>Inversión</span><b>${eur(c.spend,2)}</b></div><div><span>Coste por compra</span><b>${eur(c.cpa,2)}</b></div>
${es?`<div><span>ROAS</span><b>${c.roas.toFixed(2).replace('.',',')}x</b></div><div><span>Valor de compra</span><b>${eur(c.val)}</b></div><div><span>CTR</span><b>${c.ctr.toFixed(2).replace('.',',')}%</b></div>`:`<div><span>Interacciones</span><b>${num(c.eng)}</b></div>`}
<div><span>Impresiones</span><b>${num(c.impr)}</b></div><div><span>Alcance</span><b>${num(c.reach)}</b></div></div></div></article>`;
$('grid-es').innerHTML=DATA.meta_es.map((c,i)=>card(c,i,'es',true)).join('');
$('grid-pt').innerHTML=DATA.meta_pt.map((c,i)=>card(c,i,'pt',false)).join('');
const gr=DATA.google.groups,roas=(v,c)=>(v/c).toFixed(2).replace('.',',')+'x';
const row=(n,c,x)=>`<tr><td>${n}<br><small>${c}</small></td><td>${num(x.clicks)}</td><td>${num(x.impr)}</td><td>${eur(x.cost,2)}</td><td>${num(x.conv)}</td><td>${eur(x.val)}</td><td>${roas(x.val,x.cost)}</td><td>${eur(x.cost/x.conv,2)}</td></tr>`;
$('google-block').innerHTML=`<div class="tbl"><table><thead><tr><th>Grupo de recursos</th><th>Clics</th><th>Impr.</th><th>Coste</th><th>Conv.</th><th>Valor conv.</th><th>ROAS</th><th>Coste/conv.</th></tr></thead><tbody>
${gr.map(g=>row(g.n,g.c,g)).join('')}
<tr class="total"><td>Total cuenta Google Ads</td><td>${num(G.clicks)}</td><td>${num(G.impr)}</td><td>${eur(G.cost,2)}</td><td>${num(G.conv)}</td><td>${eur(G.val)}</td><td>${roas(G.val,G.cost)}</td><td>${eur(G.cost/G.conv,2)}</td></tr></tbody></table></div>
<p style="font-size:12px;color:var(--g2);margin-top:10px">El total de cuenta incluye todas las campañas de Google Ads del periodo, no solo los dos grupos de recursos.</p>`;
const prods=(t,sub,g)=>`<div class="panel"><h3>${t}</h3><div class="sub">${sub}</div>${g.top.map((p,i)=>`<div class="prod"><i>${i+1}</i><span>${p.n}</span><span><b>${p.q} uds</b> <em>· ${eur(p.r,2)}</em></span></div>`).join('')}</div>`;
$('split-grid').innerHTML=prods('Meta Ads · España',`${num(DATA.ga_meta.total_q)} artículos comprados`,DATA.ga_meta)+prods('Google Ads · España',`${num(DATA.ga_google.total_q)} artículos comprados`,DATA.ga_google);
