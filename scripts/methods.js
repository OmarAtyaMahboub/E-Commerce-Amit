export function sessionCheck()
{
    if(!sessionInit())
    {
        alert("you should be logged in!\nredirecting to login page");
        window.location.assign("../html/login.html");
    }
    return true;
}

function sessionInit()
{
    return sessionStorage.getItem("id");
}

export function getItemById(id, source)
{
    for(let i = 0; i < source.length; i++)
    {
        if(source[i].id === id)
            return source[i];
    }
}

export function getItemIndex(id, source)
{

    for(let i = 0; i < source.length; i++)
    {
        if(source[i].id === id)
        {
            return i;
        }

    }
}

export function appendToStorage(source, destinationName)
{
    let destination = JSON.parse(localStorage.getItem(`${sessionStorage.getItem("id")}${destinationName}`)) || [];
    destination.push(source);
    localStorage.setItem(`${sessionStorage.getItem("id")}${destinationName}`, JSON.stringify(destination));
}

export function updateStorage(source, destinationName)
{
    localStorage.setItem(`${sessionStorage.getItem("id")}${destinationName}`, JSON.stringify(source));
}

export function deleteStorage(destinationName)
{
    localStorage.removeItem(`${sessionStorage.getItem("id")}${destinationName}`);


}
