import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  // const [billForm, setBillForm] = useState({
  //   bill: "",
  //   paidByUser: "",
  //   whoIsPaying: "user",
  // });
  // const { bill, paidByUser, whoIsPaying } = billForm;
  // const paidByFriend = bill ? bill - paidByUser : "";
  // function handleChange(e) {
  //   let newValue = e.target.value;
  //   if (e.target.name === "bill" || e.target.name === "paidByUser") {
  //     newValue = Number(e.target.value);
  //   }
  //   setBillForm((prev) => ({
  //     ...prev,
  //     [e.target.name]: newValue,
  //   }));
  // }
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        name="bill"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>your expense</label>
      <input
        type="text"
        name="paidByUser"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>Who is paying the bill</label>
      <select
        name="whoIsPaying"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
