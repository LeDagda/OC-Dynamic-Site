// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();
// Récupération du DOM class "fiches" dans index.html
const sectionFiches = document.querySelector(".fiches");
const divProduitAbordable = document.querySelector(".produits-abordables");
const divProduitDisponible = document.querySelector(".produits-disponibles");

/*---------------------------------------------------------------------------*/
/*---------          Evenements sur les boutons de filtre           ---------*/
/*---------------------------------------------------------------------------*/
/* Bouton de tri*/
const boutonTrierCroissant = document.querySelector(".btn-trier-croiss");
boutonTrierCroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    sectionFiches.innerHTML="";

    piecesOrdonnees.sort(function (_piece1, _piece2) {
            return _piece1.prix - _piece2.prix;
    });
    
    piecesOrdonnees.forEach(piecesOrdonnees => {
        afficherPiece(sectionFiches, piecesOrdonnees);
    });
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroiss");
boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    sectionFiches.innerHTML="";
    
    piecesOrdonnees.sort(function (_piece1, _piece2) {
        return -(_piece1.prix - _piece2.prix);
    });
    
    piecesOrdonnees.forEach(piecesOrdonnees => {
        afficherPiece(sectionFiches, piecesOrdonnees);
    });
});

/* Bouton de filtre */
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    sectionFiches.innerHTML="";
    
    pieces.filter(function (piece) {
        piece.prix >= 35 ? afficherPiece(sectionFiches, piece) : null
    });
});
/* Bouton de filtre */
const boutonFiltrerNoDescription = document.querySelector(".btn-filtrer-nodesc");
boutonFiltrerNoDescription.addEventListener("click", function () {
    sectionFiches.innerHTML="";
    
    pieces.filter(function (piece) {
        piece.description === undefined ? afficherPiece(sectionFiches, piece) : null
    });
});

const buttonPrix = document.querySelector("#prix-max");
console.log(buttonPrix);

buttonPrix.addEventListener("change", (valeurPrix) => {
    sectionFiches.innerHTML="";
    
    pieces.filter(function (piece) {
        console.log(`${valeurPrix.target.value} - Prix choisi : ${valeurPrix.value}`);
        piece.prix <= valeurPrix.target.value ? afficherPiece(sectionFiches, piece) : null
    });
});


/*---------------------------------------------------------------------------*/
/*---------          Affichage des descriptions de pièces           ---------*/
/*---------------------------------------------------------------------------*/
function afficherPiece(_sectionFiches, _article) {
    // Création d'une zone pour afficher un article
    const pieceElement = document.createElement("article");
    // Création d'une image pour l'artice et des éléments suivants
    const imageElement = document.createElement("img");  
    const nomElement = document.createElement("h2");
    const prixElement = document.createElement("p");
    const categorieElement = document.createElement("p");
    const descriptionElement = document.createElement("p");
    const disponibiliteElement = document.createElement("p");
    // Nous peuplons avec les valeurs
    imageElement.src = _article.image;
    nomElement.innerText = _article.nom;
    prixElement.innerText = `Prix: ${_article.prix} € (${_article.prix < 35 ? "€" : "€€€"})`;
    categorieElement.innerText = _article.categorie ?? "(aucune catégorie)";
    descriptionElement.innerText = _article.description ?? "Pas de description pour le moment";
    disponibiliteElement.innerText = _article.disponibilite ? "En stock" : "Rupture de stock";
    
    // Nous rattachons nos éléments "HTML" au DOM
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(disponibiliteElement);
    // Nous rajoutons à la section fiche la pièce
    _sectionFiches.appendChild(pieceElement);
}

function afficherListeAbordable() {
    let titreAbordable = document.createElement("h2");
    let listeAbordable = document.createElement("ul");
    titreAbordable.innerText = "Liste des pièces < 35€";
console.debug("List abordable")
    pieces.forEach(unePiece => {
        // On ne conserve que les pièces < 35€
        if (unePiece.prix < 35) {
            let unElementAborable = document.createElement("li");
            unElementAborable.innerText = unePiece.nom;
            listeAbordable.appendChild(unElementAborable);
        }
        // Nota : dans l'exercice il est proposé de faire un liste = pieces.map(piece => piece.nom) puis d'itérer
        // sur pieces de length à 0 pour retirer avec liste.splice(iteration,1) celle dont le pris est < 35€.
        // je trouve cela plus complexe et source d'erreur. 
    });
    divProduitAbordable.appendChild(titreAbordable);
    divProduitAbordable.appendChild(listeAbordable);
}

function afficherListeDisponible() {
    let titreDisponible = document.createElement("h2");
    let listeDisponible = document.createElement("ul");
    titreDisponible.innerText = "Liste des pièces disponible";

    pieces.forEach(unePiece => {
        // On ne conserve que les pièces < 35€
        if (unePiece.disponibilite) {
            let unElementAborable = document.createElement("li");
            unElementAborable.innerText = `${unePiece.nom} - ${unePiece.prix}€`;
            listeDisponible.appendChild(unElementAborable);
        }
        // Nota : dans l'exercice il est proposé de faire un liste = pieces.map(piece => piece.nom) puis d'itérer
        // sur pieces de length à 0 pour retirer avec liste.splice(iteration,1) celle dont le pris est < 35€.
        // je trouve cela plus complexe et source d'erreur. 
    });
    divProduitDisponible.appendChild(titreDisponible);
    divProduitDisponible.appendChild(listeDisponible);
}
/* ------- MAIN activité ------- */
// Récupération des pièces du fichier "pieces-auto.json"
const piecesOrdonnees = Array.from(pieces);
// Pour chaque article dans le JSON :
// 1 - Affichage des pièces dites "abordables" (liste)
afficherListeAbordable();
// 2 - Affichage des pièces disponibles (liste)
afficherListeDisponible();
// 3 - Affichage de l'ensembles des pièces
for (let nbArticle = 0; nbArticle < pieces.length; nbArticle++) {
    afficherPiece(sectionFiches, pieces[nbArticle]);
}