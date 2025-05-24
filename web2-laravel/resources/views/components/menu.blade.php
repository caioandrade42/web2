@vite(['resources/css/app.css', 'resources/js/app.js'])
<nav>
    <div>
        <h2>Livros e Filmes</h2>

        <div>

            @auth

                <h2>Olá, {{ Auth::user()->name }}</h2>

                <button><a href="/users/logout">Logout</a></button>

            @else

                <button><a href="/login">Login</a></button>

            @endauth

        </div>

        <ul>

            <li><a href="/users/cadastrar">Cadastro de Usuarios</a></li>
            <li><a href="/login">Acesse a sua conta</a></li>
            <li><a href="/filmes/filmes">Lista de Filmes</a></li>
            <li><a href="/filmes/criar">Novo Filme</a></li>
            <li><a href="/filmes/atualizar">Atualizar Filme</a></li>
            <li><a href="/filmes/Editar">Editar Filme</a></li>
        </ul>

    </div>

</nav>
