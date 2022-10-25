
const BASE_URL = "https://api.npoint.io/";

const fetchAccounts =  async function () {
    const res = await fetch(`${BASE_URL}/97d89162575a9d816661`,{
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const accounts = await res.json();
    return accounts
  }