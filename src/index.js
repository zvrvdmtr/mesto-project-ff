import './styles/index.css'; 

const avatarImage = new URL('./images/avatar.jpg', import.meta.url)
const logoImage = new URL('./images/logo.svg', import.meta.url)

const numbers = [2, 3, 5];

const some = [
    {image: avatarImage},
    {image: logoImage},
]

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10