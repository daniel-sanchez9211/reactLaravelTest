import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Crud = (props) => {

  const [friends, setFriends] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [updateName, setUpdateName] = useState('')
  const [updateEmail, setUpdateEmail] = useState('')
  const [updating, setUpdating] = useState(null)

  const getFriends = (clear = false) => {
    axios.get('/api/users').then(response => {
      setFriends(response.data)
    })
      .then(() => {
        if (clear) {
          setName('')
          setEmail('')
          setUpdating(null)
        }
      })
    // axios.get('/api/users/detalhe/', {
    //   params: {id: 54}
    // }).then(response => {
    //   setState({ friends: [response.data] })
    // })
  }

  useEffect(() => {
    getFriends()
  }, []);

  const handleNameChange = (e) => {
    const name = e.target.value
    setName(name)
  }

  const handleUpdateNameChange = (e) => {
    const name = e.target.value
    setUpdateName(name)
  }

  const handleEmailChange = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const handleUpdateEmailChange = (e) => {
    const email = e.target.value
    setUpdateEmail({ updateEmail: email })
  }

  const addFriend = () => {
    axios.post('/api/users/', {
      name,
      email,
    })
      .then(() => {
        getFriends(true)
      })
      .catch(error => console.log(error))
  }

  const handleDelete = (id) => {
    axios.delete('/api/users/', {
      params: { 'id': id }
    })
      .then(() => getFriends())
      .catch(error => console.log(error))
  }

  const showFieldToUpdate = (id, name, email) => {
    if (updating === null) {
      setUpdating(id)
      setUpdateEmail(email)
      setUpdateName(name)
    } else {
      setUpdating(null)
    }
  }

  const updateFriend = (id) => {
    axios.put('/api/users/', {
      updateName,
      updateEmail,
      id,
    }, {
      params: { 'id': id }
    })
      .then(() => getFriends(true))
      .catch(error => console.log(error))
  }
  return (
    <div className="container-fluid p-5">
      {friends.map((friend, i) => (
        <div key={i} style={{
          display: 'flex',
        }}>
          <h3>{friend.name}</h3>
          <div style={{
            marginTop: '7px',
            marginLeft: '10px',
            cursor: 'pointer',
          }}>
            <span onClick={() => handleDelete(friend.id)}
              title={`Exluir ${friend.name}`}> X </span>
            <span style={{ color: '#bbb', margin: '0 8px' }} onClick={() =>
              showFieldToUpdate(friend.id, friend.name, friend.email)}>{updating === friend.id ?
                'Cancelar' : 'Atualizar'}</span>

            {updating === friend.id &&
              <span>
                <input className="px-1" type="text" placeholder="Nome" defaultValue={friend.name} onChange={handleUpdateNameChange} />
                <input className="px-1" type="email" placeholder="Email" defaultValue={friend.email} onChange={handleUpdateEmailChange} />
                <input className="px-1" type="button" value="Atualizar" onClick={() => updateFriend(friend.id)} />
              </span>
            }

          </div>
        </div>
      ))}
      <div>
        <div>
          <div className="form-group m-10">
            <input className="form-control w-25 m-1" type="text" placeholder="Nome" value={name} onChange={handleNameChange} />
            <input className="form-control w-25 m-1" type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <input className="btn btn-primary mt-2" type="button" value="Adicionar amigo" onClick={addFriend} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crud