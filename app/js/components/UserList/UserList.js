import React, {Component} from 'react';
import {Card, Table} from "@themesberg/react-bootstrap";
import { connect } from 'react-redux';
import { queryUsers } from '../../actions/users';

class UserList extends Component {

  componentDidMount() {
    this.props.queryUsers();
  }

  render() {
    if (this.props.users != undefined) {
      return (
        <div>
          <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body>
              <Table hover className="user-table align-items-center">
                <thead>
                <tr>
                  <th className="border-bottom">First Name</th>
                  <th className="border-bottom">Last Name</th>
                  <th className="border-bottom">Title</th>
                  <th className="border-bottom">Joined on Date</th>
                </tr>
                </thead>
                <tbody>
                {this.props.users.map(u => (
                  <tr key={u.id}>
                    <td><span className="fw-normal"><div className="small text-gray">{u.firstname}</div></span></td>
                    <td><span className="fw-normal"><div className="small text-gray">{u.lastname}</div></span></td>
                    <td><span className="fw-normal"><div className="small text-gray">{u.title}</div></span></td>
                    <td><span className="fw-normal">{u.dateCreated}</span></td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )
    } else {
      return null;
    }
  }
}

const
  mapStateToProps = (state) => ({
    users: state.app.users.data,
  });

export default connect(
  mapStateToProps,
  {queryUsers}
)(UserList);


