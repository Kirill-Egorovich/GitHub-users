let accountInfo = async (userName) => {
    try {
        let response = await fetch(`https://api.github.com/users/${userName}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        let user = await response.json();
        console.log(user);

        let wrap = document.querySelector('.wrap');

        let src = user.avatar_url;
        let name = user.login;
        let link = user.html_url;
        let date = new Date(user.created_at);
        let formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        let repositories = user.public_repos;

        const template = `
        <img src="${src}" alt="User Avatar">
        <p class="name">Username: ${name}</p>
        <p class="link">Link to the profile: <a href="${link}"> ${link}</a></p>
        <p class="date">Date of creation: ${formattedDate}</p>
        <p class="repositories">Number of repositories: ${repositories}</p>
        `;
        wrap.innerHTML = template;
    } catch (error) {
        console.error(error);
        wrap.innerHTML = `<p>User not found or error occurred.</p>`;
    }
};

let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let input = document.querySelector('.input');
    let userName = input.value.trim();
    if (userName) {
        accountInfo(userName);
    }
});
