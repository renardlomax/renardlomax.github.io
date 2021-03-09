const balls = document.getElementsByClassName('ball');
console.log(balls);

document.onmousemove = (event) => {
  for (let i = 0; i < balls.length; i++) {
    const x = (event.clientX * 100) / window.innerWidth + '%';
    const y = (event.clientY * 100) / window.innerHeight + '%';

    balls[i].style.left = x;
    balls[i].style.top = y;
    balls[i].transform = 'translate(-' + x + ',-' + y + ')';
  }
};
