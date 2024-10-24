export function sessionInit()
{
    if(!sessionStorage.getItem("id"))
    {
        fetch("https://jsonplaceholder.typicode.com/users").then(function (response)
        {
            return response.json();
        }).then(function (response)
        {
            //dummy user if no accounts are there
            sessionStorage.setItem("id", response[0].id);
        });
    }
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