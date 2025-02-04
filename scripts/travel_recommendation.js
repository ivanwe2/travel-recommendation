function clearSearch() {
    document.querySelector('#searchInput').value = "";
}

function showResults() {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML += '<div class="result-item">' +
        '<img src="path/to/destination-image.jpg" alt="Destination Image" class="destination-image">' +
        '<h2>Destination Name</h2>' +
        '<p>This is a brief description of the destination. Explore the beauty and attractions of this amazing place.</p>' +
        '<button class="visit-button">Visit</button>' +
        '</div>';
    resultsContainer.style.visibility = 'visible';
}