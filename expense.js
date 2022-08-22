function saveToLocalStorage(e)
{
    e.preventDefault()
    
    //getting input values from the from

    let amount=e.target.expense_amount.value;
    let description=e.target.description_.value;
    let category=e.target.category_.value;


    //creating objeect with that values
    let obj={
        amount,
        description,
        category
    }

    //pushing in local srtorage(key ,value) by converting into strings

    localStorage.setItem(obj.category,JSON.stringify(obj));
    onScreen(obj)               // calling function A
}


//applying DOMContentLoaded event on window that will fired when page refreshed
window.addEventListener('DOMContentLoaded',onload);

function onload(e)
{   
    Object.keys(localStorage).forEach((keys)=>             //Object.keys(input) is used to get keys of particular input in it
    {
        let strigifiedobject=localStorage.getItem(keys);     //fetching stringifyobjects from local storage
        let unstringifyobject=JSON.parse(strigifiedobject);     // converting back into normal
        onScreen(unstringifyobject)                             // printing on screen
    })
}


function onScreen(obj)              //FUNCTION A
{ 
    let parentNode=document.querySelector('#details');    //selecting ul with its id // after that create child in which <li> is created having edit and delete button
    let childNode=`<li id=${obj.category}> Amount: ${obj.amount} - Description: ${obj.description} - Category: ${obj.category}<button onclick=editUser('${obj.amount}','${obj.description}','${obj.category}')>Edit</button>  
     <button onclick=deleteData('${obj.category}')>Delete</button></li>`
    parentNode.innerHTML=childNode+parentNode.innerHTML;     // inserting <li> in <ul>
}

// onclick function fires when user click on button in which it contained
// in edit button onclick editUser function will called, in this function amount, description and category are passed because these are to br highlighted
//edit delete data from screen and local storage and highlight values on form

function editUser(amount,des,cat)
{
    document.querySelector('#amount').value=amount;
    document.querySelector('#description').value=des;
    document.querySelector('#category').value=cat;

    deleteData(cat);
}

// deleteData function is called in delete button primerly onclick
//it remove data from local storage and screen
function deleteData(category)
{
    localStorage.removeItem(category);
    removeFromScreen(category)   //calling B
}

function removeFromScreen(category) //// B
{
    let parent1=document.querySelector('#details');
    let child=document.getElementById(category);
    if(child)
    {
        parent1.removeChild(child)
    }
}