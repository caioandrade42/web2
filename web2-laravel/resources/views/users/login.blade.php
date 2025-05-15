<x-layout>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <x-slot:titulo>Novo Filme</x-slot:titulo>

    <form method="POST" action="/users/login{{isset($user) ? 'atualizar' : 'cadastrar'}}">
        @csrf
        <input type="hidden" name="id" value="{{ isset($user) ? $user->id : '' }}">
        <div>
            <label for="titulo">Nome:</label><br>
            <input type="text" id="name" name="name" value="{{$user->name ?? ''}}" required>
        </div>
        <div>
            <label for="genero">E-mail:</label>
            <input type="email" id="email" name="email" value="{{$user->email ?? ''}}" required>
        </div>
        <div>
            <label for="data_nascimento">Data de Nascimento:</label>
            <input type="date" id="data_nascimento" name="data_nascimento" value="{{$user->data_nascimento ?? ''}}" required>
        </div>
        <div>
            <label for="senha">Senha:</label>
            <input type="password" id="senha" name="senha" value="{{$user->Password ?? ''}}" required>
        </div>
        <div>
            <label for="repeatPassword">Repita a Senha:</label>
            <input type="password" id="repeatPassword" name="repeatPassword" value="{{$user->duracao ?? ''}}" required>
        </div>


        <button type="submit">Criar</button>

    </form>

</x-layout>
