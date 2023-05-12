const getAllMdSkills = async()=>{
    try{

        let respuesta = await fetch("http://localhost:4001/moduloSkill");
        const data = await respuesta.json();

        let plantilla ="";
        for(const res in data){
            let skill = await fetch(`http://localhost:4001/skill/${data[res].idSkill}`);
            const sk = await skill.json();
            
            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${sk.nombre}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="btn-eliminar eliminarMdSkill">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="btn-editar editarMdSkill">Editar</button>
                </td>
            </tr>
            `;
        }

        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}

const buscarSkill = async(palabra)=>{
    try{
        let plantilla="";
        let respuesta = await fetch(`http://localhost:4001/moduloSkill?q=${palabra}`);
        const data = await respuesta.json();
        for(const res in data){
            
            let skill = await fetch(`http://localhost:4001/skill/${data[res].idSkill}`);
            const sk = await skill.json();

            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${sk.nombre}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="eliminarRecluta">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="editarRecluta">Editar</button>
                </td>
            </tr>
            `;
        }
        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}
const buscarReclutaTeam = async(palabra)=>{
    try{
        let plantilla="";
        let respuesta = await fetch(`http://localhost:4001/recluta?q=${palabra}`);
        const data = await respuesta.json();
        for(const res in data){
            
/*          let categorias = await fetch(`http://localhost:4001/recluta/${data[dat].categoriaId}`);
            const categoria = await categorias.json(); */

            plantilla +=
            `
            <tr>
                <th scope="row">${data[res].id}</th>
                <td>${data[res].nombre}</td>
                <td>${data[res].edad}</td>
                <td>${data[res].telefono}</td>
                <td>${data[res].email}</td>
                <td>${data[res].direccion}</td>
                <td>${data[res].fechaNacimiento}</td>
                <td>${data[res].documento}</td>
                <td>${data[res].fechaIngresoPrograma}</td>
                <td>${data[res].idTeam}</td>
                <td>
                    <button href="#" id='${data[res].id}' class="eliminarRecluta">Eliminar</button>
                    <button href="#" id='${data[res].id}' class="editarRecluta">Editar</button>
                </td>
            </tr>
            `;
        }
        return plantilla
    }catch(e){
        return "Error => "+e;
    }
}
const dropSkill = async(id)=>{
    try{
        let config={
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
        };
        let respuesta = await fetch(`http://localhost:4001/moduloSkill/${id}`,config);
        const data = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}

const updateMdSkill = async(data2)=>{
    try{
        let config={
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data2)
        };

        let respuesta = await fetch(`http://localhost:4001/moduloSkill/${data2.id}`,config);
        const result = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}

const showSkill = async(id)=>{
    try{
        let respuesta = await fetch(`http://localhost:4001/moduloSkill/${id}`);
        const data = await respuesta.json();
        return data
    }catch(e){
        return "Error => "+e;
    }
}

const addMdSkill = async(data2)=>{
    try{
        let config={
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data2)
        };

        let respuesta = await fetch(`http://localhost:4001/moduloSkill/`,config);
        const result = await respuesta.json();

        return "ok"
    }catch(e){
        return "Error => "+e;
    }
}
self.addEventListener('message', async function(event){
    let data = "";
    switch(event.data.type){
        case "getAllMdSkills":
            data = await getAllMdSkills();
        break; 
        case "buscarSkill":
            data = await buscarSkill(event.data.data);
        break;
        case "showSkill":
            data = await showSkill(event.data.id);
        break;  
        case "addMdSkill":
            data = await addMdSkill(event.data.data);
        break;
        case "updateMdSkill":
            data = await updateMdSkill(event.data.data);
        break; 
        case "dropSkill":
            data = await dropSkill(event.data.id);
        break;
        /*  
        
        
        
        case "buscarReclutaTeam":
            data = await buscarReclutaTeam(event.data.data);
        break;
        
        */
    }
    self.postMessage(data);
})