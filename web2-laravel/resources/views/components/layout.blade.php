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

    <h1><a href="/" style="text-decoration: none;"> Prática Laravel</a></h1>



    <h2>{{ $titulo }}</h2>

</header>

<main>

    {{ $slot }}
    @include ('components.menu')
</main>

<footer>

    <p>&copy; DEW II 2025.</p>

</footer>

</body>



</html>
