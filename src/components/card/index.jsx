import "./styles.scss";

export function Card({ user }) {
  return (
    <div className="container-card">
      <div className="header">
        <div>
          <small>Nome: </small>
          <p>{user.nome}</p>
        </div>
      </div>

      <div className="email">
        <small>Email: </small>
        <p>{user.email}</p>
      </div>

      {user.telefones.map((telefone) => (
        <div className="tel" key={telefone._id}>
          <div>
            <small>DDD: </small>
            <p>{telefone.ddd}</p>
          </div>
          <div>
            <small>Telefone: </small>
            <p>{telefone.numero}</p>
          </div>
        </div>
      ))}

      <div className="date">
        <div>
          <small>Criado: </small>
          <p>{new Date(user.data_criacao).toLocaleString()}</p>
        </div>
        <div>
          <small>Acessado:</small>
          <p>
            {user.ultimo_login
              ? new Date(user.ultimo_login).toLocaleString()
              : "Usuário ainda não acessou"}
          </p>
        </div>
      </div>
    </div>
  );
}
