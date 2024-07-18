// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check if data is fetched correctly
            window.recommendations = data;
            displayAllRecommendations(data);
        })
        .catch(error => console.error('Error fetching recommendations:', error));
});

function displayAllRecommendations(data) {
    const allRecommendations = [];
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            allRecommendations.push(city);
        });
    });
    data.temples.forEach(temple => {
        allRecommendations.push(temple);
    });
    data.beaches.forEach(beach => {
        allRecommendations.push(beach);
    });
    displayRecommendations(allRecommendations);
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    container.innerHTML = ''; // Clear previous recommendations
    recommendations.forEach(recommendation => {
        const div = document.createElement('div');
        div.classList.add('recommendation');
        
        const img = document.createElement('img');
        img.src = recommendation.imageUrl;
        img.alt = recommendation.name;
        
        const h3 = document.createElement('h3');
        h3.textContent = recommendation.name;
        
        const p = document.createElement('p');
        p.textContent = recommendation.description;
        
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        container.appendChild(div);
    });
}

function search() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const keywords = ["beach", "temple", "country"];
    const allRecommendations = [];
    
    window.recommendations.countries.forEach(country => {
        country.cities.forEach(city => {
            allRecommendations.push({ ...city, category: 'country' });
        });
    });
    window.recommendations.temples.forEach(temple => {
        allRecommendations.push({ ...temple, category: 'temple' });
    });
    window.recommendations.beaches.forEach(beach => {
        allRecommendations.push({ ...beach, category: 'beach' });
    });
    
    const filteredRecommendations = [];
    
    if (input.includes("beach")) {
        const beachRecommendations = allRecommendations.filter(rec => rec.category === 'beach');
        filteredRecommendations.push(...beachRecommendations.slice(0, 2));
    } else if (input.includes("temple")) {
        const templeRecommendations = allRecommendations.filter(rec => rec.category === 'temple');
        filteredRecommendations.push(...templeRecommendations.slice(0, 2));
    } else if (input.includes("country")) {
        const countryRecommendations = allRecommendations.filter(rec => rec.category === 'country');
        filteredRecommendations.push(...countryRecommendations.slice(0, 2));
    } else {
        const genericRecommendations = allRecommendations.filter(rec => 
            rec.name.toLowerCase().includes(input) || 
            rec.description.toLowerCase().includes(input)
        );
        filteredRecommendations.push(...genericRecommendations.slice(0, 2));
    }
    
    displayRecommendations(filteredRecommendations);
}


function reset() {
    document.getElementById('search-input').value = '';
    displayAllRecommendations(window.recommendations);
}

function clearResults() {
    const container = document.getElementById('recommendations');
    container.innerHTML = ''; // Clear previous recommendations
    document.getElementById('search-input').value = ''; // Clear search input
}
