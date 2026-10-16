const outputEl = document.querySelector('output');

const allTags = []

sites.forEach((site, index) => {

  site.tags.forEach(tag => {
    if(!allTags.includes(tag))
    {
      allTags.push(tag)
    }
  })

  let websiteEntryEl = document.createElement('a');
  websiteEntryEl.href = site.url;
  websiteEntryEl.classList.add('website_entry')
  websiteEntryEl.setAttribute('key', index);

  websiteEntryEl.addEventListener('mouseover', (e)=>{
    
    let descriptionEl = document.createElement('div');
    descriptionEl.classList.add('description');

    let p1 = document.createElement('p');
    p1.textContent = `Added on: ${site.date_added}`;

    let p2 = document.createElement('p');
    p2.textContent = site.description;

    descriptionEl.appendChild(p1);
    descriptionEl.appendChild(p2);

    websiteEntryEl.appendChild(descriptionEl);
  });

  websiteEntryEl.addEventListener('mouseout', (e)=>{
    
    websiteEntryEl.querySelector('.description').remove()
  });

  

  let articleEl = document.createElement('article');
  site.comment ? articleEl.title = site.comment : null;

  let headingEl = document.createElement('h3');
  headingEl.textContent = site.title;

  let imageEl = document.createElement('img');
  imageEl.src = `screenshots/${site.image}`;

  articleEl.appendChild(headingEl);
  articleEl.appendChild(imageEl);

  websiteEntryEl.appendChild(articleEl);

  outputEl.appendChild(websiteEntryEl);
});

const searchEl = document.querySelector('section > search')

allTags.forEach(tag => {
  let searchCategory = document.createElement('button');
  searchCategory.textContent = tag;
  searchEl.prepend(searchCategory);
})

const searchCategories = document.querySelectorAll('search > button:not(.control)');
const websiteEntries = document.querySelectorAll('.website_entry');
const resultsEl = document.querySelector('.results_count');

let numberResults = websiteEntries.length
resultsEl.textContent = numberResults;

const filterTags = [];

searchCategories.forEach(categoryEl => {

  categoryEl.addEventListener('click', e =>{

    const category = categoryEl.textContent.trim()
    numberResults = 0;

    if(filterTags.includes(category)){
      categoryEl.classList.remove('checked');
      let startIndex = filterTags.indexOf(category)
      filterTags.splice(startIndex, 1)

    } else {
      categoryEl.classList.add('checked');
      filterTags.push(category)
    }

    if(filterTags.length == 0){
      websiteEntries.forEach(entry => { entry.style.display = 'inline' })
      numberResults = websiteEntries.length;
      resultsEl.textContent = numberResults;
      return
    }
    
    websiteEntries.forEach(entry => {
      let websiteEntryTags = sites[entry.getAttribute('key')].tags;
      
      let matches = 0;
      for (let i = 0; i < websiteEntryTags.length; i++) {
        if(filterTags.includes(websiteEntryTags[i])){
          matches++
        }
      }
      if(matches == filterTags.length){
        numberResults++
        entry.style.display = 'inline';
      } else {
        entry.style.display = 'none';
      }
      

        
    });
    resultsEl.textContent = numberResults;
  })
});
