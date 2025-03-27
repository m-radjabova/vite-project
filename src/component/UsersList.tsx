import { User } from "../types/types";

interface Props {
  userList: User[];
}

function UsersList({ userList }: Props) {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-hover table-bordered shadow-sm rounded">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;