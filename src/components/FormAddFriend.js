import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ onAddFriend }) {
  const [friendForm, setFriendForm] = useState({
    name: "",
    image: "https://i.pravatar.cc/48",
  });
  const { name, image } = friendForm;
  function handleChange(e) {
    setFriendForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setFriendForm({
      name: "",
      image: "https://i.pravatar.cc/48",
    });
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> Friend name</label>
      <input value={name} name="name" onChange={handleChange} type="text" />

      <label> Image URL</label>
      <input value={image} name="image" onChange={handleChange} type="text" />
      <Button>Add</Button>
    </form>
  );
}
