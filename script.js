const API_KEY="c6fe4e432c1f47ec923729479a248f20";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load" ,()=>fetchNEWS("india"));
function reload(){
  window.location.reload();
}

async function fetchNEWS(query){
  const res= await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data=await res.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles){
    const CardContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');
    
    CardContainer.innerHTML="";

    articles.forEach(articles => {
      if(!articles.urlToImage) return;
      const cardClone =newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone,articles)
      CardContainer.appendChild(cardClone);
    });
  }
  function fillDataInCard(cardClone,articles){
    const newsImg =cardClone.querySelector('#news-img');
    const newsTitle =cardClone.querySelector('#title');
    const newsSource =cardClone.querySelector('#source');
    const newsDes =cardClone.querySelector('#des');

    newsImg.src=articles.urlToImage;
    newsTitle.innerHTML=articles.title;
    newsDes.innerHTML=articles.description;

    const date=new Date(articles.publishedAt).toLocaleString("en-us",{
      timezone:"Asia/jakarta"
    });
    newsSource.innerHTML= `${articles.source.name} .${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
     window.open(articles.url,"_blank") ;
    })
  }
  let curSelectorNav=null;
function onNavItemClick(id) {
  fetchNEWS(id);
  const navItem=document.getElementById(id);
  curSelectorNav?.classList.remove("active");
  curSelectorNav =navItem;
  curSelectorNav.classList.add("active");
}
const searchButton =document.getElementById("search-button");
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
  const query=searchText.Value;
  if(!query) return;
  fetchNEWS(query);
  curSelectorNav?.classList.remove("active");
  curSelectorNav=null;
})