//Imports
import { SaveLocal, GetLocal, RemoveLocal } from "./localstorage.js"

// ID's
let nameInput = document.getElementById("nameInput");
let addNameBtn = document.getElementById("addNameBtn");

let displayRandomname = document.getElementById("displayRandomname");
let randomNameBtn = document.getElementById("randomNameBtn");

let groupCountSlider = document.getElementById("groupCountSlider");
let groupCountValue = document.getElementById("groupCountValue");

let groupSizeSlider = document.getElementById("groupSizeSlider");
let groupSizeValue = document.getElementById("groupSizeValue");

let groupBtn = document.getElementById("groupBtn");
let modalBody = document.getElementById("modalBody");
let namesDiv = document.getElementById("namesDiv");
let totalNames = document.getElementById("totalNames");

let nameArr = [];

// Add Name Button Logic
addNameBtn.addEventListener('click', () => {
    let names = GetLocal();

    SaveLocal(nameInput.value);

    let div = document.createElement("div");
    let p = document.createElement("p");
    let remove = document.createElement("button");

    p.textContent = nameInput.value;
    p.className = "text-2xl";

    remove.textContent = "Remove";
    remove.className = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";

    div.className = "flex justify-evenly p-5";

    remove.addEventListener('click', () => {
        let index = nameArr.indexOf(p.textContent);
        nameArr.splice(index, 1);
        totalNames.innerText = `Current Names: ${nameArr.length}`;

        RemoveLocal(p.textContent);
        names = GetLocal();
        div.remove();
    });

    nameArr.push(nameInput.value);
    totalNames.innerText = `Current Names: ${nameArr.length}`
    nameInput.value = "";
    div.append(p);
    div.append(remove);
    namesDiv.appendChild(div);
});

// Random Name Button
randomNameBtn.addEventListener('click', () => {

    if(!nameArr.length > 0){
        displayRandomname.textContent = "Please Enter A Name Before Attempting.";
    }else{
        let randName = Math.floor(Math.random() * nameArr.length);
        displayRandomname.textContent = nameArr[randName];
    }
});

// Group Count Slider
groupCountSlider.addEventListener('input', () => {
    groupCountValue.textContent = groupCountSlider.value;
});

// Group Size Slider
groupSizeSlider.addEventListener('input', () => {
    groupSizeValue.textContent = groupSizeSlider.value;
});

// Random Group Button
groupBtn.addEventListener('click', () => {
    let nameArr = GetLocal();
    let noNameMessage = document.createElement('p');
    modalBody.innerHTML = "";

    if(nameArr.length < groupSizeSlider.value){
        noNameMessage.textContent = "You can not make a group larger than the amount of names added";
        noNameMessage.className = "text-white";
        modalBody.append(noNameMessage);
    }else{
        let newArr = nameArr;
        let groupSize = groupSizeSlider.value;

        shuffle(newArr);
        console.log(newArr);

        const results = newArr.reduce((resultArr, isName, index) => {
            const groupIndex = Math.floor(index / groupSize)

            if(!resultArr[groupIndex]){
                resultArr[groupIndex] = [];
            }
            resultArr[groupIndex].push(isName)

            return resultArr;
        }, [])
        console.log(results);

        for(let i = 0; i < groupSizeSlider.value; i++){
            if(results[i].length < groupSize){
                return;
            }else{
                let group = document.createElement('p');

                group.textContent = `Team #${i + 1}: ${results[i]}`;
                group.className = "text-white text-2xl"
                modalBody.append(group);
            }
        }
    }
});

// Shuffle Function for Groups
const shuffle = (arr) => {
    let currentIndex = arr.length, randIndex;

    while(currentIndex > 0){
        randIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randIndex]] = [arr[randIndex], arr[currentIndex]];
    }
    return arr;
};

// Local storage
// function isSaved(nameInput){
//     const saved = GetLocal();
//     return saved.includes(nameInput)
// };