import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyForm({ addTodo }) {
  const [name, setName] = useState('');
  const [CPF, setCPF] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [comida, setComida] = useState('');

  const handleSubmit = async (e) => {
    console.log("teste");
    e.preventDefault();
    if (!name || !CPF) {
      toast.error('Nome e CPF são campos obrigatórios.');
      return;
    }

    try {
      await addTodo(name, CPF, aniversario, comida);
      setName('');
      setCPF('');
      setAniversario('');
      setComida('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="center">
      <form name="FrmCadastroCliente" method="post" id="cadastro_usuarios_form" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          placeholder="Insira seu nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>CPF</label>
        <input
          type="text"
          placeholder="Insira seu CPF..."
          value={CPF}
          onChange={(e) => setCPF(e.target.value)}
        />

        <label>Data de Aniversário</label>
        <input
          type="text"
          placeholder="Insira sua data de aniversário..."
          value={aniversario}
          onChange={(e) => setAniversario(e.target.value)}
        />

        <label>Comida Favorita</label>
        <input
          type="text"
          placeholder="Insira sua comida favorita..."
          value={comida}
          onChange={(e) => setComida(e.target.value)}
        />

        <button className="botao_cadastro" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5174/api/user");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addTodo = async (nome, CPF, aniversario, comida) => {
    try {
      const res = await axios.post("http://localhost:5174/api/user", { nome, CPF, aniversario, comida });
      setUsers([...users, res.data]);
      toast.success('Usuário cadastrado com sucesso!');
    } catch (error) {
      toast.error(error.message);
    }
    location.reload();
  };

  const removeTodo = async (user) => {
    try {
      console.log(user);
      await axios.delete(`http://localhost:5174/api/user/${user._id}`, user);
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      toast.error(error.message);
    }
    location.reload();
  };

  const editTodo = (user) => {
    setOnEdit(user);
  };

  const handleEditSubmit = async (editedUser) => {
    try {
      const res = await axios.put(`http://localhost:5174/api/user/${editedUser._id}`, editedUser);
      const updatedUsers = users.map((user) => (user.id === editedUser.id ? res.data : user));
      setUsers(updatedUsers);
      setOnEdit(null);
      toast.success('Usuário editado com sucesso!');
    } catch (error) {
      toast.error(error.message);
    }
    location.reload();
  };

  return (
    <div className="app">
      <h1>Cadastro Clientes</h1>

      <MyForm addTodo={addTodo} />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />

      <h1>Clientes Cadastrados</h1>

      <div className="todos-list">
        {users.map((user) => (
          <Todo key={user.id} user={user} removeTodo={removeTodo} editTodo={editTodo} />
        ))}
      </div>

      {onEdit && (
        <EditPopup user={onEdit} onSubmit={handleEditSubmit} onCancel={() => setOnEdit(null)} />
      )}
    </div>
  );
}

function Todo({ user, removeTodo, editTodo }) {
  return (
    <div className="todo">
      <div className="content">
        <h2>
         {user.nome}
        </h2>
        <p>CPF: {user.CPF}</p>
        <p>Aniversário: {user.dataNasc}</p>
        <p>Comida favorita: {user.comida}</p>
        <button className="complete" onClick={() => editTodo(user)}>
          Editar
        </button>
        <button className="remove" onClick={() => removeTodo(user)}>
          X
        </button>
      </div>
    </div>
  );
}

function EditPopup({ user, onSubmit, onCancel }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedUser);
  };

  return (
    <div className="edit-popup">
      <form onSubmit={handleEditSubmit}>
        <h2>Editar cliente: {editedUser.nome}</h2>
        <label>Nome</label>
        <input
          type="text"
          placeholder="Insira seu nome..."
          value={editedUser.nome}
          onChange={(e) => setEditedUser({ ...editedUser, nome: e.target.value })}
        />

        <label>CPF</label>
        <input
          type="text"
          placeholder="Insira seu CPF..."
          value={editedUser.CPF}
          onChange={(e) => setEditedUser({ ...editedUser, CPF: e.target.value })}
        />

        <label>Data de Aniversário</label>
        <input
          type="text"
          placeholder="Insira sua data de aniversário..."
          value={editedUser.dataNasc}
          onChange={(e) => setEditedUser({ ...editedUser, dataNasc: e.target.value })}
        />

        <label>Comida Favorita</label>
        <input
          type="text"
          placeholder="Insira sua comida favorita..."
          value={editedUser.comida}
          onChange={(e) => setEditedUser({ ...editedUser, comida: e.target.value })}
        />
        <div className="buttomEdit">
          <button className="complete" type="submit">Salvar</button>
          <button className="remove" type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default App;
