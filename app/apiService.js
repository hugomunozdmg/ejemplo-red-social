export class ApiService {
  urlBase = "http://localhost:3000";

  async doGet(url) {
    const res = await fetch(this.urlBase + url);
    const data = await res.json();
    return data;
  }

  async doPost(url, data) {
    const res = await fetch(this.urlBase + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_1 = await res.json();
    return data_1;
  }

  async getUsersFromApi() {
    let result = await this.doGet("/users");
    return result.users;
  }

  async registerUser(username, password) {
    let result = await this.doPost("/register-user", {
      user: { username, password },
    });
    return result;
  }

  async loginUser(username, password) {
    let result = await this.doPost("/login-user", {
      user: { username, password },
    });
    return result;
  }

  async registerMessage(user1, user2, message) {
    let result = await this.doPost("/register-message", {
      message: {
        text: message,
        user1: user1,
        user2: user2,
      },
    });
    return result;
  }

  async getMessages(user1, user2) {
    let result = await this.doPost("/get-messages", { user1, user2 });
    return result;
  }
}
