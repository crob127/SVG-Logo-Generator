 // Runs the application using imports from lib/
const fs = require('fs');
const inquirer = require('inquirer');
const {Circle, Triangle, Square} = require('./lib/shapes');

const questions = [
    {
        type: 'input',
        name: 'text',
        message: "Enter up to 3 characters for logo text",
        validate: input => input.length <= 3 || "Text must not be longer than 3 characters."
    },
    {
        type: 'input',
        name: 'textColor',
        message: "Enter the text color (hex code or color keyword)"
    },
    {
        type: 'list',
        name: 'shape',
        message: "Choose a shape:",
        choices: ["Circle", "Triangle", "Square"]
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: "Enter a shape color (hex code or color keyword)"
    }
];

inquirer.prompt(questions).then(answers => {
    const {text, textColor, shape, shapeColor} = answers;
    let shapeObject;

    switch (shape) {
        case 'Circle':
            shapeObject = new Circle(shapeColor);
            break;
        case 'Triangle':
            shapeObject = new Triangle(shapeColor);
            break;
        case 'Square':
            shapeObject = new Square(shapeColor);
            break;
    }

    const svgLogo = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shapeObject.render()}
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
        </svg>`;

        fs.writeFileSync('logo.svg', svgLogo.trim());
        console.log('Generated logo.svg successfully!')
});