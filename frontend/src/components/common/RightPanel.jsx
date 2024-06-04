import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const RightPanel = () => {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  // List of specific accounts to display
  const specificAccounts = ['CountyofDouglas', 'TimGardner', 'twiter_inc'];

  useEffect(() => {
    // Fetch users from the database
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Adjust API endpoint as necessary
        // Filter to include only specific accounts
        const filteredUsers = response.data.filter(user => 
          specificAccounts.includes(user.username)
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = (username) => {
    // Prevent users from disappearing after follow
    setFollowedUsers([...followedUsers, username]);
  };

  return (
    <div className="right-panel">
      <h2>Suggested Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.username}>
            <span>{user.username}</span>
            <Button
              onClick={() => handleFollow(user.username)}
              disabled={followedUsers.includes(user.username)}
            >
              {followedUsers.includes(user.username) ? 'Following' : 'Follow'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightPanel;
