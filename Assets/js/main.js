import body from "../../Moduls/body.js"; 
import reclutas from "../../Moduls/reclutas.js";
import teams from "../../Moduls/teams.js";
import skill from "../../Moduls/skill.js";
import moduloSkill from "../../Moduls/moduloSKill.js"; 
import header from "../../Moduls/header.js"; 
import evaluacion from "../../Moduls/evaluacion.js"; 

import "../../Components/my-form-recluta/my-form-recluta.js";
import "../../Components/my-form-teams/my-form-teams.js";
import "../../Components/my-form-skill/my-form-skill.js";
import "../../Components/my-form-md-skill/my-form-md-skill.js";





body.showBody();
header.showHeader();

skill.showSkills();
document.querySelector("#mdSKill").addEventListener("click",()=>{
    console.log("mdSKill")
    skill.showSkills();
})
document.querySelector("#mdTeams").addEventListener("click",()=>{
    console.log("mdTeams")
    teams.showTeams();
})
document.querySelector("#mdReclutas").addEventListener("click",()=>{
    console.log("mdReclutas")
    reclutas.showReclutas();
})
document.querySelector("#mdModuloSKill").addEventListener("click",()=>{
    console.log("mdModuloSKill")
    moduloSkill.showModuloSkill();
})
document.querySelector("#mdEvaluacion").addEventListener("click",()=>{
    console.log("mdEvaluacion")
    evaluacion.showEvaluacion();
})







