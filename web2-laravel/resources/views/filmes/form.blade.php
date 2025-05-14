<x-layout>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <x-slot:titulo>Novo Filme</x-slot:titulo>

    <form method="POST" action="/filmes/{{isset($filme) ? 'atualizar' : 'criar'}}">
        @csrf
        <input type="hidden" name="id" value="{{ isset($filme) ? $filme->id : '' }}">
        <div>
            <label for="titulo">Título:</label><br>
            <input type="text" id="titulo" name="titulo" value="{{$filme->titulo ?? ''}}" required>
        </div>
        <div>
            <label for="genero">Genero:</label>
            <input type="text" id="genero" name="genero" value="{{$livro->genero ?? ''}}" required>
        </div>
        <div>
            <label for="sinopse">Sinopse:</label>
            <input type="text" id="sinopse" name="sinopse" value="{{$filme->sinopse ?? ''}}" required>
        </div>
        <div>
            <label for="duracao">Duracao:</label>
            <input type="time" id="duracao" name="duracao" value="{{$filme->duracao ?? ''}}" required>
        </div>
        <div>
            <label for="ano_lancamento">Ano de Lancamento:</label>
            <input type="date" id="ano_lancamento" name="ano_lancamento" value="{{$filme->ano_lancamento ?? ''}}" required>
        </div>

        <button type="submit">Criar</button>

    </form>

</x-layout>
