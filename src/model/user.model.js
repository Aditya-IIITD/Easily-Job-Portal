export const users = [];

export class userModel {
  //adding new user
  static addNewUser(user) {
    users.push({ id: users.length + 1, ...user });
  }

  //finding particular user
  static findUser(user) {
    const res = users.find(
      (p) => p.email === user.email && p.password == user.password
    );

    return res;
  }
}
