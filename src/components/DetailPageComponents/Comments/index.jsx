import { useState, useEffect } from "react";
import style from "./index.module.scss";
import { useTranslation } from "react-i18next";
import CommentCard from "../commentCard";
import { useSelector } from "react-redux";
import apiCall from "../../../helpers/comment";
import { getCookie } from "../../../helpers/cookie";
import usePrivate from "./../../../ServicesRequest/useAxiosPrivate2";
export default function Comments({ product_id }) {
  const { sendRequest } = usePrivate();
  const url = useSelector(state => state.store.url);
  const stars = [1, 2, 3, 4, 5];
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([1, 2, 3, 4, 5]);
  const [ratingValue, setRatingValue] = useState(5);
  const [hoverRating, setHoverRating] = useState(5);
  const token = getCookie("token");
  function changeRatings(rate) {
    let new_ratings = ratings;
    if (new_ratings.includes(rate)) {
      new_ratings = new_ratings.filter(x => x !== rate);
      setRatings(new_ratings);
    } else {
      new_ratings = [...new_ratings, rate];
      setRatings(new_ratings);
    }
    if (new_ratings.length === 0) {
      setRatings([1, 2, 3, 4, 5]);
    }
  }
  const addComment = async () => {
    if (token) {
      const input = document.getElementById("comment_input");
      const text = input.value;
      try {
        const formData = new FormData();

        formData.append("ProductId", product_id);
        formData.append("Rating", ratingValue);
        formData.append("Comment", text);
        var res = await sendRequest(
          "POST",
          "/ProductRating",
          formData,
          "multipart/form-data"
        );
        let comment = {
          id: comments.length + 1,
          username: "My Username",
          comment: text,
          timestamp: Date.now(),
          rating: ratingValue,
        };
        setComments(prev => [...prev, comment]);
        input.value = "";
        setRatingValue(5);
      } catch (error) {
        console.error("Failed to update item count in basket:", error);
      }
    } else {
      console.log("error");
    }
  };
  const { t } = useTranslation();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await sendRequest(
          "GET",
          `/ProductRating/${product_id}`,
          null
        );
        console.log(res); // Log the response data
        setComments(res.data);

        setLoading(false);
      } catch (error) {
        console.error("Error:", error); // Handle any errors
      }
    };
    fetchdata();
  }, []);

  return loading ? (
    <section className="loading-page">
      <i className="fa-solid fa-spinner fa-spin"></i>
    </section>
  ) : (
    <section className={`container ${style.comments_container}`}>
      <h2>{t("comments")}</h2>
      <ul id="filter-stars">
        <li
          onClick={() => changeRatings(5)}
          className={ratings.includes(5) ? style.active : null}
        >
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </li>
        <li
          onClick={() => changeRatings(4)}
          className={ratings.includes(4) ? style.active : null}
        >
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </li>
        <li
          onClick={() => changeRatings(3)}
          className={ratings.includes(3) ? style.active : null}
        >
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </li>
        <li
          onClick={() => changeRatings(2)}
          className={ratings.includes(2) ? style.active : null}
        >
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </li>
        <li
          onClick={() => changeRatings(1)}
          className={ratings.includes(1) ? style.active : null}
        >
          <i className="fa-solid fa-star"></i>
        </li>
      </ul>
      <div className={style.comments}>
        {comments &&
          comments?.map(comment =>
            ratings.includes(comment.rating) ? (
              <CommentCard key={`comment-${comment.id}`} {...comment} />
            ) : null
          )}
      </div>
      {token && (
        <form className={style.sendComment}>
          <input
            id="comment_input"
            type="text"
            placeholder={t("send_comment")}
          />
          <div>
            {stars.map(star => (
              <i
                key={`star-${star}`}
                onClick={() => setRatingValue(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(ratingValue)}
                className={`${
                  star <= (hoverRating || ratingValue)
                    ? "fa-solid"
                    : "fa-regular"
                } fa-star`}
              ></i>
            ))}
          </div>
          <button type="button" onClick={() => addComment()}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      )}
    </section>
  );
}
