import toast from "react-hot-toast";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.topic.value.trim();

    if (!value) {
      return toast.error("This input can't be empty!");
    }

    onSubmit(value);
    e.target.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.inp}
        name="topic"
        type="text"
        autoComplete="off"
        autoFocus
      />
      <button className={css.btn} type="submit">
        Search
      </button>
    </form>
  );
}