let button = document.querySelector('button');
let imggauche = document.querySelectorAll('.gauche img');
let imgdroite = document.querySelectorAll('.droite img');
let currentStageIndex = 0;
let fightersInitialized = false; // Suivre si les combattants sont déjà chargés

// Fonction pour afficher les combattants au premier clic
function displayFighters() {
    fetch('https://dragonball-api.com/api/characters')
        .then(response => response.json())
        .then(data => {
            let persos = data.items;
            let selectedFighters = [];
            while (selectedFighters.length < 8) {
                let randomIndex = Math.floor(Math.random() * persos.length);
                let selectedCharacter = persos[randomIndex];
                if (!selectedFighters.includes(selectedCharacter)) {
                    selectedFighters.push(selectedCharacter);
                }
            }

            // Sefyu : On assigne les images des personnages sélectionnés aux emplacements des combattants
            let imgSlots = document.querySelectorAll('.tour-un .combat .gauche img, .tour-un .combat .droite img');
            imgSlots.forEach((imgSlot, index) => {
                if (selectedFighters[index]) {
                    imgSlot.src = selectedFighters[index].image;
                    imgSlot.alt = selectedFighters[index].name;
                }
            });

            button.textContent = 'Commencer le combat'; // Change le texte du bouton pour indiquer que le combat peut commencer
            fightersInitialized = true; // Indique que les combattants sont chargés pour le tournoi
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des personnages :', error);
        });
}

// Fonction d'animation pour les combats, activée à chaque tour
function animation() {
    imggauche.forEach((imgG, index) => {
        let imgD = imgdroite[index];

        // Sefyu : On applique l'animation en ajoutant la classe
        imgG.classList.add('animate-fight');
        imgD.classList.add('animate-fight');

        // Sefyu : On retire l'animation après une seconde 
        setTimeout(() => {
            imgG.classList.remove('animate-fight');
            imgD.classList.remove('animate-fight');
        }, 1000);
    });
}

// Fonction de combat qui détermine les gagnants et perdants
function fight() {
    imggauche.forEach((imgG, index) => {
        let imgD = imgdroite[index];
        
        // Sefyu : On détermine aléatoirement ici qui sera le vainqueur
        let winner = Math.random() < 0.5;

        if (winner) {
            imgD.classList.add('loser');  
            imgG.classList.remove('loser'); 
            
            // Youssef : La classe 'move-bottom' crée l'animation du gagnant
            imgG.classList.add('move-bottom');
        } else {
            imgG.classList.add('loser'); 
            imgD.classList.remove('loser'); 
            
            imgD.classList.add('move-bottom');
        }
    });
}

// Gestion des étapes du tournoi avec changement de texte du bouton
function nextRound() {
    // Vérifie si les combattants ne sont pas encore chargés, et charge si nécessaire
    if (!fightersInitialized) {
        displayFighters();
    } else {
        // Sinon, déclenche l'animation et le combat pour chaque tour
        animation();
        fight();
        currentStageIndex++;
        
        // Mise à jour du texte du bouton en fonction de l'étape actuelle
        switch (currentStageIndex) {
            case 1:
                button.textContent = 'Demi-finale';
                break;
            case 2:
                button.textContent = 'Finale';
                break;
            case 3:
                button.textContent = 'Voir le gagnant';
                break;
            default:
                button.textContent = 'Tournoi terminé';
                button.disabled = true; // Désactive le bouton après la fin du tournoi
        }
    }
}

// Associe l'événement de clic au bouton pour démarrer le tournoi
button.addEventListener('click', nextRound);
