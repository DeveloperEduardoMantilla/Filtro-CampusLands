export default{
    showBody(){
        let plantilla=
        `   
            <header id="header"></header>
            <div id="entrada"><div class="capa"><h2>Star Wars</h2></div></div>
            <div class="container">
                <div class="modulo" id="mdSKill">
                    <h2>Modulos Skill</h2>
                    <div id="moduloSkill"></div>
                </div>
                <div class="modulo" id="modulosSKillss">
                    <h2>Skill</h2>
                    <div id="skill"></div>
                </div>
                <div class="modulo" id="moduloTeamss">
                <h2>Modulo Teams</h2>
                    <div id="teams"></div>
                </div>

                </div>

                <div class="modulo container" id="moduloReclutas">
                    <h2>Modulos Reclutas</h2>
                    <div id="reclutas"></div>
                </div>

            </div> 
            
        `;
        document.querySelector("#app").insertAdjacentHTML("beforeend",plantilla)
    }
}

/* 
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