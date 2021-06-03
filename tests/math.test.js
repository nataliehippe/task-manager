const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');


test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
});

test('Should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('Should convert 32 F to 0 C', () => {
    const temperature = fahrenheitToCelsius(32);
    expect(temperature).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
    const temperature = celsiusToFahrenheit(0);
    expect(temperature).toBe(32);
});

test('Should add two number', () => {
    add(4, 5).then((sum) => {
        expect(sum).toBe(9);
    });
});

test('Should add two number async/await', async () => {
    const sum = await add(34, 1);
    expect(sum).toBe(35);
});