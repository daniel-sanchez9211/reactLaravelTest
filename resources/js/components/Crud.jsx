import React, { Component } from 'react'
import axios from 'axios';

class Crud extends Component {

  state = {
    friends: [],
    name: '',
    email: '',
    updateName: '',
    updateEmail: '',
    updating: null
  }

  getFriends = (clear = false) => {
    axios.get('/api/users').then(response => {
      this.setState({ friends: response.data })
    })
      .then(() => clear && this.setState({ name: '', email: '', updating: null }))
    // axios.get('/api/users/detalhe/', {
    //   params: {id: 54}
    // }).then(response => {
    //   this.setState({ friends: [response.data] })
    // })
  }

  componentDidMount() {
    this.getFriends()
  }

  handleNameChange = (e) => {
    const name = e.target.value
    this.setState({ name })
  }

  handleUpdateNameChange = (e) => {
    const name = e.target.value
    this.setState({ updateName: name })
  }

  handleEmailChange = (e) => {
    const email = e.target.value
    this.setState({ email })
  }

  handleUpdateEmailChange = (e) => {
    const email = e.target.value
    this.setState({ updateEmail: email })
  }

  addFriend = () => {
    const { name, email } = this.state
    axios.post('/api/users/', {
      name,
      email,
    })
      .then(() => {
        this.getFriends(true)
      })
      .catch(error => console.log(error))

  }

  handleDelete = (id) => {
    axios.delete('/api/users/', {
      params: { 'id': id }
    })
      .then(() => this.getFriends())
      .catch(error => console.log(error))
  }

  showFieldToUpdate = (id, name, email) => this.state.updating === null ?
    this.setState({ updating: id, updateEmail: email, updateName: name }) : this.setState({ updating: null })

  updateFriend = (id) => {
    this.setState
    const { updateName, updateEmail } = this.state
    axios.put('/api/users/', {
      updateName,
      updateEmail,
      id,
    }, {
      params: { 'id': id }
    })
      .then(() => this.getFriends(true))
      .catch(error => console.log(error))
  }

  render() {
    const { friends, updating } = this.state

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
              <span onClick={() => this.handleDelete(friend.id)}
                title={`Exluir ${friend.name}`}> X </span>
              <span style={{ color: '#bbb', margin: '0 8px' }} onClick={() =>
                this.showFieldToUpdate(friend.id, friend.name, friend.email)}>{updating === friend.id ?
                  'Cancelar' : 'Atualizar'}</span>

              {updating === friend.id &&
                <span>
                  <input className="px-1" type="text" placeholder="Nome" defaultValue={friend.name} onChange={this.handleUpdateNameChange} />
                  <input className="px-1" type="email" placeholder="Email" defaultValue={friend.email} onChange={this.handleUpdateEmailChange} />
                  <input className="px-1" type="button" value="Atualizar" onClick={() => this.updateFriend(friend.id)} />
                </span>
              }

            </div>
          </div>
        ))}
        <div>
          <div>
            <div className="form-group m-10">
              <input className="form-control w-25 m-1" type="text" placeholder="Nome" value={this.state.name} onChange={this.handleNameChange} />
              <input className="form-control w-25 m-1" type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
              <input className="btn btn-primary mt-2" type="button" value="Adicionar amigo" onClick={this.addFriend} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Crud