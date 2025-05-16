<!DOCTYPE html>

<html lang="en">



<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Prática Laravel</title>

</head>



<body>

<header>

    <nav style="display: flex; align-items: center; justify-content: space-between; padding: 0 1rem;">
        <h1 style="margin: 0;">
            <a href="/" style="text-decoration: none;">Prática Laravel</a>
        </h1>
        <span style="font-size: 1.2rem;">{{ $titulo }}</span>
        <button id="logout">Encerrar sessao</button>
    </nav>

</header>

<main>

    {{ $slot }}
    @include ('components.menu')
</main>

<footer>

    <p>&copy; DEW II 2025.</p>
    <script src="../../js/logout.js" ></script>
</footer>

</body>



</html>

