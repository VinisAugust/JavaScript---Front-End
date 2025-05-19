const API_URL = 'http://leoproti.com.br:8004/alunos';

document.addEventListener('DOMContentLoaded', () => {
  carregarAlunos();

  document.getElementById('form-aluno').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const curso = document.getElementById('curso').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nome || !curso || !email) {
      alert('Preencha todos os campos.');
      return;
    }

    const novoAluno = { nome, curso, email };

    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoAluno)
      });

      if (resposta.ok) {
        alert('Aluno cadastrado com sucesso!');
        document.getElementById('form-aluno').reset();
        carregarAlunos();
      } else {
        alert('Erro ao cadastrar aluno.');
      }
    } catch (erro) {
      console.error(erro);
      alert('Erro de conexão com a API.');
    }
  });
});

async function carregarAlunos() {
  const tabela = document.getElementById('tabela-alunos');
  tabela.innerHTML = '';

  try {
    const resposta = await fetch(API_URL);
    const alunos = await resposta.json();

    alunos.forEach(aluno => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.id}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.email}</td>
        <td><button onclick="excluirAluno(${aluno.id})">Excluir</button></td>
      `;
      tabela.appendChild(tr);
    });
  } catch (erro) {
    console.error('Erro ao carregar alunos:', erro);
  }
}

async function excluirAluno(id) {
  if (!confirm(`Deseja realmente excluir o aluno com ID ${id}?`)) return;

  try {
    const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (resposta.ok) {
      alert('Aluno excluído com sucesso!');
      carregarAlunos();
    } else {
      alert('Erro ao excluir aluno.');
    }
  } catch (erro) {
    console.error('Erro ao excluir aluno:', erro);
  }
}

