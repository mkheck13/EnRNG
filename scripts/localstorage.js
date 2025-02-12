// Save to Local
const SaveLocal = (isName) => {
    console.log(isName);

    let names = GetLocal();

    if(!names.includes(isName)){
        names.push(isName);
    }
    localStorage.setItem("Names", JSON.stringify(names));
};

// Get From Local
const GetLocal = () => {
    let localData = localStorage.getItem("Names");

    if(localData == null){
        return [];
    }
    return JSON.parse(localData);
};

// Remove From Local
const RemoveLocal = (isName) => {
    let names = GetLocal();
    let index = names.indexOf(isName);

    if(index !== -1){
        names.splice(index, 1);

        console.log(names);
        localStorage.setItem("Names", JSON.stringify(names))     
    }
};

// Exports
export { SaveLocal, GetLocal, RemoveLocal }