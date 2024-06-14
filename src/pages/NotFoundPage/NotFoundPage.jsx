import css from "./NotFoundPage";

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className={css.message}>
      <p>
        Sorry, page not found! Please go to <Link to="/">Home</Link>!
      </p>
    </div>
  );
}