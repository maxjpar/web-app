const contenedor = document.getElementById("contenedor");

fetch("https://api.npoint.io/97d89162575a9d816661")
.then(res=> res.json())
.then(data =>{
      
    for(let i of data["cuentas"]){
        //console.log(i.saldo);
        if(i.moneda == "$" || i.moneda == "u$s"){
            if(i.tipo_letras == "CA" || i.tipo_letras == "CC"){
                if(i.n != " "){
                    const div_contenedor = document.createElement("div");
                    div_contenedor.className = "divsCuentas";
                    div_contenedor.innerHTML= `<div>
                                                <h2>${i.tipo_letras}</h2>
                                                <h2> ${i.n}</h2>
                                                </div>`;
                    contenedor.append(div_contenedor);
                }
            }
        }
    }
    alert("asdsa")
})
    
