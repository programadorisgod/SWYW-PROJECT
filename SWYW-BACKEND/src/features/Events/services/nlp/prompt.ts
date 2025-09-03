import type { eventDto } from '../../dto/event';

interface PromptProps {
    messageEvent: eventDto;
}

export const prompt = ({ messageEvent }: PromptProps) => `
Se te proporcionará un texto. A partir de ese texto debes extraer o generar los siguientes elementos:
1. "title": Un título breve y representativo del contenido.
2. "description": Una descripción clara del contenido del texto.
3. "participants": Nombres de las personas mencionadas en el texto, separados por comas.
4. "date": Una fecha en formtato timestamp.
 - Si en el texto se menciona una fecha relativa (ejemplo: "el martes a las 5pm"), deberás calcular la fecha exacta considerando la fecha actual: ${new Date().toISOString()}.
 - Si no se menciona una hora, asigna solo la fecha en formato timestamp.
 - Si no se menciona ninguna fecha, deja el valor vacío ("").
Debes responder ÚNICAMENTE con un objeto JSON válido, sin comentarios, sin comillas simples, sin saltos de línea innecesarios, y con este formato exacto:
No uses comillas simples, no uses markdown, no uses \`\`\`.
{"title": "<titulo>", "date": "<fecha>", "description": "<descripcion>", "participants": "nombre1, nombre2, nombre3"}
Texto: ${messageEvent.message}
`;
