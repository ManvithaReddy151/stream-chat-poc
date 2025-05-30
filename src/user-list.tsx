// import { useEffect, useState } from 'react';
// import { useChatContext } from 'stream-chat-react';
// import type { UserResponse } from 'stream-chat';

//  const [users, setUsers] = useState<UserResponse[]>([]);

// const UserList = () => {
//   const { client } = useChatContext();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await client.queryUsers(
//           { id: { $in: ['jessica'] } },
//           { last_active: -1 },
//           { presence: true }
//         );
//         setUsers(response.users);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, [client]);

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h3>Matched Users</h3>
//       {users.length === 0 && <p>No users found.</p>}
//       {users.map((user) => (
//         <div
//           key={user.id}
//           style={{
//             padding: '8px',
//             marginBottom: '6px',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//           }}
//         >
//           <strong>{user.name || user.id}</strong>
//           {user.online && <span style={{ marginLeft: 8, color: 'green' }}>● online</span>}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserList;
