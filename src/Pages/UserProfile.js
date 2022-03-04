import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const UserProfile = () => {
    const [user, setUser] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
          fetch(`http://localhost:8000/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
              setUser(data);
            });
        }, 1);
    }, [])

  return (
    <>
        {user && (
            <div className="main-content-container profile-container">
                {user && <div className="profile-details-container">

                {user.avatar && <img src={`.${user.avatar.image_path}`} className="avatar_image" style={{width: 140, height: 140}}/>}

                {!user.avatar && <img src="../images/profile-images/placeholder-image.jpg" alt="Placeholder Avatar Picture" className="avatar_image" style={{width: 140, height: 140}}/>}
                
                <h2>
                    {`${user.first_name}
                    ${user.last_name}`}
                </h2>

                <p><strong>E-mail:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Status:</strong> <span style={{textTransform: 'uppercase'}}>{user.status}</span></p>

                <form >

                </form>

                </div>}
                <p>Table goes here</p>
            </div>
        )}
    </>
  )
}

export default UserProfile