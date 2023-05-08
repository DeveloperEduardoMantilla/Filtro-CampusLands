const getOptionNameTeam = async()=>{
    try{

        let respuesta = await fetch("http://localhost:4001/team");
        const data = await respuesta.json();

        let plantilla ="";
        for(const res in data){
            plantilla +=
            `
            <option value="${data[res].id}">${data[res].nombre}</option>
            `;
        }

        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}
const getAllTeams = async()=>{
    try{

        let respuesta = await fetch("http://localhost:4001/team");
        const data = await respuesta.json();

        let plantilla ="";
        for(const res in data){

            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${data[res].trainerAsociado}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="eliminarTeam">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="editarTeam">Editar</button>
                </td>
            </tr>
            `;
        }

        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}

const buscarTeam = async(palabra)=>{
    try{
        let plantilla="";
        let respuesta = await fetch(`http://localhost:4001/team?q=${palabra}`);
        const data = await respuesta.json();
        for(const res in data){
            
/*          let categorias = await fetch(`http://localhost:4001/recluta/${data[dat].categoriaId}`);
            const categoria = await categorias.json(); */

            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${data[res].trainerAsociado}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="eliminarTeam">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="editarTeam">Editar</button>
                </td>
            </tr>
            `;
        }
        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}
const dropTeam = async(id)=>{
    try{
        let plantilla="";
        let config={
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
        };
        let respuesta = await fetch(`http://localhost:4001/team/${id}`,config);
        const data = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}

const updateTeam = async(data2)=>{
    try{
        let config={
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data2)
        };

        let respuesta = await fetch(`http://localhost:4001/team/${data2.id}`,config);
        const result = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}

const showTeam = async(id)=>{
    try{
        let respuesta = await fetch(`http://localhost:4001/team/${id}`);
        const data = await respuesta.json();
        return data
    }catch(e){
        return "Error => "+e;
    }
}

const addTeam = async(data2)=>{
    try{
        let config={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data2)
        };

        let respuesta = await fetch(`http://localhost:4001/team/`,config);
        const result = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}

self.addEventListener('message', async function(event){
    let data = "";
    switch(event.data.type){
        case "getTeam":
            data = await getTeam();
        break; 
        case "getAllTeams":
            data = await getAllTeams();
        break;  
        case "dropTeam":
            data = await dropTeam(event.data.id);
        break; 
        case "showTeam":
            data = await showTeam(event.data.id);
        break;
        case "updateTeam":
            data = await updateTeam(event.data.data)
        break; 
        case "addTeam":
            data = await addTeam(event.data.data)
        break;
        case "buscarTeam":
            data = await buscarTeam(event.data.data)
        break;
        case "getOptionNameTeam":
            data = await getOptionNameTeam();
        break;
    }
    self.postMessage(data);
})