<x-layout>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <x-slot:titulo>Novo Filme</x-slot:titulo>

    <form method="POST" action="/login">
        @csrf
        <div>
            <label for="email">E-mail:</label><br>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
        </div>


        <button type="submit">Entrar</button>

    </form>

</x-layout>
