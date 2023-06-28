import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Ruta del archivo JSON de las credenciales
const keyPath = './credential.json';
const SCOPES = ['http://www.googleapis.com/auth/calendar'];
const auth = new JWT({
  keyFile: keyPath,
  scopes: SCOPES,
});

async function getEvents() {
  const calendar = google.calendar({ version: 'v3', auth });

  try {
    // Obtener eventos
    const response = await calendar.events.list({
      calendarId: 'primary', // ID del calendario principal
      timeMin: new Date().toISOString(), // Eventos a partir de la fecha actual
      maxResults: 10, // Número máximo de eventos a obtener
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;
    console.log('Eventos encontrados');
    if (events && events.length) {
      events.forEach((event, index) => {
        const start = event.start?.dateTime || event.start?.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No se encontraron eventos.');
    }
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
  }
}

getEvents();
