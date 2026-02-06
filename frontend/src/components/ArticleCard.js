import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import "./ArticleCard.css";

const ArticleCard = ({ article }) => {
  const date =
    article.publishDate || article.createdAt
      ? new Date(article.publishDate || article.createdAt).toLocaleDateString(
          "en-IN",
          { day: "numeric", month: "short", year: "numeric" }
        )
      : "";

  return (
    <Link to={`/article/${article.slug}`} className="article-card-horizontal">
      {article.featuredImage?.url && (
        <div className="article-image">
          <img
            src={article.featuredImage.url}
            alt={article.title}
            loading="lazy"
          />
        </div>
      )}

      <div className="article-card-content">
        <div className="article-meta">
          <span className="category">{article.category}</span>
          {date && (
            <span className="date">
              <FiCalendar /> {date}
            </span>
          )}
        </div>

        <h3 className="title">{article.title}</h3>
        <p className="summary">{article.summary}</p>

        <span className="read-more">Read More →</span>
      </div>
    </Link>
  );
};

export default ArticleCard;
