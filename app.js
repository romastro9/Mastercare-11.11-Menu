const items = [
 {name:'Sex on the Beach',subtitle:'A sunset-inspired cocktail',category:'cocktails',x:45,y:297},
 {name:'Long Island',subtitle:'A refreshing party classic',category:'cocktails',x:525,y:297},
 {name:'Tequila Sunrise',subtitle:'A golden-hour favourite',category:'cocktails',x:45,y:585},
 {name:'ប្រហិតចៀន',subtitle:'Fried meatballs',category:'food',x:525,y:585,khmer:true},
 {name:'ស្វាយ',subtitle:'Fresh mango',category:'food',x:45,y:846,khmer:true},
 {name:'យឺហឺរអំបិលម្ទេស',subtitle:'Chili-salt squid',category:'food',x:525,y:846,khmer:true},
 {name:'យីហុឺ បំពងស្រួយ',subtitle:'Crispy fried squid',category:'food',x:45,y:1088,khmer:true},
 {name:'ជ្រក់ជើងមាន់',subtitle:'Pickled chicken feet',category:'food',x:525,y:1088,khmer:true},
 {name:'Water',subtitle:'Cool & refreshing',category:'drinks',x:45,y:1314},
 {name:'Draft Beer',subtitle:'Freshly poured',category:'drinks',x:525,y:1314}
];
// Each window displays the photograph from the shared beach menu artwork.
// Viewports omit the baked-in lettering; accessible names are rendered as real text.
const labels={cocktails:'Cocktails',food:'Food & bites',drinks:'Refreshments'};
const grid=document.querySelector('#menu-grid');
const detail=document.querySelector('#detail');
function photo(item){
 const view=document.createElement('div');view.className='photo';
 // Per-row heights keep baked-in captions outside the image window.
 const heights={297:240,585:207,846:184,1088:164,1314:178};
 const h=heights[item.y];view.style.aspectRatio=`460 / ${h}`;
 view.style.setProperty('--left',`${-item.x/460*100}%`);
 view.style.setProperty('--top',`${-item.y/h*100}%`);
 const image=new Image();image.src='assets/menu.webp';image.alt=item.name;image.width=1024;image.height=1536;image.decoding='async';view.append(image);return view;
}
items.forEach((item,index)=>{
 const card=document.createElement('article');card.className='menu-card';card.dataset.category=item.category;
 const button=document.createElement('button');button.type='button';button.className='photo-button';button.setAttribute('aria-label',`View ${item.name}`);button.append(photo(item));
 const info=document.createElement('div');info.className='item-info';
 const category=document.createElement('p');category.className='item-category';category.textContent=labels[item.category];
 const title=document.createElement('h3');title.textContent=item.name;if(item.khmer)title.lang='km';
 const subtitle=document.createElement('p');subtitle.className='item-subtitle';subtitle.textContent=item.subtitle;
 info.append(category,title,subtitle);card.append(button,info);grid.append(card);
 button.addEventListener('click',()=>{document.querySelector('#detail-image').replaceChildren(photo(item));document.querySelector('#detail-category').textContent=labels[item.category];const title=document.querySelector('#detail-title');title.textContent=item.name;title.lang=item.khmer?'km':'en';document.querySelector('#detail-subtitle').textContent=item.subtitle;detail.showModal();});
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;document.querySelectorAll('.menu-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)count++;});document.querySelector('#result-count').textContent=`Showing ${count} ${filter==='all'?'items':labels[filter]}`;}));
document.querySelector('.close').addEventListener('click',()=>detail.close());
detail.addEventListener('click',event=>{if(event.target===detail){const r=detail.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)detail.close();}});
