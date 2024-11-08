let apiUrl = "https://dragonball-api.com/api/characters";  // URL de base pour l'API

let fetchCharacters = (page = 1, limit = 10) => {
  return fetch(`${apiUrl}?page=${page}&limit=${limit}`)
    .then(response => response.json())
    .then(data => data.items)
    .catch(error => console.error("Erreur lors de la récupération des personnages", error));
};


let fetchCharacterById = (id) => {
  return fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(character => character)
    .catch(error => console.error("Erreur lors de la récupération du personnage", error));
};


let fetchFilteredCharacters = (filters) => {
  let queryString = new URLSearchParams(filters).toString();
  return fetch(`${apiUrl}?${queryString}`)
    .then(response => response.json())
    .then(data => data.items)
    .catch(error => console.error("Erreur lors de la récupération des personnages filtrés", error));
};


let displayCharacter = (character) => {
  let characterDiv = document.createElement('div');
  characterDiv.classList.add('character');
  characterDiv.innerHTML = `
    <h3>${character.name}</h3>
    <img src="${character.image}" alt="${character.name}" />
    <p>Race: ${character.race}</p>
    <p>Affiliation: ${character.affiliation}</p>
    <p>Ki: ${character.ki}</p>
    <p>Description: ${character.description}</p>
  `;
  document.body.appendChild(characterDiv); 
};


let testApi = () => {
  fetchFilteredCharacters({ race: 'Saiyan', affiliation: 'Z Fighter' })
    .then(characters => {
      characters.forEach(character => displayCharacter(character));  
    });
};

let testCharacterById = (id) => {
  fetchCharacterById(id)
    .then(character => displayCharacter(character));  
};

testApi();  