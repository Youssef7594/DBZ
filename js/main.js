let button = document.querySelector('button')

let imggauche = document.querySelectorAll('.gauche img')

let imgdroite = document.querySelectorAll('.droite img')

// On va créer une fonctions animation qui va se déclancher en appuyant sur le bouton


function animation() {
    imggauche.forEach((imgG, index) => {
        let imgD = imgdroite[index];

        // Pour que tu comprennes : On applique l'animation en ajoutant la classe

        imgG.classList.add('animate-fight');
        imgD.classList.add('animate-fight');

        //On retire l'animation après une seconde 
        setTimeout(() => {
            imgG.classList.remove('animate-fight');
            imgD.classList.remove('animate-fight');
        }, 1000);
    });
}

button.addEventListener('click', animation)

