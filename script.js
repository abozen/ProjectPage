var today;

document.addEventListener('DOMContentLoaded', function () {
    fetchData(203)
    today = new Date();
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
    const date = new Date(match.fixture.date);
    const dateOptions = { timeZone: 'Europe/Istanbul', hour12: false, hour: 'numeric', minute: 'numeric' };


    const matchInfo = document.createElement('div');
    matchInfo.classList.add('match-info');

    const matchDetails = `
    <div class="match-details">
      <p><strong>Stad:</strong> ${match.fixture.venue.name}, ${match.fixture.venue.city}</p>
      <p><strong>Hakem:</strong> ${match.fixture.referee || "Belirlenmedi"}</p>
      <p><strong>Saat:</strong> ${(date.toLocaleTimeString('tr-Tr', dateOptions)) || "Belirlenmedi"}</p>
    </div>
    <div class="teams-info">
      <div class="team">
        <img src="${match.teams.home.logo}" alt="${match.teams.home.name} Logo" class="team-logo">
        <p><strong>${match.teams.home.name}</strong></p>
        <p> ${match.goals.home !== null && match.goals.home !== undefined ? match.goals.home : ""}</p>
      </div>
      <div class="team">
        <img src="${match.teams.away.logo}" alt="${match.teams.away.name} Logo" class="team-logo">
        <p><strong>${match.teams.away.name}</strong></p>
        <p> ${match.goals.away !== null && match.goals.away !== undefined ? match.goals.away : ""}</p>
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
    console.log("done");
    const filteredMatches = allMatches.filter(match => {
        const matchDate = new Date(match.fixture.date);
        return matchDate.getFullYear() === date.getFullYear() &&
            matchDate.getMonth() === date.getMonth() &&
            matchDate.getDate() === date.getDate();
    });

    if (filteredMatches.length > 0) {
        displayMatches(filteredMatches);
        document.getElementById('noMatchesMessage').style.display = 'none'; // Eğer maçlar varsa mesajı gizle
    } else {
        document.getElementById('noMatchesMessage').style.display = 'block'; // Eğer maç yoksa mesajı göster
        noMatchesMessage.style.display = 'none'; // Önce mesajı gizle
        setTimeout(() => {
            noMatchesMessage.style.display = 'block'; // Daha sonra tekrar göstererek animasyonu başlat
        }, 10); // Küçük bir gecikmeyle animasyon başlasın
    }
}

async function fetchData(leagueId) {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league='+leagueId+'&season=2023';
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
            getMatchesByDate(today);
            console.log(allMatches);
        } else {
            console.log('Veri alınamadı.');
        }
    } catch (error) {
        console.error(error);
    }
}
function getMatches() {
    const select = document.getElementById('leagueSelect');
    const selectedLeague = select.value; // Seçilen lig değeri
    let leagueId;

    switch (selectedLeague) {
        case 'superlig':
            leagueId = 203;
            break;
        case 'pl':
            leagueId = 39;
            break;
        case 'laliga':
            leagueId = 140;
            break;
        case 'seriea':
            leagueId = 135;
            break;
        default:
            leagueId = 203;
    }
    fetchData(leagueId);
    console.log(today);
    
    // Seçilen lig değerine göre API'den maçları al ve göster
    // Örnek olarak API'den ilgili ligin maçlarını çekmek için gerekli işlemler burada yapılabilir
    // Örneğin: fetchMatches(selectedLeague);
}


//fetchData();
getMatchesByDate();
