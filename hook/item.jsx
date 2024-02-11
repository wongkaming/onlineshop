import axios from "axios";
const API_URL = `https://nodejs-restfulapi-onlineshopdb.onrender.com/latest`;

class Item {
  post(item) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { item },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // USER自己的wishlist
  getWishlist(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/user/wishlist/" + _id, {
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });
  }

  // 用item id尋找wishlist
  getLikedItem(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/user/wishlist/item/" + _id, {
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });
  }

  // 找到所有user的wishlist
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/user/wishlist/admin/", {
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });
  }

  getItemByName(name) {
    // let token;
    // if (localStorage.getItem("user")) {
    //   token = JSON.parse(localStorage.getItem("user")).token;
    // } else {
    //   token = "";
    // }

    return axios.get(API_URL + "/result/findByName/" + name, {
      cache: "no-store",
    });
  }

  // archive
  enroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/user/wishlist/",
      { item: _id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  unlike(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/user/wishlist/item/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new Item();
