export const DamageTypes = {
    PHYSICAL: 'PHYSICAL',
    FIRE: 'FIRE',
    ICE: 'ICE',
    LIGHTNING: 'LIGHTNING',
    POISON: 'POISON',
    HOLY: 'HOLY',
    DARK: 'DARK',
} as const;

export type DamageType = keyof typeof DamageTypes;