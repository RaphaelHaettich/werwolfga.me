import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Appbar from 'muicss/lib/react/appbar';
import { logout } from '../helpers/auth'

export default class join extends Component {
  state = {
    authed: false,
    loading: true
  }
  render() {
    return (
      <Appbar>
        <table width="100%">
          <tbody>
            <tr style={{
              verticalAlign: 'middle'
            }}>
              <td className="mui--appbar-height"><Link
                style={{
                  color: "white"
                }}
                to="/">Werewolf</Link></td>
              <td
                className="mui--appbar-height"
                style={{
                  textAlign: "right"
                }}>
                {this.props.authed
                  ? <a
                    style={{
                      color: "white"
                    }}
                    onClick={() => {
                      logout()
                    } }
                    className="navbar-brand">Logout</a>
                  : <span>
                    <Link
                      style={{
                        color: "white"
                      }}
                      to="/login">Login</Link>
                    <Link
                      style={{
                        color: "white"
                      }}
                      to="/register">Register</Link>
                  </span>}
              </td>
            </tr>
          </tbody>
        </table>
      </Appbar>
    )
  }
}
