<?php
    $vetor = '1011110101';
    $decimalVetor1 = bindec(substr($vetor, 0, 5));
    $decimalVetor2 = bindec(substr($vetor, 6, 10));
    echo "Valor decimal do vetor 1:: " . $decimalVetor1 . "\n";
    echo "Valor decimal do vetor 2:: " . $decimalVetor2 . "\n";
    $xdecimal1 = $decimalVetor1/((pow(2,5)-1)*6);

    $t =0;
    $posicoes = [0,1,2,3,4,5,6,7,8,9];
    $vetx = [];
    $vetz = [];
    foreach ($posicoes as $posicao){
        $vetz[$posicao]= rand(0,1);
    }
    $vety = [];
    foreach ($posicoes as $posicao){
        $vety[$posicao]= $vetx[$posicao]+$vetz[$posicao];
    }
    echo "Vetor x: " . $vetx . "\n";


?>
