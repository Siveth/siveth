import { Selector } from 'testcafe';

fixture `Mi Fixture`
    .page `http://localhost:3000/`; // Asegúrate de que la URL esté correctamente configurada.

test('Prueba simple', async t => {
    const element = Selector('#mi-elemento');

    // Espera un poco antes de verificar la existencia del elemento
    await t.wait(2000); // Espera 2 segundos. Ajusta según sea necesario.

    await t
        .expect(element.exists).ok('El elemento no existe')
        .click(element);
});
