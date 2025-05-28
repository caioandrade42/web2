const getCidades = async (uf) => {
    const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    const data = await res.json();
    return data;
}

export default getCidades;