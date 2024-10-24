export function sessionCheck()
{
    if(!sessionInit())
    {
        window.location.assign("../html/login.html");
    }
    return true;
}

function sessionInit()
{
    return (sessionStorage.getItem("id"));
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
            console.log(`found element `);
            return i;

        }

    }
    console.log(`found nothing`);
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
