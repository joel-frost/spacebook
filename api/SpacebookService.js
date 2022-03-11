import AsyncStorage from "@react-native-async-storage/async-storage";

export const signup = async (account) => {
  return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        })
        .then((response) => {
          return response;
            
        });

}

export const logout = async () => {
  const token = await AsyncStorage.getItem('@session_token');
  await AsyncStorage.removeItem('@session_token');
  return fetch('http://localhost:3333/api/1.0.0/logout', {
    method: 'post',
    headers: {
      'X-Authorization': token,
    },
  })
    .then((response) => {
      return response;
    })
};

export const editProfile = async (token, id, updatedInfo) => {
  console.log(JSON.stringify(updatedInfo));
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(updatedInfo)
    
  }).then((response) => {
    return response;
  });
  
}

export const getUser = async (token, id) => {
  console.log(token);
  console.log(id);
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 400) {
      throw "Unable to get posts";
    } else {
      throw "Something went wrong";
    }
  });
};

export const getPosts = async (token, id) => {
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 400) {
      throw "Unable to get posts";
    }
    if (response.status === 403) {
      return;
    } else {
      throw "Something went wrong";
    }
  });
};

export const submitPost = async (token, id, text) => {
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: `{"text": "${text}"}`,
  }).then((response) => {
    return response;
  });
};

export const deletePost = async (token, id, postID) => {
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${postID}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((response) => {
    return response;
  });
};

export const getFriendRequests = async (token) => {
  return fetch(`http://localhost:3333/api/1.0.0/friendrequests`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 400) {
        throw "Unable to get posts";
      } else {
        throw "Something went wrong";
      }
    })
    .then((response) => {
      return response;
    });
};

export const acceptFriendRequest = async (token, id) => {
  return fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw "Something went wrong";
    }
  });
};

export const rejectFriendRequest = async (token, id) => {
  return fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw "Something went wrong";
    }
  });
};

export const getFriendsList = async (token, id) => {
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 400) {
        throw "Unable to get posts";
      } else {
        throw "Something went wrong";
      }
    })
    .then((response) => {
      return response;
    });
};

export const updateSearch = async (token, searchTerm) => {
  return fetch(
    `http://localhost:3333/api/1.0.0/search?q=${searchTerm}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 400) {
        throw "Unable to search users";
      } else {
        throw "Something went wrong";
      }
    });
};

export const addFriend = async (token, id) => {
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response;
    })
};

export const likePost = async (token, id, postID) => {
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${postID}/like`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.log(e);
    });
}

export const unlikePost = async (token, id, postID) => {
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${postID}/like`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((response) => {
    return response;
  });
};

export const getPost = async (token, id, postID) => {
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${postID}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 400) {
      throw "Unable to get posts";
    }
    if (response.status === 403) {
      return;
    } else {
      throw "Something went wrong";
    }
  });
};

export const editPost = async (token, id, postID, updatedInfo) => {
  console.log(JSON.stringify(updatedInfo));
  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/post/${postID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(updatedInfo)
    
  }).then((response) => {
    return response;
  });
  
}

export const savePhoto = async (token, id, data) => {
  // Get these from AsyncStorage
  let res = await fetch(data.base64);
  let blob = await res.blob();

  return fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
      method: "POST",
      headers: {
          "Content-Type": "image/png",
          "X-Authorization": token
      },
      body: blob
  })
  .then((response) => {
      console.log("Picture added", response);
  })
  .catch((err) => {
      console.log(err);
  })
}

export const getProfilePicture = async (token, id) => {
  fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
    method: 'GET',
    headers: {
      'X-Authorization': token
    }
  })
  .then((res) => {
    return res.blob();
  })
  .then((resBlob) => {
    let data = URL.createObjectURL(resBlob);
    return data;
  });
}