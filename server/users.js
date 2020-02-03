const users = []

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // console.log(id, name, room)

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room };
    console.log('user', user)

    users.push(user);
    console.log('dssd', users)

    return { user };
}

const removeUser = (id) => {

    const index = users.findIndex(user => user.id == id)

    if (index)
        return users.splice(index, 1)[0]
    else
        return { error: 'user does not exist' }

}

const getUser = (id) => users.find(user => user.id == id)


const getUserInRoom = (room) => users.filter(user => user.room == room)





module.exports = { addUser, removeUser, getUser, getUserInRoom }