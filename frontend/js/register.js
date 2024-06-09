document.addEventListener('DOMContentLoaded', async function() {
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = new FormData(registerForm);
        const email = formData.get('email');
        const password = formData.get('password');
        const location = await getUserLocation();

        try {
            const response = await fetch('auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password,location })
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            alert('Registration successful! Please login.');
            window.location.href = 'login'; // Redirect to login page
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        }
        
        async function getUserLocation() {
            return new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                position => {
                  const { latitude, longitude } = position.coords;
                  resolve({ latitude, longitude });
                },
                error => {
                  reject(error);
                }
              );
            });
          }
        
    });
    
});


