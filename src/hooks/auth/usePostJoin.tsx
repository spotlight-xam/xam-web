import axios from "axios"

interface UserRequest { //access token을 첨부해서 보냄
    email: String,
    password: String,
    username: String,
}

interface PostLoginRes {
    email: string;
    authToken: string;
  }