# Akira's Personal Website

A modern, responsive personal website built with HTML5, CSS3, and vanilla JavaScript. Features a beautiful Glassmorphism + Neumorphism design with automatic GitHub integration.

## 🎨 Design Features

- **Glassmorphism + Neumorphism**: Modern design aesthetic with glass-like effects and soft shadows
- **Light Blue Theme**: Clean and professional color scheme
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Smooth Animations**: Fade-in effects and hover interactions
- **Automatic GitHub Integration**: Real-time data from GitHub API

## 📁 Project Structure

```
yuzaiakira.github.io/
├── index.html              # Main HTML file
├── assets/                 # Assets folder
│   ├── css/
│   │   └── styles.css      # Custom CSS styles
│   └── js/
│       └── main.js         # JavaScript functionality
└── README.md              # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with Glassmorphism/Neumorphism effects
- **JavaScript (ES6+)**: Vanilla JS with async/await
- **TailwindCSS**: Utility-first CSS framework (via CDN)
- **FontAwesome**: Icon library (via CDN)
- **Google Fonts**: Inter font family
- **GitHub API**: For dynamic profile data

## 🚀 Features

### Core Sections
1. **Header**: Profile image, name, title, and tagline
2. **About**: Personal introduction and skills
3. **Contact Links**: Social media and contact information
4. **GitHub Activity**: Dynamic stats and latest repositories
5. **Future Expansion**: Placeholder for portfolio and blog
6. **Footer**: Copyright and credits

### Dynamic Features
- **Real-time GitHub Stats**: Repository count, followers, following
- **Latest Projects**: Automatically fetches 6 most recent repositories
- **Language Color Coding**: Authentic GitHub language colors
- **Error Handling**: Graceful fallbacks for API failures

## 🎯 Key Components

### CSS (`assets/css/styles.css`)
- Glassmorphism and Neumorphism effects
- Smooth animations and transitions
- Responsive design utilities
- Custom scrollbar styling
- Accessibility features

### JavaScript (`assets/js/main.js`)
- GitHub API integration
- Dynamic content updates
- Smooth scroll functionality
- Intersection Observer animations
- Error handling and fallbacks

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet**: Adaptive layout for medium screens
- **Desktop**: Full-featured desktop experience
- **Touch-friendly**: Optimized for touch interactions

## 🔧 Customization

### Colors
The color scheme can be customized in `assets/css/styles.css`:
```css
/* Primary colors */
--primary-blue: #a3d5ff;
--background: #f0f4ff;
```

### GitHub Integration
Update the GitHub username in `assets/js/main.js`:
```javascript
const GITHUB_USERNAME = 'your-username';
```

## 🚀 Deployment

This website is designed for GitHub Pages deployment:

1. **Repository Setup**: Create a repository named `username.github.io`
2. **File Upload**: Upload all files to the repository
3. **GitHub Pages**: Enable GitHub Pages in repository settings
4. **Custom Domain**: Optional custom domain configuration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. Contributions are welcome!

---

**Made with ♥ and ☕ by Akira with Cursor AI** 