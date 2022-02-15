export interface Managers {
	data: Datum[];
	included: Included[];
	meta: Meta;
	links: ManagersLinks;
}

export interface Datum {
	type: Type;
	id: string;
	links: DatumLinks;
	attributes: DatumAttributes;
	relationships: Relationships;
}

export interface DatumAttributes {
	identifier: null;
	firstName: string;
	lastName: string;
	name: string;
	features: string[];
	avatar: null;
	employmentStart: Date;
	external: boolean;
	'Last Year Bonus'?: number;
	'Business Unit'?: string;
	'Commute Time'?: number;
	Age?: Date;
	Department?: string;
	Gender?: string;
	'Job Level'?: string;
	'Local Office'?: string;
	'% of target'?: number;
	Region?: string;
	Salary?: number;
	Tenure?: Date;
}

export interface DatumLinks {
	self: string;
}

export interface Relationships {
	company: Manager;
	account: Manager;
	phones: Phones;
	Manager?: Manager;
}

export interface Manager {
	data: Data;
}

export interface Data {
	type: Type;
	id: string;
}

export enum Type {
	Accounts = 'accounts',
	Companies = 'companies',
	Employees = 'employees',
}

export interface Phones {
	data: any[];
}

export interface Included {
	type: Type;
	id: string;
	links: DatumLinks;
	attributes: IncludedAttributes;
	relationships?: Relationships;
}

export interface IncludedAttributes {
	email?: string;
	locale?: null;
	timezone?: null;
	bouncedAt?: null;
	bounceReason?: null;
	localeEffective?: null | string;
	timezoneEffective?: null;
	identifier?: null;
	firstName?: string;
	lastName?: string;
	name?: string;
	features?: string[];
	avatar?: null;
	employmentStart?: Date;
	external?: boolean;
	'Last Year Bonus'?: number;
	'Business Unit'?: string;
	'Commute Time'?: number;
	Age?: Date;
	Department?: string;
	Gender?: string;
	'Job Level'?: string;
	'Local Office'?: string;
	'% of target'?: number;
	Region?: string;
	Salary?: number;
	Tenure?: Date;
}

export interface ManagersLinks {
	self: string;
	first: string;
	last: string;
}

export interface Meta {
	page: Page;
}

export interface Page {
	total: number;
}
