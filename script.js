// Add approved SOP entries to this array as they are published.
// Each SOP supports: purpose, prerequisites, steps, workarounds, flow and versionHistory.
const categories = [
  {id:"database",name:"Database Operations",tag:"DATABASE",icon:"▤",description:"Database procedures, SQL operations and validation."},
  {id:"inventory",name:"Inventory & Stock",tag:"INVENTORY",icon:"▦",description:"Stock limits, product mapping, serials and inventory procedures."},
  {id:"activation",name:"HBB Activation",tag:"ACTIVATION",icon:"⌁",description:"HBB activation and data synchronization procedures."},
  {id:"reporting",name:"Reporting & Scheduler",tag:"REPORTING",icon:"▥",description:"Report generation, scheduling and delivery procedures."},
  {id:"troubleshooting",name:"Troubleshooting",tag:"TROUBLESHOOTING",icon:"⚙",description:"Approved issue-resolution procedures and known workarounds."},
  {id:"scripts",name:"Scripts & Integrations",tag:"SCRIPTS",icon:"⌘",description:"Documented procedures for scripts, APIs and integrations."}
];

const sops = [
  {
    "id": "user-management-access-control",
    "title": "User Management & Access Control Process",
    "category": "database",
    "summary": "MOP for managing user access and permissions.",
    "file": "MOP _ User Management & Access Control Process.docx",
    "keywords": "user management access control permissions"
  },
  {
    "id": "warehouse-partner-modification",
    "title": "Modifying Warehouse / Partner",
    "category": "inventory",
    "summary": "Procedure for modifying warehouse and partner details.",
    "file": "SOP _  MODIFYING WAREHOUSE_PARTNER.docx",
    "keywords": "warehouse partner modification"
  },
  {
    "id": "sell-already-sold-product",
    "title": "Customer Trying to Sell Already Sold Product",
    "category": "troubleshooting",
    "summary": "Troubleshooting procedure for attempts to sell an already-sold product.",
    "file": "SOP _ Customer Trying to Sell Already Sold Product.docx",
    "keywords": "customer sell already sold product"
  },
  {
    "id": "hbb-datalake-sync-manual-trigger",
    "title": "HBB Datalake Sync – Manual Trigger",
    "category": "activation",
    "summary": "Steps to manually trigger HBB Datalake synchronization.",
    "file": "SOP _ HBB Datalake Sync – Manual Trigger.docx",
    "keywords": "HBB Datalake sync manual trigger activation"
  },
  {
    "id": "stock-serial-creation-guide",
    "title": "Stock (Serial) Creation Guide",
    "category": "inventory",
    "summary": "Guide for creating stock serials.",
    "file": "SOP _ Stock (Serial) Creation Guide_.docx",
    "keywords": "stock serial creation"
  },
  {
    "id": "new-price-segment",
    "title": "How to Create a New Price Segment",
    "category": "inventory",
    "summary": "Procedure for creating a new price segment.",
    "file": "SOP – How to Create a New Price Segment.docx",
    "keywords": "price segment create"
  },
  {
    "id": "buyer-type-not-displayed",
    "title": "Buyer Type Not Displayed During Primary Sale Order Creation",
    "category": "troubleshooting",
    "summary": "Troubleshooting when buyer type is missing during primary sale order creation.",
    "file": "SOP_ Buyer Type Not Displayed During Primary Sale Order Creation.docx",
    "keywords": "buyer type primary sale order"
  },
  {
    "id": "duplicate-wrong-stock-creation",
    "title": "Handling Duplicate / Wrong Stock Creation",
    "category": "troubleshooting",
    "summary": "Procedure for handling duplicate or incorrectly created stock.",
    "file": "SOP_ Handling Duplicate _ Wrong Stock Creation.docx",
    "keywords": "duplicate wrong stock creation"
  },
  {
    "id": "primary-sale-cancellation-rollback",
    "title": "Primary Sale Cancellation – Rollback of Funds",
    "category": "troubleshooting",
    "summary": "Procedure for handling primary sale cancellation and fund rollback.",
    "file": "SOP_ Primary Sale Cancellation – Rollback of Funds.docx",
    "keywords": "primary sale cancellation rollback funds"
  },
  {
    "id": "product-group-stock-limit",
    "title": "Product Group Stock Limit Configuration",
    "category": "inventory",
    "summary": "Procedure for configuring stock limits at product-group level.",
    "file": "SOP_ Product Group Stock Limit Configuration.docx",
    "keywords": "product group stock limit configuration"
  },
  {
    "id": "stock-creation-validation-range",
    "title": "Stock Creation Failure – Validation Failed Exceeds the Range",
    "category": "troubleshooting",
    "summary": "Troubleshooting stock creation failures caused by range validation.",
    "file": "SOP_ Stock Creation Failure – “Validation Failed Exceeds the Range”.docx",
    "keywords": "stock creation validation failed exceeds range"
  },
  {
    "id": "stock-limit-configuration",
    "title": "Stock Limit Configuration",
    "category": "inventory",
    "summary": "Procedure for configuring stock limits.",
    "file": "SOP_ Stock Limit Configuration.docx",
    "keywords": "stock limit configuration"
  },
  {
    "id": "invalid-serial-range-stock-transfer",
    "title": "Invalid Serial Range / Serial Not in Range (Stock Transfer)",
    "category": "troubleshooting",
    "summary": "Troubleshooting invalid serial-range errors during stock transfer.",
    "file": "SOP_ _INVALID SERIAL RANGE _ SERIAL NOT IN RANGE_ (Stock Transfer).docx",
    "keywords": "invalid serial range stock transfer"
  },
  {
    "id": "superset-query-extraction-insertion",
    "title": "Superset Query Extraction & Insertion",
    "category": "reporting",
    "summary": "Procedure for extracting and inserting Superset queries.",
    "file": "Superset query EXTRACTION & INSERTION.docx",
    "keywords": "Superset query extraction insertion reporting"
  }
];
// Example structure for future approved SOPs:
// {
//   id: "stock-limit-configuration",
//   title: "Stock Limit Configuration",
//   category: "inventory",
//   summary: "Procedure for configuring and validating product group stock limits.",
//   purpose: "...",
//   prerequisites: ["..."],
//   steps: [{title:"...",description:"...",command:""}],
//   workarounds: [{issue:"...",resolution:"...",status:"Approved"}],
//   flow: ["Start","Validate configuration","Apply approved change","Verify result","End"],
//   owner: "Operations",
//   version: "1.0",
//   updated: "YYYY-MM-DD",
//   status: "Approved",
//   keywords: "stock limit product group"
// }

const grid = document.getElementById("sopGrid");
const filters = document.getElementById("filters");
const search = document.getElementById("searchInput");
const count = document.getElementById("resultCount");
const empty = document.getElementById("emptyState");
const emptyTitle = document.getElementById("emptyTitle");
const emptyMessage = document.getElementById("emptyMessage");
const libraryHero = document.getElementById("libraryHero");
const libraryView = document.getElementById("libraryView");
const detailView = document.getElementById("detailView");
const detail = document.getElementById("sopDetail");
let activeCategory = "all";

const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[char]));

function renderFilters(){
  const options = [{id:"all",name:"All SOPs"}, ...categories];
  filters.innerHTML = options.map(item =>
    `<button class="filter-btn ${activeCategory===item.id?"active":""}" data-filter="${item.id}" type="button">${escapeHTML(item.name)}</button>`
  ).join("");
}

function searchableText(sop){
  return [
    sop.title,sop.summary,sop.purpose,sop.category,sop.keywords,
    ...(sop.prerequisites||[]),
    ...(sop.steps||[]).flatMap(step=>[step.title,step.description,step.command]),
    ...(sop.workarounds||[]).flatMap(item=>[item.issue,item.resolution,item.status])
  ].join(" ").toLowerCase();
}

function renderCards(){
  const term = search.value.trim().toLowerCase();
  const matching = sops.filter(sop =>
    (activeCategory==="all" || sop.category===activeCategory) &&
    (!term || searchableText(sop).includes(term))
  );

  if(sops.length===0){
    const visibleCategories = categories.filter(category =>
      (activeCategory==="all" || category.id===activeCategory) &&
      (!term || (category.name+" "+category.description+" "+category.tag).toLowerCase().includes(term))
    );
    grid.innerHTML = visibleCategories
      .map(category=>`<button class="sop-card category-card" type="button" data-category="${category.id}">
        <div class="card-top"><div class="card-icon" aria-hidden="true">${category.icon}</div><span class="card-tag">${category.tag}</span></div>
        <h3>${escapeHTML(category.name)}</h3>
        <p>${escapeHTML(category.description)}</p>
        <div class="card-bottom"><span>Browse category</span><span aria-hidden="true">→</span></div>
      </button>`).join("");
    count.textContent = visibleCategories.length + (term ? " matching categories" : " SOP categories");
    empty.hidden = visibleCategories.length!==0;
    grid.hidden = visibleCategories.length===0;
    emptyTitle.textContent = term ? "No matching SOP categories" : "No SOPs published yet";
    emptyMessage.textContent = term ? "Try another search term." : "SOPs will appear here once they are added to the library.";
    return;
  }

  grid.innerHTML = matching.map(sop=>{
    const category = categories.find(item=>item.id===sop.category);
    return `<button class="sop-card sop-link-card" type="button" data-sop="${escapeHTML(sop.id)}">
      <div class="card-top"><div class="card-icon" aria-hidden="true">${category?.icon||"▤"}</div><span class="card-tag">${escapeHTML(category?.tag||"SOP")}</span></div>
      <h3>${escapeHTML(sop.title)}</h3><p>${escapeHTML(sop.summary||"Standard operating procedure")}</p>
      <div class="card-bottom"><span>View procedure</span><span aria-hidden="true">→</span></div>
    </button>`;
  }).join("");

  count.textContent = matching.length + (matching.length===1?" SOP":" SOPs");
  empty.hidden = matching.length!==0;
  grid.hidden = matching.length===0;
  emptyTitle.textContent = term ? "No matching SOPs" : "No SOPs in this category yet";
  emptyMessage.textContent = term ? "Try a different search term or category." : "Published procedures for this category will appear here.";
}

function renderList(items, emptyText){
  if(!items?.length) return `<p class="detail-muted">${escapeHTML(emptyText)}</p>`;
  return `<ul class="detail-list">${items.map(item=>`<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
}

function addCopyControl(pre){
  if(pre.querySelector(".doc-copy-button"))return;
  const code=pre.querySelector("code")||pre;
  const button=document.createElement("button");
  button.type="button";
  button.className="doc-copy-button";
  button.textContent="Copy";
  button.setAttribute("data-copy-code","");
  button.addEventListener("click",async()=>{
    const original=button.textContent;
    try{
      await navigator.clipboard.writeText(code.innerText||code.textContent||"");
      button.textContent="Copied";
    }catch(error){
      button.textContent="Select code to copy";
    }
    window.setTimeout(()=>button.textContent=original,1500);
  });
  pre.appendChild(button);
}

function enhanceDocumentCode(root){
  const paragraphs=[...root.querySelectorAll("p")];
  const commandStart=/^(?:#!|(?:SELECT|WITH|INSERT|UPDATE|DELETE|MERGE|CREATE|ALTER|DROP|GRANT|REVOKE|BEGIN|DECLARE)\b|(?:curl|sqlldr|kubectl|docker|terraform|helm|grep|awk|sed|chmod|chown|export|sudo|systemctl|crontab|python3?|bash|sh|cat|jq|mysql|sqlplus)\s|[A-Z_][A-Z0-9_]*\s*=|(?:while|for|if|case)\b|(?:echo|printf|break|continue|return|exit|fi|done|else|then)\b)/i;
  const shellLine=/^(?:-[A-Za-z]\b|--[A-Za-z][\w-]*|[A-Z_][A-Z0-9_]*\s*=|["']|\\|&&|\|\||\||\)|\}|(?:while|for|if|case|do|then|else|fi|done|break|continue|exit)\b|(?:echo|printf|read|sleep|curl|python3?|sqlldr|jq|grep|awk|sed|mv|cp|rm|mkdir|touch|cat|head|tail|wc|date|export|source|\.\/|\/|#))/i;
  const sqlLine=/^(?:SELECT|WITH|INSERT|UPDATE|DELETE|MERGE|CREATE|ALTER|DROP|GRANT|REVOKE|FROM\b|WHERE\b|JOIN\b|GROUP BY\b|ORDER BY\b|VALUES\b|INTO\b|SET\b|AND\b|OR\b|ON\b|;\s*$)/i;
  const optionLine=/^(?:-[A-Za-z]\b|--[A-Za-z][\w-]*|["'][^"']+["']\s*\\?$)/;
  const textOf=p=>(p.innerText||p.textContent||"").replace(/\u00a0/g," ").trim();
  const isCodeContinuation=(value,mode,previous)=>{
    if(!value)return true;
    if(previous.endsWith("\\"))return true;
    if(shellLine.test(value)||sqlLine.test(value)||optionLine.test(value))return true;
    if(mode==="shell" && (/^[\w./$"'{}()[\]-]+\s*(?:\\|&&|\|\||\||;)?$/.test(value)||/^(?:https?:\/\/|\$[A-Z_]+|[A-Z_][A-Z0-9_]*=)/i.test(value)))return true;
    return false;
  };
  for(let i=0;i<paragraphs.length;i++){
    const first=paragraphs[i];
    if(!first.isConnected)continue;
    const firstText=textOf(first);
    if(!firstText||firstText.length<3||!commandStart.test(firstText))continue;
    const mode=/^(?:SELECT|WITH|INSERT|UPDATE|DELETE|MERGE|CREATE|ALTER|DROP|GRANT|REVOKE)\b/i.test(firstText)?"sql":"shell";
    const lines=[firstText];
    let previous=firstText;
    let j=i+1;
    let sawTerminator=/^(?:fi|done|exit)\b/i.test(firstText);
    while(j<paragraphs.length){
      const next=paragraphs[j];
      if(!next.isConnected){j++;continue;}
      const value=textOf(next);
      if(!value){j++;continue;}
      const continuation=isCodeContinuation(value,mode,previous);
      if(!continuation)break;
      lines.push(value);
      previous=value;
      if(/^(?:fi|done)\s*;?$/.test(value))sawTerminator=true;
      j++;
      if(sawTerminator && !previous.endsWith("\\"))break;
    }
    const pre=document.createElement("pre");
    pre.className="document-code-block";
    const code=document.createElement("code");
    code.textContent=lines.join("\n");
    pre.appendChild(code);
    first.replaceWith(pre);
    for(let k=i+1;k<j;k++)if(paragraphs[k].isConnected)paragraphs[k].remove();
    i=j-1;
  }
  root.querySelectorAll("pre").forEach(addCopyControl);
}

async function loadSourceDocument(sop){
  const target=document.getElementById("documentContent");
  if(!target)return;
  if(!window.mammoth){target.textContent="Document viewer unavailable. Use the original Word document link above.";return;}
  try{
    const response=await fetch("sops/"+encodeURIComponent(sop.file));
    if(!response.ok)throw new Error("Document request failed");
    const buffer=await response.arrayBuffer();
    const result=await mammoth.convertToHtml({arrayBuffer:buffer});
    target.innerHTML=result.value||"No extractable text found in this document.";
    enhanceDocumentCode(target);
  }catch(error){target.textContent="Could not display this document. Use the original document link above."}
}

function renderDetail(sop){
  const category = categories.find(item=>item.id===sop.category);
  const steps = (sop.steps||[]).map((step,index)=>`
    <li class="procedure-step">
      <span class="step-number">${index+1}</span>
      <div><h4>${escapeHTML(step.title||"Step "+(index+1))}</h4><p>${escapeHTML(step.description||"")}</p>
      ${step.command?`<pre class="command-block"><code>${escapeHTML(step.command)}</code><button type="button" class="copy-button" data-copy="${encodeURIComponent(step.command)}">Copy</button></pre>`:""}</div>
    </li>`).join("");

  const workarounds = (sop.workarounds||[]).map(item=>`
    <article class="workaround-item"><div class="workaround-heading"><h4>${escapeHTML(item.issue)}</h4><span class="status-label">${escapeHTML(item.status||"Documented")}</span></div><p>${escapeHTML(item.resolution)}</p></article>`).join("");

  const flow = (sop.flow||[]).map((item,index)=>`<li><span>${index+1}</span><strong>${escapeHTML(item)}</strong></li>`).join("");
  const history = (sop.versionHistory||[]).map(item=>`<tr><td>${escapeHTML(item.version)}</td><td>${escapeHTML(item.date)}</td><td>${escapeHTML(item.change)}</td><td>${escapeHTML(item.updatedBy||"—")}</td></tr>`).join("");

  detail.innerHTML = `
    <div class="detail-kicker">${escapeHTML(category?.name||"SOP")} · <span>${escapeHTML(sop.status||"Review status not specified")}</span></div>
    <h1 class="detail-title">${escapeHTML(sop.title)}</h1>
    <p class="detail-summary">${escapeHTML(sop.summary||"")}</p>
    <p class="source-document"><a class="source-document-link" href="${"sops/"+encodeURIComponent(sop.file)}" target="_blank" rel="noopener">Open original SOP document ↗</a></p>
    <div class="metadata-strip"><span><small>OWNER</small><strong>${escapeHTML(sop.owner||"Not assigned")}</strong></span><span><small>VERSION</small><strong>${escapeHTML(sop.version||"—")}</strong></span><span><small>LAST UPDATED</small><strong>${escapeHTML(sop.updated||"—")}</strong></span></div>
    <section class="detail-section document-content-section"><h2>Full SOP Content</h2><div id="documentContent" class="document-content"><p class="detail-muted">Loading the original Word document…</p></div></section>
`;
  libraryHero.hidden = true;
  libraryView.hidden = true;
  detailView.hidden = false;
  loadSourceDocument(sop);
  window.scrollTo({top:0,behavior:"smooth"});
}

function showLibrary(){
  detailView.hidden = true;
  libraryHero.hidden = false;
  libraryView.hidden = false;
  window.scrollTo({top:0,behavior:"smooth"});
}

filters.addEventListener("click",event=>{
  const button=event.target.closest("[data-filter]");
  if(!button)return;
  activeCategory=button.dataset.filter;
  renderFilters();
  renderCards();
});

grid.addEventListener("click",event=>{
  const categoryButton=event.target.closest("[data-category]");
  if(categoryButton){
    activeCategory=categoryButton.dataset.category;
    renderFilters();
    renderCards();
    return;
  }
  const sopButton=event.target.closest("[data-sop]");
  if(sopButton){
    const sop=sops.find(item=>item.id===sopButton.dataset.sop);
    if(sop)renderDetail(sop);
  }
});

detail.addEventListener("click",async event=>{
  const button=event.target.closest("[data-copy]");
  if(!button)return;
  const value=decodeURIComponent(button.dataset.copy);
  try{
    await navigator.clipboard.writeText(value);
    button.textContent="Copied";
    setTimeout(()=>button.textContent="Copy",1400);
  }catch{
    button.textContent="Copy unavailable";
  }
});

document.getElementById("backButton").addEventListener("click",showLibrary);
search.addEventListener("input",renderCards);
document.addEventListener("keydown",event=>{
  if(event.key==="/" && document.activeElement!==search && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){
    event.preventDefault();search.focus();
  }
  if(event.key==="Escape" && document.activeElement===search){search.value="";renderCards();search.blur();}
});
renderFilters();
renderCards();