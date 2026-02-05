import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { adminAPI } from '../services/api';
import { FiUsers, FiFileText, FiHelpCircle, FiTrendingUp } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('stats');

  const { data: stats, isLoading } = useQuery('adminStats', () => adminAPI.getDashboardStats());
  const { data: users } = useQuery('adminUsers', () => adminAPI.getUsers({}), {
    enabled: activeSection === 'users'
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage your NMAI Current Affairs platform</p>
        </div>
      </div>

      <div className="container">
        <div className="admin-layout">
          {/* Sidebar */}
          <div className="admin-sidebar">
            <nav className="admin-nav">
              <button
                className={`nav-item ${activeSection === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveSection('stats')}
              >
                <FiTrendingUp /> Dashboard
              </button>
              <button
                className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
                onClick={() => setActiveSection('users')}
              >
                <FiUsers /> Users
              </button>
              <button
                className={`nav-item ${activeSection === 'articles' ? 'active' : ''}`}
                onClick={() => setActiveSection('articles')}
              >
                <FiFileText /> Articles
              </button>
              <button
                className={`nav-item ${activeSection === 'mcqs' ? 'active' : ''}`}
                onClick={() => setActiveSection('mcqs')}
              >
                <FiHelpCircle /> MCQs
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="admin-content">
            {activeSection === 'stats' && (
              <div className="dashboard-section">
                <h2>Overview Statistics</h2>

                <div className="stats-grid">
                  <div className="stat-card">
                    <FiUsers className="stat-icon" />
                    <div className="stat-value">{stats?.data?.stats?.totalUsers || 0}</div>
                    <div className="stat-label">Total Users</div>
                  </div>
                  <div className="stat-card">
                    <FiFileText className="stat-icon" />
                    <div className="stat-value">{stats?.data?.stats?.totalArticles || 0}</div>
                    <div className="stat-label">Total Articles</div>
                  </div>
                  <div className="stat-card">
                    <FiHelpCircle className="stat-icon" />
                    <div className="stat-value">{stats?.data?.stats?.totalMCQs || 0}</div>
                    <div className="stat-label">Total MCQs</div>
                  </div>
                  <div className="stat-card">
                    <FiTrendingUp className="stat-icon" />
                    <div className="stat-value">{stats?.data?.stats?.publishedArticles || 0}</div>
                    <div className="stat-label">Published Articles</div>
                  </div>
                </div>

                {/* Recent Users */}
                <div className="admin-card">
                  <h3>Recent Users</h3>
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats?.data?.recentUsers?.map((user) => (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Popular Articles */}
                <div className="admin-card">
                  <h3>Popular Articles</h3>
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Views</th>
                          <th>Likes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats?.data?.popularArticles?.map((article) => (
                          <tr key={article._id}>
                            <td>{article.title}</td>
                            <td>{article.viewCount}</td>
                            <td>{article.likes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'users' && (
              <div className="dashboard-section">
                <h2>User Management</h2>
                
                <div className="admin-card">
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.data?.map((user) => (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <span className={`role-badge ${user.role}`}>
                                {user.role}
                              </span>
                            </td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                              <button className="btn-sm btn-outline">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'articles' && (
              <div className="dashboard-section">
                <h2>Article Management</h2>
                <p className="section-note">Article management features coming soon...</p>
              </div>
            )}

            {activeSection === 'mcqs' && (
              <div className="dashboard-section">
                <h2>MCQ Management</h2>
                <p className="section-note">MCQ management features coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
