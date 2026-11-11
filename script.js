const categories = [
  {id:"database",name:"Database Operations",tag:"DATABASE",icon:"▤",description:"Oracle SQL, database validation, data fixes and operational database procedures.",keywords:"oracle sql database db query validation"},
  {id:"inventory",name:"Inventory & Stock",tag:"INVENTORY",icon:"▦",description:"Stock limit configuration, product mapping, serial number and warehouse procedures.",keywords:"stock limit product group serial inventory warehouse asset"},
  {id:"activation",name:"HBB Activation",tag:"ACTIVATION",icon:"⌁",description:"HBB activation reports, serial processing, activation checks and data synchronization.",keywords:"hbb activation serial sync datalake"},
  {id:"reporting",name:"Reporting & Scheduler",tag:"REPORTING",icon:"▥",description:"Report generation, scheduler configuration, OPCO timings and email delivery.",keywords:"reports cron scheduler opco email csv"},
  {id:"troubleshooting",name:"Troubleshooting",tag:"SUPPORT",icon:"⚙",description:"Known application errors, investigation steps, workarounds and resolution checks.",keywords:"error workaround issue api curl ssl 403 superset"},
  {id:"scripts",name:"Scripts & Integrations",tag:"AUTOMATION",icon:"⌘",description:"Shell scripts, SQL utilities, API calls, automation and integration procedures.",keywords:"shell bash script python api curl kafka"}
];
const grid = document.getElementById("sopGrid");
const filters = document.getElementById("filters");
const search = document.getElementById("searchInput");
const count = document.getElementById("resultCount");
const empty = document.getElementById("emptyState");
let active = "all";
function renderFilters(){
  const options=[{id:"all",name:"All categories"},...categories];
  filters.innerHTML=options.map(item=>`<button class="filter-btn ${active===item.id?"active":""}" data-filter="${item.id}">${item.name}</button>`).join("");
}
function renderCards(){
  const term=search.value.trim().toLowerCase();
  const shown=categories.filter(item=>(active==="all"||item.id===active)&&(!term||[item.name,item.description,item.tag,item.keywords].join(" ").toLowerCase().includes(term)));
  grid.innerHTML=shown.map(item=>`<article class="sop-card">
    <div class="card-top"><div class="card-icon" aria-hidden="true">${item.icon}</div><span class="card-tag">${item.tag}</span></div>
    <h3>${item.name}</h3><p>${item.description}</p>
    <div class="card-bottom"><span>Browse category</span><span aria-hidden="true">→</span></div>
  </article>`).join("");
  count.textContent=term?shown.length+" results":shown.length+" categories";
  empty.hidden=shown.length!==0;
  grid.hidden=shown.length===0;
}
filters.addEventListener("click",event=>{
  const button=event.target.closest("[data-filter]");
  if(!button)return;
  active=button.dataset.filter;
  renderFilters();renderCards();
});
search.addEventListener("input",renderCards);
document.addEventListener("keydown",event=>{
  if(event.key==="/" && document.activeElement!==search && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){
    event.preventDefault();search.focus();
  }
  if(event.key==="Escape" && document.activeElement===search){search.value="";renderCards();search.blur();}
});
renderFilters();renderCards();