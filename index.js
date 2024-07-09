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

const searchRepos = debounce(async (query) => {
  // console.log("🚀 ~ searchRepos ~ query:", query)
  if(query.length > 0){
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await response.json();
      // console.log("data.items: ", data.items);
      updateDropdown(data.items); 
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  }else{
    updateDropdown([]); 
  }
}, 500);

function updateDropdown(repos) {
  console.log("repos: ", repos);
  dropdown.innerHTML = "";
  repos.slice(0,5).forEach((repo) => {
    const repoItem = document.createElement("li");
    repoItem.classList.add("wrapper__dropdown-item");
    repoItem.textContent = repo.name;
    //repoItem.addEventListener("click", () => (функцию, для добавления репозитория в список(wrapper__repo-item))
    dropdown.appendChild(repoItem);
  });
}
//функцию, для добавления репозитория в список(wrapper__repo-item)

input.addEventListener("input", (event) => {
  const query = event.target.value;
  searchRepos(query);
  
});

