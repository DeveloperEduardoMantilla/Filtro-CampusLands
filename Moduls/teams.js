export default{
    showTeams(){
        let plantilla=
        `
        <div class="form-group col-12 col-md-2">
            <label>Buscador General</label>
            <input id="buscarTeam" value="" class="form-control">
        </div>        
        <table class="table" id="tabla_teams">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Trainer Asociado</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody id="tabla_datos_teams">
            </tbody>
        </table>

        <form id="updateTeam">
            <input type="hidden" name="id" id="id_Edit_Team">
            <input type="text" name="nombre" id="nombre_Edit_Team" required>
            <input type="text" name="trainerAsociado" id="trainer_Edit_Team" required>
            <button class="btn btn-danger btn-sm">Enviar</button>
        </form>    
        <my-form-teams/>
        `;

        const worker = new Worker("./storage/wsTeam.js")
        worker.postMessage({"type":"getAllTeams"});
        worker.onmessage = function(event){
            document.querySelector("#tabla_datos_teams").insertAdjacentHTML("beforeend", event.data)

        }
        document.querySelector("#moduloCotent").innerHTML= plantilla;

        document.querySelector("#tabla_teams").addEventListener('click', (e)=>{
            if (e.target.matches('.eliminarTeam')) {
                let id=e.target.id;
                let res=confirm("Esta seguro que desea eliminar el team");

                if(res){
                    worker.postMessage({"type":"dropTeam","id":id});
                    worker.onmessage = function(event){
                        if(event.data =="ok"){
                            alert("Team eliminado con exito")
                        }else{
                            alert("Hubo un problema al eliminar el Team")
                        }
                    }
                }    
            } else if (e.target.matches('.editarTeam')) {
                let idTeam=e.target.id;

                worker.postMessage({"type":"showTeam","id":idTeam});
                worker.onmessage = function(event){
                    let id = document.querySelector("#id_Edit_Team");
                    let nombre = document.querySelector("#nombre_Edit_Team");
                    let trainer = document.querySelector("#trainer_Edit_Team"); 

                    id.value= event.data.id
                    nombre.value=event.data.nombre
                    trainer.value=event.data.trainerAsociado

                }
            }
        })

        /* const getAllTeam = async()=>{
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
        } */

        document.querySelector("#buscarTeam").addEventListener("input", (e)=>{     
            const worker = new Worker("./storage/wsTeam.js")
            worker.postMessage({"type":"buscarTeam","data":e.target.value});
            
            worker.onmessage = function(event){
                document.querySelector("#tabla_datos_teams").innerHTML=event.data;
            }      
        })


        document.querySelector("#updateTeam").addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target))
                
            worker.postMessage({"type":"updateTeam","data":data});
            worker.onmessage = function(event){
                console.log("Respuesta => ", event.data)
            }
            
        }) 

    }
}