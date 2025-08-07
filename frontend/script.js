document.addEventListener("DOMContentLoaded", function () {
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
});