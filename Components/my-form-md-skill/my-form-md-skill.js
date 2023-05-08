let pathname = new URL(import.meta.url).pathname;
let name = pathname.split("/").pop().replace(".js", "");

export default class myTabla extends HTMLElement {
    static async component(){
        return await (await fetch(pathname.replace(".js", ".html"))).text();
    }
    handleEvent(e){
        e.preventDefault();
        this.myWorker(e)
    }
    añadirOpciones(){
        const select = this.shadowRoot.querySelector("#idSkill");
        let ws = new Worker("../../storage/wsSkill.js")
        ws.postMessage({"type":"getOptionNameSkill"})
        
        ws.addEventListener("message", (e)=>{
            select.innerHTML = e.data
        })
    }
    myWorker(e){
        e.preventDefault();
        let ws = new Worker("../../storage/wsModuloSKill.js")
        let data = Object.fromEntries(new FormData(e.target));
        ws.postMessage({"type":"addMdSkill", "data":data})
        ws.addEventListener("message", (e)=>{
            console.log(e.data.producto)
        })
    }
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        Promise.resolve(myTabla.component()).then(html=>{
            this.shadowRoot.innerHTML = html;
            this.añadirOpciones();
            this.form = this.shadowRoot.querySelector("#add_md_skill")
            this.form.addEventListener("submit", this.handleEvent.bind(this))
        })
    }
}
customElements.define(name, myTabla)