export default{
    showBody(){
        let plantilla=
        `   
            <header id="header"></header>
            
            <div id="entrada">
                <div class="capa">
                    <div class="modulo" id="mdEvaluacion">
                        <div class="moduloCotent" id="moduloCotent">
                            
                        </div>
                    </div>
                </div>
            </div>

 
            
        `;
        document.querySelector("#app").insertAdjacentHTML("beforeend",plantilla)
    }
}

/* 

<h2>Modulo Evaluacion</h2>
                            <div id="moduloEvaluacion"</div>

export default{
    showBody(){
        let plantilla=
        `
            
            <main>
                <div id="moduloSkill"></div>
                <div id="skill"></div>
                <div id="teams"></div>
                <div id="evaluacion">Evaluacion</div>
                <div id="reclutas"></div>
            </main>
        `;
        document.querySelector("#app").insertAdjacentHTML("beforeend",plantilla)
    }
} */