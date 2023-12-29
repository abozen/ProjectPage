document.addEventListener('DOMContentLoaded', function () {
    let today = new Date();
    getMatchesByDate(today);

    document.getElementById('nextBtn').addEventListener('click', function () {
        today.setDate(today.getDate() + 1);
        getMatchesByDate(today);
        showCurrentDate(today);
    });

    document.getElementById('prevBtn').addEventListener('click', function () {
        today.setDate(today.getDate() - 1);
        getMatchesByDate(today);
        showCurrentDate(today);
    });

    showCurrentDate(today);
});

function showCurrentDate(today) {
    console.log('asd');
    const dateDisplay = document.getElementById('dateDisplay');
    dateDisplay.innerHTML = today.toLocaleDateString();
}

function clearMatchContainer() {
    const container = document.getElementById('match-container');
    container.innerHTML = '';
}

function displayMatchInfo(match) {
    const container = document.getElementById('match-container');

    const matchInfo = document.createElement('div');
    matchInfo.classList.add('match-info');

    const matchDetails = `
    <div class="match-details">
      <p><strong>Date:</strong> ${new Date(match.fixture.date).toLocaleDateString()}</p>
      <p><strong>Venue:</strong> ${match.fixture.venue.name}, ${match.fixture.venue.city}</p>
      <p><strong>Referee:</strong> ${match.fixture.referee}</p>
    </div>
    <div class="teams-info">
      <div class="team">
        <img src="${match.teams.home.logo}" alt="${match.teams.home.name} Logo" class="team-logo">
        <p><strong>${match.teams.home.name}</strong></p>
        <p>Goals: ${match.goals.home}</p>
      </div>
      <div class="team">
        <img src="${match.teams.away.logo}" alt="${match.teams.away.name} Logo" class="team-logo">
        <p><strong>${match.teams.away.name}</strong></p>
        <p>Goals: ${match.goals.away}</p>
      </div>
    </div>
  `;

    matchInfo.innerHTML = matchDetails;
    container.appendChild(matchInfo);
}

const matchData = {
    // Buraya API'den alınan veri gelecek
};

let allMatches = [];

function displayMatches(filteredMatches) {
    filteredMatches.forEach(match => {
        displayMatchInfo(match);
    });
}

function getMatchesByDate(date) {
    clearMatchContainer();
    const filteredMatches = allMatches.filter(match => {
        const matchDate = new Date(match.fixture.date);
        return matchDate.getFullYear() === date.getFullYear() &&
            matchDate.getMonth() === date.getMonth() &&
            matchDate.getDate() === date.getDate();
    });

    displayMatches(filteredMatches);
}

async function fetchData() {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=203&season=2023&from=2023-12-20&to=2023-12-28';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ffacdcf0c0mshd13730df4b89a43p17142fjsn493653b1d1f1',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data && data.response) {
            allMatches = data.response;
            console.log(allMatches);
        } else {
            console.log('Veri alınamadı.');
        }
    } catch (error) {
        console.error(error);
    }
}

fetchData();
getMatchesByDate();
