const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

const content = document.createElement("div");
content.classList.add("wrapper__content");
wrapper.appendChild(content);

const inputWrapper = document.createElement("div"); //теперь в него еще 2 дива
inputWrapper.classList.add("wrapper__input-wrapper");
content.appendChild(inputWrapper);

const input = document.createElement("input");
input.classList.add("wrapper__input");
input.placeholder = "Type to search...";
inputWrapper.appendChild(input);

const dropdownWrapper = document.createElement("div");
dropdownWrapper.classList.add("wrapper__dropdown-wrapper");
inputWrapper.appendChild(dropdownWrapper);

const dropdown = document.createElement("ul");
dropdown.classList.add("wrapper__dropdown");
dropdownWrapper.appendChild(dropdown);

const repoList = document.createElement("div");
repoList.classList.add("wrapper__repo-list");
content.appendChild(repoList);


function debounce(fn, ms) {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    };

    clearTimeout(timeout);

    timeout = setTimeout(fnCall, ms);
  };
}

// async function searchRepos(event) {
//   input.value = input.value.trim();
//   const query = event.target.value;
//   const response = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=5`);
//   const data = await response.json();
//   console.log(data);
// }

//поиск по апи
const searchRepos=debounce(async(query)=>{
  try {
    const response=await fetch(`https://api.github.com/search/repositories?q=${query}`)
    const data = await response.json()
    console.log('data: ', data);
    updateDropdown(data.items.slice(0, 5))//сюда добавить и вызвать ф-ю, раскрывающая список+ограничить вхождения до 5 парам(.slice(0, 5))
  } catch (error) {
    console.error('Error fetching repositories:', error)
  }

},500)

function updateDropdown(repos){
  dropdown.innerHTML = ''
  repos.forEach(repo => {
    const repoItem = document.createElement("li")
    console.log('repoItem: ', repoItem);
    repoItem.classList.add("wrapper__dropdown-item")
    repoItem.textContent = repo.name
  })
}

input.addEventListener("input", (event) => {
  const query = event.target.value;
  searchRepos(query);
});

// const res = fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(json => console.log(json))
// console.log('res: ', res);
