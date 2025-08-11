document.addEventListener("DOMContentLoaded", function () {

    function decodeJWT(token) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    }

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        const responsePayload = decodeJWT(response.credential);
        console.log("Decoded JWT ID token fields:");
        console.log("  Full Name: " + responsePayload.name);
        console.log("  Given Name: " + responsePayload.given_name);
        console.log("  Family Name: " + responsePayload.family_name);
        console.log("  Unique ID: " + responsePayload.sub);
        console.log("  Profile image URL: " + responsePayload.picture);
        console.log("  Email: " + responsePayload.email);
    }

    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        item.addEventListener('click', function () {
            items.forEach(i => i.classList.remove('focused'));
            item.classList.add('focused');
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        });
    });

    document.addEventListener('click', function (e) {
        const isItem = e.target.closest('.item');
        if (!isItem) {
            document.querySelectorAll('.item.focused').forEach(el => el.classList.remove('focused'));
        }
    });

    const login = document.getElementById('login');

    login.addEventListener('click', function () {
        const clientId = "382639480415-hqvtdsgjidhiml0k20qvghv6t4taqt0d.apps.googleusercontent.com";
        const redirectUri = "https://l1ghtray.github.io/auth/callback";
        const scope = "email profile openid";
        const responseType = "code"; // OAuth code flow

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${encodeURIComponent(clientId)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=${encodeURIComponent(responseType)}` +
            `&scope=${encodeURIComponent(scope)}` +
            `&access_type=offline`;

        const width = 500;
        const height = 600;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);

        window.open(
            authUrl,
            "GoogleLogin",
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
        );
    });

    window.addEventListener("message", (event) => {
        if (!event.origin.includes("l1ghtray.github.io")) return;

        const url = new URL(event.data);
        const code = url.searchParams.get("code");
        if (code) {
            console.log("OAuth code received:", code);
        }
    });
});
