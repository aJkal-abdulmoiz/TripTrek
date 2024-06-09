const destinations = [
    {
        name: 'Thailand',
        location: 'Bangkok',
        rate: 'PKR 21999',
        image: './images/thailand.jpg'
    },
    {
        name: 'Iran',
        location: 'Tehran',
        rate: 'PKR 34999',
        image: './images/tehran.jpg'
    },
    {
        name: 'Iran',
        location: 'Masjid',
        rate: 'PKR 22999',
        image: './images/iran.jpg'
    },
    {
        name: 'Iraq',
        location: 'Baghdad',
        rate: 'PKR 35999',
        image: './images/iraq.jpg'
    },
    {
        name: 'Islamabad',
        location: 'Faisal Masjid',
        rate: 'PKR 12999',
        image: './images/islamabad.jpg'
    },
    {
        name: 'Japan',
        location: 'Tomb of Joshie',
        rate: 'PKR 12999',
        image: './images/japan.jpg'
    },
    {
        name: 'Turkey',
        location: 'Istanbul',
        rate: 'PKR 10999',
        image: './images/turkey.jpg'
    },
    {
        name: 'Dubai',
        location: 'Sharjah',
        rate: 'PKR 18999',
        image: './images/dubai.jpg'
    },
    {
        name: 'South Korea',
        location: 'Seoul',
        rate: 'PKR 18999',
        image: './images/southkorea.jpg'
    }
];
document.addEventListener('DOMContentLoaded', function() {
    const destinationList = document.getElementById('destinationList');

    destinations.forEach(destination => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-img-container">
            <img src="${destination.image}" alt="${destination.name}" loading="lazy">
            </div>
            <div class="card-info">
                <p><i class="fa-solid fa-location-dot"></i> ${destination.name}</p>
                <h3>${destination.location}</h3>
                <div class ="rate-book-div">
                <h4 class="rate">${destination.rate} <label class="per-person">/per person</label></h4>
                <button class="book-button" data-name="${destination.name}" data-location="${destination.location}" data-rate="${destination.rate}" data-image="${destination.image}">Book</button>
                </div>
               
            </div>
        `;
        destinationList.appendChild(card);
    });

    destinationList.addEventListener('click', function(event) {
        if (event.target.classList.contains('book-button')) {
            const location = event.target.dataset.location;
            const rate = event.target.dataset.rate;
            const image = event.target.dataset.image;
            const destination = event.target.dataset.name;
            window.location.href = `bookings?name=${destination}&location=${location}&rate=${rate}&image=${image}`;
        }
    });

    

    
    

});

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login');
    const logoutBtn = document.getElementById('logout');

    const authToken = getCookie('jwt');
    const userId = getCookie('user_cookie');
    console.log(authToken,userId)

    if (authToken !== 'none' || userId !== 'none') {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline';
    } else {
        loginBtn.style.display = 'inline';
        logoutBtn.style.display = 'none';
    }

    logoutBtn.addEventListener('click', function() {
        logout();
    });
});

function logout() {
    fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: getCookie('user_cookie') })
    })
    .then(response => {
        if (response.ok) {
            document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
            document.cookie = 'user_cookie=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
            window.location.href = '/login';
        } else {
            throw new Error('Logout failed');
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
}

function getCookie(cname) {
    const name = cname + "="; // Use const instead of let for constant variables
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim(); // Use trim() to remove whitespace
        if (c.indexOf(name) == 0) {
            return c.substring(name.length);
        }
    }
    return ""; // Return an empty string if the cookie is not found
}









