export default{
    showHeader(){
        let plantilla=
        `
        <nav class="navbar navbar-expand-lg header">
        <div class="container">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" modulo="skill" id="mdSKill" aria-current="page">SKill</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" id="mdModuloSKill">Modulos Skill</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " aria-current="page" id="mdTeams">Teams</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " aria-current="page" id="mdReclutas">Reclutas</a>  
              </li>
              <li class="nav-item">
                <a class="nav-link " aria-current="page" id="mdEvaluacion">Evaluacion</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        `;

        document.querySelector("#header").insertAdjacentHTML("beforeend", plantilla);


    }
}