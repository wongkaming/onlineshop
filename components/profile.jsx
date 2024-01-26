import React from "react";

const Profile = ({ currentUser, setCurrentUser }) => {
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>在獲取您的個人資料之前，您必須先登錄。</div>}
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
