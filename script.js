document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    const welcomeOverlay = document.getElementById('welcome-message-overlay');
    const heroDynamicSubtitle = document.getElementById('hero-dynamic-subtitle');

    // ----- Dynamic Hero Subtitles -----
    const dynamicSubtitles = [
        "NexForia، حيث تتحول الأفكار إلى تجارب رقمية فريدة تسافر بك عبر عوالم الابتكار.",
        "نصنع المستقبل الرقمي، كود بكود، بكسل ببكسل، في مجرة الإبداع اللامحدود.",
        "بوابتك لاستكشاف تقنيات الويب المتطورة وحلول برمجية تتجاوز التوقعات.",
        "من الأفكار الأولية إلى الإطلاق الكوني، نرافقك في كل خطوة نحو النجاح الرقمي.",
        "دعنا نحول رؤيتك إلى واقع ملموس يتألق في سماء الإنترنت الواسعة."
    ];
    let currentSubtitleIndex = 0;

    function changeHeroSubtitle() {
        if (!heroDynamicSubtitle) return;
        heroDynamicSubtitle.classList.remove('animate-in');
        setTimeout(() => {
            currentSubtitleIndex = (currentSubtitleIndex + 1) % dynamicSubtitles.length;
            heroDynamicSubtitle.textContent = dynamicSubtitles[currentSubtitleIndex];
            heroDynamicSubtitle.classList.add('animate-in');
        }, 600); // Matches CSS transition for opacity
    }
    
    // ----- بيانات المشاريع -----
    const allProjects = [
        {
            id: 1,
            name: 'مرصد البيانات (Dashboard)',
            type: 'large',
            description: 'لوحة تحكم متقدمة لعرض وتحليل البيانات مع واجهة مستخدم تفاعلية وتصميم مستقبلي مستوحى من الفضاء. تم استخدام أحدث التقنيات لضمان أداء عالٍ وتجربة مستخدم سلسة.',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
            detailsImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=80',
            languagesUsed: ['JavaScript', 'React', 'Node.js', 'CSS', 'D3.js', 'API'],
            codeSnippets: {
                'React': `import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/dataApi'; // Assuming an API service

const DataChart = ({ endpoint }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(endpoint)
      .then(response => {
        const processedData = response.data.map(item => ({
          ...item,
          timestamp: new Date(item.timestamp).toLocaleTimeString(),
        }));
        setChartData(processedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      });
  }, [endpoint]);

  const renderChart = useMemo(() => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="timestamp" stroke="var(--text-secondary)" />
        <YAxis stroke="var(--text-secondary)" />
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color-subtle)" />
        <Tooltip
          contentStyle={{
            background: 'var(--dark-element-bg)',
            borderColor: 'var(--border-color-subtle)',
            color: 'var(--text-primary)'
          }}
          itemStyle={{ color: 'var(--royal-purple)' }}
        />
        <Line type="monotone" dataKey="value" stroke="var(--deep-purple-accent)" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: 'var(--royal-purple)' }} />
      </LineChart>
    </ResponsiveContainer>
  ), [chartData]);

  if (loading) return <div className="loading-pulsar">Loading Data...</div>;

  return <div className="chart-container">{renderChart}</div>;
};

export default DataChart;`,
                'JavaScript': `function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const handleResize = debounce(() => {
  // console.log('Window resized, recalculating layout...');
}, 250);

window.addEventListener('resize', handleResize);`,
                'HTML': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Advanced Data Observatory</h1>
    </header>
    <main>
        <section class="chart-section" id="realtime-data">
            <h2>Real-time Metrics</h2>
            {/* React component DataChart would be rendered here */}
        </section>
        <section class="controls-section">
            <h2>Control Panel</h2>
            <button id="fetch-new-data">Fetch New Batch</button>
        </section>
    </main>
    <footer>
        <p>© 2024 NexForia Galactic Solutions</p>
    </footer>
    <script src="app.js"></script>
</body>
</html>`,
                'CSS': `.loading-pulsar {
  display: flex; justify-content: center; align-items: center;
  padding: 40px; color: var(--text-secondary); font-family: var(--font-secondary);
}
.loading-pulsar::before {
  content: ''; display: block; width: 15px; height: 15px; margin-left: 10px; /* RTL: margin-right */
  background-color: var(--royal-purple); border-radius: 50%;
  box-shadow: 0 0 10px var(--glow-color-main);
  animation: pulsar 1.5s infinite ease-in-out;
}
@keyframes pulsar {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}`
            }
        },
        {
            id: 2,
            name: 'محاكي الجاذبية الكونية',
            type: 'small',
            description: 'تجربة ويب تفاعلية صغيرة تحاكي تأثيرات الجاذبية بين الأجرام السماوية باستخدام Canvas API ورسم متجهات القوة.',
            imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Jhdml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            detailsImageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Jhdml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            languagesUsed: ['JavaScript', 'HTML', 'Canvas'],
            codeSnippets: {
                'JavaScript': `const canvas = document.getElementById('gravityCanvas');
const ctx = canvas.getContext('2d');
canvas.width = Math.min(window.innerWidth * 0.9, 800);
canvas.height = 450;

const G = 0.8; // Gravitational constant
let bodies = [];
let trailLength = 30; // Number of points in the trail

class CelestialBody {
    constructor(x, y, mass, radius, color, vx = 0, vy = 0, isFixed = false) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.isFixed = isFixed;
        this.trail = []; // To store trail points
    }

    applyGravity(otherBody) {
        if (this.isFixed) return;
        const dx = otherBody.x - this.x;
        const dy = otherBody.y - this.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < (this.radius + otherBody.radius) * (this.radius + otherBody.radius) / 4) return; // Avoid extreme forces or division by zero

        const dist = Math.sqrt(distSq);
        const force = (G * this.mass * otherBody.mass) / distSq;
        const forceX = (force * dx) / dist;
        const forceY = (force * dy) / dist;

        this.vx += forceX / this.mass;
        this.vy += forceY / this.mass;
    }

    updatePosition() {
        if (this.isFixed) return;
        this.x += this.vx;
        this.y += this.vy;

        // Add current position to trail
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > trailLength) {
            this.trail.shift(); // Keep trail length limited
        }

        // Boundary conditions (bounce)
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.vx *= -0.7;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.vy *= -0.7;
    }
    
    drawTrail() {
        if (this.trail.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
            const opacity = i / this.trail.length * 0.5; // Fade out older trail parts
            ctx.strokeStyle = \`rgba(\${parseInt(this.color.slice(1,3),16)}, \${parseInt(this.color.slice(3,5),16)}, \${parseInt(this.color.slice(5,7),16)}, \${opacity})\`;
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        ctx.lineWidth = this.radius * 0.2;
        ctx.stroke();
    }

    draw() {
        this.drawTrail(); // Draw trail first
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        // Add a subtle glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
    }
}

function initSimulation() {
    bodies = [
        new CelestialBody(canvas.width / 2, canvas.height / 2, 2000, 25, '#FFD700', 0, 0, true), // Central star (fixed)
        new CelestialBody(canvas.width / 2 + 180, canvas.height / 2, 15, 7, '#4A90E2', 0, 2.2),   // Planet 1
        new CelestialBody(canvas.width / 2 - 120, canvas.height / 2 - 120, 8, 5, '#E94E77', 1.8, -1.2), // Planet 2
        new CelestialBody(canvas.width / 2 + 80, canvas.height / 2 - 200, 5, 4, '#7ED321', -1.5, 1.0) // Planet 3
    ];
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(3, 0, 10, 0.3)'; // Fading effect for trails
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bodies.length; i++) {
        for (let j = 0; j < bodies.length; j++) {
            if (i !== j) {
                bodies[i].applyGravity(bodies[j]);
            }
        }
    }

    bodies.forEach(body => {
        body.updatePosition();
        body.draw();
    });
}

initSimulation();
animate();`,
                 'HTML': `<div class="canvas-container" style="background: #03000a; padding: 20px; border-radius: 10px;">
  <h3 style="color: #ECEFF1; text-align: center; font-family: 'Orbitron', sans-serif;">محاكاة الجاذبية الكونية</h3>
  <canvas id="gravityCanvas" style="display: block; margin: 15px auto; border: 1px solid #5E35B1;"></canvas>
  <p style="color: #B0BEC5; text-align: center; font-size: 0.9em;">شاهد تفاعل الأجرام السماوية. الكود يوضح بناء الأجسام وتطبيق قوى الجاذبية.</p>
</div>`
            }
        },
        { id: 3, name: 'مولد الألوان المتدرجة', type: 'small', description: 'أداة ويب بسيطة لإنشاء وتخصيص تدرجات ألوان CSS.', imageUrl: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', detailsImageUrl: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=80', languagesUsed: ['JavaScript', 'HTML', 'CSS'], codeSnippets: { 'JavaScript': `console.log("Gradient generator logic: Initializing color pickers and event listeners for real-time CSS gradient updates.");
const color1Picker = document.getElementById('color1');
const color2Picker = document.getElementById('color2');
const gradientPreview = document.getElementById('gradient-preview');
const cssOutput = document.getElementById('css-output');

function updateGradient() {
    const color1 = color1Picker.value;
    const color2 = color2Picker.value;
    const gradientCss = \`linear-gradient(to right, \${color1}, \${color2})\`;
    
    gradientPreview.style.background = gradientCss;
    cssOutput.textContent = \`background: \${gradientCss};\`;
}

color1Picker.addEventListener('input', updateGradient);
color2Picker.addEventListener('input', updateGradient);

// Initial call
updateGradient();` } },
        { id: 4, name: 'منصة تدوين مصغرة', type: 'large', description: 'منصة تدوين بسيطة مع واجهة برمجة تطبيقات خلفية لإدارة المقالات والتعليقات.', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', detailsImageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=80', languagesUsed: ['Node.js', 'Express', 'MongoDB', 'JavaScript', 'API'], codeSnippets: { 'Node.js': `const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (replace with your connection string)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mini-blog-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a simple Post schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Post = mongoose.model("Post", postSchema);

// API Routes
app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/api/posts", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get("/", (req, res) => res.send("NexForia Mini Blog API is Orbiting!"));

app.listen(PORT, () => console.log(\`API Server launched on port \${PORT}\`));` } },
        { id: 5, name: 'لعبة تفادي الكويكبات', type: 'small', description: 'لعبة بسيطة تعتمد على المتصفح حيث يجب على اللاعب تفادي الكويكبات المتساقطة.', imageUrl: 'https://images.unsplash.com/photo-1583487839705-ce64c7_06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXN0ZXJvaWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', detailsImageUrl: 'https://images.unsplash.com/photo-1583487839705-ce64c7_06c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXN0ZXJvaWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=80', languagesUsed: ['JavaScript', 'HTML', 'Canvas'], codeSnippets: { 'JavaScript': `console.log("Asteroid dodging game: Player controls, asteroid generation, collision detection, and scoring system logic.");
// Basic structure idea
const player = { x: 50, y: 50, speed: 5, width: 20, height: 20 };
const asteroids = [];
let score = 0;
function gameLoop() {
    // Clear canvas
    // Update player position based on input
    // Generate new asteroids periodically
    // Move asteroids
    // Check for collisions
    // Update score
    // Draw everything
    requestAnimationFrame(gameLoop);
}
// Start game
// gameLoop();` } },
        { id: 6, name: 'مكتبة مكونات UI/UX', type: 'large', description: 'مجموعة من مكونات واجهة المستخدم القابلة لإعادة الاستخدام والمصممة بأسلوب عصري مع التركيز على تجربة المستخدم.', imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwY29tcG9uZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', detailsImageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwY29tcG9uZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=80', languagesUsed: ['React', 'TypeScript', 'CSS', 'Storybook'], codeSnippets: { 'React': `import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Assuming a CSS file for styling

/**
 * A customizable button component for the UI library.
 * Supports different variants, sizes, and an optional icon.
 */
export const Button = ({ primary, backgroundColor, size, label, icon, ...props }) => {
  const mode = primary ? 'button--primary' : 'button--secondary';
  return (
    <button
      type="button"
      className={['button', \`button--\${size}\`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {label}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.element, // For React components as icons
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  icon: null,
};` } },
        { id: 7, name: 'تطبيق إدارة المهام الذكي', type: 'small', description: 'تطبيق بسيط لإدارة قائمة المهام مع تخزين البيانات محليًا وميزات ذكية مثل التذكيرات.', imageUrl: 'https://images.unsplash.com/photo-1520609417-6f545123b64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9kbyUyMGxpc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', detailsImageUrl: 'https://images.unsplash.com/photo-1520609417-6f545123b64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9kbyUyMGxpc3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=80', languagesUsed: ['JavaScript', 'HTML', 'CSS', 'LocalStorage'], codeSnippets: { 'JavaScript': `// Basic To-Do List Logic
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list-ul');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        listItem.className = task.completed ? 'completed' : '';
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleComplete(index);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = () => deleteTask(index);
        
        listItem.appendChild(completeBtn);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
renderTasks(); // Initial render
` } },
    ];

    const skillsData = [
        { name: "JavaScript", icon: "fab fa-js-square", level: 90, color: "#F7DF1E" },
        { name: "React", icon: "fab fa-react", level: 85, color: "#61DAFB" },
        { name: "Node.js", icon: "fab fa-node-js", level: 80, color: "#339933" },
        { name: "HTML5", icon: "fab fa-html5", level: 95, color: "#E34F26" },
        { name: "CSS3", icon: "fab fa-css3-alt", level: 90, color: "#1572B6" },
        { name: "Python", icon: "fab fa-python", level: 70, color: "#3776AB" },
        { name: "API Design", icon: "fas fa-cogs", level: 75, color: "#B0BEC5" },
        { name: "UI/UX", icon: "fas fa-drafting-compass", level: 80, color: "#7E57C2" },
        { name: "MongoDB", icon: "fas fa-database", level: 65, color: "#47A248" },
        { name: "Git & GitHub", icon: "fab fa-git-alt", level: 88, color: "#F05032"},
        { name: "TypeScript", icon: "fas fa-code", level: 70, color: "#3178C6"},
        { name: "Figma", icon: "fab fa-figma", level: 75, color: "#F24E1E"}
    ];


    const ITEMS_PER_PAGE = 6;

    const header = document.getElementById('main-header');
    const largeProjectsGrid = document.getElementById('large-projects-grid');
    const smallProjectsGrid = document.getElementById('small-projects-grid');
    const largeProjectsPagination = document.getElementById('large-projects-pagination');
    const smallProjectsPagination = document.getElementById('small-projects-pagination');
    const largeProjectsFilterContainer = document.querySelector('#large-projects-filter');
    const smallProjectsFilterContainer = document.querySelector('#small-projects-filter');
    const skillsGridContainer = document.getElementById('skills-grid-container');


    const modal = document.getElementById('project-modal');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalProjectImage = document.getElementById('modal-project-image');
    const modalCodeLanguageTabs = document.getElementById('code-language-tabs');
    const modalProjectCode = document.getElementById('modal-project-code');
    const lineNumbersContainer = document.getElementById('line-numbers-container');
    const codeDisplayArea = modalProjectCode.closest('.code-display-area');
    const copyCodeButton = document.getElementById('copy-code-button');
    const copyCodeButtonText = copyCodeButton.querySelector('.copy-text');
    const closeModalButton = modal.querySelector('.close-button');
    const fullscreenCodeButton = document.getElementById('fullscreen-code-button');

    const fullscreenModal = document.getElementById('fullscreen-image-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeFullscreenButton = fullscreenModal.querySelector('.close-fullscreen-button');

    const fullscreenCodeModal = document.getElementById('fullscreen-code-modal');
    const fullscreenCodeTabs = document.getElementById('code-language-tabs-fullscreen');
    const fullscreenCodeElement = document.getElementById('fullscreen-project-code');
    const fullscreenCodeLineNumbers = document.getElementById('line-numbers-container-fullscreen');
    const fullscreenCodeDisplayArea = fullscreenCodeElement.closest('.code-display-area-fullscreen'); 
    const copyCodeButtonFullscreen = document.getElementById('copy-code-button-fullscreen');
    const copyCodeButtonFullscreenText = copyCodeButtonFullscreen.querySelector('.copy-text');
    const closeFullscreenCodeButton = fullscreenCodeModal.querySelector('.close-fullscreen-code-button');


    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = mobileSidebar.querySelectorAll('.sidebar-link');

    const cursorGlow = document.getElementById('cursor-glow');
    const clickEffectContainer = document.getElementById('click-effect-container');
    const currentYearSpan = document.getElementById('current-year');
    const currentYearSidebar = document.querySelector('.current-year-sidebar');

    let currentLargeProjects = [];
    let currentSmallProjects = [];
    let currentPageLarge = 1;
    let currentPageSmall = 1;
    let activeLargeFilters = [];
    let activeSmallFilters = [];
    let currentModalProject = null;
    let isModalOpen = false;
    let isFullscreenModalOpen = false;
    let isFullscreenCodeModalOpen = false;
    let currentCodeLanguageInModal = '';


    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles-config.json', () => {
            // console.log('Cosmic dust initialized.');
        });
    } else {
        console.error('Particles.js library not found.');
    }

     if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            });
        }, { passive: true });
     }

    if (clickEffectContainer) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('button, a, input, textarea, .project-card, .skill-orb, .modal, .mobile-sidebar')) {
                return;
            }

            const particleCount = Math.floor(Math.random() * 6) + 10;
            const angleIncrement = (Math.PI * 2) / particleCount;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('span');
                particle.className = 'click-particle';
                clickEffectContainer.appendChild(particle);

                const particleSize = Math.random() * 3 + 2.5;
                const travelDistance = Math.random() * 40 + 50;
                const angle = (i * angleIncrement) + (Math.random() * angleIncrement * 0.5 - angleIncrement * 0.25);
                const translateX = Math.cos(angle) * travelDistance;
                const translateY = Math.sin(angle) * travelDistance;
                const initialOffsetX = (Math.random() - 0.5) * 8;
                const initialOffsetY = (Math.random() - 0.5) * 8;

                particle.style.width = `${particleSize}px`;
                particle.style.height = `${particleSize}px`;
                particle.style.left = `${e.clientX - particleSize / 2 + initialOffsetX}px`;
                particle.style.top = `${e.clientY - particleSize / 2 + initialOffsetY}px`;
                particle.style.setProperty('--tx', `${translateX}px`);
                particle.style.setProperty('--ty', `${translateY}px`);

                particle.addEventListener('animationend', () => {
                    if (particle.parentElement) {
                        particle.remove();
                    }
                });
            }
        });
    }

    const year = new Date().getFullYear();
    if (currentYearSpan) currentYearSpan.textContent = year;
    if (currentYearSidebar) currentYearSidebar.textContent = year;


    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card anim-on-scroll';
        card.style.setProperty('--card-index', index);

        const languagesHtml = project.languagesUsed.map(lang => {
            let iconClass = 'fas fa-code';
            const lowerLang = lang.toLowerCase();
            if (lowerLang.includes('javascript') || lowerLang === 'js') iconClass = 'fab fa-js-square';
            else if (lowerLang.includes('react')) iconClass = 'fab fa-react';
            else if (lowerLang.includes('node')) iconClass = 'fab fa-node-js';
            else if (lowerLang.includes('css')) iconClass = 'fab fa-css3-alt';
            else if (lowerLang.includes('html')) iconClass = 'fab fa-html5';
            else if (lowerLang.includes('python')) iconClass = 'fab fa-python';
            else if (lowerLang.includes('php')) iconClass = 'fab fa-php';
            else if (lowerLang.includes('java')) iconClass = 'fab fa-java';
            else if (lowerLang.includes('angular')) iconClass = 'fab fa-angular';
            else if (lowerLang.includes('vue')) iconClass = 'fab fa-vuejs';
            else if (lowerLang.includes('canvas')) iconClass = 'fas fa-palette';
            else if (lowerLang.includes('api')) iconClass = 'fas fa-cogs';
            else if (lowerLang.includes('typescript')) iconClass = 'fas fa-code'; 
            else if (lowerLang.includes('d3.js') || lowerLang.includes('d3')) iconClass = 'fas fa-chart-bar';
            else if (lowerLang.includes('mongodb')) iconClass = 'fas fa-database';
            else if (lowerLang.includes('storybook')) iconClass = 'fas fa-book-open';
            return `<div class="tech-tag" title="${lang}"><i class="${iconClass}"></i> ${lang}</div>`;
        }).join('');

        card.innerHTML = `
            <div class="project-image-wrapper">
                <img src="${project.imageUrl}" alt="${project.name}" loading="lazy">
                <div class="project-image-overlay"></div>
            </div>
            <div class="project-card-content">
                <h4>${project.name}</h4>
                <p class="project-description">${project.description.substring(0, 90)}${project.description.length > 90 ? '...' : ''}</p>
                <div class="project-languages">
                     ${languagesHtml || `<div class="tech-tag">${project.languagesUsed.join(', ')}</div>`}
                 </div>
                <button class="btn show-details-btn" aria-label="عرض تفاصيل ${project.name}">
                    استكشف المشروع <i class="fas fa-arrow-left"></i>
                </button>
            </div>
        `;
        card.querySelector('.show-details-btn').addEventListener('click', () => openProjectModal(project));
        return card;
    }

    function displayProjects(projects, gridElement) {
        gridElement.classList.add('fade-out-grid');
        setTimeout(() => {
            gridElement.innerHTML = '';
            if (projects.length === 0) {
                gridElement.innerHTML = '<p class="no-projects-message"><i class="fas fa-ghost"></i> لا توجد نتائج تطابق بحثك في هذا الكون.</p>';
            } else {
                projects.forEach((project, index) => {
                    const card = createProjectCard(project, index);
                    gridElement.appendChild(card);
                    animationObserver.observe(card);
                });
            }
            gridElement.classList.remove('fade-out-grid');
        }, 300);
    }

    function setupPagination(totalItems, itemsPerPage, paginationElement, projectType, onPageChange) {
        paginationElement.innerHTML = '';
        const paginationContainer = paginationElement.closest('.pagination-container');
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        if (pageCount <= 1) {
             if(paginationContainer) paginationContainer.style.display = 'none';
             return;
        };
        if(paginationContainer) paginationContainer.style.display = 'flex';

        const currentPage = projectType === 'large' ? currentPageLarge : currentPageSmall;

        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-angle-double-right"></i>';
        prevButton.disabled = currentPage === 1;
        prevButton.setAttribute('aria-label', 'الصفحة السابقة');
        prevButton.addEventListener('click', () => {
            const newPage = projectType === 'large' ? currentPageLarge - 1 : currentPageSmall - 1;
            if (newPage >= 1) onPageChange(newPage);
        });
        paginationElement.appendChild(prevButton);

        for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.setAttribute('aria-label', `صفحة ${i}`);
            if (i === currentPage) {
                pageButton.classList.add('active');
                pageButton.setAttribute('aria-current', 'page');
            }
            pageButton.addEventListener('click', () => onPageChange(i));
            paginationElement.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fas fa-angle-double-left"></i>';
        nextButton.disabled = currentPage === pageCount;
        nextButton.setAttribute('aria-label', 'الصفحة التالية');
        nextButton.addEventListener('click', () => {
            const newPage = projectType === 'large' ? currentPageLarge + 1 : currentPageSmall + 1;
             if (newPage <= pageCount) onPageChange(newPage);
        });
        paginationElement.appendChild(nextButton);
    }

    function renderPaginatedProjects(projectType) {
        const projectsToPaginate = projectType === 'large' ? currentLargeProjects : currentSmallProjects;
        const currentPage = projectType === 'large' ? currentPageLarge : currentPageSmall;
        const gridElement = projectType === 'large' ? largeProjectsGrid : smallProjectsGrid;
        const paginationElement = projectType === 'large' ? largeProjectsPagination : smallProjectsPagination;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = projectsToPaginate.slice(startIndex, endIndex);

        displayProjects(paginatedItems, gridElement);
        setupPagination(projectsToPaginate.length, ITEMS_PER_PAGE, paginationElement, projectType, (page) => {
            if (projectType === 'large') currentPageLarge = page;
            else currentPageSmall = page;
            renderPaginatedProjects(projectType);
            const sectionElement = document.getElementById(`${projectType}-projects-section`);
            if (sectionElement) {
                 const headerOffset = header.offsetHeight + 20;
                 const elementPosition = sectionElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                 window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    }

    function populateFilterOptions(projects, filterContainer, projectType, onFilterChange) {
        if (!filterContainer) return;
        const allLangs = new Set();
        const sourceProjects = allProjects.filter(p => p.type === projectType);
        sourceProjects.forEach(p => p.languagesUsed.forEach(lang => allLangs.add(lang)));

        const buttons = filterContainer.querySelectorAll('button.filter-btn');
        buttons.forEach(btn => btn.remove());

        if (allLangs.size === 0) return;

        allLangs.forEach(lang => {
            const button = document.createElement('button');
            button.classList.add('filter-btn');
            button.textContent = lang;
            button.dataset.lang = lang;
            const activeFilters = projectType === 'large' ? activeLargeFilters : activeSmallFilters;
            if (activeFilters.includes(lang)) {
                 button.classList.add('active');
            }
            button.addEventListener('click', () => {
                button.classList.toggle('active');
                updateActiveFilters(projectType);
                onFilterChange();
            });
            filterContainer.appendChild(button);
        });
    }

    function updateActiveFilters(projectType) {
        const filterContainer = projectType === 'large' ? largeProjectsFilterContainer : smallProjectsFilterContainer;
         if (!filterContainer) return;
        const activeButtons = filterContainer.querySelectorAll('button.filter-btn.active');
        const newActiveFilters = Array.from(activeButtons).map(btn => btn.dataset.lang);

        if (projectType === 'large') activeLargeFilters = newActiveFilters;
        else activeSmallFilters = newActiveFilters;
    }

    function filterProjects(projectType) {
        const baseProjects = allProjects.filter(p => p.type === projectType);
        const activeFilters = projectType === 'large' ? activeLargeFilters : activeSmallFilters;
        let filteredProjects;

        if (activeFilters.length === 0) {
            filteredProjects = baseProjects;
        } else {
            filteredProjects = baseProjects.filter(project =>
                activeFilters.every(filterLang => project.languagesUsed.includes(filterLang))
            );
        }

        if (projectType === 'large') {
            currentLargeProjects = filteredProjects;
            currentPageLarge = 1;
        } else {
            currentSmallProjects = filteredProjects;
            currentPageSmall = 1;
        }
        renderPaginatedProjects(projectType);
    }

    function addLineNumbers(codeElement, lineNumContainer) {
        if (!codeElement || !lineNumContainer) return;
        const codeText = codeElement.textContent || '';
        let lineCount = codeText.split('\n').length;
        if (codeText.endsWith('\n') && codeText.length > 0 && lineCount > 1) {
            lineCount -=1;
        }
        if(codeText.trim() === '' && lineCount > 0) lineCount = 1;

        lineNumContainer.innerHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            lineNumContainer.appendChild(span);
        }
    }

    function syncScroll(sourceScrollElement, targetScrollElement) {
        if (sourceScrollElement && targetScrollElement) {
            targetScrollElement.scrollTop = sourceScrollElement.scrollTop;
        }
    }

    if (codeDisplayArea) {
        codeDisplayArea.addEventListener('scroll', () => syncScroll(codeDisplayArea, lineNumbersContainer));
    }
    if (fullscreenCodeDisplayArea) { 
        fullscreenCodeDisplayArea.addEventListener('scroll', () => syncScroll(fullscreenCodeDisplayArea, fullscreenCodeLineNumbers));
    }


    function openProjectModal(project) {
        if (isModalOpen) return;
        isModalOpen = true;
        currentModalProject = project;

        modalProjectTitle.textContent = project.name;
        modalProjectDescription.innerHTML = project.description;
        modalProjectImage.src = project.detailsImageUrl || project.imageUrl;
        modalProjectImage.alt = project.name;

        modalCodeLanguageTabs.innerHTML = '';
        modalProjectCode.textContent = '';
        if (lineNumbersContainer) lineNumbersContainer.innerHTML = '';

        const languages = Object.keys(project.codeSnippets || {});
        const codeActionsDiv = fullscreenCodeButton.closest('.code-actions');

        if (languages.length > 0 && project.codeSnippets[languages[0]]) {
            if(codeActionsDiv) codeActionsDiv.style.display = 'flex';
            copyCodeButton.style.display = 'flex';
            if (fullscreenCodeButton) fullscreenCodeButton.style.display = 'flex';

            languages.forEach((lang, index) => {
                const tabButton = document.createElement('button');
                tabButton.textContent = lang;
                tabButton.addEventListener('click', (e) => switchCodeLanguage(lang, e.currentTarget));
                modalCodeLanguageTabs.appendChild(tabButton);
                if (index === 0) {
                    currentCodeLanguageInModal = lang; 
                    requestAnimationFrame(() => {
                        if(isModalOpen && currentModalProject === project && modalCodeLanguageTabs.firstChild) {
                           switchCodeLanguage(lang, modalCodeLanguageTabs.firstChild.nodeName === 'BUTTON' ? modalCodeLanguageTabs.firstChild : tabButton);
                        }
                    });
                }
            });
        } else {
             modalProjectCode.textContent = 'لا يوجد كود متاح لهذا المشروع.\n';
             modalProjectCode.className = 'hljs';
             delete modalProjectCode.dataset.highlighted;
             if (typeof hljs !== 'undefined') {
                hljs.highlightElement(modalProjectCode);
             }
             if (lineNumbersContainer) addLineNumbers(modalProjectCode, lineNumbersContainer);
             if(codeActionsDiv) codeActionsDiv.style.display = 'none';
             copyCodeButton.style.display = 'none';
             if (fullscreenCodeButton) fullscreenCodeButton.style.display = 'none';
        }

        modal.style.display = 'block';
        body.classList.add('modal-open');
        modal.scrollTop = 0;
        if (codeDisplayArea) codeDisplayArea.scrollTop = 0;
        if (lineNumbersContainer) lineNumbersContainer.scrollTop = 0;
        trapFocus(modal);
    }

    function closeModal() {
        if (!isModalOpen) return;
        isModalOpen = false;
        modal.classList.add('closing');
        modal.addEventListener('animationend', () => {
            modal.style.display = 'none';
            modal.classList.remove('closing');
            if (!isFullscreenModalOpen && !isFullscreenCodeModalOpen) {
                body.classList.remove('modal-open');
            }
            currentModalProject = null;
            modalProjectCode.textContent = '';
            if (lineNumbersContainer) lineNumbersContainer.innerHTML = '';
            currentCodeLanguageInModal = '';
        }, { once: true });
    }
    
    function _switchCodeLanguageSharedLogic(language, activeButton, targetCodeElement, targetLineNumbersContainer, targetCodeDisplayArea, project, tabsContainer) {
        if (!project || !project.codeSnippets) {
            targetCodeElement.textContent = 'لا توجد مقتطفات كود لهذا المشروع.\n';
            targetCodeElement.className = 'hljs';
            delete targetCodeElement.dataset.highlighted;
            if (typeof hljs !== 'undefined') hljs.highlightElement(targetCodeElement);
            if (targetLineNumbersContainer) addLineNumbers(targetCodeElement, targetLineNumbersContainer);
            return;
        }
        
        const codeSnippet = project.codeSnippets[language];
    
        if (tabsContainer) {
            tabsContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            if(activeButton) activeButton.classList.add('active');
        }
        
        targetCodeElement.textContent = codeSnippet || `الكود غير متوفر للغة ${language}.\n`;
        targetCodeElement.className = 'hljs'; 
        delete targetCodeElement.dataset.highlighted; 
    
        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(targetCodeElement);
        }
    
        if (targetLineNumbersContainer) addLineNumbers(targetCodeElement, targetLineNumbersContainer);
        if (targetCodeDisplayArea) targetCodeDisplayArea.scrollTop = 0;
        if (targetLineNumbersContainer) targetLineNumbersContainer.scrollTop = 0;
    
        const associatedCopyButton = targetCodeElement.id.includes('fullscreen') ? copyCodeButtonFullscreen : copyCodeButton;
        const associatedCopyButtonTextElement = targetCodeElement.id.includes('fullscreen') ? copyCodeButtonFullscreenText : copyCodeButtonText;
        
        if (associatedCopyButton) {
            associatedCopyButton.classList.remove('copied');
            if (associatedCopyButtonTextElement) associatedCopyButtonTextElement.textContent = associatedCopyButton.id.includes('fullscreen') ? 'نسخ الكود' : 'نسخ';
            const iconElement = associatedCopyButton.querySelector('i');
            if (iconElement) iconElement.className = 'fas fa-copy';
             if (!targetCodeElement.id.includes('fullscreen')) associatedCopyButton.setAttribute('aria-live', 'polite');
        }
    }


    function switchCodeLanguage(language, activeButton) {
        currentCodeLanguageInModal = language; 
        _switchCodeLanguageSharedLogic(language, activeButton, modalProjectCode, lineNumbersContainer, codeDisplayArea, currentModalProject, modalCodeLanguageTabs);
    }


    copyCodeButton.addEventListener('click', () => {
        const codeToCopy = modalProjectCode.textContent;
        if (codeToCopy && !codeToCopy.startsWith('لا يوجد كود') && !codeToCopy.startsWith('الكود غير متوفر')) {
            navigator.clipboard.writeText(codeToCopy)
                .then(() => {
                    copyCodeButton.classList.add('copied');
                    if(copyCodeButtonText) copyCodeButtonText.textContent = 'تم النسخ!';
                    copyCodeButton.querySelector('i').className = 'fas fa-check-circle';
                    copyCodeButton.setAttribute('aria-live', 'assertive');
                    setTimeout(() => {
                         copyCodeButton.classList.remove('copied');
                         if(copyCodeButtonText) copyCodeButtonText.textContent = 'نسخ';
                         copyCodeButton.querySelector('i').className = 'fas fa-copy';
                         copyCodeButton.setAttribute('aria-live', 'polite');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy code: ', err);
                    if(copyCodeButtonText) copyCodeButtonText.textContent = 'خطأ';
                     copyCodeButton.querySelector('i').className = 'fas fa-times-circle';
                });
        }
    });

    modalProjectImage.closest('.interactive-image')?.addEventListener('click', () => {
         if (!isModalOpen || !modalProjectImage.src) return;
         isFullscreenModalOpen = true;
         fullscreenImage.src = modalProjectImage.src;
         fullscreenModal.style.display = 'flex';
         body.classList.add('modal-open');
         trapFocus(fullscreenModal);
    });

    function closeFullscreenModal() {
         if (!isFullscreenModalOpen) return;
         isFullscreenModalOpen = false;
         fullscreenModal.classList.add('closing');
         fullscreenModal.addEventListener('animationend', () => {
             fullscreenModal.style.display = 'none';
             fullscreenModal.classList.remove('closing');
             if (!isModalOpen && !isFullscreenCodeModalOpen) {
                body.classList.remove('modal-open');
             }
             if (isModalOpen && modal) {
                  const imageContainer = modalProjectImage.closest('.interactive-image');
                  if (imageContainer) imageContainer.focus();
                  else modal.focus(); 
             } else if (document.activeElement === fullscreenModal || fullscreenModal.contains(document.activeElement)) {
                document.body.focus();
             }
         }, { once: true });
    }

    function openFullscreenCodeModal() {
        if (!currentModalProject || isFullscreenCodeModalOpen) return;
        isFullscreenCodeModalOpen = true;

        fullscreenCodeTabs.innerHTML = ''; 

        const languages = Object.keys(currentModalProject.codeSnippets || {});
        let firstLangButtonToActivate = null;
        let languageToActivate = currentCodeLanguageInModal || (languages.length > 0 ? languages[0] : null);


        languages.forEach((lang) => {
            const tabButton = document.createElement('button');
            tabButton.textContent = lang;
            tabButton.addEventListener('click', (e) => switchCodeLanguageFullscreen(lang, e.currentTarget));
            fullscreenCodeTabs.appendChild(tabButton);
            if (lang === languageToActivate) {
                firstLangButtonToActivate = tabButton;
            }
        });
        
        fullscreenCodeModal.style.display = 'flex';
        body.classList.add('modal-open');
        
        if (languageToActivate && firstLangButtonToActivate) {
            requestAnimationFrame(() => { 
                 if (isFullscreenCodeModalOpen) {
                    switchCodeLanguageFullscreen(languageToActivate, firstLangButtonToActivate);
                 }
            });
        } else { 
            fullscreenCodeElement.textContent = 'لا يوجد كود متاح لهذا المشروع.\n';
            fullscreenCodeElement.className = 'hljs';
            delete fullscreenCodeElement.dataset.highlighted;
            if (typeof hljs !== 'undefined') hljs.highlightElement(fullscreenCodeElement);
            if (fullscreenCodeLineNumbers) addLineNumbers(fullscreenCodeElement, fullscreenCodeLineNumbers);
        }
        
        trapFocus(fullscreenCodeModal);
        if (fullscreenCodeDisplayArea) fullscreenCodeDisplayArea.scrollTop = 0;
        if (fullscreenCodeLineNumbers) fullscreenCodeLineNumbers.scrollTop = 0;
    }

    function closeFullscreenCodeModal() {
        if (!isFullscreenCodeModalOpen) return;
        isFullscreenCodeModalOpen = false;
        fullscreenCodeModal.classList.add('closing');
        fullscreenCodeModal.addEventListener('animationend', () => {
            fullscreenCodeModal.style.display = 'none';
            fullscreenCodeModal.classList.remove('closing');
            if (!isModalOpen && !isFullscreenModalOpen) {
                body.classList.remove('modal-open');
            }
            if (isModalOpen && modal && fullscreenCodeButton) {
                fullscreenCodeButton.focus();
            } else if (document.activeElement === fullscreenCodeModal || fullscreenCodeModal.contains(document.activeElement)) {
                 document.body.focus(); 
            }
        }, { once: true });
    }

    function switchCodeLanguageFullscreen(language, activeButton) {
        _switchCodeLanguageSharedLogic(language, activeButton, fullscreenCodeElement, fullscreenCodeLineNumbers, fullscreenCodeDisplayArea, currentModalProject, fullscreenCodeTabs);
    }


    if (fullscreenCodeButton) {
        fullscreenCodeButton.addEventListener('click', openFullscreenCodeModal);
    }
    if (closeFullscreenCodeButton) {
        closeFullscreenCodeButton.addEventListener('click', closeFullscreenCodeModal);
    }

    if (copyCodeButtonFullscreen) {
        copyCodeButtonFullscreen.addEventListener('click', () => {
            const codeToCopy = fullscreenCodeElement.textContent;
            if (codeToCopy && !codeToCopy.startsWith('لا يوجد كود') && !codeToCopy.startsWith('الكود غير متوفر')) {
                navigator.clipboard.writeText(codeToCopy)
                    .then(() => {
                        copyCodeButtonFullscreen.classList.add('copied');
                        if(copyCodeButtonFullscreenText) copyCodeButtonFullscreenText.textContent = 'تم النسخ!';
                        copyCodeButtonFullscreen.querySelector('i').className = 'fas fa-check-circle';
                        setTimeout(() => {
                             copyCodeButtonFullscreen.classList.remove('copied');
                             if(copyCodeButtonFullscreenText) copyCodeButtonFullscreenText.textContent = 'نسخ الكود';
                             copyCodeButtonFullscreen.querySelector('i').className = 'fas fa-copy';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy fullscreen code: ', err);
                        if(copyCodeButtonFullscreenText) copyCodeButtonFullscreenText.textContent = 'خطأ';
                        copyCodeButtonFullscreen.querySelector('i').className = 'fas fa-times-circle';
                    });
            }
        });
    }


    closeModalButton.addEventListener('click', closeModal);
    closeFullscreenButton.addEventListener('click', closeFullscreenModal);

    window.addEventListener('click', (event) => {
        if (isFullscreenCodeModalOpen && event.target === fullscreenCodeModal) closeFullscreenCodeModal();
        else if (isFullscreenModalOpen && event.target === fullscreenModal) closeFullscreenModal();
        else if (isModalOpen && event.target === modal) closeModal();
        
        if (mobileSidebar.classList.contains('active') && event.target === sidebarOverlay) closeSidebar();
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (isFullscreenCodeModalOpen) closeFullscreenCodeModal();
            else if (isFullscreenModalOpen) closeFullscreenModal();
            else if (isModalOpen) closeModal();
            else if (mobileSidebar.classList.contains('active')) closeSidebar();
        }
    });

    function openSidebar() {
        if (mobileSidebar.classList.contains('active')) return;
        body.classList.add('sidebar-open-transition');
        mobileSidebar.style.display = 'flex';
        requestAnimationFrame(() => {
            mobileSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
        });
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileSidebar.setAttribute('aria-hidden', 'false');
        body.classList.add('sidebar-open');
        trapFocus(mobileSidebar);
    }

    function closeSidebar() {
        if (!mobileSidebar.classList.contains('active')) return;
        mobileMenuToggle.classList.remove('active');
        mobileSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileSidebar.setAttribute('aria-hidden', 'true');

        let sidebarClosed = false;
        const onSidebarTransitionEnd = (event) => {
            if (event.target === mobileSidebar && (event.propertyName === 'transform' || event.propertyName === 'opacity')) {
                if (sidebarClosed) return;
                sidebarClosed = true;
                
                body.classList.remove('sidebar-open');
                body.classList.remove('sidebar-open-transition');
                mobileSidebar.style.display = 'none';
            }
        };
        mobileSidebar.addEventListener('transitionend', onSidebarTransitionEnd);
        
        setTimeout(() => {
            if (!mobileSidebar.classList.contains('active') && !sidebarClosed) {
                if (mobileSidebar.style.display !== 'none') { 
                    body.classList.remove('sidebar-open');
                    body.classList.remove('sidebar-open-transition');
                    mobileSidebar.style.display = 'none';
                }
            }
        }, 500); 


        if(document.activeElement === mobileSidebar || mobileSidebar.contains(document.activeElement)) {
            mobileMenuToggle.focus();
        }
    }


    mobileMenuToggle.addEventListener('click', () => {
        if (mobileSidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
    closeSidebarBtn.addEventListener('click', closeSidebar);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetHref = link.getAttribute('href');
            document.querySelectorAll('.desktop-nav .nav-link').forEach(navLink => {
                 navLink.classList.toggle('active', navLink.getAttribute('href') === targetHref);
            });
            if (mobileSidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
    });

    const intersectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, intersectionObserverOptions);


    function handleScroll() {
        const scrollY = window.pageYOffset;
        const isScrolled = scrollY > 30;
        body.classList.toggle('scrolled', isScrolled);

        if (header) {
            if (isScrolled) {
                header.classList.remove('floating-header-initial');
            } else {
                header.classList.add('floating-header-initial');
            }
        }

        let currentSectionId = 'hero';
        const sections = document.querySelectorAll(
            '#hero[id], main#projects[id], #skills-galaxy[id], #contact[id]'
        );

        let headerHeightOffset = header ? header.offsetHeight : 65; 
        if (header && body.classList.contains('scrolled')) { 
             headerHeightOffset += 10;
        } else if (header) { 
            headerHeightOffset += (parseInt(getComputedStyle(header).getPropertyValue('--header-top-margin'), 10) || 0) + 10;
        }
        headerHeightOffset += 20; 

        sections.forEach(section => {
            if (section) {
                const sectionTop = section.offsetTop - headerHeightOffset;
                if (scrollY >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });

        document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 50);
    }, { passive: true });
    if(header) header.classList.add('floating-header-initial');


    function trapFocus(element) {
         const focusableEls = element.querySelectorAll(
             'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
         );
         if (focusableEls.length === 0) return;
         const firstFocusableEl = focusableEls[0];
         const lastFocusableEl = focusableEls[focusableEls.length - 1];

         setTimeout(() => {
            if (element.style.display !== 'none' && element.contains(document.activeElement) && document.activeElement !== firstFocusableEl) {
            } else if (element.style.display !== 'none' && firstFocusableEl && typeof firstFocusableEl.focus === 'function') {
                 firstFocusableEl.focus();
            }
         }, 100);


         element.addEventListener('keydown', function(e) {
             const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
             if (!isTabPressed) return;

             if (e.shiftKey) {
                 if (document.activeElement === firstFocusableEl) {
                     lastFocusableEl.focus();
                     e.preventDefault();
                 }
             } else {
                 if (document.activeElement === lastFocusableEl) {
                     firstFocusableEl.focus();
                     e.preventDefault();
                 }
             }
         });
    }

    function populateSkillsGalaxy() {
        if (!skillsGridContainer) return;
        skillsData.forEach((skill, index) => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-orb anim-on-scroll';
            skillElement.style.setProperty('--skill-index', index);
            skillElement.style.setProperty('--skill-color', skill.color || 'var(--deep-purple-accent)');

            skillElement.innerHTML = `
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level-bar-container">
                    <div class="skill-level-bar" style="width: ${skill.level || 0}%;"></div>
                </div>
            `;
            skillsGridContainer.appendChild(skillElement);
            animationObserver.observe(skillElement);
        });
    }
    
    // Accordion Animation for Project Filters
    function setupAccordionAnimations() {
        document.querySelectorAll('.mobile-filter-accordion').forEach(detailsElement => {
            const summaryElement = detailsElement.querySelector('summary');
            const contentElement = detailsElement.querySelector('.filter-container');

            if (!summaryElement || !contentElement) return;

            // Set initial state based on 'open' attribute
            if (detailsElement.hasAttribute('open')) {
                contentElement.style.maxHeight = contentElement.scrollHeight + "px";
                contentElement.style.paddingTop = "20px"; // Ensure padding is restored if initially open
                contentElement.style.paddingBottom = "30px";
            } else {
                contentElement.style.maxHeight = '0px';
                contentElement.style.paddingTop = "0";
                contentElement.style.paddingBottom = "0";
            }
            
            detailsElement.addEventListener('toggle', () => {
                if (detailsElement.open) {
                    contentElement.style.maxHeight = contentElement.scrollHeight + "px";
                    contentElement.style.paddingTop = "20px";
                    contentElement.style.paddingBottom = "30px";
                } else {
                    contentElement.style.maxHeight = '0px';
                    contentElement.style.paddingTop = "0";
                    contentElement.style.paddingBottom = "0";
                }
            });
        });
    }


    function init() {
         currentLargeProjects = allProjects.filter(p => p.type === 'large');
         currentSmallProjects = allProjects.filter(p => p.type === 'small');

        if (largeProjectsFilterContainer) {
            populateFilterOptions(currentLargeProjects, largeProjectsFilterContainer, 'large', () => filterProjects('large'));
        }
        if (smallProjectsFilterContainer) {
            populateFilterOptions(currentSmallProjects, smallProjectsFilterContainer, 'small', () => filterProjects('small'));
        }

        populateSkillsGalaxy();
        renderPaginatedProjects('large');
        renderPaginatedProjects('small');
        setupAccordionAnimations(); // Initialize accordion animations

        document.querySelectorAll('.anim-on-scroll').forEach(el => {
            animationObserver.observe(el);
        });

        handleScroll(); 

        if (modal) modal.style.display = 'none';
        if (fullscreenModal) fullscreenModal.style.display = 'none';
        if (fullscreenCodeModal) fullscreenCodeModal.style.display = 'none';
        isModalOpen = false;
        isFullscreenModalOpen = false;
        isFullscreenCodeModalOpen = false;

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId.length > 1 && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();

                        if (mobileSidebar.contains(this) && mobileSidebar.classList.contains('active')) {
                            closeSidebar();
                        }
                        
                        let headerOffset = header ? header.offsetHeight : 65;
                        if (header && !body.classList.contains('scrolled')) {
                           headerOffset += parseInt(getComputedStyle(header).getPropertyValue('--header-top-margin'), 10) || 0;
                        }
                        headerOffset += 25; 

                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                         setTimeout(() => {
                             targetElement.setAttribute('tabindex', '-1'); 
                             targetElement.focus({ preventScroll: true }); 
                         }, 700); 
                    }
                }
            });
        });

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL' && label.classList.contains('form-label-float')) {
                    input.addEventListener('focus', () => label.classList.add('active'));
                    input.addEventListener('blur', () => {
                        if (input.value === '') {
                            label.classList.remove('active');
                        }
                    });
                    if (input.value !== '') {
                        label.classList.add('active');
                    }
                }
            });

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const buttonText = submitButton.querySelector('.btn-text');
                const buttonIcon = submitButton.querySelector('.btn-icon-send i');

                submitButton.disabled = true;
                submitButton.classList.add('submitting');
                if (buttonText) buttonText.textContent = 'جاري الإرسال...';
                if (buttonIcon) buttonIcon.className = 'fas fa-spinner fa-spin';

                setTimeout(() => {
                    alert('تم إرسال إشارتك بنجاح عبر الفضاء!'); 
                    contactForm.reset();
                    contactForm.querySelectorAll('.form-label-float.active').forEach(label => label.classList.remove('active'));

                    submitButton.disabled = false;
                    submitButton.classList.remove('submitting');
                    if (buttonText) buttonText.textContent = 'أرسل الإشارة الكونية';
                    if (buttonIcon) buttonIcon.className = 'fas fa-space-shuttle';
                }, 2000);
            });
        }
        console.log("NexForia Portfolio - Cosmic Genesis Initialized!");
    }

    function showWelcomeMessageAndProceed() {
        if (welcomeOverlay) {
            welcomeOverlay.style.display = 'flex';
            setTimeout(() => {
                welcomeOverlay.classList.add('visible');
            }, 50); // Short delay to ensure display:flex is applied

            setTimeout(() => {
                welcomeOverlay.classList.remove('visible');
                welcomeOverlay.addEventListener('transitionend', () => {
                    welcomeOverlay.style.display = 'none';
                    // Start hero animations after welcome message fades out
                    const heroTitle = document.querySelector('.hero-title-animated');
                    const heroSubtitle = document.querySelector('.hero-subtitle-animated');
                    const heroCta = document.querySelector('.hero-cta-animated');
                    if (heroTitle) setTimeout(() => heroTitle.classList.add('animate-in'), 0);
                    if (heroSubtitle) setTimeout(() => heroSubtitle.classList.add('animate-in'), 200);
                    if (heroCta) setTimeout(() => heroCta.classList.add('animate-in'), 400);
                    if (heroDynamicSubtitle) setInterval(changeHeroSubtitle, 7000); // Start dynamic subtitle change

                }, { once: true });
            }, 2500); // Welcome message display duration
        } else { // Fallback if welcome overlay is not present
            const heroTitle = document.querySelector('.hero-title-animated');
            const heroSubtitle = document.querySelector('.hero-subtitle-animated');
            const heroCta = document.querySelector('.hero-cta-animated');
            if (heroTitle) setTimeout(() => heroTitle.classList.add('animate-in'), 0);
            if (heroSubtitle) setTimeout(() => heroSubtitle.classList.add('animate-in'), 200);
            if (heroCta) setTimeout(() => heroCta.classList.add('animate-in'), 400);
            if (heroDynamicSubtitle) setInterval(changeHeroSubtitle, 7000);
        }
    }


    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('loaded');
            preloader.addEventListener('transitionend', (event) => {
                if (event.propertyName === 'opacity' && parseFloat(window.getComputedStyle(preloader).opacity) === 0) {
                    if (preloader.parentElement) preloader.remove();
                    showWelcomeMessageAndProceed(); // Show welcome message after preloader is fully gone
                }
            }, { once: true });
             // Fallback if transitionend doesn't fire reliably
            setTimeout(() => {
                if (preloader && preloader.parentElement && parseFloat(window.getComputedStyle(preloader).opacity) < 0.1) {
                     if (preloader.parentElement) preloader.remove();
                     showWelcomeMessageAndProceed();
                }
            }, 1200); // A bit longer than preloader opacity transition
        } else {
             showWelcomeMessageAndProceed(); // If no preloader, go straight to welcome/hero
        }
    }

    window.addEventListener('load', () => {
        let minPreloadTime = 1500; // Slightly increased for more preloader visibility
        const loadStartTime = performance.now();

        const checkParticlesAndInit = (callback) => {
            if ( (typeof particlesJS !== 'undefined' && window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS && window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array.length > 0) || typeof particlesJS === 'undefined' ) {
                callback();
            } else {
                setTimeout(() => checkParticlesAndInit(callback), 100);
            }
        };

        checkParticlesAndInit(() => {
            init(); 
            const timeElapsed = performance.now() - loadStartTime;
            const remainingTime = Math.max(0, minPreloadTime - timeElapsed);
            
            setTimeout(hidePreloader, remainingTime);
        });
    });

});