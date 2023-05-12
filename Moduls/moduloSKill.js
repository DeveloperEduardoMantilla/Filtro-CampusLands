export default{
    showModuloSkill(){
        let plantilla=
        `
        <div class="form-group col-12 col-md-2">
            <label>Buscador General</label>
            <input id="buscarSkill" value="" class="form-control">
        </div>
        <table class="table" id="tabla_Skills">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Skill</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody id="tabla_datos_md_Skills">
            </tbody>
        </table>

        <form id="updateMdSkill">
            <input type="hidden" name="id" id="id_Edit_Skill">
            <input type="text" name="nombre" id="nombre_Edit_Skill" required>
            <input type="number" name="idSkill" id="skill_Edit_Skill" required>
            <button class="btn btn-sm btn-danger">Enviar</button>
        </form>    
        <my-form-md-skill/>
        `;

        const worker = new Worker("./storage/wsModuloSKill.js")

        worker.postMessage({"type":"getAllMdSkills"});
        worker.onmessage = function(event){
            document.querySelector("#tabla_datos_md_Skills").insertAdjacentHTML("beforeend", event.data)
        }
        document.querySelector("#moduloCotent").innerHTML= plantilla;
        document.querySelector("#tabla_Skills").addEventListener('click', (e)=>{
            if (e.target.matches('.eliminarMdSkill')) {
                let idSkill=e.target.id;
                let res=confirm("Esta seguro que desea eliminar el Skill");
                
                if(res){
                    worker.postMessage({"type":"dropSkill","id":idSkill});
                    worker.onmessage = function(event){
                        if(event.data =="ok"){
                            alert("Modulo Skill eliminado con exito")
                        }else{
                            alert("Hubo un problema al eliminar el Skill")
                        }
                    }
                }    
            } else if (e.target.matches('.editarMdSkill')) {
                let idMdSkill=e.target.id;
                worker.postMessage({"type":"showSkill","id":idMdSkill});
                worker.onmessage = function(event){

                    document.querySelector("#id_Edit_Skill").value = event.data.id
                    document.querySelector("#nombre_Edit_Skill").value = event.data.nombre
                    document.querySelector("#skill_Edit_Skill").value = event.data.idSkill
                    
                }
            }
        })

        document.querySelector("#buscarSkill").addEventListener("input", (e)=>{            
            const worker = new Worker("./storage/wsModuloSKill.js")
            worker.postMessage({"type":"buscarSkill","data":e.target.value});
            
            worker.onmessage = function(event){
                document.querySelector("#tabla_datos_md_Skills").innerHTML=event.data;
            }      
        })
        document.querySelector("#updateMdSkill").addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target))
            
            worker.postMessage({"type":"updateMdSkill","data":data});
            worker.onmessage = function(event){
                console.log("Respuesta => ", event.data)
            }
            
        })

    }
}