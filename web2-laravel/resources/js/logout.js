
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('logout').addEventListener('click', function() {
        fetch('/users/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            }
        }).then(r => window.location.href = '/login');
    });
})


