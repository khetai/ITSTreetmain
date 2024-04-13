import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import DefaultPorfileImg from '../../assets/imgs/profile.png'
import { useSelector } from "react-redux";
function UserProfile() {
  const url = useSelector(state => state.store.url);
  const { username } = useParams()
  const [user, setUser] = useState({
    email: '',
    name: '',
    surname: '',
    birthDay: '',
    profileImageUrl: '',
  })
  const { t } = useTranslation()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${url}Users/${username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await response.json()
      setUser(data)
    }
    fetchData()
  }, [username])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here, you can add the logic to send the updated user data to your backend
  }

  return (
    <div className={styles.userProfile}>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1>{t('profile')}</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.profileImg}>
          <input
            style={{ display: 'none' }}
            type="file"
            name="profileImageUrl"
            // onChange={handleInputChange}
          />
          <figure>
            <img
              src={
                user.profileImageUrl == 'default.jpg'
                  ? DefaultPorfileImg
                  : user.profileImageUrl
              }
              alt={user.name}
            />
            <i className="fa-solid fa-pen" />
          </figure>
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Birthday
          <input
            type="date"
            name="birthDay"
            value={user.birthDay.split('T')[0]}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="phone"
            value={'+ 994 50 131 13 13'}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={'742 Evergreen Terrace , IL 62704 ,USA'}
            onChange={handleInputChange}
          />
        </label>

        <div className={styles.buttons}>
          <Link to={'/'}>BACK TO HOME</Link>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default UserProfile
