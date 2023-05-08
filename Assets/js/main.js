import body from "../../Moduls/body.js"; 
import reclutas from "../../Moduls/reclutas.js";
import teams from "../../Moduls/teams.js";
import skill from "../../Moduls/skill.js";
import moduloSkill from "../../Moduls/moduloSKill.js"; 
import header from "../../Moduls/header.js"; 

import "../../Components/my-form-recluta/my-form-recluta.js";
import "../../Components/my-form-teams/my-form-teams.js";
import "../../Components/my-form-skill/my-form-skill.js";
import "../../Components/my-form-md-skill/my-form-md-skill.js";

body.showBody();
header.showHeader();
skill.showSkills();
teams.showTeams();
reclutas.showReclutas();
moduloSkill.showModuloSkill();


