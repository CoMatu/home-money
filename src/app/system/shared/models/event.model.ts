export class AppEvent {
    constructor(
        public type: string,
        public amount: number,
        public category: number,
        public data: string,
        public description: string,
        public id?: number
    ) {}
}

/**
       "id": 1,
      "type": "income",
      "amount": 1250,
      "category": 2,
      "date": "12.06.2017 19:49:02",
      "description": "Подарили еду в гостях"
 */
