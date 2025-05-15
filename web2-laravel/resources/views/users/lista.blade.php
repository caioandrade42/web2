<x-layout>

    <x-slot:titulo>Filmes</x-slot:titulo>


    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @session('success')

    {{ session('success') }}

    @endsession



    @if (count($filmes) > 0)

        <table>

            <thead>

            <tr>

                <th>ID</th>

                <th>Titulo</th>

                <th>Genero</th>

                <th>Sinopse</th>

                <th>Duracao</th>

                <th>Ano de Lancamento</th>

                <th>Acoes</th>

            </tr>

            </thead>

            <tbody>

            @foreach ($filmes as $filme)

                <tr>
                    <td>{{ $filme->id }}</td>
                    <td>{{ $filme->titulo }}</td>
                    <td>{{ $filme->genero }}</td>
                    <td>{{ $filme->sinopse }}</td>
                    <td>{{$filme->duracao}}</td>
                    <td>{{ $filme->ano_lancamento }}</td>
                    <td>
                        <form action="/filmes/editar" method="post">
                            @csrf
                            <input type="hidden" name="id" value="{{ $filme->id }}">
                            <button type="submit">Editar</button>
                        </form>
                        <form action="/filmes/excluir" method="post">
                            @csrf
                            <input type="hidden" name="id" value="{{ $filme->id }}">
                            <button type="submit">Excluir</button>
                        </form>
                    </td>
                </tr>

            @endforeach

            </tbody>

        </table>

    @else

        <p>Nenhum filme registrado.</p>

    @endif

</x-layout>
