import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ItemService {
    http = inject(HttpClient);

    // Sin métodos todavía: faltan los endpoints de la API
}
