import React from "react";

const Profile = ({ currentUser }) => {
  return (
    <div style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      {!currentUser && <div>You must be logged in to access this page.</div>}
      {currentUser && (
        <div>
          <h1 className="text-[36px] font-bold">My Account</h1>
          <p className="text-[24px]">Account Info</p>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Username: {currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email: {currentUser.user.email}</strong>
                </td>
              </tr>
              {currentUser && currentUser.user.role == "admin" && (
                <tr>
                  <td>
                    <strong>Role: {currentUser.user.role}</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
