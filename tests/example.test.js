import { Selector } from 'testcafe';

fixture `Mi Fixture`
    .page `http://localhost:3000`;  // Cambia la URL a la que deseas probar

test('Prueba simple', async t => {
    const element = Selector('#mi-elemento');  // Cambia el selector según tus necesidades

    await t
        .expect(element.exists).ok('El elemento no existe')
        .click(element);
});
