function clearSearch() {
    document.querySelector('#searchInput').value = "";
}

async function showResults() {
    let searchInputValue = document.getElementById('searchInput').value;
    
    const response = await fetch('/travel-recommendation/data/travel_recommendation_api.json');
    const data = await response.json();

    console.log(data);

    let htmlString = '';
    const lowerCaseInput = searchInputValue.trim().toLowerCase();
    if (lowerCaseInput.includes('beach')) {
        data.beaches.map((item, index) => {
            htmlString += `<div class="result-item">
            <img src="${item.imageUrl}" alt="Destination Image" class="destination-image">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <button class="visit-button">Visit</button>
            </div>`;
        });
    }
    else if (lowerCaseInput.includes('temple')) {
        data.temples.map((item, index) => {
            htmlString += `<div class="result-item">
            <img src="${item.imageUrl}" alt="Destination Image" class="destination-image">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <button class="visit-button">Visit</button>
            </div>`;
        });
    }
    else if (lowerCaseInput.includes('countr')) {
        data.countries.map((item, index) => {
            let localTime = getLocalTime(item.cities[0].name, item.name);
            htmlString += `<div class="result-item">
            <img src="${item.cities[0].imageUrl}" alt="Destination Image" class="destination-image">
            <h2>${item.cities[0].name}</h2>
            <p>${item.cities[0].description}</p>
            <button class="visit-button">Visit</button>
            <p>Locale time: ${localTime}</p>
            </div>`;
        });
    }
    


    const resultsContainerEl = document.getElementById('results');
    
    resultsContainerEl.innerHTML = htmlString;

    resultsContainerEl.style.visibility = 'visible';
    searchInputValue = '';
}

function getLocalTime(city, country) {
    let timeZone;
    switch(city.split(',')[0]) {
        case 'Sydney':
            timeZone = 'Australia/Sydney';
            break;
        case 'Tokyo':
            timeZone = 'Asia/Tokyo';
            break;
        case 'Rio de Janeiro':
            timeZone = 'America/Sao_Paulo';
            break;
        default:
            timeZone = 'UTC';
    }
    const options = { timeZone: timeZone, hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date().toLocaleTimeString('en-US', options);
}