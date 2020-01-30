import React from 'react';


const UserList = props => {
    console.log("Props in userList:", props);
    return (
        <div className="userList">
            <h1>List of Users</h1>
            
            {props.users.map( user => (
                
                <div className="user" key={user.id}>
                    <h2>{`${user.name}`}</h2>
                    <h3>{user.email}</h3>
                </div>
            ))}
        </div>
    );
}

export default UserList;