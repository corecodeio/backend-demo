const users = [
    {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        password: "123456"
    }
];
const getAllUsers = () => {
    return users;
};
const getUser = (id) => {
    return users.find((user) => user.id === id);
}
const createUser = (email, password) => {
    const searchUser = users.find((user) => user.email === email);
    if (searchUser) {
        return;
    }
    const newUser = {
        id: users[users.length - 1].id + 1,
        name: "",
        email,
        password
    };
    users.push(newUser);
    return newUser
};

module.exports = {
    getUser,
    createUser,
    getAllUsers
};