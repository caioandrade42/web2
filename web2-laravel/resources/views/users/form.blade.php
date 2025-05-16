<x-layout>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <x-slot:titulo>Novo Filme</x-slot:titulo>

    <form method="POST" action="/users/cadastrar">
        @csrf
        <div>
            <label for="name">Nome:</label><br>
            <input type="text" id="name" name="name"  required>
        </div>
        <div>
            <label for="genero">E-mail:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="data_nascimento">Data de Nascimento:</label>
            <input type="date" id="data_nascimento" name="data_nascimento" required>
        </div>
        <div>
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div>
            <label for="repeatPassword">Repita a Senha:</label>
            <input type="password" id="repeatPassword" name="repeatPassword" required>
        </div>


        <button type="submit">Criar</button>

    </form>

</x-layout>
