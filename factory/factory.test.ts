import { Knight, Wizard, Thief, CharacterFactory } from './factory';

describe('Character Tests', () => {
    test('Knight Character', () => {
        const knight = new Knight('Arthur', 5);
        expect(knight.getName()).toBe('Arthur');
        expect(knight.getRole()).toBe('剣士');
        expect(knight.getAbility()).toBe('剣で闘う');
        expect(knight.getLevel()).toBe(5);
    });

    test('Wizard Character', () => {
        const wizard = new Wizard('Merlin', 10);
        expect(wizard.getName()).toBe('Merlin');
        expect(wizard.getRole()).toBe('魔法使い');
        expect(wizard.getAbility()).toBe('呪文を唱える');
        expect(wizard.getLevel()).toBe(10);
    });

    test('Thief Character', () => {
        const thief = new Thief('Robin', 3);
        expect(thief.getName()).toBe('Robin');
        expect(thief.getRole()).toBe('泥棒');
        expect(thief.getAbility()).toBe('こっそり盗む');
        expect(thief.getLevel()).toBe(3);
    });
});
