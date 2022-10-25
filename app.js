
document.addEventListener('DOMContentLoaded', function () {
    let perPage = 5
    displayPageNav(perPage)
    displayItems(1, perPage)
}, false);

const buildCard = (account) => {
    return `<div class="content-card"><h2>${account.tipo_letras}</h2>
            <h2>${account.n}</h2>
            <h2>$${account.saldo}</h2></div>
            `;
}

const accountsFiltered = async () => {
    const accounts = await fetchAccounts();
    return accounts.cuentas.filter(
        (acc) =>
            (acc.moneda == "$" || acc.moneda == "u$s") &&
            (acc.tipo_letras == "CA" || acc.tipo_letras == "CC") &&
            (acc.n != " ")
    );
}

const rename = () => {
    let a = document.querySelector(".link-1");
    let b = document.querySelector(".link-2");

    a.classList.add("page-back");
    b.classList.add("page-next");

    a.innerHTML = "ATRAS  ";
    b.innerHTML = "SIGUIENTE";
}

const displayPageNav = async perPage => {
    let pagination = ``
    const accounts = await accountsFiltered();
    console.log(accounts)
    const totalItems = accounts.length;
    perPage = perPage ? perPage : 1
    const pages = Math.ceil(totalItems / perPage)
    for (let i = 1; i <= pages; i++) {
        pagination += `<a href="#" class='link-${i}' onClick="displayItems(${i},${perPage})" >${i}</a>`
    }
    document.getElementById('pagination').innerHTML = pagination
}

const removeChilds = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const displayItems = async (page = 1, perPage = 2) => {
    let div = document.getElementById("container");
    removeChilds(div);
    const contenedor = document.getElementById("container");
    const dataSet = await accountsFiltered();
    let index, offSet
    if (page == 1 || page <= 0) {
        index = 0
        offSet = perPage
    } else if (page > dataSet.length) {
        index = page - 1
        offSet = dataSet.length
    } else {
        index = page * perPage - perPage
        offSet = index + perPage
    }
    const slicedItems = dataSet.slice(index, offSet)
    slicedItems.map(acc => {
        const divContainer = document.createElement("div");
        divContainer.className = "divsAccounts";
        divContainer.innerHTML = buildCard(acc);
        contenedor.append(divContainer);
    });
    rename();
    showBalance();
}

const showBalance = () => {
    const cards = document.querySelectorAll(".divsAccounts");
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            console.log(e);
        })
    });

}