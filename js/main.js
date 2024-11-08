let button = document.querySelector('button')

let imggauche = document.querySelectorAll('.gauche img')

let imgdroite = document.querySelectorAll('.droite img')

// On va créer une fonctions animation qui va se déclancher en appuyant sur le bouton


function animation() {
    imggauche.forEach((imgG, index) => {
        let imgD = imgdroite[index];

        // Sefyu :  Pour que tu comprennes : On applique l'animation en ajoutant la classe

        imgG.classList.add('animate-fight');
        imgD.classList.add('animate-fight');

        // Sefyu : On retire l'animation après une seconde 
        setTimeout(() => {
            imgG.classList.remove('animate-fight');
            imgD.classList.remove('animate-fight');
        }, 1000);
    });
}


 
function fight() {
    imggauche.forEach((imgG, index) => {
        let imgD = imgdroite[index];
        
        // Sefyu : On détermine aléatoirement ici qui sera le vainquer
        let winner = Math.random() < 0.5;
        
        if (winner) {
            imgD.classList.add('loser');  
            imgG.classList.remove('loser'); 
        } else {
            imgG.classList.add('loser'); 
            imgD.classList.remove('loser'); 
        }
    });
}

function displayFighters(){
  
  fetch(' https://dragonball-api.com/api/characters')
  .then(response => response.json()) 
  .then(data => {

    let fightersContainer = document.getElementById('fighters');
    
    // Jusque la logique, 8 perssonnages donc,
    // la boucle elle va s'arrêter à 8

    for (let i = 0; i < 8; i++) {
      // On crée une nouvelle image pour chaque personnage
      let img = document.createElement('img');

      // On prend l'URL de l'image du personnage
      img.src = data[i].image; 

       // On donne un texte alternatif avec le nom du personnage
      img.alt = data[i].name; 
      
      // On vaici ajouter l'image au container l'image au container
      fightersContainer.appendChild(img);
    }
  })
  .catch(error => {
    
    console.error('Erreur lors de la récupération des personnages :', error);
  });
    }

button.addEventListener('click', displayFighters)
button.addEventListener('click', animation)
button.addEventListener('click', fight)