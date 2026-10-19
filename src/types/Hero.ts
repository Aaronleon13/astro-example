export interface Hero {
	id: number;
	name: string;
	slug: string;
	powerstats: {
		intelligence?: number;
		strength: number;
		speed: number;
		durability: number;
		power: number;
		combat: number;
	};
	appearance: {
		gender: string;
		race: string;
		height: string;
		weight: string;
	};
	biography: {
		fullName: string;
		placeOfBirth: string;
	};
	image: string;
	habilidades: string[];
}
