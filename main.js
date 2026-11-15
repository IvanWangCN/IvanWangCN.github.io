// 暗色模式切换
const toggleBtn = document.getElementById('toggleDark');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
});

// 读取本地存储的暗色模式
if(localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    toggleBtn.textContent = '☀️';
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    })
});
