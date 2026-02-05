import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useAuth } from "../context/AuthContext";
import { usersAPI, authAPI } from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiBookmark,
  FiAward,
  FiSettings,
  FiLock,
} from "react-icons/fi";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* ================= SAVED ARTICLES ================= */
  const {
    data: savedArticles,
    isLoading: loadingSaved,
  } = useQuery(
    ["savedArticles"],
    usersAPI.getSavedArticles,
    { enabled: !!user }
  );

  /* ================= QUIZ HISTORY ================= */
  const { data: quizHistory } = useQuery(
    ["quizHistory"],
    usersAPI.getQuizHistory,
    { enabled: !!user }
  );

  /* ================= SAVE / UNSAVE ================= */
  const handleToggleSave = async (articleId, isSaved) => {
    try {
      if (isSaved) {
        await usersAPI.unsaveArticle(articleId);
        toast.success("Removed from saved");
      } else {
        await usersAPI.saveArticle(articleId);
        toast.success("Article saved");
      }

      queryClient.invalidateQueries("savedArticles");
    } catch {
      toast.error("Failed to update saved articles");
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await authAPI.updateProfile(profileData);
      if (res.success) {
        toast.success("Profile updated");
        setIsEditingProfile(false);
        queryClient.invalidateQueries(); // refresh user data
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (res.success) {
        toast.success("Password changed");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      toast.error(err.message || "Failed to change password");
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          {/* ================= SIDEBAR ================= */}
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2>{user?.name}</h2>
              <p className="profile-email">{user?.email}</p>
              <div className="profile-role">{user?.role}</div>
            </div>

            <nav className="profile-nav">
              {[
                ["overview", FiUser, "Overview"],
                ["saved", FiBookmark, "Saved Articles"],
                ["quiz", FiAward, "Quiz History"],
                ["settings", FiSettings, "Settings"],
              ].map(([key, Icon, label]) => (
                <button
                  key={key}
                  className={`nav-item ${activeTab === key ? "active" : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  <Icon /> {label}
                </button>
              ))}
            </nav>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="profile-content">
            {/* ---------- OVERVIEW ---------- */}
            {activeTab === "overview" && (
              <div className="content-section">
                <h2>Profile Overview</h2>

                <div className="stats-grid">
                  <div className="stat-card">
                    <FiBookmark />
                    <div>{savedArticles?.data?.length || 0}</div>
                    <span>Saved Articles</span>
                  </div>

                  <div className="stat-card">
                    <FiAward />
                    <div>{quizHistory?.data?.length || 0}</div>
                    <span>Quizzes Taken</span>
                  </div>
                </div>
              </div>
            )}

            {/* ---------- SAVED ARTICLES ---------- */}
            {activeTab === "saved" && (
              <div className="content-section">
                <h2>Saved Articles</h2>

                {loadingSaved ? (
                  <p>Loading...</p>
                ) : savedArticles?.data?.length ? (
                  savedArticles.data.map((article) => (
                    <div key={article._id} className="saved-item">
                      <Link to={`/article/${article.slug}`}>
                        <h3>{article.title}</h3>
                      </Link>
                      <button
                        onClick={() =>
                          handleToggleSave(article._id, true)
                        }
                        className="unsave-btn"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No saved articles yet</p>
                )}
              </div>
            )}

            {/* ---------- QUIZ HISTORY ---------- */}
            {activeTab === "quiz" && (
              <div className="content-section">
                <h2>Quiz History</h2>

                {quizHistory?.data?.length ? (
                  quizHistory.data.map((q, i) => (
                    <div key={i} className="quiz-history-item">
                      <span>{q.mcq?.question}</span>
                      <strong
                        className={q.isCorrect ? "correct" : "incorrect"}
                      >
                        {q.isCorrect ? "Correct" : "Incorrect"}
                      </strong>
                    </div>
                  ))
                ) : (
                  <p>No quiz attempts yet</p>
                )}
              </div>
            )}

            {/* ---------- SETTINGS ---------- */}
            {activeTab === "settings" && (
              <div className="content-section">
                <h2>Settings</h2>

                {/* EDIT PROFILE */}
                <div className="settings-card">
                  <h3>
                    <FiUser /> Edit Profile
                  </h3>

                  {isEditingProfile ? (
                    <form onSubmit={handleProfileUpdate}>
                      <input
                        placeholder="Name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />

                      <input
                        placeholder="Phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                      />

                      <input
                        placeholder="City"
                        value={profileData.city}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            city: e.target.value,
                          })
                        }
                      />

                      <button type="submit">Save</button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button onClick={() => setIsEditingProfile(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>

                {/* CHANGE PASSWORD */}
                <div className="settings-card">
                  <h3>
                    <FiLock /> Change Password
                  </h3>

                  <form onSubmit={handlePasswordChange}>
                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                    />

                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                    />

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />

                    <button type="submit">Change Password</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
