import style from "./index.module.scss";
export default function CommentCard({ fullName, comment, timestamp, rating }) {
  const stars = [1, 2, 3, 4, 5];
  timestamp = new Date(timestamp);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  };
  const formattedDateTime = timestamp.toLocaleDateString("en-US", options);
  return (
    <div className={style.card}>
      <p>
        <span>{fullName}</span>
      </p>
      <article>
        <p>{comment}</p>
      </article>
      <ul>
        {stars.map((star, index) =>
          star <= rating ? (
            <i key={index} className="fa-solid fa-star"></i>
          ) : (
            <i key={index} className="fa-regular fa-star"></i>
          )
        )}
      </ul>
    </div>
  );
}
