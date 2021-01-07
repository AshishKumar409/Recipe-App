const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const appId = '253d52e6'
const appKey = 'a6285899e569c14f3a58db5ab147edec'
let firstDiv = document.querySelector('.search-result')
let  fragment = new DocumentFragment()
let  fragmentOne = new DocumentFragment()

let button = document.querySelector('button')

let searchData = ''


searchForm.addEventListener('submit',(e)=>{
   e.preventDefault()
  button.style.color = '#fff'
  setTimeout(normal,90)
  function normal(){
    button.style.color = null
  }
   searchData=searchInput.value
  fetchData(searchData); 
  
  
})


 async function fetchData(searchFood){
   firstDiv.innerHTML = null
  let url = `https://api.edamam.com/search?q=${searchFood}&app_id=${appId}&app_key=${appKey}`;
  
  let response = await fetch(url)
  let JsonData = await response.json()
  let array  = await JsonData.hits
  
  
  array.forEach((items)=>{
  
   
   
  let item = document.createElement('div')
  item.classList.add('item')

  let imageContainer = document.createElement('div')
  imageContainer.classList.add('img-container')


  let image = document.createElement('img')
  image.src = items.recipe.image
  image.alt = `${items.recipe.label}`

  imageContainer.appendChild(image)
  item.appendChild(imageContainer)



  let flexContainer = document.createElement('div')
  flexContainer.classList.add('flex-container')

  let h1 = document.createElement('h1')
  h1.classList.add('title')    
  h1.textContent = items.recipe.label
  flexContainer.appendChild(h1)


  let a = document.createElement('a')
  a.href = items.recipe.shareAs
  a.textContent = "Recipe"
  flexContainer.appendChild(a)
  let p = document.createElement('p')
  p.classList.add('item-data')
  p.innerHTML = `
  Carbs:${Math.round(items.recipe.totalNutrients.CHOCDF.quantity)} g<br>
  Calories:${Math.round(items.recipe.calories)} <br>
  Fat:${Math.round(items.recipe.totalNutrients.FAT.quantity)} g`
  
  
  fragment.appendChild(flexContainer)
  fragment.appendChild(p)
  item.appendChild(fragment)
  fragmentOne.appendChild(item)
  
    

    
    
  })
 firstDiv.appendChild(fragmentOne)

  
}

