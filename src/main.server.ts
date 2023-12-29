// main.server.ts
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { renderModule, renderModuleFactory } from '@angular/platform-server';
import { AppModule } from './app/app.module'; // Import your server module

enableProdMode();

export const bootstrap = () => {
  // Render the Angular application for server-side execution
  // You might use either renderModule or renderModuleFactory based on your setup
  return renderModule(AppModule, { document: '<app-root></app-root>' });
};
