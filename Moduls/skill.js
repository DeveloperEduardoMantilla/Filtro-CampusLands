export default{
    showSkills(){
        let plantilla=
        `
        <div class="form-group col-12 col-md-2">
            <label>Buscador General</label>
            <input id="buscarSkill" value="" class="form-control">
        </div>
        <table class="table" id="tabla_skill">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Skill</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody id="tabla_datos_skill">
            </tbody>
        </table>

        <form id="updateSkill">
            <input type="hidden" name="id" id="id_Edit_SKill">
            <input type="text" name="nombre" id="nombre_Edit_SKill" required>
            <button class="btn btn-danger btn-sm">Enviar</button>
        </form>    
        <my-form-skill/>
        `;

        const worker = new Worker("./storage/wsSkill.js")
        worker.postMessage({"type":"getAllSkill"});
        worker.onmessage = function(event){
            document.querySelector("#tabla_datos_skill").insertAdjacentHTML("beforeend", event.data)
        }
        document.querySelector("#skill").insertAdjacentHTML("beforeend", plantilla);

        document.querySelector("#tabla_skill").addEventListener('click', (e)=>{
            if (e.target.matches('.eliminarSkill')) {
                let idSkill=e.target.id;
                let res=confirm("Esta seguro que desea eliminar el Skill");
                
                if(res){
                    worker.postMessage({"type":"dropSkill","id":idSkill});
                    worker.onmessage = function(event){
                        if(event.data =="ok"){
                            alert("Skill eliminado con exito")
                        }else{
                            alert("Hubo un problema al eliminar el Skill")
                        }
                    }
                }    
            } else if (e.target.matches('.editarSkill')) {
                let idSkill=e.target.id;

                worker.postMessage({"type":"showSkill","id":idSkill});
                worker.onmessage = function(event){
                    let id = document.querySelector("#id_Edit_SKill");
                    let nombre = document.querySelector("#nombre_Edit_SKill");
   
                    id.value = event.data.id
                    nombre.value=event.data.nombre

                }
            }
        })
        /*
        const getAllTeam = async()=>{
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
*/
        document.querySelector("#buscarSkill").addEventListener("input", (e)=>{           
            const worker = new Worker("./storage/wsSkill.js")
            worker.postMessage({"type":"buscarSkill","data":e.target.value});
            
            worker.onmessage = function(event){
                document.querySelector("#tabla_datos_skill").innerHTML=event.data;
            }      
        })
/*
        document.querySelector("#buscarSkillTeam").addEventListener("input", (e)=>{            
            const worker = new Worker("./storage/wsSkills.js")
            worker.postMessage({"type":"buscarSkill","data":e.target.value});
            
            worker.onmessage = function(event){
                document.querySelector("#tabla_datos_Skills").innerHTML=event.data;
            }      
        })
*/

        document.querySelector("#updateSkill").addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target))
            
            worker.postMessage({"type":"updateSkill","data":data});
            worker.onmessage = function(event){
                console.log("Respuesta => ", event.data)
            }
            
        }) 

    }
}