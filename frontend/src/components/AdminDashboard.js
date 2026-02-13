import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('stats');
  const [loading, setLoading] = useState(true);
  const [stats] = useState({
    totalUsers: 1247,
    totalArticles: 856,
    totalMCQs: 2340,
    publishedArticles: 742
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      
      // Set sample data
      setRecentUsers([
        {
          _id: '1',
          name: 'Rajesh Kumar',
          email: 'rajesh.k@example.com',
          role: 'user',
          createdAt: new Date('2026-02-10')
        },
        {
          _id: '2',
          name: 'Priya Sharma',
          email: 'priya.s@example.com',
          role: 'user',
          createdAt: new Date('2026-02-09')
        },
        {
          _id: '3',
          name: 'Amit Patel',
          email: 'amit.p@example.com',
          role: 'author',
          createdAt: new Date('2026-02-08')
        }
      ]);

      setPopularArticles([
        {
          _id: '1',
          title: 'Union Budget 2026 Highlights',
          category: 'Economy',
          viewCount: 5432,
          likes: 892
        },
        {
          _id: '2',
          title: 'Latest Amendments in Indian Constitution',
          category: 'Politics',
          viewCount: 4821,
          likes: 756
        },
        {
          _id: '3',
          title: 'Climate Change Summit Outcomes',
          category: 'Environment',
          viewCount: 3945,
          likes: 623
        }
      ]);

      setUsers([
        {
          _id: '1',
          name: 'Admin User',
          email: 'admin@nmai.com',
          role: 'admin',
          status: 'active',
          createdAt: new Date('2024-01-01')
        },
        {
          _id: '2',
          name: 'Vikram Singh',
          email: 'vikram.s@example.com',
          role: 'author',
          status: 'active',
          createdAt: new Date('2025-12-15')
        },
        {
          _id: '3',
          name: 'Anita Desai',
          email: 'anita.d@example.com',
          role: 'user',
          status: 'active',
          createdAt: new Date('2025-11-20')
        }
      ]);
    }, 1000);
  }, []);

  // Animate stat values
  useEffect(() => {
    const animateValue = (id, start, end, duration) => {
      const element = document.getElementById(id);
      if (!element) return;

      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
      }, 16);
    };

    if (!loading) {
      setTimeout(() => {
        animateValue('total-users', 0, stats.totalUsers, 1500);
        animateValue('total-articles', 0, stats.totalArticles, 1500);
        animateValue('total-mcqs', 0, stats.totalMCQs, 1500);
        animateValue('published-articles', 0, stats.publishedArticles, 1500);
      }, 100);
    }
  }, [loading, stats]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const renderStatsSection = () => (
    <div className="dashboard-section">
      <h2>
        <i className="fas fa-chart-line"></i>
        Overview Statistics
      </h2>

      <div className="stats-grid">
        <div className="stat-card">
          <i className="fas fa-users stat-icon"></i>
          <div className="stat-value" id="total-users">0</div>
          <div className="stat-label">Total Users</div>
        </div>
        
        <div className="stat-card">
          <i className="fas fa-file-alt stat-icon"></i>
          <div className="stat-value" id="total-articles">0</div>
          <div className="stat-label">Total Articles</div>
        </div>
        
        <div className="stat-card">
          <i className="fas fa-question-circle stat-icon"></i>
          <div className="stat-value" id="total-mcqs">0</div>
          <div className="stat-label">Total MCQs</div>
        </div>
        
        <div className="stat-card">
          <i className="fas fa-check-circle stat-icon"></i>
          <div className="stat-value" id="published-articles">0</div>
          <div className="stat-label">Published Articles</div>
        </div>
      </div>

      <div className="admin-card">
        <h3>
          <i className="fas fa-user-plus"></i>
          Recent Users
        </h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-card">
        <h3>
          <i className="fas fa-fire"></i>
          Popular Articles
        </h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Views</th>
                <th>Likes</th>
              </tr>
            </thead>
            <tbody>
              {popularArticles.map((article) => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td>
                    <span className="role-badge author">
                      {article.category}
                    </span>
                  </td>
                  <td>{article.viewCount.toLocaleString()}</td>
                  <td>{article.likes.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsersSection = () => (
    <div className="dashboard-section">
      <h2>
        <i className="fas fa-users"></i>
        User Management
      </h2>

      <div className="admin-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="filter-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="author">Author</option>
          <option value="user">User</option>
        </select>
        <select 
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add User
        </button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-sm btn-outline">
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button className="btn-sm btn-danger">
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button disabled>
            <i className="fas fa-chevron-left"></i> Previous
          </button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );

  const renderArticlesSection = () => (
    <div className="dashboard-section">
      <h2>
        <i className="fas fa-file-alt"></i>
        Article Management
      </h2>
      <div className="section-note">
        <i className="fas fa-newspaper"></i>
        <h3>Article Management</h3>
        <p>Article management features coming soon...</p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
          <i className="fas fa-plus"></i> Add New Article
        </button>
      </div>
    </div>
  );

  const renderMCQsSection = () => (
    <div className="dashboard-section">
      <h2>
        <i className="fas fa-question-circle"></i>
        MCQ Management
      </h2>
      <div className="section-note">
        <i className="fas fa-question"></i>
        <h3>MCQ Management</h3>
        <p>MCQ management features coming soon...</p>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
          <i className="fas fa-plus"></i> Add New MCQ
        </button>
      </div>
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className="dashboard-section">
      <h2>
        <i className="fas fa-chart-bar"></i>
        Analytics & Reports
      </h2>
      <div className="section-note">
        <i className="fas fa-chart-pie"></i>
        <h3>Analytics Dashboard</h3>
        <p>Detailed analytics and reporting features coming soon...</p>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="dashboard-section">
      <h2>
        <i className="fas fa-cog"></i>
        Settings
      </h2>
      <div className="admin-card">
        <h3>
          <i className="fas fa-palette"></i>
          Appearance
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ fontWeight: 500 }}>Theme:</label>
          <button 
            className="btn btn-outline" 
            onClick={() => {
              if (window.themeManager) {
                window.themeManager.toggleTheme();
              }
            }}
          >
            <i className="fas fa-moon"></i> Toggle Dark Mode
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <h1>
            <i className="fas fa-tachometer-alt"></i>
            Admin Dashboard
          </h1>
          <p>Manage your NMAI Current Affairs platform</p>
        </div>
      </div>

      <div className="container">
        <div className="admin-layout">
          <div className="admin-sidebar">
            <nav className="admin-nav">
              <button
                className={`nav-item ${activeSection === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveSection('stats')}
              >
                <i className="fas fa-chart-line"></i> Dashboard
              </button>
              <button
                className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
                onClick={() => setActiveSection('users')}
              >
                <i className="fas fa-users"></i> Users
              </button>
              <button
                className={`nav-item ${activeSection === 'articles' ? 'active' : ''}`}
                onClick={() => setActiveSection('articles')}
              >
                <i className="fas fa-file-alt"></i> Articles
              </button>
              <button
                className={`nav-item ${activeSection === 'mcqs' ? 'active' : ''}`}
                onClick={() => setActiveSection('mcqs')}
              >
                <i className="fas fa-question-circle"></i> MCQs
              </button>
              <button
                className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveSection('analytics')}
              >
                <i className="fas fa-chart-bar"></i> Analytics
              </button>
              <button
                className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveSection('settings')}
              >
                <i className="fas fa-cog"></i> Settings
              </button>
            </nav>
          </div>

          <div className="admin-content">
            {activeSection === 'stats' && renderStatsSection()}
            {activeSection === 'users' && renderUsersSection()}
            {activeSection === 'articles' && renderArticlesSection()}
            {activeSection === 'mcqs' && renderMCQsSection()}
            {activeSection === 'analytics' && renderAnalyticsSection()}
            {activeSection === 'settings' && renderSettingsSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;