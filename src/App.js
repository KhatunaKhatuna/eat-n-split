import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [addFriend, setAddFriend] = useState({
    name: "",
    image: "https://i.pravatar.cc/48",
  });
  function handleChange(e) {
    setAddFriend((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!addFriend.name || !addFriend.image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: addFriend.name,
      image: `${addFriend.image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setAddFriend({
      name: "",
      image: "https://i.pravatar.cc/48",
    });
  }
  console.log(addFriend);
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> Friend name</label>
      <input
        value={addFriend.name}
        name="name"
        onChange={handleChange}
        type="text"
      />

      <label> Image URL</label>
      <input
        value={addFriend.image}
        name="image"
        onChange={handleChange}
        type="text"
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>Bill value</label>
      <input type="text" />

      <label>your expense</label>
      <input type="text" />

      <label>X's expense</label>
      <input type="text" disabled />

      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
