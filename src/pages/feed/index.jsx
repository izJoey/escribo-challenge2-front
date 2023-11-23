import { Card } from "../../components/card";
import { Header } from "../../components/header";
import "./styles.scss";
import { useContext, useState, useEffect } from "react";
import api from "../../services/api";
import { UserContext } from "../../UserContext";

export function Feed() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    getUsuarios();
  }, [setUser]);

  useEffect(() => {
    getUsuarios();
  }, [user]);

  const getUsuarios = async () => {
    try {
      if (!user || !user.token) {
        setLoading(false);
        return;
      }

      const responseUsers = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUsers(responseUsers.data);
      setLoading(false);
      console.log(responseUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <div className="container-feed">
        <div className="inner-conteiner-feed">
          <div className="wraper">
            {users.map((userItem) => (
              <Card user={userItem} key={userItem._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
