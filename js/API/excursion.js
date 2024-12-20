// Récupérer les données depuis l'API (en utilisant fetch)
fetch('http://localhost:3000/excursion/getall') // L'URL de votre API
  .then(response => response.json())
  .then(excursionsData => {
    // Récupérer le template Handlebars
    const templateSource = document.getElementById('destinations-template').innerHTML;
    
    // Compiler le template avec Handlebars
    const template = Handlebars.compile(templateSource);
    
    // Appliquer les données au template
    const html = template({ excursions: excursionsData });
    
    // Insérer le HTML généré dans le conteneur
    document.getElementById('destinations-container').innerHTML = html;
  })
  .catch(error => console.error('Erreur de récupération des données:', error));
