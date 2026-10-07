import React, { createContext, useContext, useState } from 'react';

function diasAtras(dias) {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d;
}

const DESPESAS_INICIAIS = [
  { id: 'e1', descricao: 'Padaria', valor: 18.9, categoria: 'Alimentação', data: diasAtras(1) },
  { id: 'e2', descricao: 'Uber', valor: 27.5, categoria: 'Transporte', data: diasAtras(2) },
  { id: 'e3', descricao: 'Show', valor: 150.0, categoria: 'Lazer', data: diasAtras(4) },
  { id: 'e4', descricao: 'Internet', valor: 99.9, categoria: 'Contas', data: diasAtras(6) },
  { id: 'e5', descricao: 'Mercado do mês', valor: 320.0, categoria: 'Alimentação', data: diasAtras(20) },
  { id: 'e6', descricao: 'Conta de luz', valor: 130.75, categoria: 'Contas', data: diasAtras(25) },
];

const DespesasContext = createContext(null);

export function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  // Adiciona uma despesa nova ou atualiza uma existente (mesmo id)
  function salvarDespesa(despesa) {
    setDespesas((atuais) => {
      const existe = atuais.some((d) => d.id === despesa.id);
      if (existe) {
        return atuais.map((d) => (d.id === despesa.id ? despesa : d));
      }
      return [despesa, ...atuais];
    });
  }

  function excluirDespesa(id) {
    setDespesas((atuais) => atuais.filter((d) => d.id !== id));
  }

  // Sempre ordenadas da mais recente para a mais antiga
  const despesasOrdenadas = [...despesas].sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  );

  return (
    <DespesasContext.Provider
      value={{ despesas: despesasOrdenadas, salvarDespesa, excluirDespesa }}
    >
      {children}
    </DespesasContext.Provider>
  );
}

export function useDespesas() {
  const contexto = useContext(DespesasContext);
  if (!contexto) {
    throw new Error('useDespesas deve ser usado dentro de <DespesasProvider>');
  }
  return contexto;
}