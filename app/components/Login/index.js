/**
*
* Login
*
*/

import React from 'react';
import MediaQuery from "react-responsive"
import styles from './styles.css';

import LogoImage from "../LogoImage"

function Login({appInfo, handleSubmit, handleChange, username, password, rememberMe, error, userImageURL}) {
  const login_input = `${styles.login_input} form-control mt-m`;
  const error_styles = {
    display: error == false ? 'none' : 'block'
  }
  return (
    <div className={[styles.Login]}>
        <div className="text-center">
          <LogoImage height="50" class="mt-m" url={`${appInfo.logoUrl}`} ></LogoImage>
        </div>
        <div className="text-center mt-m">
          <h4 className={styles.login_page_h4}>Sign in to continue to <a href="">{`${appInfo.displayName}`}</a> </h4>
          <h4 className={styles.error_text} style={error_styles} >Invalid user and/or password. Please, try again.</h4>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img className={styles.profileImage} src={`${userImageURL}`}/>
            <div className="mt-m mb-l">
              <form onSubmit={handleSubmit} >
              <input type="email" onChange={handleChange} className={login_input} value={username} required id='username' name='username' placeholder="Email address"/>
              <input type="password" onChange={handleChange} className={login_input} value={password} required id='password' name='password'  placeholder="Password"/>
                <div className="checkbox" >
                    <label className={styles.check_box}>
                        <input type="checkbox" onChange={handleChange} name='rememberMe' checked={rememberMe}/> Remember me
                    </label>
                </div>
                <button className={`${styles.btn_signin} btn btn-primary form-control`} >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center mt-m">
        <a href={`mailto:${appInfo.emailContact}`} target="_blank">support: {`${appInfo.emailContact}`}</a>
        </div>
    </div>
  );
}
export default Login;