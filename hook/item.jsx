import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_API}/latest`;

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
      cache: "force-cache",
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
      cache: "force-cache",
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
      cache: "force-cache",
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
      cache: "force-cache",
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

  getCartItems(_user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/user/cart/" + _user_id, {
      headers: {
        Authorization: token,
      },
      cache: "force-cache",
    });
  }

  addToCart(data, selectedSize, selectedColor, num) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/user/cart/",
      { item: data, size: selectedSize, color: selectedColor, quantity: num },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  updateCartItems(updatedItems) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/user/cart/update",
      { updatedItems: updatedItems },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new Item();
